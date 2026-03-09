import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TimeOfDay = "morning" | "evening";

export enum RoutineStatus {
  Pending = "pending",
  Approved = "approved",
  InProgress = "in_progress",
}

export interface ReviewStep {
  id: string;
  title: string;
  status: RoutineStatus;
}

export interface RoutineProduct {
  id: string;
  brand: string;
  name: string;
  period: string;
  isCompleted: boolean;
  needsLabTest?: boolean;
  progress: number; // 0 to 1
  image?: string;
  // Product details
  tags?: string[];
  description?: string;
  instructions?: string[];
  details?: { label: string; value: string }[];
  doctorNotes?: string;
  warnings?: string[];
}

export interface RoutineStep {
  id: string;
  stepNumber: number;
  category: string;
  product: RoutineProduct;
}

export interface TreatmentPlan {
  current: number;
  total: number;
  title: string;
  subtitle: string;
}

export interface HomeData {
  userId: string;
  userName: string;
  isUnlocked: boolean;
  treatmentPlan: TreatmentPlan;
  hasNotifications: boolean;
  lastUpdated: string;
  /** Progress steps (face scan, lab test, doctor review) from backend */
  reviewSteps?: ReviewStep[];
}

interface HomeState {
  selectedDay: number;
  userName: string;
  timeOfDay: TimeOfDay;
  routineSteps: RoutineStep[];
  reviewSteps: ReviewStep[];
  // Home page data
  homeData: HomeData | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: HomeState = {
  selectedDay: 1,
  userName: "",
  timeOfDay: "morning",
  routineSteps: [],
  reviewSteps: [],
  homeData: null,
  isLoading: false,
  error: null,
};

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    setSelectedDay: (state, action: PayloadAction<number>) => {
      state.selectedDay = action.payload;
    },
    setUserName: (state, action: PayloadAction<string>) => {
      state.userName = action.payload;
    },
    setTimeOfDay: (state, action: PayloadAction<TimeOfDay>) => {
      state.timeOfDay = action.payload;
    },
    setRoutineSteps: (state, action: PayloadAction<RoutineStep[]>) => {
      state.routineSteps = action.payload;
    },
    setReviewSteps: (state, action: PayloadAction<ReviewStep[]>) => {
      state.reviewSteps = action.payload;
    },
    toggleProductCompletion: (state, action: PayloadAction<string>) => {
      const step = state.routineSteps.find((s) => s.id === action.payload);
      if (step) {
        step.product.isCompleted = !step.product.isCompleted;
      }
    },
    // Home data management
    setHomeLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setHomeData: (state, action: PayloadAction<HomeData>) => {
      state.homeData = action.payload;
      state.userName = action.payload.userName;
      state.reviewSteps = action.payload.reviewSteps ?? [];
      state.error = null;
      state.isLoading = false;
    },
    setHomeError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    updateTreatmentPlan: (state, action: PayloadAction<TreatmentPlan>) => {
      if (state.homeData) {
        state.homeData.treatmentPlan = action.payload;
        state.homeData.lastUpdated = new Date().toISOString();
      }
    },
    clearHomeData: (state) => {
      state.homeData = null;
      state.error = null;
      state.isLoading = false;
    },
    updateReviewStepStatus: (
      state,
      action: PayloadAction<{ stepId: string; status: RoutineStatus }>
    ) => {
      const step = state.reviewSteps.find((s) => s.id === action.payload.stepId);
      if (step) {
        step.status = action.payload.status;
      }
    },
  },
});

export const {
  setSelectedDay,
  setUserName,
  setTimeOfDay,
  setRoutineSteps,
  setReviewSteps,
  toggleProductCompletion,
  setHomeLoading,
  setHomeData,
  setHomeError,
  updateTreatmentPlan,
  clearHomeData,
  updateReviewStepStatus,
} = homeSlice.actions;
export default homeSlice.reducer;
