import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import { AppText as Text } from "@/components/app-text";
import { scale, verticalScale } from "@/constants/scaling";
import { Colors, Fonts, Shadows } from "@/constants/theme";

interface ExpandableSectionProps {
  title: string;
  icon: string;
  iconColor: string;
  iconBgColor: string;
  children: React.ReactNode;
  defaultExpanded?: boolean;
}

export function ExpandableSection({
  title,
  icon,
  iconColor,
  iconBgColor,
  children,
  defaultExpanded = false,
}: ExpandableSectionProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <View style={styles.section}>
      <TouchableOpacity
        style={styles.sectionHeader}
        onPress={() => setIsExpanded(!isExpanded)}
        activeOpacity={0.7}
      >
        <View style={styles.sectionHeaderLeft}>
          <View style={[styles.iconContainer, { backgroundColor: iconBgColor }]}>
            <Ionicons name={icon as any} size={scale(16)} color={iconColor} />
          </View>
          <Text style={styles.sectionTitle}>{title}</Text>
        </View>
        <Ionicons
          name={isExpanded ? "chevron-up" : "chevron-down"}
          size={scale(20)}
          color={Colors.light.grey500}
        />
      </TouchableOpacity>

      {isExpanded && <View style={styles.sectionContent}>{children}</View>}
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    backgroundColor: Colors.light.white,
    borderRadius: scale(12),
    marginBottom: verticalScale(12),
    overflow: "hidden",
    ...Shadows.sm,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: scale(16),
  },
  sectionHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(12),
  },
  iconContainer: {
    width: scale(32),
    height: scale(32),
    borderRadius: scale(8),
    alignItems: "center",
    justifyContent: "center",
  },
  sectionTitle: {
    fontFamily: Fonts.semibold,
    fontSize: scale(16),
    color: Colors.light.mainDarkColor,
  },
  sectionContent: {
    paddingHorizontal: scale(16),
    paddingBottom: scale(16),
  },
});
