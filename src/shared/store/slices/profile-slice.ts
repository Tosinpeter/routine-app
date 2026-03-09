import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ProfileData {
  id: string;
  fullname: string;
  targetGoal: string;
  gender: "male" | "female" | "non_binary" | "other";
  age: string;
  skinType: string;
  skinSensitivity: boolean;
  skinConcerns: string[];
  skinConditions: string;
  healthConditions: string;
  focusFaceArea: string[];
  faceScanImageUrl?: string;
  lastUpdated: string;
}

interface ProfileState {
  profileData: ProfileData | null;
  isLoading: boolean;
  error: string | null;
  isUpdating: boolean;
}

const initialState: ProfileState = {
  profileData: null,
  isLoading: false,
  error: null,
  isUpdating: false,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfileLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setProfileData: (state, action: PayloadAction<ProfileData>) => {
      state.profileData = action.payload;
      state.error = null;
      state.isLoading = false;
      state.isUpdating = false;
    },
    setProfileError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
      state.isUpdating = false;
    },
    setProfileUpdating: (state, action: PayloadAction<boolean>) => {
      state.isUpdating = action.payload;
    },
    updateProfileField: (
      state,
      action: PayloadAction<Partial<ProfileData>>
    ) => {
      if (state.profileData) {
        state.profileData = {
          ...state.profileData,
          ...action.payload,
          lastUpdated: new Date().toISOString(),
        };
      }
      state.isUpdating = false;
    },
    clearProfileData: (state) => {
      state.profileData = null;
      state.error = null;
      state.isLoading = false;
      state.isUpdating = false;
    },
  },
});

export const {
  setProfileLoading,
  setProfileData,
  setProfileError,
  setProfileUpdating,
  updateProfileField,
  clearProfileData,
} = profileSlice.actions;

export default profileSlice.reducer;
