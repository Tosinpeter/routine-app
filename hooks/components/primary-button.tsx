import React from "react";
import { TouchableOpacity, StyleSheet, ViewStyle, TextStyle } from "react-native";
import { AppText as Text } from "@/components/app-text";
import { Colors, BorderRadius, Shadows } from "@/constants/theme";
import { verticalScale } from "@/constants/scaling";
import { AppTextStyle } from "@/constants/typography";

interface PrimaryButtonProps {
  onPress: () => void;
  title: string;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  activeOpacity?: number;
  withShadow?: boolean;
}

export function PrimaryButton({
  onPress,
  title,
  disabled = false,
  style,
  textStyle,
  activeOpacity = 0.8,
  withShadow = false,
}: PrimaryButtonProps) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        withShadow && Shadows.button,
        disabled && styles.buttonDisabled,
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={activeOpacity}
    >
      <Text style={[styles.buttonText, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.light.tint,
    borderRadius: BorderRadius.xxl,
    paddingVertical: verticalScale(19),
    width: "100%",
    alignItems: "center",
  },
  buttonDisabled: {
    backgroundColor: "#CCA39B",
    opacity: 0.6,
  },
  buttonText: {
    ...AppTextStyle.button,
    color: Colors.light.white,
  },
});
