import { configureStore } from "@reduxjs/toolkit";

import homeReducer from "./slices/home-slice";
import progressReducer from "./slices/progress-slice";
import profileReducer from "./slices/profile-slice";
import authReducer from "./slices/auth-slice";

export const store = configureStore({
  reducer: {
    home: homeReducer,
    progress: progressReducer,
    profile: profileReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
