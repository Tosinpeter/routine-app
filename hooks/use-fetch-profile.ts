import { useEffect } from 'react';
import { useAppDispatch } from '@/store/hooks';
import {
  setProfileLoading,
  setProfileData,
  setProfileError,
} from '@/store/slices/profile-slice';
import type { ProfileData } from '@/store/slices/profile-slice';

interface ProfileApiResponse {
  success: boolean;
  data: ProfileData;
}

/**
 * Hook to fetch profile data from the API
 * This should be called once when the app opens
 */
export const useFetchProfile = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    fetchProfileData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchProfileData = async () => {
    try {
      dispatch(setProfileLoading(true));

      const response = await fetch('/api/profile');

      if (!response.ok) {
        throw new Error('Failed to fetch profile data');
      }

      const result: ProfileApiResponse = await response.json();

      if (result.success) {
        dispatch(setProfileData(result.data));
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'An error occurred';
      dispatch(setProfileError(errorMessage));
      console.error('Error fetching profile data:', err);
    }
  };

  return { refetch: fetchProfileData };
};
