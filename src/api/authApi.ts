import type { LoginRequest, LoginResponse } from "../types/cv.types";
import { api } from "./axiosConfig";


export const authApi = {
    login : async (request: LoginRequest): Promise<LoginResponse> => {
        const response = await api.post<LoginResponse>('/api/auth/login', request)
        return response.data;
    },
    logout: async(): Promise<void> => {
        await api.post<void>('/api/auth/logout');
    },
    refresh: async(): Promise<void> => {
        await api.post<void>('/api/auth/refresh');
    }
}