import { Response } from "@/types";
import ErrorLogger from "./errorLogger";
import { api } from "@/utils/config";

export async function fetchChapterByID(chapterID: number): Promise<Response | null> {
    const url = `/get-chapter-by-id/${chapterID}`;

    try {
        const { data } = await api.get<Response>(url);
        return data;
    } catch (error: any) {
        ErrorLogger(url, error);
        throw new Error(error.message);
    }
}

export async function fetchAllChapters(pageIndex: number = 1, pageSize: number = 10, novelID: number): Promise<Response | null> {
    const url = `/get-chapters/${novelID}`;

    try {
        const { data } = await api.get<Response>(url, { params: { pageSize, pageIndex } });
        return data;
    } catch (error: any) {
        ErrorLogger(url, error);
        throw new Error(error.message);
    }
}

export async function createNewChapter(body: any): Promise<Response | null> {
    const url = `/create-chapter`;

    try {
        const { data } = await api.post<Response>(url, body);
        return data;
    } catch (error: any) {
        ErrorLogger(url, error);
        throw new Error(error.message);
    }
} 

export async function editChapter(body: any): Promise<Response | null> {
    const url = `/update-chapter/${body.chapterID}`;

    try {
        const { data } = await api.put<Response>(url, body);
        return data;
    } catch (error: any) {
        ErrorLogger(url, error);
        throw new Error(error.message);
    }
} 