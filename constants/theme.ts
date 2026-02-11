/**
 * Theme configuration for pixel-perfect cross-platform styling.
 * Includes colors, shadows, and platform-specific adjustments.
 */

import { Platform, ViewStyle } from "react-native";

const tintColorDark = "#fff";
export const primaryColor = "#CF604A";
export const scaffoldColor = "#EDEBE3";

export const Colors = {
  light: {
    text: "#11181C",
    white: "#fff",
    whiteTransparent50: "rgba(255, 255, 255, 0.5)",
    black: "#000",
    lightGrey: "#F2F4F7",
    lightGrey50: "#F9FAFB",
    lightGrey100: "#E5E7EB",
    lightGrey150: "#E4E7EC",
    lightGrey800: "#182230",
    lightGrey300: "#D0D5DD",
    grey200: "#EAECF0",
    grey400: "#98A2B3",
    grey500: "#667085",
    grey525: "#5B6271",
    grey550: "#717B8E",
    grey600: "#475467",
    grey700: "#344054",
    grey800: "#101828",
    brown900: "#301203",
    background: "#fff",
    scaffold: scaffoldColor,
    tint: primaryColor,
    mainDarkColor: "#20201E",
    darkTeal: "#1C404B",
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: primaryColor,
    // Status colors
    success: "#17B26A",
    successDark: "#079455",
    successLight: "#DCFCE7",
    successLightBg: "#ECFDF3",
    successCheck: "#12B76A",
    // Info/Lab test colors
    info: "#1414D4",
    infoLight: "#EDEDF8",
    // Gradient colors
    gradientPurple: "#614BE1",
    gradientBlue: "#A7CDFF",
    // Accent colors
    accentPurple: "#7C3AED",
    // Shadow colors
    shadow: "rgba(0, 0, 0, 0.25)",
    shadowLight: "rgba(0, 0, 0, 0.08)",
    shadowMedium: "rgba(0, 0, 0, 0.12)",
    // Custom UI Colors
    statusBadgeBg: "#F6F0EE",
    progressRing: "#5676FF",
    dermatologistCardBg: "#F7DFC9",
    dermatologistCardBlob: "#FFAA33",
    dermatologistBlob1: "#FFAA33", // Ellipse 1631 Right
    dermatologistBlob2: "#926C64", // Ellipse 1632 Right
    dermatologistBlob3: "#B67735", // Ellipse 1633 Right
    dermatologistBadgeText: "#632F00",
    dermatologistBadgeShadow: "rgba(255, 255, 255, 0.25)",
    dermatologistBadgeGradientStart: "rgba(255, 255, 255, 0)",
    dermatologistBadgeGradientEnd: "rgba(237, 125, 26, 0.21)",
    dermatologistBadgeBg: "rgba(237, 125, 26, 0.1)",
  },
  dark: {
    text: "#11181C",
    white: "#fff",
    whiteTransparent50: "rgba(255, 255, 255, 0.5)",
    black: "#000",
    lightGrey: "#F2F4F7",
    lightGrey50: "#F9FAFB",
    lightGrey100: "#E5E7EB",
    lightGrey150: "#E4E7EC",
    lightGrey800: "#182230",
    lightGrey300: "#D0D5DD",
    grey200: "#EAECF0",
    grey400: "#98A2B3",
    grey500: "#667085",
    grey525: "#5B6271",
    grey550: "#717B8E",
    grey600: "#475467",
    grey700: "#344054",
    grey800: "#101828",
    brown900: "#301203",
    background: "#fff",
    scaffold: scaffoldColor,
    tint: primaryColor,
    mainDarkColor: "#20201E",
    darkTeal: "#1C404B",
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: primaryColor,
    // Status colors
    success: "#17B26A",
    successDark: "#079455",
    successLight: "#DCFCE7",
    successLightBg: "#ECFDF3",
    successCheck: "#12B76A",
    // Info/Lab test colors
    info: "#1414D4",
    infoLight: "#EDEDF8",
    // Gradient colors
    gradientPurple: "#614BE1",
    gradientBlue: "#A7CDFF",
    // Accent colors
    accentPurple: "#7C3AED",
    // Shadow colors
    shadow: "rgba(0, 0, 0, 0.25)",
    shadowLight: "rgba(0, 0, 0, 0.08)",
    shadowMedium: "rgba(0, 0, 0, 0.12)",
    // Custom UI Colors
    statusBadgeBg: "#F6F0EE",
    progressRing: "#5676FF",
    dermatologistCardBg: "#F7DFC9",
    dermatologistCardBlob: "#FFAA33",
    dermatologistBadgeBg: "rgba(237, 125, 26, 0.1)",
    dermatologistBadgeText: "#632F00",
  },
};

