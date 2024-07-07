import { useSession } from "next-auth/react"
import axios from "@/utils/config";

export const useRefreshToken = () => {
    const { data: session, update } = useSession();

    const refreshToken = async () => {
        const res = await axios.post("/refresh-token", null, {
            params: {
                token: session?.refreshToken?.token
            }
        });

        if (session) {
            const data = res.data;
            if (data && data.succeeded && data.data) {
                await update({
                    ...session,
                    accessToken: data.data.accessToken,
                    refreshToken: data.data.refreshToken,
                });
                return data.data.accessToken.token;
            }
            return null;
        }
        return null
    }

    return refreshToken;
}