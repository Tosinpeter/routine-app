import React from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";

import { ThemedView } from "@/components/themed-view";
import { AppText as Text } from "@/components/app-text";

import { scale, moderateScale, tabBarHeight } from "@/constants/scaling";
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
                value="Aslam Uddin"
                onPress={() => {
                  // Navigate to name edit
                }}
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
});