/**
 * Cross-platform shadow utilities
 * Creates consistent shadows on both iOS (shadow*) and Android (elevation)
 */
type ShadowStyle = Pick<
  ViewStyle,
  | "shadowColor"
  | "shadowOffset"
  | "shadowOpacity"
  | "shadowRadius"
  | "elevation"
>;

export const Shadows: Record<string, ShadowStyle> = {
  /** No shadow */
  none: {
    shadowColor: "transparent",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  /** Subtle shadow for cards - elevation 1-2 */
  sm: Platform.select({
    ios: {
      shadowColor: Colors.light.black,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
    },
    android: {
      elevation: 2,
    },
    default: {
      shadowColor: Colors.light.black,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 2,
    },
  }) as ShadowStyle,
  /** Medium shadow for floating elements - elevation 3-4 */
  md: Platform.select({
    ios: {
      shadowColor: Colors.light.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    android: {
      elevation: 4,
    },
    default: {
      shadowColor: Colors.light.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 4,
    },
  }) as ShadowStyle,
  /** Larger shadow for modals/popovers - elevation 6-8 */
  lg: Platform.select({
    ios: {
      shadowColor: Colors.light.black,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
    },
    android: {
      elevation: 8,
    },
    default: {
      shadowColor: Colors.light.black,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 8,
    },
  }) as ShadowStyle,
  /** Strong shadow for overlays - elevation 12-16 */
  xl: Platform.select({
    ios: {
      shadowColor: Colors.light.black,
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.2,
      shadowRadius: 16,
    },
    android: {
      elevation: 16,
    },
    default: {
      shadowColor: Colors.light.black,
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.2,
      shadowRadius: 16,
      elevation: 16,
    },
  }) as ShadowStyle,
  /** Button shadow with tint color */
  button: Platform.select({
    ios: {
      shadowColor: Colors.light.tint,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
    },
    android: {
      elevation: 6,
    },
    default: {
      shadowColor: Colors.light.tint,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 6,
    },
  }) as ShadowStyle,
  /** Tab bar shadow */
  tabBar: Platform.select({
    ios: {
      shadowColor: Colors.light.black,
      shadowOffset: { width: 0, height: -2 },
      shadowOpacity: 0.08,
      shadowRadius: 8,
    },
    android: {
      elevation: 8,
    },
    default: {
      shadowColor: Colors.light.black,
      shadowOffset: { width: 0, height: -2 },
      shadowOpacity: 0.08,
      shadowRadius: 8,
      elevation: 8,
    },
  }) as ShadowStyle,
};

/**
 * Common border radius values (scaled for consistency)
 */
export const BorderRadius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 28,
  full: 9999,
} as const;

/**
 * Hit slop for better touch targets (especially important on Android)
 */
export const HitSlop = {
  small: { top: 8, right: 8, bottom: 8, left: 8 },
  medium: { top: 12, right: 12, bottom: 12, left: 12 },
  large: { top: 16, right: 16, bottom: 16, left: 16 },
} as const;

/**
 * Custom font configuration using SF Pro Display and Aeonik fonts from assets/fonts/
 * These fonts must be loaded in the root layout before use.
 */
export const FontAssets = {
  // SF Pro Display fonts
  "SFProDisplay-Ultralight": require("@/assets/fonts/SF-Pro-Display-Ultralight.otf"),
  "SFProDisplay-UltralightItalic": require("@/assets/fonts/SF-Pro-Display-UltralightItalic.otf"),
  "SFProDisplay-Thin": require("@/assets/fonts/SF-Pro-Display-Thin.otf"),
  "SFProDisplay-ThinItalic": require("@/assets/fonts/SF-Pro-Display-ThinItalic.otf"),
  "SFProDisplay-Light": require("@/assets/fonts/SF-Pro-Display-Light.otf"),
  "SFProDisplay-LightItalic": require("@/assets/fonts/SF-Pro-Display-LightItalic.otf"),
  "SFProDisplay-Regular": require("@/assets/fonts/SF-Pro-Display-Regular.otf"),
  "SFProDisplay-RegularItalic": require("@/assets/fonts/SF-Pro-Display-RegularItalic.otf"),
  "SFProDisplay-Medium": require("@/assets/fonts/SF-Pro-Display-Medium.otf"),
  "SFProDisplay-MediumItalic": require("@/assets/fonts/SF-Pro-Display-MediumItalic.otf"),
  "SFProDisplay-Semibold": require("@/assets/fonts/SF-Pro-Display-Semibold.otf"),
  "SFProDisplay-SemiboldItalic": require("@/assets/fonts/SF-Pro-Display-SemiboldItalic.otf"),
  "SFProDisplay-Bold": require("@/assets/fonts/SF-Pro-Display-Bold.otf"),
  "SFProDisplay-BoldItalic": require("@/assets/fonts/SF-Pro-Display-BoldItalic.otf"),
  "SFProDisplay-Heavy": require("@/assets/fonts/SF-Pro-Display-Heavy.otf"),
  "SFProDisplay-HeavyItalic": require("@/assets/fonts/SF-Pro-Display-HeavyItalic.otf"),
  "SFProDisplay-Black": require("@/assets/fonts/SF-Pro-Display-Black.otf"),
  "SFProDisplay-BlackItalic": require("@/assets/fonts/SF-Pro-Display-BlackItalic.otf"),
  // Aeonik fonts
  "Aeonik-Air": require("@/assets/fonts/Aeonik-Air.ttf"),
  "Aeonik-AirItalic": require("@/assets/fonts/Aeonik-AirItalic.ttf"),
  "Aeonik-Thin": require("@/assets/fonts/Aeonik-Thin.ttf"),
  "Aeonik-ThinItalic": require("@/assets/fonts/Aeonik-ThinItalic.ttf"),
  "Aeonik-Light": require("@/assets/fonts/Aeonik-Light.ttf"),
  "Aeonik-LightItalic": require("@/assets/fonts/Aeonik-LightItalic.ttf"),
  "Aeonik-Regular": require("@/assets/fonts/Aeonik-Regular.ttf"),
  "Aeonik-RegularItalic": require("@/assets/fonts/Aeonik-RegularItalic.ttf"),
  "Aeonik-Medium": require("@/assets/fonts/Aeonik-Medium.ttf"),
  "Aeonik-MediumItalic": require("@/assets/fonts/Aeonik-MediumItalic.ttf"),
  "Aeonik-Bold": require("@/assets/fonts/Aeonik-Bold.ttf"),
  "Aeonik-BoldItalic": require("@/assets/fonts/Aeonik-BoldItalic.ttf"),
  "Aeonik-Black": require("@/assets/fonts/Aeonik-Black.ttf"),
  "Aeonik-BlackItalic": require("@/assets/fonts/Aeonik-BlackItalic.ttf"),
};

/**
 * Font family names to use in styles.
 * Reference these after fonts are loaded.
 */
export const Fonts = {
  // SF Pro Display
  ultralight: "SFProDisplay-Ultralight",
  ultralightItalic: "SFProDisplay-UltralightItalic",
  thin: "SFProDisplay-Thin",
  thinItalic: "SFProDisplay-ThinItalic",
  light: "SFProDisplay-Light",
  lightItalic: "SFProDisplay-LightItalic",
  regular: "SFProDisplay-Regular",
  regularItalic: "SFProDisplay-RegularItalic",
  medium: "SFProDisplay-Medium",
  mediumItalic: "SFProDisplay-MediumItalic",
  semibold: "SFProDisplay-Semibold",
  semiboldItalic: "SFProDisplay-SemiboldItalic",
  bold: "SFProDisplay-Bold",
  boldItalic: "SFProDisplay-BoldItalic",
  heavy: "SFProDisplay-Heavy",
  heavyItalic: "SFProDisplay-HeavyItalic",
  black: "SFProDisplay-Black",
  blackItalic: "SFProDisplay-BlackItalic",
};

/**
 * Aeonik font family names to use in styles.
 * Reference these after fonts are loaded.
 */
export const AeonikFonts = {
  air: "Aeonik-Air",
  airItalic: "Aeonik-AirItalic",
  thin: "Aeonik-Thin",
  thinItalic: "Aeonik-ThinItalic",
  light: "Aeonik-Light",
  lightItalic: "Aeonik-LightItalic",
  regular: "Aeonik-Regular",
  regularItalic: "Aeonik-RegularItalic",
  medium: "Aeonik-Medium",
  mediumItalic: "Aeonik-MediumItalic",
  bold: "Aeonik-Bold",
  boldItalic: "Aeonik-BoldItalic",
  black: "Aeonik-Black",
  blackItalic: "Aeonik-BlackItalic",
};
