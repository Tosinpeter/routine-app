import {
  loadOnboardingStatus,
  resetOnboarding,
  setOnboardingCompleted,
} from "@/shared/store/slices/onboarding-slice";
import { useAppDispatch, useAppSelector } from "@/shared/store/hooks";
import { useCallback, useEffect } from "react";

/**
 * Hook for onboarding completion state and actions (Redux).
 */
export function useOnboarding() {
  const dispatch = useAppDispatch();
  const hasCompleted = useAppSelector((state) => state.onboarding.hasCompleted);
  const isLoading = useAppSelector((state) => state.onboarding.isLoading);

  useEffect(() => {
    void dispatch(loadOnboardingStatus());
  }, [dispatch]);

  const setCompleted = useCallback(async (): Promise<void> => {
    await dispatch(setOnboardingCompleted()).unwrap();
  }, [dispatch]);

  const reset = useCallback(async (): Promise<void> => {
    await dispatch(resetOnboarding()).unwrap();
  }, [dispatch]);

  const refetch = useCallback(() => {
    void dispatch(loadOnboardingStatus());
  }, [dispatch]);

  return {
    hasCompleted,
    isLoading,
    setOnboardingCompleted: setCompleted,
    resetOnboarding: reset,
    refetch,
  };
}
