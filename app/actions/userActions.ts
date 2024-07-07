import { Response, User } from "@/types";
import ErrorLogger from "./errorLogger";
import { api } from "@/utils/config";

export async function fetchUserByID(userID: any): Promise<Response | null> {
    const url = `/get-user-by-id/${userID}`;

    try {
        const { data } = await api.get<Response>(url);
        return data;
    } catch (error: any) {
        ErrorLogger(url, error);
        throw new Error(error.message);
    }
}

export async function fetchAllUser(pageIndex: number = 1, pageSize: number = 10): Promise<Response | null> {
    const url = `/get-all-users`;

    try {
        const { data } = await api.get<Response>(url, { params: { pageSize, pageIndex } });
        return data;
    } catch (error: any) {
        ErrorLogger(url, error);
        throw new Error(error.message);
    }
}

export async function fetchProfile(): Promise<Response | null> {
    const url = `/get-profile`;

    try {
        const { data } = await api.get<Response>(url);
        return data;
    } catch (error: any) {
        ErrorLogger(url, error);
        throw new Error(error.message);
    }
}

export async function createNewUser(body: any): Promise<Response | null> {
    const url = `/register`;

    try {
        const { data } = await api.post<Response>(url, body);
        return data;
    } catch (error: any) {
        ErrorLogger(url, error);
        throw new Error(error.message);
    }
}

export async function editUser(userID: string, body: any): Promise<Response | null> {
    const url = `/update-user/${userID}`;

    try {
        const { data } = await api.put<Response>(url, body, { headers: { 'Content-Type': 'multipart/form-data' } });
        return data;
    } catch (error: any) {
        ErrorLogger(url, error);
        throw new Error(error.message);
    }
}

export async function editInformation(body: any): Promise<Response | null> {
    const url = `/update-information`;

    try {
        const { data } = await api.put<Response>(url, body);
        return data;
    } catch (error: any) {
        ErrorLogger(url, error);
        throw new Error(error.message);
    }
}

export async function changeAvatar(userID: string, body: any): Promise<Response | null> {
    const url = `/change-avatar/${userID}`;

    try {
        const { data } = await api.put<Response>(url, body, { headers: { 'Content-Type': 'multipart/form-data' } });
        return data;
    } catch (error: any) {
        ErrorLogger(url, error);
        throw new Error(error.message);
    }
}

export async function changePassword(body: any): Promise<Response | null> {
    const url = `/change-password`;

    try {
        const { data } = await api.put<Response>(url, body);
        return data;
    } catch (error: any) {
        ErrorLogger(url, error);
        throw new Error(error.message);
    }
}

export async function logout(token: string): Promise<Response | null> {
    const url = `/logout`;

    try {
        const { data } = await api.post<Response>(url, null, { params: { token } });
        return data;
    } catch (error: any) {
        ErrorLogger(url, error);
        throw new Error(error.message);
    }
} 