/**
 * Onboarding slides data
 * Add more slides to this array to extend the onboarding flow
 */

export interface OnboardingSlide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: any;
}

export const onboardingSlides: OnboardingSlide[] = [
  {
    id: 1,
    title: "How it works",
    subtitle: "You see the surface\nwe understand your skin",
    description:
      "We discover what's really happening with your skin and how to treat it. This is where your care begins.",
    image: require("@/assets/images/Onboardingbg.png"),
  },
  // Add more slides here as needed
  // Example:
  {
    id: 2,
    title: "How it works",
    subtitle: "You see the surface\nwe understand your skin",
    description:
      "We discover what’s really happening with your skin and how to treat it. This is where your care begins.",
    image: require("@/assets/images/Onboardingbg2.png"),
  },
  {
    id: 3,
    title: "Not just a skincare routine.",
    subtitle: "Get professional advice",
    description:
      "A treatment plan tailored to your skin’s needs. Backed by analysis. Built by experts.",
    image: require("@/assets/images/Onboardingbg4.png"),
  },
];
