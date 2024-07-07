import { Response } from "@/types";
import ErrorLogger from "./errorLogger";
import { api } from "@/utils/config";

export async function fetchNovelByID(novelID: number): Promise<Response | null> {
    const url = `/get-novel-by-id/${novelID}`;

    try {
        const { data } = await api.get<Response>(url);
        return data;
    } catch (error: any) {
        console.log("a: ", error);
        ErrorLogger(url, error);
        throw new Error(error.message);
    }
}

export async function fetchAllNovels(pageIndex: number = 1, pageSize: number = 10, genreID?: number): Promise<Response | null> {
    const url = `/get-novels`;

    try {
        const { data } = await api.get<Response>(url, { params: { pageSize, pageIndex, genreID } });
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

export async function updateCount(id?: number, type?: string): Promise<Response | null> {
    const url = `/update-count/${id}`;

    try {
        const { data } = await api.put<Response>(url, null, { params: { type } });
        return data;
    } catch (error: any) {
        ErrorLogger(url, error);
        throw new Error(error.message);
    }
}

export async function createMappingGenreWithNovel(body: any): Promise<Response | null> {
    const url = `/create-mapping-genre-with-novel`;

    try {
        const { data } = await api.post<Response>(url, null, { params: body });
        return data;
    } catch (error: any) {
        ErrorLogger(url, error);
        throw new Error(error.message);
    }
}

export async function dropMappingGenreWithNovel(body: any): Promise<Response | null> {
    const url = `/drop-mapping-genre-with-novel`;

    try {
        const { data } = await api.delete<Response>(url, { params: body });
        return data;
    } catch (error: any) {
        ErrorLogger(url, error);
        throw new Error(error.message);
    }
}