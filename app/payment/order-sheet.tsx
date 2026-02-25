import { scale, verticalScale } from "@/constants/scaling";
import { AeonikFonts, Colors } from "@/constants/theme";
import { AppTextStyle } from "@/constants/typography";
import { Image } from "expo-image";
import { router } from "expo-router";
import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";


export default function SuccessSheet() {
  const scaleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      tension: 50,
      friction: 7,
      useNativeDriver: true,
    }).start();

    const timeout = setTimeout(() => {
      router.replace("/payment/order-success");
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <View style={styles.content}>
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <Image
          source={require("@/assets/images/SuccessIconGroup.png")}
          style={styles.successImage}
          contentFit="contain"
        />
      </Animated.View>
      <Text style={styles.title}>{"Payment completed"}</Text>
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
