"use client"

import { api } from "@/utils/config";
import { useSession } from "next-auth/react"
import { useEffect } from "react";
import { useRefreshToken } from "./useRefreshToken";

const useAxios = () => {
    const { data: session } = useSession();
    const refreshToken = useRefreshToken();

    useEffect(() => {
        const requestInterceptor = api.interceptors.request.use((config) => {
            if (!config.headers["Authorization"]) {
                config.headers["Authorization"] = `Bearer ${session?.accessToken?.token}`;
            }
            return config;
        },
            (error) => Promise.reject(error)
        );

        const responseInterceptor = api.interceptors.response.use((response) => response, async (error) => {
            const prevRequest = error.config;
            if (error.response.status === 401 && !prevRequest.sent) {
                prevRequest.sent = true;

                const token = await refreshToken();
                prevRequest.headers["Authorization"] = `Bearer ${token}`;
                return api(prevRequest);
            }

            return Promise.reject(error);
        })

        return () => {
            api.interceptors.request.eject(requestInterceptor);
            api.interceptors.response.eject(responseInterceptor);
        }
    }, [session]);

    return api;
}

export default useAxios;