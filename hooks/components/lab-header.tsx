import { Image } from "expo-image";
import { StyleSheet, View } from "react-native";

import { LogoContentsIcon } from "@/components/icons";
import { scale, scaledRadius, SCREEN_WIDTH, verticalScale } from "@/constants/scaling";
import { BorderRadius, Colors, Shadows } from "@/constants/theme";

export interface LabHeaderProps {
  imageSource: number | { uri: string };
}

export function LabHeader({ imageSource }: LabHeaderProps) {
  return (
    <View style={styles.headerImageContainer}>
      <Image
        source={imageSource}
        style={styles.headerImage}
        contentFit="cover"
      />
      {/* Logo Icon */}
      <View style={styles.logoContainer}>
        <View style={styles.logoIcon}>
          <LogoContentsIcon />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerImageContainer: {
    width: SCREEN_WIDTH,
    height: verticalScale(270),
    position: "relative",
  },
  headerImage: {
    width: "100%",
    height: "100%",
  },
  logoContainer: {
    position: "absolute",
    borderRadius: scaledRadius(18),
    borderWidth: 2,
    borderColor: Colors.light.white,
    bottom: scale(-40),
    left: scale(24),
  },
  logoIcon: {
    width: scale(78),
    height: scale(77),
    borderRadius: BorderRadius.lg,
    backgroundColor: Colors.light.tint,
    alignItems: "center",
    justifyContent: "center",
    ...Shadows.lg,
  },
});
