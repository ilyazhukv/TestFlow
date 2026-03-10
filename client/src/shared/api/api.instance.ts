import axios, { AxiosError } from "axios";

import { ApiErrorDataDtoSchema } from "./api.contracts";
import { normalizeValidationErrors } from "./api.lib";

import { store } from "@/shared/store";

type RefreshHandler = () => Promise<void>;
let refreshLogic: RefreshHandler | null = null;
let isRefreshing = false;
let refreshPromise: Promise<void> | null = null;

export function setRefreshHandler(handler: RefreshHandler) {
  refreshLogic = handler;
}

export const api = axios.create({ baseURL: import.meta.env.VITE_API_URL, withCredentials: true });

export function attachAuthInterceptor() {
  api.interceptors.request.use(
    (config) => {

      return config;
    },
    (error) => Promise.reject(error),
  );
}

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && refreshLogic && !originalRequest._isRetry) {
      originalRequest._isRetry = true;

      if (!isRefreshing) {
        isRefreshing = true;
        refreshPromise = refreshLogic().finally(() => {
          isRefreshing = false;
          refreshPromise = null;
        })
      }

      try {
        await refreshPromise;

        return api.request(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError); 
      }
    }

    if (!axios.isAxiosError(error)) {
      return Promise.reject(error);
    }

    const validation = ApiErrorDataDtoSchema.safeParse(error.response?.data);

    if (!validation.success) {
      return Promise.reject(error);
    }

    const normalizedErrorResponse = {
      ...error.response!,
      data: normalizeValidationErrors(validation.data),
    };

    return Promise.reject(
      new AxiosError(error.message, error.code, error.config, error.request, normalizedErrorResponse),
    );
  },
);
