import { useEffect } from 'react';
import { useAppDispatch } from '@/store/hooks';
import {
  setHomeLoading,
  setHomeData,
  setHomeError,
} from '@/store/slices/home-slice';
import type { HomeData } from '@/store/slices/home-slice';

interface HomeApiResponse {
  success: boolean;
  data: HomeData;
}

/**
 * Hook to fetch home data from the API
 * This should be called once when the app opens
 */
export const useFetchHome = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    fetchHomeData();
  }, []);

  const fetchHomeData = async () => {
    try {
      dispatch(setHomeLoading(true));

      const response = await fetch('/api/home');

      if (!response.ok) {
        throw new Error('Failed to fetch home data');
      }

      const result: HomeApiResponse = await response.json();

      if (result.success) {
        dispatch(setHomeData(result.data));
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'An error occurred';
      dispatch(setHomeError(errorMessage));
      console.error('Error fetching home data:', err);
    }
  };

  return { refetch: fetchHomeData };
};
