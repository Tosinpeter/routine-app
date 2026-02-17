import { useState, useEffect, useCallback } from 'react';
import api from '@/utils/api-client';

/**
 * Type definitions
 */
interface Trend {
  value: string;
  direction: 'up' | 'down';
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
      const response = await api.progress.get(userId);
      
      if (response.success) {
        setData(response.data);
      } else {
        setError('Failed to fetch progress data');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching progress:', err);
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
      const response = await api.progress.getUnlockStatus(userId);
      
      if (response.success) {
        setUnlockStatus(response.data);
      } else {
        setError('Failed to fetch unlock status');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching unlock status:', err);
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
  period: '7d' | '30d' | '90d' | '1y' = '30d',
  userId?: string
) {
  const [history, setHistory] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHistory = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.progress.getHistory({
        metric,
        period,
        userId,
      });
      
      if (response.success) {
        setHistory(response.data);
      } else {
        setError('Failed to fetch history data');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching history:', err);
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
