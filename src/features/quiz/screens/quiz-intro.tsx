import React from "react";
import { View, StyleSheet, StatusBar } from "react-native";
import { Image } from "expo-image";
import { router } from "expo-router";

import { AppText as Text } from "@/components/app-text";
import { BackButton } from "@/components/back-button";
import { PrimaryButton } from "@/components/primary-button";
import { AeonikFonts, Colors } from "@/constants/theme";
import { scale, verticalScale } from "@/constants/scaling";
import { AppTextStyle } from "@/constants/typography";
import { t } from "@/i18n";
import { SafeAreaView } from "react-native-safe-area-context";

export default function QuizIntroScreen() {
  const handleStartQuiz = () => {
    router.push('/quiz/questions');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.content}>
        {/* Back Button */}
        <View style={styles.header}>
          <BackButton />
        </View>

        {/* Illustration */}
        <View style={styles.illustrationContainer}>
          <Image
            source={require("@/assets/images/quiz_Illustration.png")}
            style={styles.illustration}
            contentFit="contain"
            cachePolicy="memory-disk"
          />
        </View>

        {/* Text Content */}
        <View style={styles.textContent}>
          <Text style={styles.headline}>
            {t("quiz.intro.title")}
          </Text>
          
          <Text style={styles.subtitle}>
            {t("quiz.intro.subtitle")}
          </Text>
        </View>

        {/* Bottom Button */}
        <View style={styles.buttonContainer}>
          <PrimaryButton
            title={t("quiz.intro.startButton")}
            onPress={handleStartQuiz}
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
    paddingHorizontal: scale(16),
  },
  header: {
    paddingTop: verticalScale(8),
    paddingBottom: verticalScale(16),
  },
  illustrationContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: verticalScale(32),
  },
  illustration: {
    width: scale(280),
    height: verticalScale(280),
  },
  textContent: {
    alignItems: "center",
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
    ...AppTextStyle.subtitle2,
    textAlign: "center",
    fontFamily: AeonikFonts.regular,
    color: Colors.light.grey525,
    lineHeight: 22,
    marginBottom: verticalScale(50),
  },
  buttonContainer: {
    paddingBottom: verticalScale(24),
  },
});
