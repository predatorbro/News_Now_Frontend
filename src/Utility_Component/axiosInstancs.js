// utils/axiosInstance.js
import axios from "axios";

// Main instance
const axiosInstance = axios.create({
    baseURL: "https://newsnowbackend-production.up.railway.app",
    withCredentials: true,
});

// Separate instance (without interceptor) for refreshing token
const refreshAxios = axios.create({
    baseURL: "https://newsnowbackend-production.up.railway.app",
    withCredentials: true,
});

axiosInstance.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;

        if (!originalRequest) return Promise.reject(error);

        // If token expired and not yet retried
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                console.log("⏳ Trying token renewal...");
                const response = await refreshAxios.post("/admin/renewtoken");
                console.log(response)

                // Retry original request
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                console.error("❌ Token refresh failed:", refreshError.response?.data || refreshError.message);

                try {
                    localStorage.clear()
                    console.log("🔁 Logging out...");
                    await refreshAxios.get("/admin/logout");
                } catch (logoutError) {
                    console.warn("⚠️ Server logout failed:", logoutError.message);
                }

                // setTimeout(() => {
                //     window.location.href = "/admin/login";
                // }, 1000);

                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);


export default axiosInstance;
