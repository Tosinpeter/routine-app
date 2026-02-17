import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View, Image, ImageSourcePropType } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AppText as Text } from "@/components/app-text";
import { ThemedView } from "@/components/themed-view";
import { useAppData } from "@/contexts/AppDataProvider";

import { BackButton } from "@/components/back-button";
import { moderateScale, scale, tabBarHeight } from "@/constants/scaling";
import { AeonikFonts, Colors } from "@/constants/theme";
import { AppTextStyle } from "@/constants/typography";

interface Language {
  id: string;
  name: string;
  flagSrc: ImageSourcePropType;
  locale: string;
}

interface LanguageItemProps {
  language: Language;
  isSelected: boolean;
  onSelect: () => void;
}

function LanguageItem({ language, isSelected, onSelect }: LanguageItemProps) {
  return (
    <TouchableOpacity
      style={styles.languageItem}
      onPress={onSelect}
      activeOpacity={0.7}
    >
      <View style={styles.languageLeft}>
        <Image
          source={language.flagSrc}
          style={styles.flagImage}
          resizeMode="contain"
        />
        <Text style={styles.languageName}>{language.name}</Text>
      </View>
      <View style={[styles.radio, isSelected && styles.radioSelected]}>
        {isSelected && <View style={styles.radioInner} />}
      </View>
    </TouchableOpacity>
  );
}

export default function LanguageScreen() {
  const { currentLanguage, changeLanguage, t } = useAppData();

  const languages: Language[] = [
    {
      id: "en-US",
      name: "United State",
      flagSrc: require("@/assets/images/img_flag-us.png"),
      locale: "en",
    },
    {
      id: "ar-SA",
      name: "Saudi Arabia",
      flagSrc: require("@/assets/images/img_flag-saudi.png"),
      locale: "ar",
    },
    {
      id: "ja-JP",
      name: "Japan",
      flagSrc: require("@/assets/images/img_flag-japan.png"),
      locale: "ja",
    },
  ];

  const [selectedLanguage, setSelectedLanguage] = useState("en-US");

  useEffect(() => {
    // Set initial language based on current locale from AppDataProvider
    const matchedLang = languages.find(lang => lang.locale === currentLanguage);
    if (matchedLang) {
      setSelectedLanguage(matchedLang.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLanguage]);

  const handleSelectLanguage = async (languageId: string) => {
    setSelectedLanguage(languageId);
    const selectedLang = languages.find(l => l.id === languageId);
    if (selectedLang) {
      await changeLanguage(selectedLang.locale);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.bgSolid} />

      <SafeAreaView style={styles.safeArea} edges={["top"]}>
        {/* Header */}
        <View style={styles.header}>
          <BackButton style={styles.backButton} />
          <Text style={styles.headerTitle}>{t("language.title")}</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.sectionTitle}>{t("language.chooseLanguage")}</Text>
          <Text style={styles.sectionSubtitle}>
            {t("language.subtitle")}
          </Text>

          <View style={styles.languageList}>
            {languages.map((language, index) => (
              <React.Fragment key={language.id}>
                <LanguageItem
                  language={language}
                  isSelected={selectedLanguage === language.id}
                  onSelect={() => handleSelectLanguage(language.id)}
                />
                {index < languages.length - 1 && <View style={styles.divider} />}
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
  sectionTitle: {
    ...AppTextStyle.headline4,
    fontFamily: AeonikFonts.medium,
    color: Colors.light.mainDarkColor,
    marginBottom: scale(8),
  },
  sectionSubtitle: {
    ...AppTextStyle.subtitle2,
    fontFamily: AeonikFonts.regular,
    color: Colors.light.grey500,
    opacity: 0.7,
    marginBottom: scale(24),
    lineHeight: scale(22),
  },
  languageList: {
    backgroundColor: Colors.light.white,
    borderRadius: scale(16),

    overflow: "hidden",
  },
  languageItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: scale(16),
    paddingHorizontal: scale(16),
  },
  languageLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  flagImage: {
    width: scale(24),
    height: scale(24),
    marginRight: scale(12),
  },
  languageName: {
    fontSize: moderateScale(17),
    fontFamily: AeonikFonts.regular,
    color: Colors.light.mainDarkColor,
  },
  radio: {
    width: scale(24),
    height: scale(24),
    borderRadius: scale(12),
    borderWidth: 2,
    borderColor: Colors.light.lightGrey300,
    alignItems: "center",
    justifyContent: "center",
  },
  radioSelected: {
    borderColor: Colors.light.tint,
  },
  radioInner: {
    width: scale(12),
    height: scale(12),
    borderRadius: scale(6),
    backgroundColor: Colors.light.tint,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "rgba(234, 236, 240, 1))",
  },
});
