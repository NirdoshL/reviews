import axios, { AxiosError } from "axios";
import { Mutex } from "async-mutex";

declare module "@tanstack/react-query" {
  interface Register {
    defaultError: AxiosError;
  }
}

const mutex = new Mutex();

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_CLIENT_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 error
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (!mutex.isLocked()) {
        const release = await mutex.acquire();

        try {
          return apiClient(originalRequest);
        } catch (refreshError) {
          return Promise.reject(refreshError);
        } finally {
          release();
        }
      } else {
        await mutex.waitForUnlock();
        return apiClient(originalRequest);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
