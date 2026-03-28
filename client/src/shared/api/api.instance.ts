import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

import { ENV } from "../config/env";

import { ApiErrorDataDtoSchema } from "./api.contracts";
import { normalizeValidationErrors } from "./api.lib";

export const api = axios.create({
  baseURL: ENV.API_URL,
  withCredentials: true,
});

type RefreshHandler = () => Promise<void>;
let refreshLogic: RefreshHandler | null = null;
let isRefreshing = false;
let refreshPromise: Promise<void> | null = null;

export function setRefreshHandler(handler: RefreshHandler) {
  refreshLogic = handler;
}

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
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _isRetry?: boolean;
    };

    if (
      error.response?.status === 401 &&
      refreshLogic &&
      !originalRequest._isRetry
    ) {
      originalRequest._isRetry = true;

      if (!isRefreshing) {
        isRefreshing = true;
        refreshPromise = refreshLogic().finally(() => {
          isRefreshing = false;
          refreshPromise = null;
        });
      }

      try {
        await refreshPromise;

        return api.request(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    const validation = ApiErrorDataDtoSchema.safeParse(error.response?.data);

    if (validation.success) {
      const normalizedErrorResponse = {
        ...error.response!,
        data: normalizeValidationErrors(validation.data),
      };

      return Promise.reject(
        new AxiosError(
          error.message,
          error.code,
          error.config,
          error.request,
          normalizedErrorResponse,
        ),
      );
    }

    return Promise.reject(error);
  },
);
