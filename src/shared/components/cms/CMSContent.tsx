import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ThemedView } from "@/components/themed-view";
import { AppText as Text } from "@/components/app-text";
import { BackButton } from "@/components/back-button";
import { Colors, AeonikFonts } from "@/constants/theme";
import { scale, moderateScale, verticalScale } from "@/constants/scaling";
import { AppTextStyle } from "@/constants/typography";

export interface CMSSection {
  title?: string;
  content?: string;
  items?: string[];
}

export interface CMSContentProps {
  title: string;
  subtitle?: string;
  sections: CMSSection[];
}

export function CMSContent({ title, subtitle, sections }: CMSContentProps) {
  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={["top"]}>
        {/* Header */}
        <View style={styles.header}>
          <BackButton color={Colors.light.mainDarkColor} />
          <Text style={styles.headerTitle}>{title}</Text>
          <View style={styles.headerSpacer} />
        </View>

        {/* Content */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {subtitle && (
            <View style={styles.subtitleContainer}>
              <Text style={styles.subtitle}>{subtitle}</Text>
            </View>
          )}

          {sections.map((section, index) => (
            <View key={index} style={styles.section}>
              {section.title && (
                <Text style={styles.sectionTitle}>{section.title}</Text>
              )}
              {section.content && (
                <Text style={styles.sectionContent}>{section.content}</Text>
              )}
              {section.items && section.items.length > 0 && (
                <View style={styles.itemsContainer}>
                  {section.items.map((item, itemIndex) => (
                    <View key={itemIndex} style={styles.itemRow}>
                      <Text style={styles.bullet}>• </Text>
                      <Text style={styles.itemText}>{item}</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          ))}
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
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(8),
    backgroundColor: Colors.light.scaffold,
  },
  headerTitle: {
    ...AppTextStyle.headline4,
    fontFamily: AeonikFonts.medium,
    color: Colors.light.mainDarkColor,
    flex: 1,
    textAlign: "center",
    marginHorizontal: scale(8),
  },
  headerSpacer: {
    width: scale(40),
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: scale(20),
    paddingBottom: verticalScale(40),
  },
  subtitleContainer: {
    marginBottom: verticalScale(24),
  },
  subtitle: {
    fontSize: moderateScale(17),
    fontFamily: AeonikFonts.regular,
    color: Colors.light.mainDarkColor,
    lineHeight: moderateScale(20),
  },
  section: {
    marginBottom: verticalScale(24),
  },
  sectionTitle: {
    fontSize: moderateScale(20),
    fontFamily: AeonikFonts.bold,
    color: Colors.light.mainDarkColor,
    marginBottom: verticalScale(12),
    lineHeight: moderateScale(22),
  },
  sectionContent: {
    fontSize: moderateScale(16),
    fontFamily: AeonikFonts.regular,
    color: Colors.light.mainDarkColor,
    lineHeight: moderateScale(20),
    marginBottom: verticalScale(8),
  },
  itemsContainer: {
    marginTop: verticalScale(8),
  },
  itemRow: {
    flexDirection: "row",
    marginBottom: verticalScale(8),
  },
  bullet: {
    fontSize: moderateScale(17),
    fontFamily: AeonikFonts.regular,
    color: Colors.light.mainDarkColor,
    marginEnd: scale(4),
    lineHeight: moderateScale(20),
  },
  itemText: {
    fontSize: moderateScale(17),
    fontFamily: AeonikFonts.regular,
    color: Colors.light.mainDarkColor,
    flex: 1,
    lineHeight: moderateScale(20),
  },
});
