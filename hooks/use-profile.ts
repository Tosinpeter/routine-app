import { client } from "@/api/client";
import { useAuth } from "@/contexts/AuthContext";
import type { RootState } from "@/store";
import type { ProfileData } from "@/store/slices/profile-slice";
import {
  setProfileData,
  setProfileError,
  setProfileLoading,
  setProfileUpdating,
  updateProfileField,
} from "@/store/slices/profile-slice";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

interface UpdateProfileParams {
  fullname?: string;
  targetGoal?: string;
  gender?: "male" | "female" | "non_binary" | "other";
  age?: string;
  skinType?: string;
  skinSensitivity?: boolean;
  skinConcerns?: string[];
  skinConditions?: string;
  healthConditions?: string;
  focusFaceArea?: string[];
  faceScanImageUrl?: string;
}

interface ProfileApiResponse {
  success: boolean;
  message?: string;
  data?: ProfileData;
  error?: string;
}

interface UseProfileReturn {
  profile: ProfileData | null;
  isLoading: boolean;
  isUpdating: boolean;
  error: string | null;
  fetchProfile: (userId?: string) => Promise<void>;
  updateProfile: (updates: UpdateProfileParams) => Promise<boolean>;
  refreshProfile: () => Promise<void>;
}

function mapBackendProfile(raw: Record<string, unknown>): ProfileData {
  return {
    id: String(raw.id ?? ""),
    fullname: String(raw.fullname ?? ""),
    targetGoal: String(raw.targetGoal ?? raw.target_goal ?? ""),
    gender: (raw.gender as ProfileData["gender"]) ?? "other",
    age: String(raw.age ?? ""),
    skinType: String(raw.skinType ?? raw.skin_type ?? ""),
    skinSensitivity: Boolean(raw.skinSensitivity ?? raw.skin_sensitivity),
    skinConcerns: (raw.skinConcerns ?? raw.skin_concerns ?? []) as string[],
    skinConditions: String(raw.skinConditions ?? raw.skin_conditions ?? ""),
    healthConditions: String(raw.healthConditions ?? raw.health_conditions ?? ""),
    focusFaceArea: (raw.focusFaceArea ?? raw.focus_face_area ?? []) as string[],
    faceScanImageUrl: raw.faceScanImageUrl as string | undefined ?? raw.face_scan_image_url as string | undefined,
    lastUpdated: String(raw.lastUpdated ?? raw.last_updated ?? new Date().toISOString()),
  };
}

export const useProfile = (): UseProfileReturn => {
  const dispatch = useDispatch();
  const { profile: authProfile } = useAuth();
  const userId = authProfile?.id;
  const { profileData, isLoading, isUpdating, error } = useSelector(
    (state: RootState) => state.profile,
  );

  /**
   * Fetch user profile data
   */
  const fetchProfile = useCallback(
    async (userIdParam?: string): Promise<void> => {
      dispatch(setProfileLoading(true));

      try {
        const id = userIdParam || userId;
        if (!id) {
          throw new Error("No user ID available to fetch profile");
        }

        const { data: result } = await client.get<ProfileApiResponse>(
          `/api/profile/${id}`,
        );

        if (!result.success) {
          throw new Error(result.error || "Failed to fetch profile");
        }

        if (result.data) {
          dispatch(setProfileData(mapBackendProfile(result.data as Record<string, unknown>)));
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "An unknown error occurred";
        console.error("Error fetching profile:", errorMessage);
        dispatch(setProfileError(errorMessage));
      }
    },
    [dispatch, userId],
  );

  /**
   * Update user profile data
   */
  const updateProfile = useCallback(
    async (updates: UpdateProfileParams): Promise<boolean> => {
      dispatch(setProfileUpdating(true));

      try {
        if (!userId) {
          throw new Error("No user ID available to update profile");
        }

        const { data: result } = await client.patch<ProfileApiResponse>(
          `/api/profile/${userId}`,
          updates,
        );

        if (!result.success) {
          throw new Error(result.error || "Failed to update profile");
        }

        if (result.data) {
          dispatch(setProfileData(mapBackendProfile(result.data as Record<string, unknown>)));
        } else {
          dispatch(updateProfileField(updates));
        }

        return true;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "An unknown error occurred";
        console.error("Error updating profile:", errorMessage);
        dispatch(setProfileError(errorMessage));
        return false;
      }
    },
    [dispatch, userId],
  );

  /**
   * Refresh profile data
   */
  const refreshProfile = useCallback(async (): Promise<void> => {
    await fetchProfile();
  }, [fetchProfile]);

  return {
    profile: profileData,
    isLoading,
    isUpdating,
    error,
    fetchProfile,
    updateProfile,
    refreshProfile,
  };
};
