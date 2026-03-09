import React from "react";
import { StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import { AppText as Text } from "@/components/app-text";
import { scale, moderateScale } from "@/constants/scaling";
import { AeonikFonts, Colors } from "@/constants/theme";
import { AppTextStyle } from "@/constants/typography";
import { t } from "@/i18n";

interface ProfileHeaderProps {
  name: string;
  age: number;
  profileImage?: string;
}

export function ProfileHeader({ name, age, profileImage }: ProfileHeaderProps) {
  return (
    <View style={styles.container}>
      <View>
        {profileImage ? (
          <Image source={{ uri: profileImage }} style={styles.profileImage} />
        ) : (
          <View style={[styles.profileImage, styles.profileImagePlaceholder]}>
            <Text style={styles.initials}>{name.charAt(0)}</Text>
          </View>
        )}
      </View>
      <View>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.age}>{t("profile.yearsOld", { age: age })}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: scale(16),
    backgroundColor: Colors.light.white,
    borderRadius: scale(16),
    marginBottom: scale(24),
    gap: scale(12),
  },
 
  profileImage: {
    width: scale(56),
    height: scale(56),
    borderRadius: scale(28),
  },
  profileImagePlaceholder: {
    backgroundColor: Colors.light.tint,
    alignItems: "center",
    justifyContent: "center",
  },
  initials: {
    fontSize: moderateScale(24),
    fontFamily: AeonikFonts.bold,
    color: Colors.light.white,
  },

  name: {
    ...AppTextStyle.headline6,
    fontFamily: AeonikFonts.medium,
    color: Colors.light.mainDarkColor,
    marginBottom: scale(4),
  },
  age: {
    ...AppTextStyle.bodyText1,
    fontFamily: AeonikFonts.regular,
    color: Colors.light.grey500,
  },
});
