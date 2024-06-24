import { Response } from "@/types";
import ErrorLogger from "./errorLogger";
import { api } from "@/utils/config";

export default async function login(body: any): Promise<Response> {
    const url = `/login`;

    try {
        const { data } = await api.post<Response>(url, body);
        return data;
    } catch (error: any) {
        ErrorLogger(url, error);
        throw new Error(error.message);
    }
}