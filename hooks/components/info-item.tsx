import { StyleSheet, View } from "react-native";

import { AppText as Text } from "@/components/app-text";
import { scale, scaledRadius, verticalScale } from "@/constants/scaling";
import { AeonikFonts, Colors } from "@/constants/theme";
import { AppTextStyle } from "@/constants/typography";

export interface InfoItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

export function InfoItem({ icon, label, value }: InfoItemProps) {
  return (
    <View style={styles.infoItem}>
      <View style={styles.infoIconContainer}>{icon}</View>
      <View style={styles.textContainer}>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue}>{value}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(10),
  },
  infoIconContainer: {
    width: scale(32),
    height: scale(32),
    borderRadius: scaledRadius(18),
    backgroundColor: Colors.light.white,
    alignItems: "center",
    justifyContent: "center",
  },
  textContainer: {
    flexShrink: 1,
  },
  infoLabel: {
    ...AppTextStyle.bodyText1,
    fontFamily: AeonikFonts.regular,
    color: Colors.light.grey800,
    marginBottom: verticalScale(2),
  },
  infoValue: {
    ...AppTextStyle.bodyText1,
    fontFamily: AeonikFonts.regular,
    color: Colors.light.grey600,
  },
});
