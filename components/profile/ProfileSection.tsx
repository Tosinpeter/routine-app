import React from "react";
import { StyleSheet, View } from "react-native";
import { AppText as Text } from "@/components/app-text";
import { scale } from "@/constants/scaling";
import { AeonikFonts, Colors } from "@/constants/theme";
import { AppTextStyle } from "@/constants/typography";

interface ProfileSectionProps {
  title?: string;
  children: React.ReactNode;
}

export function ProfileSection({ title, children }: ProfileSectionProps) {
  return (
    <View style={styles.section}>
      {title && <Text style={styles.sectionTitle}>{title}</Text>}
      <View style={styles.sectionContent}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: scale(24),
  },
  sectionTitle: {
    ...AppTextStyle.bodyText1,
    fontFamily: AeonikFonts.regular,
    color: Colors.light.mainDarkColor,
    opacity: 0.5,
    marginBottom: scale(12),
  },
  sectionContent: {
    backgroundColor: Colors.light.white,
    borderRadius: scale(10),
    overflow: "hidden",
  },
});
