import { getLocales } from "expo-localization";
import { I18n } from "i18n-js";

import en from "./locales/en.json";

const i18n = new I18n({
  en,
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
