import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Trend {
  value: string;
  direction: 'up' | 'down';
}

export interface SkinMetric {
  title: string;
  value: string;
  unit?: string;
  trend?: Trend;
}

export interface RoutineConsistency {
  currentStreak: number;
  longestStreak: number;
  completionRate: number;
  weeklyData: Array<{
    day: string;
    completed: boolean;
  }>;
}

export interface ProgressData {
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
  routineConsistency: RoutineConsistency;
}

interface ProgressState {
  data: ProgressData | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: ProgressState = {
  data: null,
  isLoading: false,
  error: null,
};

const progressSlice = createSlice({
  name: "progress",
  initialState,
  reducers: {
    setProgressLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setProgressData: (state, action: PayloadAction<ProgressData>) => {
      state.data = action.payload;
      state.error = null;
      state.isLoading = false;
    },
    setProgressError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    updateMetric: (
      state,
      action: PayloadAction<{ metric: keyof ProgressData['metrics']; data: SkinMetric }>
    ) => {
      if (state.data) {
        state.data.metrics[action.payload.metric] = action.payload.data;
        state.data.lastUpdated = new Date().toISOString();
      }
    },
    updateRoutineConsistency: (
      state,
      action: PayloadAction<RoutineConsistency>
    ) => {
      if (state.data) {
        state.data.routineConsistency = action.payload;
        state.data.lastUpdated = new Date().toISOString();
      }
    },
    clearProgressData: (state) => {
      state.data = null;
      state.error = null;
      state.isLoading = false;
    },
  },
});

export const {
  setProgressLoading,
  setProgressData,
  setProgressError,
  updateMetric,
  updateRoutineConsistency,
  clearProgressData,
} = progressSlice.actions;

export default progressSlice.reducer;
