import React from "react";
import { StyleSheet, View } from "react-native";
import { Image } from "expo-image";

import { AppText as Text } from "@/components/app-text";
import { PrimaryButton } from "@/components/primary-button";
import { scale, verticalScale } from "@/constants/scaling";
import { AeonikFonts, Colors } from "@/constants/theme";
import { AppTextStyle } from "@/constants/typography";
import { t } from "@/i18n";

interface ApiErrorDisplayProps {
  title?: string;
  errorMessage?: string;
  description?: string;
  onRetry?: () => void;
  showRetryButton?: boolean;
}

export function ApiErrorDisplay({
  title = t("error.title"),
  errorMessage = t("error.notFound"),
  description = t("error.notFoundDescription"),
  onRetry,
  showRetryButton = true,
}: ApiErrorDisplayProps) {
  return (
    <View style={styles.container}>
      {/* Error Icon */}
      <View style={styles.iconContainer}>
        <Image
          source={require("@/assets/images/img_api-error.png")}
          style={styles.iconImage}
          contentFit="contain"
        />
      </View>

      {/* Text Content */}
      <View style={styles.textContent}>
        <Text style={styles.headline}>{title}</Text>
        <Text style={styles.error}>{errorMessage}</Text>
        <Text style={styles.subtitle}>{description}</Text>
      </View>

      {/* Retry Button */}
      {showRetryButton && onRetry && (
        <View style={styles.buttonContainer}>
          <PrimaryButton
            title={t("error.tryAgain")}
            onPress={onRetry}
            withShadow
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: scale(16),
  },
  iconContainer: {
    marginBottom: verticalScale(32),
    alignItems: "center",
    justifyContent: "center",
  },
  iconImage: {
    width: scale(110),
    height: scale(110),
  },
  textContent: {
    alignItems: "center",
    paddingHorizontal: scale(16),
  },
  headline: {
    ...AppTextStyle.headline4,
    textAlign: "center",
    fontFamily: AeonikFonts.bold,
    color: Colors.light.text,
    marginBottom: verticalScale(16),
  },
  error: {
    ...AppTextStyle.subtitle2,
    textAlign: "center",
    fontFamily: AeonikFonts.regular,
    color: Colors.light.errorRgba,
    opacity: 0.8,
    lineHeight: 24,
    marginBottom: verticalScale(16),
  },
  subtitle: {
    ...AppTextStyle.subtitle2,
    textAlign: "center",
    fontFamily: AeonikFonts.regular,
    color: Colors.light.grey525,
    opacity: 0.8,
    lineHeight: 24,
  },
  buttonContainer: {
    width: "100%",
    paddingTop: verticalScale(32),
  },
});
