import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  phoneNumber: string;
  countryCode: string;
  countryFlag: string;
  showCountryPicker: boolean;
  isLoading: boolean;
  otp: string;
  otpResendTimer: number;
}

const initialState: AuthState = {
  phoneNumber: "",
  countryCode: "+1",
  countryFlag: "🇺🇸",
  showCountryPicker: false,
  isLoading: false,
  otp: "",
  otpResendTimer: 30,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setPhoneNumber: (state, action: PayloadAction<string>) => {
      state.phoneNumber = action.payload;
    },
    setCountry: (
      state,
      action: PayloadAction<{ code: string; flag: string }>
    ) => {
      state.countryCode = action.payload.code;
      state.countryFlag = action.payload.flag;
    },
    setShowCountryPicker: (state, action: PayloadAction<boolean>) => {
      state.showCountryPicker = action.payload;
    },
    setAuthLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setOtp: (state, action: PayloadAction<string>) => {
      state.otp = action.payload;
    },
    setOtpResendTimer: (state, action: PayloadAction<number>) => {
      state.otpResendTimer = action.payload;
    },
    decrementOtpResendTimer: (state) => {
      state.otpResendTimer = Math.max(0, state.otpResendTimer - 1);
    },
    startOtpResendTimer: (state) => {
      state.otpResendTimer = 15;
    },
    resetOtpState: (state) => {
      state.otp = "";
      state.otpResendTimer = 30;
    },
    resetAuthState: () => initialState,
  },
});

export const {
  setPhoneNumber,
  setCountry,
  setShowCountryPicker,
  setAuthLoading,
  setOtp,
  setOtpResendTimer,
  decrementOtpResendTimer,
  startOtpResendTimer,
  resetOtpState,
  resetAuthState,
} = authSlice.actions;

export default authSlice.reducer;

