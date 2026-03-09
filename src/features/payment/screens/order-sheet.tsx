import { scale, verticalScale } from "@/constants/scaling";
import { AeonikFonts, Colors } from "@/constants/theme";
import { AppTextStyle } from "@/constants/typography";
import { t } from "@/i18n";
import { Image } from "expo-image";
import { router } from "expo-router";
import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";


export default function SuccessSheet() {
  const scaleProgress = useSharedValue(0);

  useEffect(() => {
    scaleProgress.value = withSpring(1, { damping: 7, stiffness: 50 });

    const timeout = setTimeout(() => {
      router.replace("/payment/order-success");
    }, 1000);

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scaleStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scaleProgress.value }],
  }));

  return (
    <View style={styles.content}>
      <Animated.View style={scaleStyle}>
        <Image
          source={require("@/assets/images/SuccessIconGroup.png")}
          style={styles.successImage}
          contentFit="contain"
        />
      </Animated.View>
      <Text style={styles.title}>{t("payment.orderSheet.title")}</Text>
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
  },
  successImage: {
    height: scale(98),
    alignSelf: 'center',
    width: scale(110),
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
