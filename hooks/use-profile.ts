import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '@/store';
import type { ProfileData } from '@/app/api/profile+api';
import {
  setProfileLoading,
  setProfileData,
  setProfileError,
  setProfileUpdating,
  updateProfileField,
} from '@/store/slices/profile-slice';

interface UpdateProfileParams {
  name?: string;
  targetGoal?: string;
  gender?: 'Male' | 'Female' | 'Other';
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

/**
 * Custom hook for managing profile operations
 * Provides methods to fetch and update user profile data
 */
export const useProfile = (): UseProfileReturn => {
  const dispatch = useDispatch();
  const { profileData, isLoading, isUpdating, error } = useSelector(
    (state: RootState) => state.profile
  );

  /**
   * Fetch user profile data
   */
  const fetchProfile = useCallback(
    async (userId?: string): Promise<void> => {
      dispatch(setProfileLoading(true));

      try {
        const queryParams = new URLSearchParams();
        if (userId) {
          queryParams.append('userId', userId);
        }

        const url = `/api/profile${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const result: ProfileApiResponse = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(result.error || 'Failed to fetch profile');
        }

        if (result.data) {
          dispatch(setProfileData(result.data));
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'An unknown error occurred';
        console.error('Error fetching profile:', errorMessage);
        dispatch(setProfileError(errorMessage));
      }
    },
    [dispatch]
  );

  /**
   * Update user profile data
   */
  const updateProfile = useCallback(
    async (updates: UpdateProfileParams): Promise<boolean> => {
      dispatch(setProfileUpdating(true));

      try {
        const response = await fetch('/api/profile', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: profileData?.id,
            ...updates,
          }),
        });

        const result: ProfileApiResponse = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(result.error || 'Failed to update profile');
        }

        if (result.data) {
          dispatch(setProfileData(result.data));
        } else {
          // If server doesn't return full data, update locally
          dispatch(updateProfileField(updates));
        }

        return true;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'An unknown error occurred';
        console.error('Error updating profile:', errorMessage);
        dispatch(setProfileError(errorMessage));
        return false;
      }
    },
    [dispatch, profileData?.id]
  );

  /**
   * Refresh profile data
   */
  const refreshProfile = useCallback(async (): Promise<void> => {
    if (profileData?.id) {
      await fetchProfile(profileData.id);
    } else {
      await fetchProfile();
    }
  }, [fetchProfile, profileData?.id]);

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
