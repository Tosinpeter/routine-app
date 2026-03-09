import { useAuth } from "@/shared/store/hooks/use-auth";
import { client } from "@/shared/api/client";
import { useAppDispatch } from "@/shared/store/hooks";
import type { ProgressData } from "@/shared/store/slices/progress-slice";
import {
  setProgressData,
  setProgressError,
  setProgressLoading,
} from "@/shared/store/slices/progress-slice";
import { useCallback, useEffect } from "react";

interface ProgressApiResponse {
  success: boolean;
  data: ProgressData;
}

/**
 * Hook to fetch progress data from the Hono backend.
 */
export const useFetchProgress = () => {
  const dispatch = useAppDispatch();
  const { profile } = useAuth();
  const userId = profile?.id;

  const fetchProgressData = useCallback(async () => {
    if (!userId) return;

    try {
      dispatch(setProgressLoading(true));

      const { data: result } = await client.get<ProgressApiResponse>(
        `/api/progress/${userId}`,
      );

      if (result?.success && result.data) {
        dispatch(setProgressData(result.data));
      } else {
        dispatch(setProgressError("Failed to fetch progress data"));
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An error occurred";
      dispatch(setProgressError(errorMessage));
      console.error("Error fetching progress:", err);
    }
  }, [dispatch, userId]);

  useEffect(() => {
    fetchProgressData();
  }, [fetchProgressData]);

  return { refetch: fetchProgressData };
};
