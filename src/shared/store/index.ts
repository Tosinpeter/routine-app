import { configureStore } from "@reduxjs/toolkit";

import homeReducer from "./slices/home-slice";
import progressReducer from "./slices/progress-slice";
import profileReducer from "./slices/profile-slice";
import authReducer from "./slices/auth-slice";
import photoPrepReducer from "./slices/photo-prep-slice";
import usecaseReducer from "./slices/usercase-slice";
import paymentReducer from "./slices/payment-slice";
import orderReducer from "./slices/order-slice";
import notificationReducer from "./slices/notification-slice";
import onboardingReducer from "./slices/onboarding-slice";
import sessionReducer from "./slices/session-slice";
import appDataReducer from "./slices/app-data-slice";

export const store = configureStore({
  reducer: {
    appData: appDataReducer,
    home: homeReducer,
    progress: progressReducer,
    profile: profileReducer,
    auth: authReducer,
    session: sessionReducer,
    photoPrep: photoPrepReducer,
    usecase: usecaseReducer,
    payment: paymentReducer,
    order: orderReducer,
    notification: notificationReducer,
    onboarding: onboardingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
