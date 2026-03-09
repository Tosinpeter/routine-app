import { ImageSourcePropType } from "react-native";
import { t } from "@/i18n";

export interface QuizQuestion {
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

export const getQuizQuestions = (): QuizQuestion[] => [
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
