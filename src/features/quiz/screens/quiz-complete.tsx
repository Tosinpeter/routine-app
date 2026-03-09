import { router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  StatusBar,
  StyleSheet,
  View
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

import { AppText as Text } from "@/components/app-text";
import { BackButton } from "@/components/back-button";
import { Loader } from "@/components/loader";
import { PrimaryButton } from "@/components/primary-button";
import { scale, verticalScale } from "@/constants/scaling";
import { AeonikFonts, Colors } from "@/constants/theme";
import { AppTextStyle } from "@/constants/typography";
import { useAuth } from "@/shared/store/hooks/use-auth";
import { t } from "@/i18n";
import { client } from "@/shared/api/client";
import { useAppSelector } from "@/shared/store/hooks";

export default function QuizCompleteScreen() {
  const scaleProgress = useSharedValue(0);
  const buttonOpacityValue = useSharedValue(0);
  const [isLoading, setIsLoading] = useState(true);
  const { profile, updateProfile } = useAuth();
  const quizAnswers = useAppSelector((state) => state.usecase.quizAnswers);
  const hasSyncedProfile = useRef(false);

  // Update user profile with quiz results (skin_type from Q1, health_conditions from Q2)
  useEffect(() => {
    if (!profile?.id || !quizAnswers || hasSyncedProfile.current) return;
    const skinType = quizAnswers[1];
    const healthConditions = quizAnswers[2];
    if (!skinType && !healthConditions) return;

    hasSyncedProfile.current = true;
    (async () => {
      try {
        const { data } = await client.patch<{ success?: boolean; error?: string }>(
          `/api/profile/${profile.id}`,
          {
            ...(skinType && { skin_type: skinType }),
            ...(healthConditions && { health_conditions: healthConditions }),
          }
        );
        if (data?.success !== false) {
          await updateProfile({
            ...(skinType && { skin_type: skinType }),
            ...(healthConditions && { health_conditions: healthConditions }),
          });
        }
      } catch {
        // Non-blocking: user can continue; profile can be synced later
      }
    })();
  }, [profile?.id, quizAnswers, updateProfile]);

  const imageStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scaleProgress.value }],
  }));

  const buttonStyle = useAnimatedStyle(() => ({
    opacity: buttonOpacityValue.value,
  }));

  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);

      scaleProgress.value = withSpring(1, { damping: 7, stiffness: 50 });
      buttonOpacityValue.value = withDelay(800, withTiming(1, { duration: 400 }));
    }, 1000);

    return () => clearTimeout(loadingTimer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleContinue = () => {
    router.replace("/treatment-plan");
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <StatusBar barStyle="dark-content" />

      {isLoading ? (
        <View style={styles.loadingScreen}>
          <Loader size={164} />
        </View>
      ) : (
        <>
          {/* Header */}
          <View style={styles.header}>
            <BackButton style={styles.backButton} />
            <View style={styles.placeholder} />
          </View>

          <View style={styles.content}>
            {/* Success Icon */}
            <View style={styles.illustrationContainer}>
              <Animated.Image
                source={require("@/assets/images/quiz_completeIllustration.png")}
                style={[styles.illustrationImg, imageStyle]}
              />

              {/* Text Content */}
              <View style={styles.textContent}>
                <Text style={styles.headline}>{t("quiz.complete.title")}</Text>

                <Text style={styles.subtitle}>
                  {t("quiz.complete.subtitle")}
                </Text>
              </View>
            </View>

            {/* Bottom Button */}
            <Animated.View
              style={[styles.buttonContainer, buttonStyle]}
            >
              <PrimaryButton
                title={t("quiz.complete.generateButton")}
                onPress={handleContinue}
                withShadow
              />
            </Animated.View>
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.scaffold,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: scale(16),
    paddingVertical: scale(8),
    backgroundColor: Colors.light.scaffold,
  },
  backButton: {
    marginTop: 0,
  },
  headerTitle: {
    ...AppTextStyle.headline4,
    fontFamily: AeonikFonts.medium,
    color: Colors.light.mainDarkColor,
  },
  placeholder: {
    width: scale(40),
  },
  content: {
    flex: 1,
    paddingHorizontal: scale(20),
    justifyContent: "space-between",
  },
  illustrationContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  successCircle: {
    width: scale(160),
    height: scale(160),
    borderRadius: scale(80),
    backgroundColor: Colors.light.successLightBg,
    alignItems: "center",
    justifyContent: "center",
  },
  successEmoji: {
    fontSize: 80,
  },
  textContent: {
    alignItems: "center",
    paddingHorizontal: scale(16),
    marginBottom: verticalScale(40),
  },
  headline: {
    ...AppTextStyle.headline1,
    textAlign: "center",
    fontFamily: AeonikFonts.bold,
    color: Colors.light.text,
    marginBottom: verticalScale(16),
  },
  subtitle: {
    ...AppTextStyle.bodyText1,
    textAlign: "center",
    fontFamily: AeonikFonts.medium,
    color: Colors.light.grey525,
    opacity: 0.8,
    lineHeight: 24,
  },
  buttonContainer: {
    paddingBottom: verticalScale(24),
  },
  illustrationImg: {
    width: scale(222),
    height: scale(222)
  },
  loadingScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.light.scaffold,
  },
  loadingText: {
    ...AppTextStyle.headline3,
    fontFamily: AeonikFonts.bold,
    color: Colors.light.text,
    textAlign: 'center',
    marginTop: verticalScale(24),
  },
  loadingSubtext: {
    ...AppTextStyle.bodyText2,
    fontFamily: AeonikFonts.regular,
    color: Colors.light.grey525,
    textAlign: 'center',
    marginTop: verticalScale(8),
  },
});
