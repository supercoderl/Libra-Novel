import { Response } from "@/types";
import ErrorLogger from "./errorLogger";
import { api } from "@/utils/config";

export async function fetchGenreByID(genreID: number): Promise<Response | null> {
    const url = `/get-genre-by-id/${genreID}`;

    try {
        const { data } = await api.get<Response>(url);
        return data;
    } catch (error: any) {
        ErrorLogger(url, error);
        throw new Error(error.message);
    }
}

export async function fetchAllGenres(pageIndex: number = 1, pageSize: number = 10): Promise<Response | null> {
    const url = `/get-genres`;

    try {
        const { data } = await api.get<Response>(url, { params: { pageSize, pageIndex } });
        return data;
    } catch (error: any) {
        ErrorLogger(url, error);
        throw new Error(error.message);
    }
}

export async function createNewGenre(body: any): Promise<Response | null> {
    const url = `/create-genre`;

    try {
        const { data } = await api.post<Response>(url, body);
        return data;
    } catch (error: any) {
        ErrorLogger(url, error);
        throw new Error(error.message);
    }
}

export async function editGenre(body: any): Promise<Response | null> {
    const url = `/update-genre/${body.genreID}`;

    try {
        const { data } = await api.put<Response>(url, body);
        return data;
    } catch (error: any) {
        ErrorLogger(url, error);
        throw new Error(error.message);
    }
} 