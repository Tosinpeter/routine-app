import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const ONBOARDING_COMPLETED_KEY = "@onboarding_completed";

interface OnboardingState {
  hasCompleted: boolean;
  isLoading: boolean;
}

const initialState: OnboardingState = {
  hasCompleted: false,
  isLoading: true,
};

export const loadOnboardingStatus = createAsyncThunk<boolean>(
  "onboarding/loadStatus",
  async (_, { rejectWithValue }) => {
    try {
      const value = await AsyncStorage.getItem(ONBOARDING_COMPLETED_KEY);
      return value === "true";
    } catch (error) {
      console.error("Error checking onboarding status:", error);
      return rejectWithValue(undefined);
    }
  }
);

export const setOnboardingCompleted = createAsyncThunk<void>(
  "onboarding/setCompleted",
  async (_, { rejectWithValue }) => {
    try {
      await AsyncStorage.setItem(ONBOARDING_COMPLETED_KEY, "true");
    } catch (error) {
      console.error("Error setting onboarding status:", error);
      return rejectWithValue(undefined);
    }
  }
);

export const resetOnboarding = createAsyncThunk<void>(
  "onboarding/reset",
  async (_, { rejectWithValue }) => {
    try {
      await AsyncStorage.removeItem(ONBOARDING_COMPLETED_KEY);
    } catch (error) {
      console.error("Error resetting onboarding status:", error);
      return rejectWithValue(undefined);
    }
  }
);

const onboardingSlice = createSlice({
  name: "onboarding",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchOnboardingStatus
      .addCase(loadOnboardingStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loadOnboardingStatus.fulfilled, (state, action) => {
        state.hasCompleted = action.payload;
        state.isLoading = false;
      })
      .addCase(loadOnboardingStatus.rejected, (state) => {
        state.hasCompleted = false;
        state.isLoading = false;
      })
      // setOnboardingCompleted
      .addCase(setOnboardingCompleted.fulfilled, (state) => {
        state.hasCompleted = true;
      })
      // resetOnboarding
      .addCase(resetOnboarding.fulfilled, (state) => {
        state.hasCompleted = false;
      });
  },
});

export default onboardingSlice.reducer;
