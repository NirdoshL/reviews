import axios, { AxiosError } from "axios";
import { Mutex } from "async-mutex";

declare module "@tanstack/react-query" {
  interface Register {
    defaultError: AxiosError;
  }
}

const mutex = new Mutex();

const apiServer = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

apiServer.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 error
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (!mutex.isLocked()) {
        const release = await mutex.acquire();

        try {
          return apiServer(originalRequest);
        } catch (refreshError) {
          return Promise.reject(refreshError);
        } finally {
          release();
        }
      } else {
        await mutex.waitForUnlock();
        return apiServer(originalRequest);
      }
    }

    return Promise.reject(error);
  }
);

export default apiServer;
