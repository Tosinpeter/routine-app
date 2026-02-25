import React from "react";
import { StyleSheet, ViewStyle, TextStyle, ActivityIndicator, View } from "react-native";
import { AppText as Text } from "@/components/app-text";
import { Colors, BorderRadius, Shadows } from "@/constants/theme";
import { verticalScale, scale } from "@/constants/scaling";
import { AppTextStyle } from "@/constants/typography";
import { PressableScale } from "pressto";

interface PrimaryButtonProps {
  onPress: () => void;
  title: string;
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  activeOpacity?: number;
  withShadow?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export function PrimaryButton({
  onPress,
  title,
  disabled = false,
  loading = false,
  style,
  textStyle,
  withShadow = false,
  icon,
  iconPosition = 'left',
}: PrimaryButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <PressableScale
      style={[
        styles.button,
        withShadow && Shadows.button,
        isDisabled && styles.buttonDisabled,
        style,
      ]}
      onPress={loading ? undefined : onPress}>
      <View style={styles.buttonContent}>
        {loading && (
          <ActivityIndicator
            color={Colors.light.white}
            style={styles.loader}
            size="small"
          />
        )}
        {icon && iconPosition === 'left' && (
          <View style={styles.icon}>{icon}</View>
        )}
        {loading || (
          <Text style={[styles.buttonText, textStyle]}>{title}</Text>
        )}

        {icon && iconPosition === 'right' && (
          <View style={styles.icon}>{icon}</View>
        )}
      </View>
    </PressableScale>
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
  icon: {
    marginHorizontal: scale(8),
  },
  buttonText: {
    ...AppTextStyle.button,
    color: Colors.light.white,
  },
});
