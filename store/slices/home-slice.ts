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

const initialRoutineSteps: RoutineStep[] = [
  {
    id: "1",
    stepNumber: 0,
    category: "Cleansing",
    product: {
      id: "p1",
      brand: "Banila Co.",
      name: "Clean It Zero Purifying Foam Cleanser",
      period: "3month",
      isCompleted: true,
      progress: 0.75,
      image: "img_product-image",
      tags: ["Cleanser", "Foaming"],
      description:
        "A gentle foaming cleanser that effectively removes makeup, dirt, and impurities without stripping the skin's natural moisture barrier. Perfect for daily use.",
      instructions: [
        "Wet your face with lukewarm water",
        "Apply a small amount to your palms and create a lather",
        "Gently massage onto face in circular motions",
        "Rinse thoroughly and pat dry",
      ],
      details: [
        { label: "Size", value: "150ml" },
        { label: "Key Ingredients", value: "Papaya Extract, Acerola Extract" },
        { label: "Skin Type", value: "All Skin Types" },
      ],
      doctorNotes: "Gentle enough for sensitive skin. Maintains optimal pH balance.",
      warnings: ["Avoid contact with eyes", "For external use only"],
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
      tags: ["Toner", "Exfoliant"],
      description:
        "A lightweight, pore-minimizing toner with gentle chemical exfoliants (PHA + BHA) that helps refine texture and reduce the appearance of pores.",
      instructions: [
        "Apply to clean, dry skin",
        "Use a cotton pad or pat directly onto face",
        "Follow with serum and moisturizer",
        "Use morning and evening",
      ],
      details: [
        { label: "Size", value: "120ml" },
        { label: "Key Ingredients", value: "Watermelon, PHA, BHA" },
        { label: "Skin Type", value: "Oily, Combination" },
      ],
      doctorNotes:
        "Great for oil control and pore refinement. Use sunscreen during the day.",
      warnings: ["May cause tingling sensation", "Discontinue if irritation occurs"],
    },
  },
  {
    id: "3",
    stepNumber: 3,
    category: "Serum",
    product: {
      id: "p3",
      brand: "Dermatologica",
      name: "Rapid Reveal Peel",
      period: "3month",
      isCompleted: false,
      progress: 0.25,
      image: "img_product-image",
      tags: ["Exfoliant", "Normal"],
      description:
        "A professional-grade chemical peel that gently exfoliates and reveals smoother, brighter skin. Formulated with a blend of AHA and BHA acids to improve skin texture and tone.",
      instructions: [
        "Cleanse your face thoroughly",
        "Apply a thin layer avoiding eye area",
        "Leave on for 5-7 minutes",
        "Rinse thoroughly with lukewarm water",
      ],
      details: [
        { label: "Size", value: "50ml" },
        { label: "Key Ingredients", value: "AHA, BHA, Salicylic Acid" },
        { label: "Skin Type", value: "Normal, Oily" },
      ],
      doctorNotes: "Excellent choice for maintaining skin barrier function.",
      warnings: ["Avoid contact with eyes", "For external use only"],
    },
  },
  {
    id: "4",
    stepNumber: 4,
    category: "Sunscreen",
    product: {
      id: "p4",
      brand: "La Roche-Posay",
      name: "Anthelios UV Mune 400 Sunscreen SPF50+",
      period: "3month",
      isCompleted: false,
      needsLabTest: true,
      progress: 0,
      image: "img_product-image",
      tags: ["SPF 50+", "UV Protection"],
      description:
        "Ultra-high protection sunscreen that shields skin from UVA and UVB rays. Lightweight, non-greasy formula suitable for daily use.",
      instructions: [
        "Apply as the last step of your morning routine",
        "Use 1-2 finger lengths for face and neck",
        "Reapply every 2 hours when in sun",
        "Apply 15 minutes before sun exposure",
      ],
      details: [
        { label: "Size", value: "50ml" },
        { label: "Key Ingredients", value: "Mexoryl 400, Titanium Dioxide" },
        { label: "Skin Type", value: "All Skin Types" },
      ],
      doctorNotes:
        "Essential for preventing sun damage and premature aging. Use daily.",
      warnings: [
        "Avoid contact with eyes",
        "Keep out of reach of children",
        "Discontinue if rash occurs",
      ],
    },
  },
];

const initialReviewSteps: ReviewStep[] = [
  {
    id: "1",
    title: "Face Scan",
    status: RoutineStatus.Approved,
  },
  {
    id: "2",
    title: "Clinic Test",
    status: RoutineStatus.Pending,
  },
  {
    id: "3",
    title: "Doctor Review",
    status: RoutineStatus.Pending,
  },
];

const initialState: HomeState = {
  selectedDay: 1,
  userName: "Aslam Uddin",
  timeOfDay: "morning",
  routineSteps: initialRoutineSteps,
  reviewSteps: initialReviewSteps,
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
  toggleProductCompletion,
  setHomeLoading,
  setHomeData,
  setHomeError,
  updateTreatmentPlan,
  clearHomeData,
  updateReviewStepStatus,
} = homeSlice.actions;
export default homeSlice.reducer;
