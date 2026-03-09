import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as Updates from "expo-updates";
import { DevSettings, I18nManager } from "react-native";

import i18n from "@/i18n";

const LANGUAGE_STORAGE_KEY = "@routine_app:language";

export const COOKIE_CONSENT_KEY = "@cookie_consent_accepted";

interface AppDataState {
  currentLanguage: string;
  isLoading: boolean;
  isRTL: boolean;
  layoutKey: string;
}

const getInitialLayoutKey = () => (I18nManager.isRTL ? "rtl" : "ltr");

const initialState: AppDataState = {
  currentLanguage: i18n.locale,
  isLoading: true,
  isRTL: i18n.locale === "ar",
  layoutKey: getInitialLayoutKey(),
};

export const loadLanguage = createAsyncThunk(
  "appData/loadLanguage",
  async (_, { rejectWithValue }) => {
    try {
      const savedLanguage = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
      if (savedLanguage) {
        const isRTL = savedLanguage === "ar";
        if (I18nManager.isRTL !== isRTL) {
          I18nManager.allowRTL(isRTL);
          I18nManager.forceRTL(isRTL);
        }
        i18n.locale = savedLanguage;
        return { language: savedLanguage, layoutKey: isRTL ? "rtl" : "ltr" };
      }
      return { language: i18n.locale, layoutKey: getInitialLayoutKey() };
    } catch (err) {
      console.warn("AsyncStorage not available, using default language:", err);
      return rejectWithValue(undefined);
    }
  }
);

export const changeLanguage = createAsyncThunk(
  "appData/changeLanguage",
  async (locale: string) => {
    const isRTL = locale === "ar";
    const rtlChanged = I18nManager.isRTL !== isRTL;

    if (rtlChanged) {
      I18nManager.allowRTL(isRTL);
      I18nManager.forceRTL(isRTL);
    }

    i18n.locale = locale;
    try {
      await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, locale);
    } catch (err) {
      console.warn("Failed to save language, but locale updated:", err);
    }

    if (rtlChanged) {
      if (__DEV__) {
        DevSettings.reload();
      } else {
        await Updates.reloadAsync();
      }
    }

    return {
      language: locale,
      layoutKey: isRTL ? "rtl" : "ltr",
    };
  }
);

const appDataSlice = createSlice({
  name: "appData",
  initialState,
  reducers: {
    setLayoutKey: (state, action: PayloadAction<string>) => {
      state.layoutKey = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadLanguage.fulfilled, (state, action) => {
        state.currentLanguage = action.payload.language;
        state.isRTL = action.payload.language === "ar";
        state.layoutKey = action.payload.layoutKey;
        state.isLoading = false;
      })
      .addCase(loadLanguage.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(changeLanguage.fulfilled, (state, action) => {
        state.currentLanguage = action.payload.language;
        state.isRTL = action.payload.language === "ar";
        state.layoutKey = action.payload.layoutKey;
      });
  },
});

export const { setLayoutKey } = appDataSlice.actions;
export default appDataSlice.reducer;

export const selectCurrentLanguage = (state: { appData: AppDataState }) =>
  state.appData.currentLanguage;
export const selectIsRTL = (state: { appData: AppDataState }) => state.appData.isRTL;
export const selectLayoutKey = (state: { appData: AppDataState }) => state.appData.layoutKey;
export const selectAppDataIsLoading = (state: { appData: AppDataState }) =>
  state.appData.isLoading;
