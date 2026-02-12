import React from "react";
import { TouchableOpacity, StyleSheet, ViewStyle, TextStyle, ActivityIndicator, View } from "react-native";
import { AppText as Text } from "@/components/app-text";
import { Colors, BorderRadius, Shadows } from "@/constants/theme";
import { verticalScale, scale } from "@/constants/scaling";
import { AppTextStyle } from "@/constants/typography";

interface PrimaryButtonProps {
  onPress: () => void;
  title: string;
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  activeOpacity?: number;
  withShadow?: boolean;
}

export function PrimaryButton({
  onPress,
  title,
  disabled = false,
  loading = false,
  style,
  textStyle,
  activeOpacity = 0.8,
  withShadow = false,
}: PrimaryButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      style={[
        styles.button,
        withShadow && Shadows.button,
        isDisabled && styles.buttonDisabled,
        style,
      ]}
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={activeOpacity}
    >
      <View style={styles.buttonContent}>
        {loading && (
          <ActivityIndicator
            color={Colors.light.white}
            style={styles.loader}
            size="small"
          />
        )}
        <Text style={[styles.buttonText, textStyle]}>{title}</Text>
      </View>
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
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  loader: {
    marginRight: scale(8),
  },
  buttonText: {
    ...AppTextStyle.button,
    color: Colors.light.white,
  },
});
