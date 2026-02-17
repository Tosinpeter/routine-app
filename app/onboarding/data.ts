/**
 * Onboarding slides data
 * Add more slides to this array to extend the onboarding flow
 */

import { t } from "@/i18n";

export interface OnboardingSlide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: any;
}

export const getOnboardingSlides = (): OnboardingSlide[] => [
  {
    id: 1,
    title: t("onboarding.slides.slide1.title"),
    subtitle: t("onboarding.slides.slide1.subtitle"),
    description: t("onboarding.slides.slide1.description"),
    image: require("@/assets/images/Onboardingbg.png"),
  },
  {
    id: 2,
    title: t("onboarding.slides.slide2.title"),
    subtitle: t("onboarding.slides.slide2.subtitle"),
    description: t("onboarding.slides.slide2.description"),
    image: require("@/assets/images/Onboardingbg2.png"),
  },
  {
    id: 3,
    title: t("onboarding.slides.slide3.title"),
    subtitle: t("onboarding.slides.slide3.subtitle"),
    description: t("onboarding.slides.slide3.description"),
    image: require("@/assets/images/Onboardingbg4.png"),
  },
];
