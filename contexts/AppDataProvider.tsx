import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import i18n from "@/i18n";

const LANGUAGE_STORAGE_KEY = "@routine_app:language";

interface AppDataContextType {
  currentLanguage: string;
  isLoading: boolean;
  changeLanguage: (locale: string) => Promise<void>;
  t: (key: string, options?: Record<string, unknown>) => string;
}

const AppDataContext = createContext<AppDataContextType | undefined>(undefined);

interface AppDataProviderProps {
  children: ReactNode;
}

export function AppDataProvider({ children }: AppDataProviderProps) {
  const [currentLanguage, setCurrentLanguage] = useState(i18n.locale);
  const [isLoading, setIsLoading] = useState(true);

  // Load saved language on app start
  useEffect(() => {
    loadSavedLanguage();
  }, []);

  const loadSavedLanguage = async () => {
    try {
      // Check if AsyncStorage is available
      if (AsyncStorage) {
        const savedLanguage = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
        if (savedLanguage) {
          i18n.locale = savedLanguage;
          setCurrentLanguage(savedLanguage);
        }
      }
    } catch (error) {
      // Fail silently - AsyncStorage might not be linked yet
      console.warn("AsyncStorage not available, using default language:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const changeLanguage = async (locale: string) => {
    try {
      // Update i18n
      i18n.locale = locale;
      setCurrentLanguage(locale);
      
      // Save to AsyncStorage if available
      if (AsyncStorage) {
        await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, locale);
      }
    } catch (error) {
      // Fail silently - AsyncStorage might not be linked yet
      console.warn("Failed to save language, but locale updated:", error);
    }
  };

  const t = (key: string, options?: Record<string, unknown>) => {
    return i18n.t(key, options);
  };

  return (
    <AppDataContext.Provider
      value={{
        currentLanguage,
        isLoading,
        changeLanguage,
        t,
      }}
    >
      {children}
    </AppDataContext.Provider>
  );
}

export function useAppData() {
  const context = useContext(AppDataContext);
  if (context === undefined) {
    throw new Error("useAppData must be used within an AppDataProvider");
  }
  return context;
}

// Convenience hook specifically for translations
export function useTranslation() {
  const { t, currentLanguage } = useAppData();
  return { t, currentLanguage };
}
