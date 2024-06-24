
import axios, { AxiosError } from "axios";
import { GetServerSidePropsContext } from "next";
import { getSession, useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const isServer = () => {
    return typeof window === "undefined";
}

let context = <GetServerSidePropsContext>{};
const baseURL = process.env.NEXT_PUBLIC_API_URL;

export const setContext = (_context: GetServerSidePropsContext) => {
    context = _context;
}

export const api = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
    // withCredentials: true, // to send cookie
})

api.interceptors.request.use(async (config) => {
    if (config.headers.Authorization) return config

    const url = config.url;

    if (!url?.includes("login")) {
        const session = await getSession();

        if (session) {
            const authHeaderValue = `Bearer ${session.accessToken?.token}`

            config.headers.Authorization = authHeaderValue;
            api.defaults.headers.common.Authorization = authHeaderValue;
        }
    }

    if (isServer() && context?.req?.cookies) {
        config.headers.Cookie = `gid=${context.req.cookies.gid};`
    }

    return config;
});

api.interceptors.response.use(
    response => {
        return response;
    },
    async (error: AxiosError) => {
        // check conditions to refresh token
        if (error.response?.status === 401 && !error.response?.config?.url?.includes("auth/refresh")
            && !error.response?.config?.url?.includes("login")) {
            return await refreshToken(error);
        }

        api.defaults.headers.common.Authorization = undefined;

        return Promise.reject(error);
    }
)

let fetchingToken = false;
let subscribers: ((token: string) => any)[] = [];

const onAccessTokenFetched = (token: string) => {
    subscribers.forEach((callback) => callback(token));
    subscribers = [];
}

const addSubscriber = (callback: (token: string) => any) => {
    subscribers.push(callback)
}

const refreshToken = async (oError: AxiosError) => {

    try {
        const { response } = oError;

        //check whether refreshing token or not
        if (!fetchingToken) {
            const session = await getSession();
            const { update } = useSession();

            fetchingToken = true;

            // refresh token
            const { data } = await api.post('/refresh-token', null, { params: { token: session?.refreshToken?.token } });

            if (data?.data) {
                // when new token arrives, retry old requests
                response!.config.headers['Authorization'] = `Bearer ${data?.data?.accessToken?.token}`;
                await update({
                    ...session,
                    accessToken: data?.data?.accessToken,
                    refreshToken: data?.data?.refreshToken
                })
            }

            return api(response!.config);
        }
        return Promise.reject(oError);
    } catch (error) {
        console.log(error);
        // on error go to login page
        if (!isServer() && !oError?.response?.config?.url?.includes('/login')) {
            // window.location.replace('/login');
        }
        if (isServer()) {
            context.res.setHeader("location", "/login");
            context.res.statusCode = 302;
            context.res.end();
        }
        return Promise.reject(oError);
    } finally {
        fetchingToken = false;
    }
}