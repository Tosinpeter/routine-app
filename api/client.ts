import axios from "axios";

import { t } from "@/i18n";

const API_BASE_URL =
  (typeof process !== "undefined" && process.env?.EXPO_PUBLIC_API_URL) ||
  "http://localhost:3000";

export const client = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

function getErrorType(err: unknown): "network" | "timeout" | "server" | "badRequest" | "generic" {
  if (axios.isAxiosError(err)) {
    if (err.code === "ERR_NETWORK" || err.message === "Network Error") return "network";
    if (err.code === "ECONNABORTED" || err.message?.toLowerCase().includes("timeout")) return "timeout";
    const status = err.response?.status;
    if (status != null) {
      if (status >= 500) return "server";
      if (status >= 400) return "badRequest";
    }
  }
  return "generic";
}

export function getErrorMessage(err: unknown): string {
  if (axios.isAxiosError(err) && err.response?.data?.error && typeof err.response.data.error === "string") {
    return err.response.data.error;
  }
  switch (getErrorType(err)) {
    case "network":
      return t("api.error.network");
    case "timeout":
      return t("api.error.timeout");
    case "server":
      return t("api.error.server");
    case "badRequest":
      return t("api.error.badRequest");
    default:
      return t("api.error.generic");
  }
}

// --- Auth API ---

// export async function requestOtp(
//   phone_number: string
// ): Promise<RequestOtpResult> {
  
// }

// export interface AuthUser {
//   id: string;
//   phone_number: string;
//   createdAt: string;
// }

// export interface VerifyOtpResult {
//   success: boolean;
//   user?: AuthUser;
//   token?: string;
//   error?: string;
// }

// export async function verifyOtp(
//   phone_number: string,
//   code: string
// ): Promise<VerifyOtpResult> {
//   try {
//     const { data } = await client.post<{
//       success?: boolean;
//       user?: AuthUser;
//       token?: string;
//       error?: string;
//     }>("/api/auth/verify-otp", { phone_number, code });
//     if (data.success !== true || !data.user || !data.token) {
//       return {
//         success: false,
//         error: (data as { error?: string }).error ?? "Verification failed",
//       };
//     }
//     return {
//       success: true,
//       user: data.user,
//       token: data.token,
//     };
//   } catch (err) {
//     return { success: false, error: getErrorMessage(err) };
//   }
// }
