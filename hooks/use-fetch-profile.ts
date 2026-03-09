import { useAuth } from "@/shared/store/hooks/use-auth";
import { Profile } from "@/features/profile/models/profile";
import { client } from "@/shared/api/client";
import { useAppDispatch } from "@/shared/store/hooks";
import type { ProfileData } from "@/shared/store/slices/profile-slice";
import {
  setProfileData,
  setProfileError,
  setProfileLoading,
} from "@/shared/store/slices/profile-slice";
import { isAxiosError } from "axios";
import { useCallback, useEffect, useRef } from "react";

interface ProfileApiResponse {
  success: boolean;
  data: ProfileData;
}

function toProfileGender(
  value: string | null | undefined
): "male" | "female" | "non_binary" | "other" {
  if (!value) return "other";
  const v = String(value).toLowerCase();
  if (v === "male" || v === "female" || v === "non_binary" || v === "other")
    return v;
  return "other";
}

/** Map backend/snake_case profile to slice ProfileData (camelCase) */
function profileToProfileData(p: Profile): ProfileData {
  return {
    id: p.id,
    fullname: p.fullname ?? "",
    targetGoal: "",
    gender: toProfileGender(p.gender ?? undefined),
    age: p.age ?? "",
    skinType: p.skin_type ?? "",
    skinSensitivity: String(p.skin_sensitivity ?? "") === "true",
    skinConcerns: Array.isArray(p.skin_concerns) ? p.skin_concerns : [],
    skinConditions: "",
    healthConditions: p.health_conditions ?? "",
    focusFaceArea: [],
    lastUpdated: new Date().toISOString(),
  };
}

/** Map API response (snake_case) to ProfileData if needed */
function apiProfileToProfileData(data: Record<string, unknown>): ProfileData {
  const p = data as Record<string, unknown>;
  const rawGender = (p.gender as string) ?? "";
  return {
    id: String(p.id ?? ""),
    fullname: (p.fullname as string) ?? "",
    targetGoal: (p.targetGoal as string) ?? "",
    gender: toProfileGender(rawGender),
    age: (p.age as string) ?? "",
    skinType: (p.skin_type as string) ?? (p.skinType as string) ?? "",
    skinSensitivity:
      p.skin_sensitivity === true || String(p.skin_sensitivity) === "true",
    skinConcerns: Array.isArray(p.skin_concerns)
      ? (p.skin_concerns as string[])
      : [],
    skinConditions: (p.skinConditions as string) ?? "",
    healthConditions: (p.health_conditions as string) ?? "",
    focusFaceArea: Array.isArray(p.focusFaceArea)
      ? (p.focusFaceArea as string[])
      : [],
    faceScanImageUrl: p.faceScanImageUrl as string | undefined,
    lastUpdated: (p.lastUpdated as string) ?? new Date().toISOString(),
  };
}

/**
 * Hook to fetch profile: hydrates from AuthContext (local storage) first,
 * then refreshes from the API.
 * Stabilized to avoid refetch loops when the API returns 403 (e.g. expired token).
 */
export const useFetchProfile = () => {
  const dispatch = useAppDispatch();
  const { profile: authProfile, refreshProfile } = useAuth();
  const userId = authProfile?.id ?? null;

  const authProfileRef = useRef(authProfile);
  const refreshProfileRef = useRef(refreshProfile);
  const inFlightRef = useRef(false);

  authProfileRef.current = authProfile;
  refreshProfileRef.current = refreshProfile;

  const fetchProfileData = useCallback(
    async (options?: { force?: boolean }) => {
      const uid = authProfileRef.current?.id ?? userId;
      if (!uid) return;

      if (inFlightRef.current && !options?.force) return;
      inFlightRef.current = true;

      const authProfile = authProfileRef.current;
      const refreshProfile = refreshProfileRef.current;

      try {
        // 1. Show profile from local storage first (already in AuthContext) for fast load
        if (authProfile) {
          dispatch(setProfileData(profileToProfileData(authProfile)));
        }

        // 2. Refresh from API in the background and update AuthContext + storage
        dispatch(setProfileLoading(true));

        const { data: result } = await client.get<ProfileApiResponse>(
          `/api/profile/${uid}`,
        );

        if (result?.success && result.data) {
          const data = result.data as unknown as Record<string, unknown>;
          dispatch(setProfileData(apiProfileToProfileData(data)));
          const profile = Profile.fromJson(data);
          await refreshProfile(profile);
        }
      } catch (err) {
        const status = isAxiosError(err) ? err.response?.status : null;
        const errorMessage =
          err instanceof Error ? err.message : "An error occurred";
        dispatch(setProfileError(errorMessage));
        if (status !== 403 && status !== 401) {
          console.error("Error fetching profile data:", err);
        }
      } finally {
        inFlightRef.current = false;
      }
    },
    [dispatch, userId],
  );

  useEffect(() => {
    if (userId) fetchProfileData();
  }, [userId, fetchProfileData]);

  const refetch = useCallback(() => {
    fetchProfileData({ force: true });
  }, [fetchProfileData]);

  return { refetch };
};
