import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import { client, getErrorMessage } from "@/api/client";

const AUTH_STORAGE_KEY = "@routine_app:auth";

interface AuthState {
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}


export interface ApiResult {
  success: boolean;
  message?: string;
  error?: string;
}

interface AuthContextType extends AuthState {
  requestOtp: (phone_number: string) => Promise<ApiResult>;
  verifyOtp: (phone_number: string, code: string) => Promise<Record<string, unknown>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  // const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const requestOtp = useCallback(
    async (phone_number: string): Promise<ApiResult> => {
      setIsLoading(true);
      try {
        const { data } = await client.post<{
          success?: boolean;
          error?: string;
          message?: string;
        }>("/api/auth/request-otp", { phone_number });

        console.log(data);
        if (data.success === false) {
          return { success: false, error: data.error ?? "Request failed" };
        }
        return { success: data.success ?? true, message: data.message };
      } catch (err) {
        return { success: false, error: getErrorMessage(err) };
      } finally {
        setIsLoading(false);
      }
    },[]
  );

  const verifyOtp = useCallback(
    async (phone_number: string, code: string): Promise<Record<string, unknown>> => {
      setIsLoading(true);
      try {
        const { data } = await client.post<Record<string, unknown>>(
          "/api/auth/verify-otp",
          { phone_number, code }
        );

        // if (data?.success === true && typeof data?.token === "string") {
        //   setToken(data.token);
        //   await AsyncStorage.setItem(
        //     AUTH_STORAGE_KEY,
        //     JSON.stringify({ token: data.token })
        //   );
        // }
        return data;
      } catch (err) {
        return {
          success: false,
          error: getErrorMessage(err),
        };
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const value: AuthContextType = {
    // user,
    token,
    isLoading,
    isAuthenticated: !!token,
    requestOtp,
    verifyOtp,
  };

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
