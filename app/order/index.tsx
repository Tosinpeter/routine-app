import { router } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppText as Text } from "@/components/app-text";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { ProfileMenuItem } from "@/components/profile/ProfileMenuItem";
import { ProfileSection } from "@/components/profile/ProfileSection";
import { ThemedView } from "@/components/themed-view";
import { useTranslation } from "@/contexts/AppDataProvider";

import {
  AddressIcon,
  ClinicTestMenuIcon,
  DoctorReviewIcon,
  EmergencySupportIcon,
  FAQIcon,
  HistoryIcon,
  LanguageIcon,
  OrderIcon,
  PermissionsIcon,
  PrivacyIcon,
  ProfileMenuIcon,
  SkinProgressIcon,
  TermsIcon,
  TreatmentStartsIcon,
} from "@/components/icons";

import { moderateScale, scale, tabBarHeight } from "@/constants/scaling";
import { AeonikFonts, Colors } from "@/constants/theme";

export default function ProfileScreen() {
  const { t } = useTranslation();

  return (
    <ThemedView style={styles.container}>
     
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.scaffold,
  },
  
});
