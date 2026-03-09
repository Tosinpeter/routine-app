import { StyleSheet, View } from "react-native";

import { AppText as Text } from "@/components/app-text";
import { scale, verticalScale } from "@/constants/scaling";
import { Fonts } from "@/constants/theme";

interface InfoCardProps {
  title: string;
  icon: React.ReactNode;
  titleColor: string;
  backgroundColor: string;
  borderColor: string;
  textColor?: string;
  children: React.ReactNode;
}

export function InfoCard({
  title,
  icon,
  titleColor,
  backgroundColor,
  borderColor,
  textColor,
  children,
}: InfoCardProps) {
  return (
    <View style={[styles.card, { backgroundColor, borderColor }]}>
      <View style={styles.header}>
        {icon}
        <Text style={[styles.title, { color: titleColor }]}>{title}</Text>
      </View>
      <View style={textColor ? { color: textColor } as any : undefined}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: scale(12),
    padding: scale(16),
    marginBottom: verticalScale(12),
    borderWidth: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(8),
    marginBottom: verticalScale(8),
  },
  title: {
    fontFamily: Fonts.semibold,
    fontSize: scale(16),
  },
});
