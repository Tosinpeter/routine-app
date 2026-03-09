import { useCallback } from "react";

import { t as i18nT } from "@/i18n";
import {
  changeLanguage as changeLanguageThunk,
  COOKIE_CONSENT_KEY,
  selectCurrentLanguage,
  selectIsRTL,
  selectAppDataIsLoading,
} from "@/shared/store/slices/app-data-slice";
import { useAppDispatch, useAppSelector } from "@/shared/store/hooks";

export interface AppDataContextType {
  currentLanguage: string;
  isLoading: boolean;
  isRTL: boolean;
  cookieConsentKey: string;
  changeLanguage: (locale: string) => Promise<void>;
  t: (key: string, options?: Record<string, unknown>) => string;
}

export function useAppData(): AppDataContextType {
  const dispatch = useAppDispatch();
  const currentLanguage = useAppSelector(selectCurrentLanguage);
  const isLoading = useAppSelector(selectAppDataIsLoading);
  const isRTL = useAppSelector(selectIsRTL);

  const changeLanguage = useCallback(
    async (locale: string) => {
      await dispatch(changeLanguageThunk(locale)).unwrap();
    },
    [dispatch]
  );

  const t = useCallback((key: string, options?: Record<string, unknown>) => {
    return i18nT(key, options);
  }, []);

  return {
    currentLanguage,
    isLoading,
    isRTL,
    cookieConsentKey: COOKIE_CONSENT_KEY,
    changeLanguage,
    t,
  };
}

export function useTranslation() {
  const { t, currentLanguage } = useAppData();
  return { t, currentLanguage };
}

