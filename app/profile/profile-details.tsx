import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  Modal,
  KeyboardAvoidingView,
  Platform,
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
  const [userName, setUserName] = useState("Aslam Uddin");
  const [showNameModal, setShowNameModal] = useState(false);
  const [tempName, setTempName] = useState("");

  const handleOpenNameModal = () => {
    setTempName(userName);
    setShowNameModal(true);
  };

  const handleSaveName = () => {
    if (tempName.trim()) {
      setUserName(tempName.trim());
      setShowNameModal(false);
    }
  };

  const handleCancelNameEdit = () => {
    setShowNameModal(false);
    setTempName("");
  };

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
              <Text style={styles.faceScanLabel}>Face Scan</Text>
              <TouchableOpacity
                style={styles.avatarContainer}
                onPress={() => {
                  router.push('/face-scan-history');                }}
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
                label="Target Goal"
                value="Oily Shine"
                onPress={() => {
                  // Navigate to target goal selection
                }}
              />
              
              <View style={styles.divider} />
              
              <ProfileField
                label="Name"
                value={userName}
                onPress={handleOpenNameModal}
              />
              
              <View style={styles.divider} />
              
              <ProfileField
                label="Gender"
                value="Male"
                onPress={() => {
                  // Navigate to gender selection
                }}
              />
              
              <View style={styles.divider} />
              
              <ProfileField
                label="Age"
                value="Under 25"
                onPress={() => {
                  // Navigate to age selection
                }}
              />
              
              <View style={styles.divider} />
              
              <ProfileField
                label="Skin Type"
                value="Combination"
                onPress={() => {
                  // Navigate to skin type selection
                }}
              />
              
              <View style={styles.divider} />
              
              <ProfileField
                label="Skin Sensitivity"
                value="False"
                onPress={() => {
                  // Navigate to skin sensitivity selection
                }}
              />
              
              <View style={styles.divider} />
              
              <ProfileField
                label="Skin Concerns"
                value="Wants moisture all the time, Tightness, Tiny wrinkles, Dull..."
                onPress={() => {
                  // Navigate to skin concerns selection
                }}
              />
              
              <View style={styles.divider} />
              
              <ProfileField
                label="Skin Conditions"
                value="No, I don't"
                onPress={() => {
                  // Navigate to skin conditions selection
                }}
              />
              
              <View style={styles.divider} />
              
              <ProfileField
                label="Health Conditions"
                value="No, I don't"
                onPress={() => {
                  // Navigate to health conditions selection
                }}
              />
              
              <View style={styles.divider} />
              
              <ProfileField
                label="Focus Face Area"
                value="Mouth, Nasolabial, Between the eyebrows, Forehead, Ey..."
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
              <Text style={styles.modalTitle}>Edit Name</Text>
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
              <Text style={styles.inputLabel}>Name</Text>
              <TextInput
                style={styles.nameInput}
                value={tempName}
                onChangeText={setTempName}
                placeholder="Enter your name"
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
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <View style={styles.buttonSpacer} />
              <PrimaryButton
                title="Save"
                onPress={handleSaveName}
                style={styles.saveButton}
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
    marginRight: scale(16),
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
    marginLeft: scale(16),
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
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
});
