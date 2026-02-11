import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity } from "react-native";

import { AppText as Text } from "@/components/app-text";
import { scale, scaleIcon, verticalScale } from "@/constants/scaling";
import { BorderRadius, Colors, Fonts } from "@/constants/theme";
import { AppTextStyle } from "@/constants/typography";

export interface TimeToggleButtonProps {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  isActive: boolean;
  onPress: () => void;
}

export function TimeToggleButton({
  label,
  icon,
  isActive,
  onPress,
}: TimeToggleButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.timeToggle, isActive && styles.timeToggleActive]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Ionicons
        name={icon}
        size={scaleIcon(20)}
        color={isActive ? Colors.light.white : Colors.light.grey500}
      />
      <Text style={[styles.timeToggleText, isActive && styles.timeToggleTextActive]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  timeToggle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(20),
    flex: 1,
    borderRadius: BorderRadius.full,
    gap: scale(6),
  },
  timeToggleActive: {
    backgroundColor: Colors.light.tint,
  },
  timeToggleText: {
    ...AppTextStyle.subtitle2,
    fontFamily: Fonts.medium,
    color: Colors.light.grey500,
  },
  timeToggleTextActive: {
    color: Colors.light.white,
  },
});
