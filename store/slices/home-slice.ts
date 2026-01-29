import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TimeOfDay = "morning" | "evening";

export interface RoutineProduct {
  id: string;
  brand: string;
  name: string;
  period: string;
  isCompleted: boolean;
  needsLabTest?: boolean;
  progress: number; // 0 to 1
  image?: string;
}

export interface RoutineStep {
  id: string;
  stepNumber: number;
  category: string;
  product: RoutineProduct;
}

interface HomeState {
  selectedDay: number;
  userName: string;
  timeOfDay: TimeOfDay;
  routineSteps: RoutineStep[];
}

const initialRoutineSteps: RoutineStep[] = [
  {
    id: "1",
    stepNumber: 1,
    category: "Cleansing",
    product: {
      id: "p1",
      brand: "Banila Co.",
      name: "Clean It Zero Purifying Foam Cleanser",
      period: "3month",
      isCompleted: true,
      progress: 0.75,
      image: "img_product-image",
    },
  },
  {
    id: "2",
    stepNumber: 2,
    category: "Cream",
    product: {
      id: "p2",
      brand: "Glow Recipe",
      name: "Watermelon Glow PHA+BHA Pore-Tight",
      period: "3month",
      isCompleted: false,
      progress: 0.5,
      image: "img_product-image",
    },
  },
  {
    id: "3",
    stepNumber: 3,
    category: "Serum",
    product: {
      id: "p3",
      brand: "Banila Co.",
      name: "Clean It Zero Purifying Foam Cleanser",
      period: "3month",
      isCompleted: false,
      progress: 0.25,
      image: "img_product-image",
    },
  },
  {
    id: "4",
    stepNumber: 4,
    category: "Sunscreen",
    product: {
      id: "p4",
      brand: "Banila Co.",
      name: "Clean It Zero Purifying Foam Cleanser",
      period: "3month",
      isCompleted: false,
      needsLabTest: true,
      progress: 0,
      image: "img_product-image",
    },
  },
];

const initialState: HomeState = {
  selectedDay: 1,
  userName: "Aslam Uddin",
  timeOfDay: "morning",
  routineSteps: initialRoutineSteps,
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
