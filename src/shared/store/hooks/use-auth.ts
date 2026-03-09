import { useCallback } from "react";

import type { Gender } from "@/features/profile/models/profile";
import { Profile } from "@/features/profile/models/profile";
import {
  logoutSession,
  requestOtp as requestOtpThunk,
  type SessionProfile,
  updateSessionProfile,
  verifyOtp as verifyOtpThunk,
} from "@/shared/store/slices/session-slice";
import { useAppDispatch, useAppSelector } from "@/shared/store/hooks";

export interface ApiResult {
  success: boolean;
  message?: string;
  error?: string;
}

export type ProfileUpdate = Partial<
  Pick<
    Profile,
    | "skin_type"
    | "health_conditions"
    | "fullname"
    | "age"
    | "gender"
    | "skin_sensitivity"
    | "skin_concerns"
  >
>;

export interface AuthContextType {
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  profile: Profile | null;
  requestOtp: (phone_number: string) => Promise<ApiResult>;
  verifyOtp: (phone_number: string, code: string) => Promise<Record<string, unknown>>;
  updateProfile: (updates: ProfileUpdate) => Promise<void>;
  refreshProfile: (profile: Profile) => Promise<void>;
  logout: () => Promise<void>;
}

function toSessionProfile(p: Profile): SessionProfile {
  return {
    id: p.id,
    phone_number: p.phone_number,
    fullname: p.fullname,
    age: p.age,
    gender: p.gender,
    skin_type: p.skin_type,
    skin_sensitivity: p.skin_sensitivity,
    skin_concerns: p.skin_concerns,
    health_conditions: p.health_conditions,
  };
}

export function useAuth(): AuthContextType {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.session.token);
  const profileData = useAppSelector((state) => state.session.profile);
  const isLoading = useAppSelector((state) => state.session.isLoading);

  const profile = profileData ? Profile.fromJson(profileData) : null;

  const requestOtp = useCallback(
    async (phone_number: string): Promise<ApiResult> => {
      const result = await dispatch(requestOtpThunk(phone_number)).unwrap();
      return result;
    },
    [dispatch]
  );

  const verifyOtp = useCallback(
    async (phone_number: string, code: string): Promise<Record<string, unknown>> => {
      const result = await dispatch(verifyOtpThunk({ phone_number, code })).unwrap();
      if (result.success && result.data) {
        return { success: true, data: result.data };
      }
      return { success: result.success, error: result.error };
    },
    [dispatch]
  );

  const updateProfile = useCallback(
    async (updates: ProfileUpdate) => {
      if (!profileData) return;
      const next = new Profile(
        profileData.id,
        profileData.phone_number,
        updates.fullname ?? profileData.fullname,
        updates.age ?? profileData.age,
        (updates.gender ?? profileData.gender) as Gender,
        updates.skin_type ?? profileData.skin_type,
        updates.skin_sensitivity ?? profileData.skin_sensitivity,
        updates.skin_concerns ?? profileData.skin_concerns,
        updates.health_conditions ?? profileData.health_conditions
      );
      await dispatch(updateSessionProfile(toSessionProfile(next))).unwrap();
    },
    [dispatch, profileData]
  );

  const refreshProfile = useCallback(
    async (p: Profile) => {
      await dispatch(updateSessionProfile(toSessionProfile(p))).unwrap();
    },
    [dispatch]
  );

  const logout = useCallback(async () => {
    await dispatch(logoutSession()).unwrap();
  }, [dispatch]);

  return {
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
}
