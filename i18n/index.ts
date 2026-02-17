import { getLocales } from "expo-localization";
import { I18n } from "i18n-js";

import en from "./locales/en.json";
import ar from "./locales/ar.json";
import ja from "./locales/ja.json";
import fr from "./locales/fr.json";

const i18n = new I18n({
  en,
  ar,
  ja,
  fr,
});

// Set the locale based on device settings
const deviceLocale = getLocales()[0]?.languageCode ?? "en";
i18n.locale = deviceLocale;

// Enable fallback to default locale
i18n.enableFallback = true;
i18n.defaultLocale = "en";

export default i18n;

// Helper function for translations
export const t = (key: string, options?: Record<string, unknown>) => {
  return i18n.t(key, options);
};

// Helper function to change language
export const changeLanguage = (locale: string) => {
  i18n.locale = locale;
};
