import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { AppTextStyle } from "@/constants/typography";
import { AeonikFonts, Colors } from "@/constants/theme";
import { scale, verticalScale } from "@/constants/scaling";
import { t } from "@/i18n";
import { Image } from "expo-image";


export default function OrderErrorSheet() {
  const scaleProgress = useSharedValue(0);

  useEffect(() => {
    scaleProgress.value = withSpring(1, { damping: 7, stiffness: 50 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scaleStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scaleProgress.value }],
  }));

  return (
    <View style={styles.content}>
      <Animated.View style={scaleStyle}>
        <Image
          source={require("@/assets/images/ErrorBadge.png")}
          style={styles.errorImage}
          contentFit="contain"
        />
      </Animated.View>
      <Text style={styles.title}>{t("payment.orderError.title")}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingVertical: verticalScale(30),
    paddingHorizontal: scale(32),
    backgroundColor: Colors.light.white,
  },
  title: {
    ...AppTextStyle.subtitle1,
    textAlign: "center",
    marginTop: verticalScale(24),
    fontFamily: AeonikFonts.medium,
    // marginBottom: verticalScale(12),
  },
  errorImage: {
    height: scale(70), 
    alignSelf: 'center',
    width: scale(70),
  },
  message: {
    ...AppTextStyle.bodyText2,
    textAlign: "center",
    fontFamily: AeonikFonts.regular,
    color: Colors.light.grey500,
    marginBottom: verticalScale(24),
  },
  button: {
    alignSelf: "center",
  },
});
