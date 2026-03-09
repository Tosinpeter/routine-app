import React, { useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  Modal,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";

import { ThemedView } from "@/components/themed-view";
import { AppText as Text } from "@/components/app-text";
import { AppTextInput as TextInput } from "@/components/app-text-input";
import { PrimaryButton } from "@/components/primary-button";

import { scale, moderateScale, tabBarHeight, verticalScale } from "@/constants/scaling";
import { Colors, AeonikFonts, Fonts } from "@/constants/theme";
import { BackButton } from "@/components/back-button";
import { AppTextStyle } from "@/constants/typography";
import { useProfile } from "@/hooks/use-profile";
import { t } from "@/i18n";

interface ProfileFieldProps {
  label: string;
  value: string;
  onPress?: () => void;
}

function ProfileField({ label, value, onPress }: ProfileFieldProps) {
  return (
    <TouchableOpacity
      style={styles.fieldItem}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={styles.fieldLabel}>{label}</Text>
      <View style={styles.fieldRight}>
        <Text style={styles.fieldValue} numberOfLines={2}>
          {value}
        </Text>
        <Ionicons
          name="chevron-forward"
          size={scale(20)}
          color={Colors.light.grey400}
        />
      </View>
    </TouchableOpacity>
  );
}

export default function ProfileDetailsScreen() {
  const { profile, isLoading, isUpdating, error, fetchProfile, updateProfile } = useProfile();
  const [showNameModal, setShowNameModal] = useState(false);
  const [tempName, setTempName] = useState("");

  // Fetch profile data on mount if not already loaded
  useEffect(() => {
    if (!profile && !isLoading) {
      fetchProfile();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOpenNameModal = () => {
    setTempName(profile?.fullname || "");
    setShowNameModal(true);
  };

  const handleSaveName = async () => {
    if (tempName.trim()) {
      const success = await updateProfile({ fullname: tempName.trim() });
      if (success) {
        setShowNameModal(false);
      }
    }
  };

  const handleCancelNameEdit = () => {
    setShowNameModal(false);
    setTempName("");
  };

  // Show loading state
  if (isLoading && !profile) {
    return (
      <ThemedView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.light.tint} />
          <Text style={styles.loadingText}>{t("profileDetails.loading")}</Text>
        </View>
      </ThemedView>
    );
  }

  // Show error state
  if (error && !profile) {
    return (
      <ThemedView style={styles.container}>
        <View style={styles.errorContainer}>
          <Ionicons
            name="alert-circle-outline"
            size={scale(48)}
            color={Colors.light.destructive}
          />
          <Text style={styles.errorTitle}>{t("profileDetails.error.title")}</Text>
          <Text style={styles.errorMessage}>{error}</Text>
          <PrimaryButton
            title={t("common.retry")}
            onPress={() => fetchProfile()}
            style={styles.retryButton}
          />
        </View>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <View style={styles.bgSolid} />

      <SafeAreaView style={styles.safeArea} edges={["top"]}>
        {/* Header */}
        <View style={styles.header}>
          <BackButton style={styles.backButton} />
          <View style={styles.placeholder} />
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Profile Card */}
          <View style={styles.profileCard}>
            {/* Face Scan Section */}
            <View style={styles.faceScanSection}>
              <Text style={styles.faceScanLabel}>{t("profileDetails.faceScan")}</Text>
              <TouchableOpacity
                style={styles.avatarContainer}
                onPress={() => {
                  router.push('/face-scan/history');                }}
              >
                <Image
                  source={require("@/assets/images/UserAvatar2.png")}
                  style={styles.avatar}
                  contentFit="cover"
                />
              </TouchableOpacity>
            </View>

            {/* Profile Fields */}
            <View style={styles.fieldsContainer}>
              <ProfileField
                label={t("profileDetails.fields.targetGoal")}
                value={profile?.targetGoal || t("common.notSet")}
                onPress={() => {
                  // Navigate to target goal selection
                }}
              />
              
              <View style={styles.divider} />
              
              <ProfileField
                label={t("profileDetails.fields.name")}
                value={profile?.fullname || t("common.notSet")}
                onPress={handleOpenNameModal}
              />
              
              <View style={styles.divider} />
              
              <ProfileField
                label={t("profileDetails.fields.gender")}
                value={profile?.gender || t("common.notSet")}
                onPress={() => router.push("/profile/select-gender")}
              />
              
              <View style={styles.divider} />
              
              <ProfileField
                label={t("profileDetails.fields.age")}
                value={profile?.age || t("common.notSet")}
                onPress={() => {
                  // Navigate to age selection
                }}
              />
              
              <View style={styles.divider} />
              
              <ProfileField
                label={t("profileDetails.fields.skinType")}
                value={profile?.skinType || t("common.notSet")}
                onPress={() => router.push("/quiz")}
              />
              
              <View style={styles.divider} />
              
              <ProfileField
                label={t("profileDetails.fields.skinSensitivity")}
                value={profile?.skinSensitivity ? t("common.yes") : t("common.no")}
                onPress={() => {
                  // Navigate to skin sensitivity selection
                }}
              />
              
              <View style={styles.divider} />
              
              <ProfileField
                label={t("profileDetails.fields.skinConcerns")}
                value={
                  profile?.skinConcerns && profile.skinConcerns.length > 0
                    ? profile.skinConcerns.join(", ")
                    : t("common.notSet")
                }
                onPress={() => router.push("/quiz")}
              />
              
              <View style={styles.divider} />
              
              <ProfileField
                label={t("profileDetails.fields.skinConditions")}
                value={profile?.skinConditions || t("common.notSet")}
                onPress={() => router.push("/quiz")}
              />
              
              <View style={styles.divider} />
              
              <ProfileField
                label={t("profileDetails.fields.healthConditions")}
                value={profile?.healthConditions || t("common.notSet")}
                onPress={() => router.push("/quiz")}
              />
              
              <View style={styles.divider} />
              
              <ProfileField
                label={t("profileDetails.fields.focusFaceArea")}
                value={
                  profile?.focusFaceArea && profile.focusFaceArea.length > 0
                    ? profile.focusFaceArea.join(", ")
                    : t("common.notSet")
                }
                onPress={() => {
                  // Navigate to focus face area selection
                }}
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>

      {/* Edit Name Modal */}
      <Modal
        visible={showNameModal}
        transparent
        animationType="fade"
        onRequestClose={handleCancelNameEdit}
      >
        <KeyboardAvoidingView
          style={styles.modalOverlay}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <TouchableOpacity
            style={styles.modalBackdrop}
            activeOpacity={1}
            onPress={handleCancelNameEdit}
          />
          <View style={styles.modalContent}>
            {/* Modal Header */}
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{t("profileDetails.modal.editName")}</Text>
              <TouchableOpacity
                onPress={handleCancelNameEdit}
                hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
              >
                <Ionicons
                  name="close"
                  size={scale(24)}
                  color={Colors.light.mainDarkColor}
                />
              </TouchableOpacity>
            </View>

            {/* Input Field */}
            <View style={styles.modalBody}>
              <Text style={styles.inputLabel}>{t("profileDetails.fields.name")}</Text>
              <TextInput
                style={styles.nameInput}
                value={tempName}
                onChangeText={setTempName}
                placeholder={t("profileDetails.modal.namePlaceholder")}
                placeholderTextColor={Colors.light.grey400}
                autoFocus
                returnKeyType="done"
                onSubmitEditing={handleSaveName}
              />
            </View>

            {/* Modal Actions */}
            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={handleCancelNameEdit}
                activeOpacity={0.7}
              >
                <Text style={styles.cancelButtonText}>{t("common.cancel")}</Text>
              </TouchableOpacity>
              <View style={styles.buttonSpacer} />
              <PrimaryButton
                title={t("common.save")}
                onPress={handleSaveName}
                style={styles.saveButton}
                loading={isUpdating}
                disabled={isUpdating || !tempName.trim()}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>

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
    backgroundColor: Colors.light.scaffold,
  },
  backButton: {
    padding: scale(8),
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
  profileCard: {
    backgroundColor: Colors.light.white,
    borderRadius: scale(16),
    overflow: "hidden",
  },
  faceScanSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: scale(16),
    paddingVertical: scale(16),
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.light.grey200,
  },
  faceScanLabel: {
    fontSize: moderateScale(13),
    fontFamily: Fonts.semibold,
    color: Colors.light.mainDarkColor,
  },
  avatarContainer: {
    width: scale(56),
    height: scale(56),
    borderRadius: scale(12),
    overflow: "hidden",
  },
  avatar: {
    width: "100%",
    height: "100%",
  },
  fieldsContainer: {
    // Container for all profile fields
  },
  fieldItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: scale(16),
    paddingVertical: scale(16),
  },
  fieldLabel: {
    ...AppTextStyle.subtitle2,
    fontFamily: Fonts.medium,
    color: Colors.light.mainDarkColor,
    flex: 0,
    marginEnd: scale(16),
  },
  fieldRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(8),
    flex: 1,
    justifyContent: "flex-end",
  },
  fieldValue: {
    fontSize: moderateScale(13),
    fontFamily: Fonts.medium,
    textAlign: "left",
    lineHeight: moderateScale(20),
    maxHeight: moderateScale(40),
    flexShrink: 1,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.light.grey200,
    marginStart: scale(16),
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.light.overlay,
  },
  modalContent: {
    backgroundColor: Colors.light.white,
    borderRadius: scale(20),
    width: "85%",
    maxWidth: scale(400),
    padding: scale(24),
    ...Platform.select({
      ios: {
        shadowColor: Colors.light.black,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 16,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: verticalScale(24),
  },
  modalTitle: {
    ...AppTextStyle.headline5,
    fontFamily: AeonikFonts.medium,
    color: Colors.light.mainDarkColor,
  },
  modalBody: {
    marginBottom: verticalScale(24),
  },
  inputLabel: {
    fontSize: moderateScale(14),
    fontFamily: AeonikFonts.medium,
    color: Colors.light.mainDarkColor,
    marginBottom: verticalScale(8),
  },
  nameInput: {
    height: verticalScale(52),
    borderWidth: 1,
    borderColor: Colors.light.grey200,
    borderRadius: scale(12),
    paddingHorizontal: scale(16),
    fontSize: moderateScale(16),
    fontFamily: AeonikFonts.regular,
    color: Colors.light.mainDarkColor,
    backgroundColor: Colors.light.white,
  },
  modalActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  cancelButton: {
    flex: 1,
    height: verticalScale(52),
    borderWidth: 1,
    borderColor: Colors.light.grey200,
    borderRadius: scale(28),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.light.white,
  },
  cancelButtonText: {
    fontSize: moderateScale(16),
    fontFamily: AeonikFonts.medium,
    color: Colors.light.mainDarkColor,
  },
  buttonSpacer: {
    width: scale(12),
  },
  saveButton: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: verticalScale(16),
  },
  loadingText: {
    fontSize: moderateScale(16),
    fontFamily: Fonts.medium,
    color: Colors.light.grey500,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: scale(32),
    gap: verticalScale(16),
  },
  errorTitle: {
    fontSize: moderateScale(20),
    fontFamily: Fonts.bold,
    color: Colors.light.mainDarkColor,
    textAlign: "center",
  },
  errorMessage: {
    fontSize: moderateScale(14),
    fontFamily: Fonts.regular,
    color: Colors.light.grey500,
    textAlign: "center",
  },
  retryButton: {
    marginTop: verticalScale(16),
    paddingHorizontal: scale(32),
  },
});
