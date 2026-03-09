import { client } from "@/shared/api/client";
import { useCallback, useEffect, useState } from "react";

/**
 * Type definitions
 */
interface Trend {
  value: string;
  direction: "up" | "down";
}

interface SkinMetric {
  title: string;
  value: string;
  unit?: string;
  trend?: Trend;
}

interface ProgressData {
  userId: string;
  isUnlocked: boolean;
  daysUntilUnlock: number;
  lastUpdated: string;
  metrics: {
    skinScore: SkinMetric;
    skinAge: SkinMetric;
    hydration: SkinMetric;
    acne: SkinMetric;
    texture: SkinMetric;
    wrinkles: SkinMetric;
    darkSpots: SkinMetric;
    poreSize: SkinMetric;
  };
  routineConsistency: {
    currentStreak: number;
    longestStreak: number;
    completionRate: number;
    weeklyData: {
      day: string;
      completed: boolean;
    }[];
  };
}

/**
 * Custom hook to fetch and manage progress data
 */
export function useProgress(userId?: string) {
  const [data, setData] = useState<ProgressData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProgress = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      if (!userId) {
        setLoading(false);
        return;
      }
      const { data: response } = await client.get<{
        success: boolean;
        data: ProgressData;
      }>(`/api/progress/${userId}`);
      if (response?.success && response.data) {
        setData(response.data);
      } else {
        setError("Failed to fetch progress data");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      console.error("Error fetching progress:", err);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchProgress();
  }, [fetchProgress]);

  const refresh = () => {
    fetchProgress();
  };

  return {
    data,
    loading,
    error,
    refresh,
  };
}

/**
 * Custom hook to fetch unlock status
 */
export function useUnlockStatus(userId?: string) {
  const [unlockStatus, setUnlockStatus] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUnlockStatus = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      if (!userId) {
        setLoading(false);
        return;
      }
      const { data: response } = await client.get<{
        success: boolean;
        data: unknown;
      }>(`/api/progress/${userId}/unlock-status`);
      if (response?.success && response.data != null) {
        setUnlockStatus(response.data);
      } else {
        setError("Failed to fetch unlock status");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      console.error("Error fetching unlock status:", err);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchUnlockStatus();
  }, [fetchUnlockStatus]);

  return {
    unlockStatus,
    loading,
    error,
    refresh: fetchUnlockStatus,
  };
}

/**
 * Custom hook to fetch progress history
 */
export function useProgressHistory(
  metric: string,
  period: "7d" | "30d" | "90d" | "1y" = "30d",
  userId?: string,
) {
  const [history, setHistory] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHistory = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const params = new URLSearchParams({ metric, period });
      if (userId) params.set("userId", userId);
      const { data: response } = await client.get<{
        success: boolean;
        data: unknown;
      }>(`/api/progress/history?${params.toString()}`);
      if (response?.success && response.data != null) {
        setHistory(response.data);
      } else {
        setError("Failed to fetch history data");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      console.error("Error fetching history:", err);
    } finally {
      setLoading(false);
    }
  }, [metric, period, userId]);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  return {
    history,
    loading,
    error,
    refresh: fetchHistory,
  };
}
