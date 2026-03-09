import axios, {
  type AxiosError,
  type AxiosRequestConfig,
  type InternalAxiosRequestConfig,
  isAxiosError,
} from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_BASE_URL = process.env?.EXPO_PUBLIC_API_URL;
const AUTH_STORAGE_KEY = "@routine_app:auth";

const REQUEST_TIMEOUT_MS = 15_000;
const MAX_RETRIES = 3;
const RETRY_BASE_DELAY_MS = 1_000;

const RETRYABLE_STATUS_CODES = new Set([408, 429, 500, 502, 503, 504]);

export const client = axios.create({
  baseURL: API_BASE_URL,
  timeout: REQUEST_TIMEOUT_MS,
  headers: { "Content-Type": "application/json" },
});

client.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
  try {
    const token = await AsyncStorage.getItem(AUTH_STORAGE_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch {
    console.log("An error occured");
    
  }
  return config;
});

interface RetryMeta {
  __retryCount?: number;
}

function isRetryable(error: AxiosError): boolean {
  if (!error.config || (error.config as AxiosRequestConfig & { __noRetry?: boolean }).__noRetry) {
    return false;
  }
  if (error.code === "ECONNABORTED" || error.code === "ERR_NETWORK") {
    return true;
  }
  const status = error.response?.status;
  return status != null && RETRYABLE_STATUS_CODES.has(status);
}

function retryDelay(attempt: number): number {
  const jitter = Math.random() * 500;
  return RETRY_BASE_DELAY_MS * 2 ** attempt + jitter;
}

client.interceptors.response.use(undefined, async (error: AxiosError) => {
  const config = error.config as (AxiosRequestConfig & RetryMeta) | undefined;
  if (!config || !isRetryable(error)) {
    return Promise.reject(error);
  }

  config.__retryCount = (config.__retryCount ?? 0) + 1;
  if (config.__retryCount > MAX_RETRIES) {
    return Promise.reject(error);
  }

  await new Promise((r) => setTimeout(r, retryDelay(config.__retryCount! - 1)));
  return client.request(config);
});

function getErrorType(
  err: unknown,
): "network" | "timeout" | "server" | "badRequest" | "generic" {
  if (isAxiosError(err)) {
    if (err.code === "ERR_NETWORK" || err.message === "Network Error")
      return "network";
    if (
      err.code === "ECONNABORTED" ||
      err.message?.toLowerCase().includes("timeout")
    )
      return "timeout";
    const status = err.response?.status;
    if (status != null) {
      if (status >= 500) return "server";
      if (status >= 400) return "badRequest";
    }
  }
  return "generic";
}

export function getErrorMessage(err: unknown): string {
  if (
    isAxiosError(err) &&
    err.response?.data?.error &&
    typeof err.response.data.error === "string"
  ) {
    return err.response.data.error;
  }
  return getErrorType(err);
}
