import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { AppText as Text } from "@/components/app-text";
import { moderateScale, scale, verticalScale } from "@/constants/scaling";
import { AeonikFonts, Colors } from "@/constants/theme";
import { AppTextStyle } from "@/constants/typography";
import { useProfile } from "@/hooks/use-profile";
import { t } from "@/i18n";

const genderOptions: { label: string; value: "male" | "female" | "other" }[] = [
  { label: t("profileDetails.gender.male"), value: "male" },
  { label: t("profileDetails.gender.female"), value: "female" },
  { label: t("profileDetails.gender.other"), value: "other" },
];

export default function SelectGenderScreen() {
  const { profile, isUpdating, updateProfile } = useProfile();

  const handleSelectGender = async (gender: "male" | "female" | "other") => {
    const success = await updateProfile({ gender });
    if (success) {
      router.back();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.handle} />

      <View style={styles.header}>
        <Text style={styles.title}>{t("profileDetails.gender.title")}</Text>
        <TouchableOpacity
          onPress={() => router.back()}
          hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
        >
          <Ionicons
            name="close"
            size={scale(24)}
            color={Colors.light.mainDarkColor}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.optionsList}>
        {genderOptions.map((option) => {
          const isSelected =
            profile?.gender?.toLowerCase() === option.value;
          return (
            <TouchableOpacity
              key={option.value}
              style={[styles.option, isSelected && styles.optionSelected]}
              onPress={() => handleSelectGender(option.value)}
              activeOpacity={0.7}
              disabled={isUpdating}
            >
              <Text
                style={[
                  styles.optionText,
                  isSelected && styles.optionTextSelected,
                ]}
              >
                {option.label}
              </Text>
              {isSelected && (
                <Ionicons
                  name="checkmark-circle"
                  size={scale(22)}
                  color={Colors.light.tint}
                />
              )}
            </TouchableOpacity>
          );
        })}
      </View>

      {isUpdating && (
        <ActivityIndicator
          size="small"
          color={Colors.light.tint}
          style={styles.loader}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.white,
    paddingHorizontal: scale(24),
  },
  handle: {
    width: scale(36),
    height: verticalScale(4),
    backgroundColor: Colors.light.grey200,
    borderRadius: scale(2),
    alignSelf: "center",
    marginTop: verticalScale(8),
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: verticalScale(20),
    marginBottom: verticalScale(16),
  },
  title: {
    ...AppTextStyle.headline5,
    fontFamily: AeonikFonts.medium,
    color: Colors.light.mainDarkColor,
  },
  optionsList: {
    gap: verticalScale(4),
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: verticalScale(16),
    paddingHorizontal: scale(16),
    borderRadius: scale(12),
  },
  optionSelected: {
    backgroundColor: "#F5F5F5",
  },
  optionText: {
    fontSize: moderateScale(16),
    fontFamily: AeonikFonts.regular,
    color: Colors.light.mainDarkColor,
  },
  optionTextSelected: {
    fontFamily: AeonikFonts.medium,
    color: Colors.light.tint,
  },
  loader: {
    marginTop: verticalScale(8),
  },
});
