import React, { useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AppText as Text } from "@/components/app-text";
import { MinusIcon, PlusIcon } from '@/components/icons';
import { ThemedView } from "@/components/themed-view";
import { useTranslation } from "@/contexts/AppDataProvider";

import { BackButton } from "@/components/back-button";
import { moderateScale, scale, tabBarHeight } from "@/constants/scaling";
import { AeonikFonts, Colors } from "@/constants/theme";
import { AppTextStyle } from "@/constants/typography";

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

function FAQItem({ question, answer, isOpen, onToggle }: FAQItemProps) {
  return (
    <View style={styles.faqItem}>
      <TouchableOpacity
        style={styles.faqHeader}
        onPress={onToggle}
        activeOpacity={0.7}
      >
        <Text style={styles.question}>{question}</Text>


        {isOpen ? <PlusIcon size={16} color="#20201E" /> :
          <MinusIcon size={16} color="#20201E" />
        }



      </TouchableOpacity>
      {isOpen && (
        <View style={styles.answerContainer}>
          <Text style={styles.answer}>{answer}</Text>
        </View>
      )}
    </View>
  );
}

export default function FAQScreen() {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: t("faq.questions.q1.question"),
      answer: t("faq.questions.q1.answer"),
    },
    {
      question: t("faq.questions.q2.question"),
      answer: t("faq.questions.q2.answer"),
    },
    {
      question: t("faq.questions.q3.question"),
      answer: t("faq.questions.q3.answer"),
    },
    {
      question: t("faq.questions.q4.question"),
      answer: t("faq.questions.q4.answer"),
    },
    {
      question: t("faq.questions.q5.question"),
      answer: t("faq.questions.q5.answer"),
    },
    {
      question: t("faq.questions.q6.question"),
      answer: t("faq.questions.q6.answer"),
    },
  ];

  return (
    <ThemedView style={styles.container}>
      <View style={styles.bgSolid} />

      <SafeAreaView style={styles.safeArea} edges={["top"]}>
        {/* Header */}
        <View style={styles.header}>
          <BackButton style={styles.backButton} />
          <Text style={styles.headerTitle}>{t("faq.title")}</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.faqContainer}>
            {faqs.map((faq, index) => (
              <React.Fragment key={index}>
                <FAQItem
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openIndex === index}
                  onToggle={() => setOpenIndex(openIndex === index ? null : index)}
                />
                {index < faqs.length - 1 && <View style={styles.divider} />}
              </React.Fragment>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.scaffold,
  },
  bgSolid: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.light.scaffold,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: scale(16),
    paddingVertical: scale(12),
    backgroundColor: Colors.light.scaffold,
  },
  backButton: {
    padding: scale(8),
  },
  headerTitle: {
    ...AppTextStyle.headline4,
    fontFamily: AeonikFonts.medium,
    color: Colors.light.mainDarkColor,
  },
  placeholder: {
    width: scale(40),
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: scale(16),
    paddingBottom: tabBarHeight + scale(40),
  },
  subtitle: {
    fontSize: moderateScale(15),
    fontFamily: AeonikFonts.regular,
    color: Colors.light.grey500,
    marginBottom: scale(24),
  },
  faqContainer: {
    backgroundColor: Colors.light.white,
    borderRadius: scale(16),

  },
  faqItem: {
    padding: scale(16)
  },
  faqHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  question: {
    flex: 1,
    fontSize: moderateScale(16),
    fontFamily: AeonikFonts.medium,
    color: Colors.light.mainDarkColor,
  },
  answerContainer: {
    paddingTop: scale(10),
  },
  answer: {
    fontSize: moderateScale(15),
    fontFamily: AeonikFonts.regular,
    color: Colors.light.grey600,
    lineHeight: scale(22),
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "rgba(84, 84, 86, 0.34)",
  },
  contactSection: {
    backgroundColor: Colors.light.tint,
    borderRadius: scale(16),
    padding: scale(24),
    marginTop: scale(32),
    alignItems: "center",
  },
  contactTitle: {
    fontSize: moderateScale(20),
    fontFamily: AeonikFonts.bold,
    color: Colors.light.white,
    marginBottom: scale(8),
  },
  contactText: {
    fontSize: moderateScale(15),
    fontFamily: AeonikFonts.regular,
    color: Colors.light.white,
    textAlign: "center",
    opacity: 0.9,
    marginBottom: scale(20),
  },
  contactButton: {
    backgroundColor: Colors.light.white,
    borderRadius: scale(12),
    paddingVertical: scale(12),
    paddingHorizontal: scale(24),
    flexDirection: "row",
    alignItems: "center",
    gap: scale(8),
  },
  contactButtonText: {
    fontSize: moderateScale(16),
    fontFamily: AeonikFonts.bold,
    color: Colors.light.tint,
  },
});
