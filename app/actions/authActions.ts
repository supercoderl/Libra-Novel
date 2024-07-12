import { Response } from "@/types";
import ErrorLogger from "./errorLogger";
import { api } from "@/utils/config";

export const login = async (body: any): Promise<Response> => {
    const url = `/login`;

    try {
        const { data } = await api.post<Response>(url, body);
        return data;
    } catch (error: any) {
        ErrorLogger(url, error);
        throw new Error(error.message);
    }
}

export const loginByProvider = async (body: any): Promise<Response> => {
    const url = `/login-by-provider`;

    try {
        const { data } = await api.post<Response>(url, body);
        return data;
    } catch (error: any) {
        ErrorLogger(url, error);
        throw new Error(error.message);
    }
}