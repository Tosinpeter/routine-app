import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TimeOfDay = "morning" | "evening";

export enum RoutineStatus {
  Approved = "Approved",
  Pending = "Pending",
  Rejected = "Rejected",
}

export interface ReviewStep {
  id: string;
  title: string;
  status: RoutineStatus;
  order: number;
}

export interface RoutineProduct {
  id: string;
  brand: string;
  name: string;
  period: string;
  isCompleted: boolean;
  needsLabTest?: boolean;
  progress: number; // 0 to 1
  image: string;
}

export interface RoutineStep {
  id: string;
  stepNumber: number;
  category: string;
  product: RoutineProduct;
}

export interface HomeState {
  selectedDay: number;
  userName: string;
  timeOfDay: TimeOfDay;
  routineSteps: RoutineStep[];
  reviewSteps: ReviewStep[];
}

const initialReviewSteps: ReviewStep[] = [
  {
    id: "r1",
    title: "Face Scan",
    status: RoutineStatus.Approved,
    order: 1,
  },
  {
    id: "r2",
    title: "Clinic Test",
    status: RoutineStatus.Pending,
    order: 2,
  },
  {
    id: "r3",
    title: "Doctor Review",
    status: RoutineStatus.Pending,
    order: 3,
  },
];

const initialRoutineSteps: RoutineStep[] = [
  {
    id: "1",
    stepNumber: 1,
    category: "Cleanser",
    product: {
      id: "p1",
      brand: "Humphrey",
      name: "Milk Cleanser",
      period: "3month",
      isCompleted: true,
      progress: 0.5,
      image: "img_product-image",
    },
  },
  {
    id: "2",
    stepNumber: 2,
    category: "Toner",
    product: {
      id: "p2",
      brand: "GlowRecipe",
      name: "Toner",
      period: "3month",
      isCompleted: false,
      progress: 0.3,
      image: "img_product-image",
    },
  },
  {
    id: "3",
    stepNumber: 3,
    category: "Moisturizer",
    product: {
      id: "p3",
      brand: "SundayRiley",
      name: "Moisturizer",
      period: "3month",
      isCompleted: false,
      progress: 0.8,
      image: "img_product-image",
    },
  },
];

const initialState: HomeState = {
  selectedDay: 1,
  userName: "Sarah Islam", // Updated to match screenshot
  timeOfDay: "morning",
  routineSteps: initialRoutineSteps,
  reviewSteps: initialReviewSteps,
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
    toggleProductCompletion: (state, action: PayloadAction<string>) => {
      const step = state.routineSteps.find((s) => s.id === action.payload);
      if (step) {
        step.product.isCompleted = !step.product.isCompleted;
      }
    },
  },
});

export const {
  setSelectedDay,
  setUserName,
  setTimeOfDay,
  toggleProductCompletion,
} = homeSlice.actions;
export default homeSlice.reducer;
