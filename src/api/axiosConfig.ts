import axios from 'axios';

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL ?? '',
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    }
})

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                await axios.post('/api/auth/refresh', {}, { withCredentials: true });
                return api(originalRequest);
            } catch {
                window.location.href = '/login';
            }
        }

        return Promise.reject(error);
    }
)