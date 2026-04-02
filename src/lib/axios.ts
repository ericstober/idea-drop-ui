import axios from "axios";
import { getStoredAccessToken, setStoredAccessToken } from "./authToken";
import { refreshAccessToken } from "@/api/auth";

// Create a pre-configured Axios instance
const api = axios.create({
  // Base URL for all API requests
  // All requests using this instance will be prefixed with "/api"
  baseURL: "/api",

  // Include cookies (e.g., for authentication sessions)
  // Useful when working with same-site or cross-site auth
  withCredentials: true,

  // Default headers sent with every request
  headers: {
    // Indicate that request bodies are JSON
    "Content-Type": "application/json",
  },
});

// Attach token on refresh
api.interceptors.request.use((config) => {
  const token = getStoredAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Refresh token after expire
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry && !originalRequest.url.includes("/auth/refresh")) {
      originalRequest._retry = true;

      try {
        const { accessToken: newToken } = await refreshAccessToken();
        setStoredAccessToken(newToken);
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (error) {
        console.error("Refresh token failed", error);
      }
    }

    return Promise.reject(error);
  },
);

export default api;
