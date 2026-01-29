import { PixelRatio, Platform, StyleSheet, TextStyle } from "react-native";

import { moderateScale } from "./scaling";
import { Fonts } from "./theme";

/**
 * Calculate pixel-perfect line height
 * Ensures line heights are properly rounded to device pixels
 */
const calcLineHeight = (fontSize: number, multiplier: number): number => {
  const rawLineHeight = moderateScale(fontSize) * multiplier;
  return Math.round(PixelRatio.roundToNearestPixel(rawLineHeight));
};

/**
 * Base text style with platform-specific adjustments
 */
const baseTextStyle: TextStyle = {
  fontFamily: Fonts.regular,
  // Prevent system text scaling for consistent layouts
  // includeFontPadding: false on Android removes extra padding
  ...(Platform.OS === "android" && {
    includeFontPadding: false,
    textAlignVertical: "center" as const,
  }),
};

/**
 * App Text Style Definitions
 * Use these styles throughout the app for consistent typography.
 * All font sizes use moderateScale with pixel-perfect line heights.
 */
export const AppTextStyle = StyleSheet.create({
  /** Headline 1 - 30px Bold (line height: 1.2) */
  headline1: {
    ...baseTextStyle,
    fontSize: moderateScale(30),
    fontFamily: Fonts.bold,
    lineHeight: calcLineHeight(30, 1.2),
    letterSpacing: Platform.OS === "ios" ? -0.5 : 0,
  },

  /** Headline 2 - 28px Regular (line height: 1.14) */
  headline2: {
    ...baseTextStyle,
    fontSize: moderateScale(28),
    fontFamily: Fonts.regular,
    lineHeight: calcLineHeight(28, 1.14),
    letterSpacing: Platform.OS === "ios" ? -0.3 : 0,
  },

  /** Headline 3 - 26px Regular (line height: 1.23) */
  headline3: {
    ...baseTextStyle,
    fontSize: moderateScale(26),
    fontFamily: Fonts.regular,
    lineHeight: calcLineHeight(26, 1.23),
    letterSpacing: Platform.OS === "ios" ? -0.3 : 0,
  },

  /** Headline 4 - 24px Bold (line height: 1.25) */
  headline4: {
    ...baseTextStyle,
    fontSize: moderateScale(24),
    fontFamily: Fonts.bold,
    lineHeight: calcLineHeight(24, 1.25),
    letterSpacing: Platform.OS === "ios" ? -0.2 : 0,
  },

  /** Headline 5 - 22px Medium (line height: 1.27) */
  headline5: {
    ...baseTextStyle,
    fontSize: moderateScale(22),
    fontFamily: Fonts.medium,
    lineHeight: calcLineHeight(22, 1.27),
  },

  /** Headline 6 - 20px Bold (line height: 1.2) */
  headline6: {
    ...baseTextStyle,
    fontSize: moderateScale(20),
    fontFamily: Fonts.bold,
    lineHeight: calcLineHeight(20, 1.2),
  },

  /** Subtitle 1 - 18px Bold (line height: 1.33) */
  subtitle1: {
    ...baseTextStyle,
    fontSize: moderateScale(18),
    fontFamily: Fonts.bold,
    lineHeight: calcLineHeight(18, 1.33),
  },

  /** Subtitle 2 - 16px Bold (line height: 1.25) */
  subtitle2: {
    ...baseTextStyle,
    fontSize: moderateScale(16),
    fontFamily: Fonts.bold,
    lineHeight: calcLineHeight(16, 1.25),
  },

  /** Body Text 1 - 14px Regular (line height: 1.43) */
  bodyText1: {
    ...baseTextStyle,
    fontSize: moderateScale(14),
    fontFamily: Fonts.regular,
    lineHeight: calcLineHeight(14, 1.43),
  },

  /** Body Text 2 - 12px Regular (line height: 1.5) */
  bodyText2: {
    ...baseTextStyle,
    fontSize: moderateScale(12),
    fontFamily: Fonts.regular,
    lineHeight: calcLineHeight(12, 1.5),
  },

  /** Caption - 10px Regular (line height: 1.6) */
  caption: {
    ...baseTextStyle,
    fontSize: moderateScale(10),
    fontFamily: Fonts.regular,
    lineHeight: calcLineHeight(10, 1.6),
  },

  /** Overline - 13px Regular (line height: 1.38) */
  overline: {
    ...baseTextStyle,
    fontSize: moderateScale(13),
    fontFamily: Fonts.regular,
    lineHeight: calcLineHeight(13, 1.38),
    textTransform: "uppercase",
    letterSpacing: 1,
  },

  /** Button - 17px Medium (line height: 1.18) */
  button: {
    ...baseTextStyle,
    fontSize: moderateScale(17),
    fontFamily: Fonts.medium,
    lineHeight: calcLineHeight(17, 1.18),
  },

  /** Button 2 - 13px Medium (line height: 1.38) */
  button2: {
    ...baseTextStyle,
    fontSize: moderateScale(13),
    fontFamily: Fonts.medium,
    lineHeight: calcLineHeight(13, 1.38),
  },

  /** Label - 17px Semibold (line height: 1.29) */
  label: {
    ...baseTextStyle,
    fontSize: moderateScale(17),
    fontFamily: Fonts.semibold,
    lineHeight: calcLineHeight(17, 1.29),
  },

  /** Label Medium - 17px Medium (line height: 1.29) */
  labelMedium: {
    ...baseTextStyle,
    fontSize: moderateScale(17),
    fontFamily: Fonts.medium,
    lineHeight: calcLineHeight(17, 1.29),
  },

  /** Subtitle 3 - 16px Medium (line height: 1.25) */
  subtitle3: {
    ...baseTextStyle,
    fontSize: moderateScale(16),
    fontFamily: Fonts.medium,
    lineHeight: calcLineHeight(16, 1.25),
  },

  /** Tag Text - 13px Regular (line height: 1.38) */
  tagText: {
    ...baseTextStyle,
    fontSize: moderateScale(13),
    fontFamily: Fonts.regular,
    lineHeight: calcLineHeight(13, 1.38),
  },

  /** Small Label - 11px Semibold (line height: 1.27) */
  smallLabel: {
    ...baseTextStyle,
    fontSize: moderateScale(11),
    fontFamily: Fonts.semibold,
    lineHeight: calcLineHeight(11, 1.27),
  },

  /** Body Text Semibold - 14px Semibold (line height: 1.43) */
  bodyTextSemibold: {
    ...baseTextStyle,
    fontSize: moderateScale(14),
    fontFamily: Fonts.semibold,
    lineHeight: calcLineHeight(14, 1.43),
  },

  /** Tab Label - 11px Regular for bottom tab labels */
  tabLabel: {
    ...baseTextStyle,
    fontSize: moderateScale(11),
    fontFamily: Fonts.regular,
    lineHeight: calcLineHeight(11, 1.2),
  },
});

/**
 * Helper type for AppTextStyle keys
 */
export type AppTextStyleKey = keyof typeof AppTextStyle;
