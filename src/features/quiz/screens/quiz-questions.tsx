import { useAppDispatch } from "@/shared/store/hooks";
import { setQuizAnswers } from "@/shared/store/slices/usercase-slice";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";

import { AppText as Text } from "@/components/app-text";
import { BackButton } from "@/components/back-button";
import { PrimaryButton } from "@/components/primary-button";
import {
  QuizCardSelection,
  QuizListSelection,
  QuizProgressBar,
} from "@/features/quiz/components";
import { scale, verticalScale } from "@/constants/scaling";
import { AeonikFonts, Colors } from "@/constants/theme";
import { AppTextStyle } from "@/constants/typography";
import { t } from "@/i18n";
import { SafeAreaView } from "react-native-safe-area-context";
import { getQuizQuestions } from "../models/quiz-question";

export default function QuizQuestionsScreen() {
  const dispatch = useAppDispatch();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const QUIZ_QUESTIONS = getQuizQuestions();
  const currentQuestion = QUIZ_QUESTIONS[currentQuestionIndex];
  const totalQuestions = QUIZ_QUESTIONS.length;
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  const handleSelectOption = (optionId: string) => {
    const nextAnswers = { ...answers, [currentQuestion.id]: optionId };
    setAnswers(nextAnswers);
    dispatch(setQuizAnswers(nextAnswers));
  };

  const handleContinue = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      router.push("/quiz/complete");
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else {
      router.back();
    }
  };

  const isAnswered = answers[currentQuestion.id] !== undefined;

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.content}>
        {/* Header with Back Button */}
        <View style={styles.header}>
          <BackButton
            onPress={handleBack}
            variant={currentQuestion.useCloseButton ? "close" : "back"}
          />
          {/* Progress Bar */}
          <QuizProgressBar progress={progress} />
        </View>



        {/* Question Content */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.questionText}>{currentQuestion.question}</Text>

          {/* Render based on question type */}
          {currentQuestion.type === "card" ? (
            <QuizCardSelection
              options={currentQuestion.options}
              selectedOption={answers[currentQuestion.id]}
              onSelectOption={handleSelectOption}
            />
          ) : (
            <>
              <View style={styles.divider} />
              <QuizListSelection
                options={currentQuestion.options}
                selectedOption={answers[currentQuestion.id]}
                onSelectOption={handleSelectOption}
              />
            </>

          )}
        </ScrollView>

        {/* Continue Button */}
        <View style={styles.buttonContainer}>
          <PrimaryButton
            title={t("common.continue")}
            onPress={handleContinue}
            disabled={!isAnswered}
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
  divider: {
    height: 1,
    backgroundColor: Colors.light.mainDarkAlpha16,
    marginHorizontal: scale(20),
  },
  header: {
    flexDirection: 'row',
    alignItems: "center",
    gap: scale(16),
    paddingTop: verticalScale(8),
    paddingBottom: verticalScale(24),
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: verticalScale(16),
  },
  questionText: {
    ...AppTextStyle.headline4,
    fontFamily: AeonikFonts.medium,
    color: Colors.light.text,
    textAlign: 'center',
    marginBottom: verticalScale(32),
    paddingHorizontal: scale(4),
    lineHeight: 36,
  },
  buttonContainer: {
    paddingTop: verticalScale(16),
    paddingBottom: verticalScale(24),
  },
});
