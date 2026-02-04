import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { API_BASE_URL, STORAGE_KEY } from '../constants';

const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to attach JWT
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem(STORAGE_KEY);
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for 401 handling
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If 401 and we haven't retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Fix: Cast window to any to access Telegram WebApp which is not in default Window type
        const initData = (window as any).Telegram?.WebApp?.initData;
        if (!initData) throw new Error('No Telegram initData available for re-auth');

        // Attempt re-login
        const authResponse = await axios.post(`${API_BASE_URL}auth/login`, {
          initData: initData,
        });

        const newToken = authResponse.data.token;
        localStorage.setItem(STORAGE_KEY, newToken);

        // Update header and retry
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        // If re-auth fails, clear token and reject
        localStorage.removeItem(STORAGE_KEY);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;