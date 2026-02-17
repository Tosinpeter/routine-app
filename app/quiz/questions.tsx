import React, { useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  ImageSourcePropType,
} from "react-native";
import { router } from "expo-router";

import { AppText as Text } from "@/components/app-text";
import { BackButton } from "@/components/back-button";
import { PrimaryButton } from "@/components/primary-button";
import { AeonikFonts, Colors } from "@/constants/theme";
import { scale, verticalScale } from "@/constants/scaling";
import { AppTextStyle } from "@/constants/typography";
import { t } from "@/i18n";
import {
  QuizCardSelection,
  QuizListSelection,
  QuizProgressBar,
} from "@/components/quiz";

// Quiz questions data
interface QuizQuestion {
  id: number;
  type: "card" | "list";
  question: string;
  useCloseButton?: boolean;
  options: {
    id: string;
    label: string;
    imageSource: ImageSourcePropType;
  }[];
}

const getQuizQuestions = (): QuizQuestion[] => [
  {
    id: 1,
    type: "card" as const,
    question: t("quiz.questions.q1.question"),
    options: [
      {
        id: "smooth",
        label: t("quiz.questions.q1.option1"),
        imageSource: require("@/assets/images/OptionImage.png"),
      },
      {
        id: "oily",
        label: t("quiz.questions.q1.option2"),
        imageSource: require("@/assets/images/OptionImage2.png"),
      },
      {
        id: "redness",
        label: t("quiz.questions.q1.option3"),
        imageSource: require("@/assets/images/OptionImage3.png"),
      },
      {
        id: "breakouts",
        label: t("quiz.questions.q1.option4"),
        imageSource: require("@/assets/images/OptionImage4.png"),
      },
    ],
  },
  {
    id: 2,
    type: "list" as const,
    question: t("quiz.questions.q2.question"),
    useCloseButton: true,
    options: [
      {
        id: "no-issues",
        label: t("quiz.questions.q2.option1"),
        imageSource: require("@/assets/images/OptionImageu.png"),
      },
      {
        id: "kidney",
        label: t("quiz.questions.q2.option2"),
        imageSource: require("@/assets/images/OptionImageh.png"),
      },
      {
        id: "pregnant",
        label: t("quiz.questions.q2.option3"),
        imageSource: require("@/assets/images/OptionImagell.png"),
      },
      {
        id: "allergies",
        label: t("quiz.questions.q2.option4"),
        imageSource: require("@/assets/images/OptionImagepp.png"),
      },
    ],
  },
];

export default function QuizQuestionsScreen() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const QUIZ_QUESTIONS = getQuizQuestions();
  const currentQuestion = QUIZ_QUESTIONS[currentQuestionIndex];
  const totalQuestions = QUIZ_QUESTIONS.length;
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  const handleSelectOption = (optionId: string) => {
    setAnswers({ ...answers, [currentQuestion.id]: optionId });
  };

  const handleContinue = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Quiz completed
      console.log("Quiz completed with answers:", answers);
      // Navigate to completion screen
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
    <SafeAreaView style={styles.container}>
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
    backgroundColor: 'rgba(32, 32, 30, 0.16)',
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
