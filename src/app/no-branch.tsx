import { router } from "expo-router";
import React from "react";
import {
  StatusBar,
  StyleSheet,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Image } from "expo-image";

import { AppText as Text } from "@/components/app-text";
import { PrimaryButton } from "@/components/primary-button";
import { scale, verticalScale } from "@/constants/scaling";
import { AeonikFonts, Colors } from "@/constants/theme";
import { AppTextStyle } from "@/constants/typography";
import { t } from "@/i18n";

interface NoInternetScreenProps {
  onRetry?: () => void;
}

export default function NoBranchScreen({ onRetry }: NoInternetScreenProps) {
  const handleTryAgain = () => {
    if (onRetry) {
      onRetry();
    } else {
      // Default behavior: go back or reload
      if (router.canGoBack()) {
        router.back();
      }
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.content}>
        {/* Icon and Text Content */}
        <View style={styles.centerContent}>
          {/* No Internet Icon */}
          <View style={styles.iconContainer}>
            <Image
              source={require("@/assets/images/img_no-branch.png")}
              style={styles.iconImage}
              contentFit="contain"
            />
          </View>

          {/* Text Content */}
          <View style={styles.textContent}>
            <Text style={styles.headline}>{t("error.noBranch.title")}</Text>

            <Text style={styles.subtitle}>
              {t("error.noBranch.subtitle")}
            </Text>
          </View>
        </View>

        {/* Bottom Button */}
        <View style={styles.buttonContainer}>
          <PrimaryButton
            title={t("common.tryAgain")}
            onPress={handleTryAgain}
            withShadow
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.scaffold,
  },
  content: {
    flex: 1,
    paddingHorizontal: scale(20),
    justifyContent: "space-between",
  },
  centerContent: {
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
    width: scale(98),
    height: scale(101),
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
  subtitle: {
    ...AppTextStyle.bodyText1,
    textAlign: "center",
    fontFamily: AeonikFonts.regular,
    color: Colors.light.grey525,
    opacity: 0.8,
    lineHeight: 24,
  },
  buttonContainer: {
    paddingBottom: verticalScale(24),
  },
});
