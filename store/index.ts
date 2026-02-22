import { configureStore } from "@reduxjs/toolkit";

import homeReducer from "./slices/home-slice";
import progressReducer from "./slices/progress-slice";
import profileReducer from "./slices/profile-slice";
import authReducer from "./slices/auth-slice";
import photoPrepReducer from "./slices/photo-prep-slice";
import usecaseReducer from "./slices/usercase-slice";
import paymentReducer from "./slices/payment-slice";

export const store = configureStore({
  reducer: {
    home: homeReducer,
    progress: progressReducer,
    profile: profileReducer,
    auth: authReducer,
    photoPrep: photoPrepReducer,
    usecase: usecaseReducer,
    payment: paymentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
