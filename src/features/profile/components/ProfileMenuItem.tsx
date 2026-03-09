import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AppText as Text } from "@/components/app-text";
import { scale, moderateScale } from "@/constants/scaling";
import { AeonikFonts, Colors } from "@/constants/theme";

interface ProfileMenuItemProps {
  icon: React.ReactNode;
  title: string;
  onPress?: () => void;
}

export function ProfileMenuItem({ icon, title, onPress }: ProfileMenuItemProps) {
  return (
    <TouchableOpacity
      style={styles.menuItem}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.leftContent}>
        <View style={styles.iconContainer}>{icon}</View>
        <Text style={styles.title}>{title}</Text>
      </View>
      <Ionicons
        name="chevron-forward"
        size={scale(20)}
        color={Colors.light.mainDarkColor}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: scale(16),
    paddingHorizontal: scale(16),
    backgroundColor: Colors.light.white,
  },
  leftContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(12),
  },
  iconContainer: {
    width: scale(24),
    height: scale(24),
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: moderateScale(17),
    fontFamily: AeonikFonts.regular,
    color: Colors.light.mainDarkColor,
  },
});
