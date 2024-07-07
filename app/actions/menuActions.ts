import { Response } from "@/types";
import ErrorLogger from "./errorLogger";
import { api } from "@/utils/config";

export async function fetchMenuByID(menuID: number): Promise<Response | null> {
    const url = `/get-menu-by-id/${menuID}`;

    try {
        const { data } = await api.get<Response>(url);
        return data;
    } catch (error: any) {
        ErrorLogger(url, error);
        throw new Error(error.message);
    }
}

export async function fetchAllMenus(): Promise<Response | null> {
    const url = `/get-all-menus`;

    try {
        const { data } = await api.get<Response>(url);
        return data;
    } catch (error: any) {
        ErrorLogger(url, error);
        throw new Error(error.message);
    }
}

export async function createNewMenu(body: any): Promise<Response | null> {
    const url = `/create-menu`;

    try {
        const { data } = await api.post<Response>(url, body);
        return data;
    } catch (error: any) {
        ErrorLogger(url, error);
        throw new Error(error.message);
    }
}

export async function editMenu(body: any): Promise<Response | null> {
    const url = `/update-menu/${body.menuID}`;

    try {
        const { data } = await api.put<Response>(url, body);
        return data;
    } catch (error: any) {
        ErrorLogger(url, error);
        throw new Error(error.message);
    }
} 