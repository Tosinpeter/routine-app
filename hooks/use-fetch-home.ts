import { useAuth } from "@/shared/store/hooks/use-auth";
import { client } from "@/shared/api/client";
import { useAppDispatch } from "@/shared/store/hooks";
import type { HomeData } from "@/shared/store/slices/home-slice";
import {
  setHomeData,
  setHomeError,
  setHomeLoading,
} from "@/shared/store/slices/home-slice";
import { useCallback, useEffect } from "react";

interface HomeApiResponse {
  success: boolean;
  data: HomeData;
}

const defaultTreatmentPlan = {
  current: 1,
  total: 4,
  title: "Your Skin Routine",
  subtitle: "Treatment Plan",
};

/**
 * Hook to fetch home data: hydrates from local storage (AuthContext profile) first,
 * then refreshes from the Hono backend.
 */
export const useFetchHome = () => {
  const dispatch = useAppDispatch();
  const { profile } = useAuth();
  const userId = profile?.id;

  const fetchHomeData = useCallback(async () => {
    if (!userId) return;

    // 1. Show home data from local storage first (profile already loaded from AsyncStorage)
    const initialHomeData: HomeData = {
      userId,
      userName: profile?.fullname ?? "",
      isUnlocked: false,
      treatmentPlan: defaultTreatmentPlan,
      hasNotifications: false,
      lastUpdated: new Date().toISOString(),
      reviewSteps: [],
    };
    dispatch(setHomeData(initialHomeData));

    // 2. Refresh from API in the background
    try {
      dispatch(setHomeLoading(true));

      const { data: result } = await client.get<HomeApiResponse>(
        `/api/home/${userId}`,
      );

      if (result?.success && result.data) {
        dispatch(setHomeData(result.data));
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An error occurred";
      dispatch(setHomeError(errorMessage));
      console.error("Error fetching home data:", err);
    }
  }, [dispatch, userId, profile?.fullname]);

  useEffect(() => {
    fetchHomeData();
  }, [fetchHomeData]);

  return { refetch: fetchHomeData };
};
