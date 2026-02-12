import { useEffect } from 'react';
import { useAppDispatch } from '@/store/hooks';
import {
  setProgressLoading,
  setProgressData,
  setProgressError,
} from '@/store/slices/progress-slice';
import type { ProgressData } from '@/store/slices/progress-slice';

interface ProgressApiResponse {
  success: boolean;
  data: ProgressData;
}

/**
 * Hook to fetch progress data from the API
 * This should be called once when the app opens
 */
export const useFetchProgress = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    fetchProgressData();
  }, []);

  const fetchProgressData = async () => {
    try {
      dispatch(setProgressLoading(true));

      const response = await fetch('/api/progress');

      if (!response.ok) {
        throw new Error('Failed to fetch progress data');
      }

      const result: ProgressApiResponse = await response.json();

      if (result.success) {
        dispatch(setProgressData(result.data));
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'An error occurred';
      dispatch(setProgressError(errorMessage));
      console.error('Error fetching progress:', err);
    }
  };

  return { refetch: fetchProgressData };
};
