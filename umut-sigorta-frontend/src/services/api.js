import axios from "axios";
import { logout } from "../contexts/AuthContext"; // Eğer logout'ı burada kullanmak istersen Context'i farklı şekilde tasarla

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

// Otomatik logout için response interceptor ekleyebilirsin
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Token süresi dolmuş veya yetkisiz
            localStorage.removeItem("token");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export default api;
