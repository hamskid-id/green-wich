import axios from "axios";
import { useAuthStore } from "../stores/authStore";

const apiClient = axios.create({
  baseURL:
    process.env.REACT_APP_API_BASE_URL ||
    "https://phplaravel-1494556-5705857.cloudwaysapps.com/v1",
  timeout: 20000,
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout();
    }
    return Promise.reject(error);
  }
);

export default apiClient;
