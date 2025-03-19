import axios from "axios";
import { handleSessionExpiry } from "../pages/OrganizationOwner/OrganizationOwnerAuth/services/AuthServices";

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Request Interceptor (Attach Authorization Token Automatically)
axiosInstance.interceptors.request.use(
  (config) => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error("LocalStorage error:", error);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Response Interceptor (Handle Global Errors)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const token = localStorage.getItem("token");

    // Only call handleSessionExpiry if token exists (meaning user was logged in)
    // if (error.response?.status === 401 && token) {
    //   handleSessionExpiry(); // Log out user if session expires
    // }

    return Promise.reject(error);
  }
);

export default axiosInstance;
