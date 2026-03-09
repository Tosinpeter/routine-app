import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StyleSheet, TouchableOpacity, ViewStyle } from "react-native";

import { scaleIcon, scaledRadius, touchTarget, verticalScale } from "@/constants/scaling";
import { Colors, HitSlop, Shadows } from "@/constants/theme";

interface BackButtonProps {
  onPress?: () => void;
  color?: string;
  style?: ViewStyle;
  variant?: "back" | "close";
}

export function BackButton({ 
  onPress, 
  color = Colors.light.text, 
  style,
  variant = "back" 
}: BackButtonProps) {
  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      router.back();
    }
  };

  const iconName = variant === "close" ? "close" : "arrow-back";

  return (
    <TouchableOpacity
      style={[styles.backButton, style]}
      onPress={handlePress}
      activeOpacity={0.7}
      hitSlop={HitSlop.small}
    >
      <Ionicons name={iconName} size={scaleIcon(24)} color={color} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  backButton: {
    width: touchTarget(40),
    height: touchTarget(40),
    alignSelf: 'flex-start',
    borderRadius: scaledRadius(100),
    backgroundColor: Colors.light.white,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: verticalScale(8),
    ...Shadows.md,
  },
});
