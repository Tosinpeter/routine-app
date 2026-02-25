import axios, { isAxiosError } from "axios";

const API_BASE_URL =
  (typeof process !== "undefined" && process.env?.EXPO_PUBLIC_API_URL) ||
  "https://gloord-hono.onrender.com";

export const client = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
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
