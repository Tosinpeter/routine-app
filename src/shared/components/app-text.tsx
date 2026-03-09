import React from "react";
import { Platform, Text as RNText, StyleSheet, TextProps, TextStyle } from "react-native";

import { AppTextStyle, AppTextStyleKey } from "@/constants/typography";

interface AppTextProps extends TextProps {
  /**
   * Predefined text style from AppTextStyle
   */
  variant?: AppTextStyleKey;
}

/**
 * Platform-specific base styles for consistent text rendering
 */
const platformStyles = StyleSheet.create({
  base: Platform.select<TextStyle>({
    android: {
      // Remove extra font padding on Android for pixel-perfect alignment
      includeFontPadding: false,
      textAlignVertical: "center",
    },
    ios: {
      // iOS renders fonts slightly differently, no adjustment needed
    },
    default: {},
  }) || {},
});

/**
 * AppText - Consistent text component across iOS and Android
 *
 * Features:
 * - Disables font scaling for consistent layouts
 * - Platform-specific adjustments for pixel-perfect rendering
 * - Supports variant-based styling from AppTextStyle
 */
export const AppText: React.FC<AppTextProps> = ({
  children,
  style,
  variant,
  ...props
}) => {
  const variantStyle = variant ? AppTextStyle[variant] : undefined;

  return (
    <RNText
      allowFontScaling={false}
      maxFontSizeMultiplier={1}
      minimumFontScale={1}
      style={[platformStyles.base, variantStyle, style]}
      {...props}
    >
      {children}
    </RNText>
  );
};

export const Text = AppText;
export default AppText;
