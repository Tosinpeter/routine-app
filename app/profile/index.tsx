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
      <View style={styles.bgSolid} />

      <SafeAreaView style={styles.safeArea} edges={["top"]}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Profile Header */}
          <ProfileHeader
            name="Sarah Islam"
            age={24}
          // You can pass a profileImage URL here when available
          />

          {/* Account Section - First Group */}
          <ProfileSection title={t("profile.account")}>
            <ProfileMenuItem
              icon={
                <ProfileMenuIcon
                  size={scale(24)}
                  color={Colors.light.mainDarkColor}
                />
              }
              title={t("profile.profile")}
              onPress={() => {
                router.push("/profile/profile-details");
              }}
            />
            <View style={styles.divider} />
            <ProfileMenuItem
              icon={
                <AddressIcon
                  size={scale(24)}
                  color={Colors.light.mainDarkColor}
                />
              }
              title={t("profile.savedAddress")}
              onPress={() => {
                router.push("/profile/saved-address");
              }}
            />
            <View style={styles.divider} />
            <ProfileMenuItem
              icon={
                <OrderIcon
                  size={scale(24)}
                  color={Colors.light.mainDarkColor}
                />
              }
              title={t("profile.orderHistory")}
              onPress={() => {
                router.push("/order/history");
              }}
            />
            <View style={styles.divider} />
            <ProfileMenuItem
              icon={
                <SkinProgressIcon
                  size={scale(24)}
                  color={Colors.light.mainDarkColor}
                />
              }
              title={t("profile.skinProgress")}
              onPress={() => {
                // Navigate to skin progress
              }}
            />
          </ProfileSection>

          {/* Account Section - Second Group */}
          <ProfileSection title={t("profile.account")}>
            <ProfileMenuItem
              icon={
                <HistoryIcon
                  size={scale(24)}
                  color={Colors.light.mainDarkColor}
                />
              }
              title={t("profile.history")}
              onPress={() => {
                // Navigate to history
              }}
            />
            <View style={styles.divider} />
            <ProfileMenuItem
              icon={
                <ClinicTestMenuIcon
                  size={scale(24)}
                  color={Colors.light.mainDarkColor}
                />
              }
              title={t("profile.clinicTest")}
              onPress={() => {
                router.push("/lab-test");
              }}
            />
            <View style={styles.divider} />
            <ProfileMenuItem
              icon={
                <DoctorReviewIcon
                  size={scale(24)}
                  color={Colors.light.mainDarkColor}
                />
              }
              title={t("profile.doctorReview")}
              onPress={() => {
                // Navigate to doctor review
              }}
            />
            <View style={styles.divider} />
            <ProfileMenuItem
              icon={
                <TreatmentStartsIcon
                  size={scale(24)}
                  color={Colors.light.mainDarkColor}
                />
              }
              title={t("profile.treatmentStarts")}
              onPress={() => {
                // Navigate to treatment starts
              }}
            />
          </ProfileSection>

          {/* Need Help Section */}
          <ProfileSection title={t("profile.needHelp")}>
            <ProfileMenuItem
              icon={
                <EmergencySupportIcon
                  size={scale(24)}
                  color={Colors.light.mainDarkColor}
                />
              }
              title={t("profile.emergencySupport")}
              onPress={() => {
                router.push("/profile/support");
              }}
            />
            <View style={styles.divider} />
            <ProfileMenuItem
              icon={
                <FAQIcon
                  size={scale(24)}
                  color={Colors.light.mainDarkColor}
                />
              }
              title={t("profile.faq")}
              onPress={() => {
                router.push("/profile/faq");
              }}
            />
          </ProfileSection>

          {/* Setting Section */}
          <ProfileSection title={t("profile.setting")}>
            <ProfileMenuItem
              icon={
                <LanguageIcon
                  size={scale(24)}
                  color={Colors.light.mainDarkColor}
                />
              }
              title={t("profile.language")}
              onPress={() => {
                router.push("/profile/language");
              }}
            />
            <View style={styles.divider} />
            <ProfileMenuItem
              icon={
                <PermissionsIcon
                  size={scale(24)}
                  color={Colors.light.mainDarkColor}
                />
              }
              title={t("profile.permissions")}
              onPress={() => {
                router.push("/profile/permissions");
              }}
            />
          </ProfileSection>

          {/* Legal Section */}
          <ProfileSection title={t("profile.legal")}>
            <ProfileMenuItem
              icon={
                <PrivacyIcon
                  size={scale(24)}
                  color={Colors.light.mainDarkColor}
                />
              }
              title={t("profile.privacy")}
              onPress={() => {
                router.push("/profile/privacy-policy");
              }}
            />
            <View style={styles.divider} />
            <ProfileMenuItem
              icon={
                <TermsIcon
                  size={scale(24)}
                  color={Colors.light.mainDarkColor}
                />
              }
              title={t("profile.termsOfUse")}
              onPress={() => {
                router.push("/profile/terms-of-use");
              }}
            />
          </ProfileSection>

          {/* Log Out Button */}
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={() => {
              // Handle logout
            }}
            activeOpacity={0.7}
          >
            <Text style={styles.logoutText}>{t("profile.logOut")}</Text>
          </TouchableOpacity>
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: scale(16),
    paddingBottom: tabBarHeight + scale(40),
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "rgba(84, 84, 86, 0.34)",
  },
  logoutButton: {
    backgroundColor: Colors.light.white,
    borderRadius: scale(16),
    paddingVertical: scale(16),
    alignItems: "center",
    justifyContent: "center",
    marginBottom: scale(24),
  },
  logoutText: {
    fontSize: moderateScale(17),
    fontFamily: AeonikFonts.medium,
    color: Colors.light.mainDarkColor,
  },
});
