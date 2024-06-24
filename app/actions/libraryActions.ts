import { Response } from "@/types";
import ErrorLogger from "./errorLogger";
import { api } from "@/utils/config";

export async function fetchNovelByID(novelID: number): Promise<Response | null> {
    const url = `/get-novel-by-id/${novelID}`;

    try {
        const { data } = await api.get<Response>(url);
        return data;
    } catch (error: any) {
        ErrorLogger(url, error);
        throw new Error(error.message);
    }
}

export async function fetchAllNovels(pageIndex: number = 1, pageSize: number = 10): Promise<Response | null> {
    const url = `/get-novels`;

    try {
        const { data } = await api.get<Response>(url, { params: { pageSize, pageIndex } });
        return data;
    } catch (error: any) {
        ErrorLogger(url, error);
        throw new Error(error.message);
    }
}

export async function createNewNovel(body: any): Promise<Response | null> {
    const url = `/create-novel`;

    try {
        const { data } = await api.post<Response>(url, body, { headers: { 'Content-Type': 'multipart/form-data' } });
        return data;
    } catch (error: any) {
        ErrorLogger(url, error);
        throw new Error(error.message);
    }
}

export async function editNovel(id: number, body: any): Promise<Response | null> {
    const url = `/update-novel/${id}`;

    try {
        const { data } = await api.put<Response>(url, body, { headers: { 'Content-Type': 'multipart/form-data' } });
        return data;
    } catch (error: any) {
        ErrorLogger(url, error);
        throw new Error(error.message);
    }
} 