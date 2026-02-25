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
import { Profile } from "@/models/profile";

const AUTH_STORAGE_KEY = "@routine_app:auth";
const PROFILE_STORAGE_KEY = "@routine_app:profile";

interface AuthState {
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export class User {
  id: number;
  name: string;
  email: string;

  constructor(id: number, name: string, email: string) {
    this.id = id;
    this.name = name;
    this.email = email;
  }

  static fromJson(json: any): User {
    return new User(json.id, json.name, json.email);
  }
}

export interface ApiResult {
  success: boolean;
  message?: string;
  error?: string;
}

export type ProfileUpdate = Partial<Pick<Profile, "skin_type" | "health_conditions" | "fullname" | "age" | "gender" | "skin_sensitivity" | "skin_concerns">>;

interface AuthContextType extends AuthState {
  profile: Profile | null;
  requestOtp: (phone_number: string) => Promise<ApiResult>;
  verifyOtp: (phone_number: string, code: string) => Promise<Record<string, unknown>>;
  updateProfile: (updates: ProfileUpdate) => Promise<void>;
  /** Update profile and persist to storage (e.g. after API refresh on home). */
  refreshProfile: (profile: Profile) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load token and profile from storage in parallel for fast initial render
  useEffect(() => {
    (async () => {
      try {
        const [storedToken, storedProfile] = await Promise.all([
          AsyncStorage.getItem(AUTH_STORAGE_KEY),
          AsyncStorage.getItem(PROFILE_STORAGE_KEY),
        ]);
        if (storedToken) setToken(storedToken);
        if (storedProfile) {
          const parsed = JSON.parse(storedProfile) as Record<string, unknown>;
          setProfile(Profile.fromJson(parsed));
        }
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const requestOtp = useCallback(
    async (phone_number: string): Promise<ApiResult> => {
      try {
        const { data } = await client.post<{
          success?: boolean;
          error?: string;
          message?: string;
        }>("/api/auth/request-otp", { phone_number });

        if (data.success === false) {
          return { success: false, error: data.error ?? "Request failed" };
        }
        return { success: data.success ?? true, message: data.message };
      } catch (err) {
        return { success: false, error: getErrorMessage(err) };
      }
    }, []
  );

  const persistProfile = useCallback((p: Profile) => {
    return AsyncStorage.setItem(
      PROFILE_STORAGE_KEY,
      JSON.stringify({
        id: p.id,
        phone_number: p.phone_number,
        fullname: p.fullname,
        age: p.age,
        gender: p.gender,
        skin_type: p.skin_type,
        skin_sensitivity: p.skin_sensitivity,
        skin_concerns: p.skin_concerns,
        health_conditions: p.health_conditions,
      })
    );
  }, []);

  const verifyOtp = useCallback(
    async (phone_number: string, code: string): Promise<Record<string, unknown>> => {
      try {
        const { data } = await client.post<Record<string, unknown>>("/api/auth/verify-otp", { phone_number, code });

        if (data?.success === true && typeof data?.token === "string" && data?.data) {
          const payload = data.data as Record<string, unknown>;
          const profileData = Profile.fromJson(payload);
          setToken(data.token);
          setProfile(profileData);
          await AsyncStorage.setItem(AUTH_STORAGE_KEY, data.token);
          await persistProfile(profileData);
          return {
            success: true,
            data: profileData,
          };
        }
        return data as Record<string, unknown>;
      } catch (err) {
        return {
          success: false,
          error: getErrorMessage(err),
        };
      }
    },
    [persistProfile]
  );

  const updateProfile = useCallback(
    async (updates: ProfileUpdate) => {
      setProfile((prev) => {
        if (!prev) return prev;
        const next = new Profile(
          prev.id,
          prev.phone_number,
          updates.fullname ?? prev.fullname,
          updates.age ?? prev.age,
          updates.gender ?? prev.gender,
          updates.skin_type ?? prev.skin_type,
          updates.skin_sensitivity ?? prev.skin_sensitivity,
          updates.skin_concerns ?? prev.skin_concerns,
          updates.health_conditions ?? prev.health_conditions
        );
        persistProfile(next);
        return next;
      });
    },
    [persistProfile]
  );

  const refreshProfile = useCallback(
    async (p: Profile) => {
      setProfile(p);
      await persistProfile(p);
    },
    [persistProfile]
  );

  const logout = useCallback(async () => {
    setToken(null);
    setProfile(null);
    await AsyncStorage.multiRemove([AUTH_STORAGE_KEY, PROFILE_STORAGE_KEY]);
  }, []);

  const value: AuthContextType = {
    token,
    isLoading,
    isAuthenticated: !!token,
    profile,
    requestOtp,
    verifyOtp,
    updateProfile,
    refreshProfile,
    logout,
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
