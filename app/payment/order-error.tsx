import React, { useEffect, useRef } from "react";
import { Animated, View, Text, StyleSheet } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { AppTextStyle } from "@/constants/typography";
import { AeonikFonts, Colors } from "@/constants/theme";
import { scale, verticalScale } from "@/constants/scaling";
import { PrimaryButton } from "@/components/primary-button";
import { t } from "@/i18n";
import { Image } from "expo-image";


export default function OrderErrorSheet() {
  const scaleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      tension: 50,
      friction: 7,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View style={styles.content}>
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <Image
          source={require("@/assets/images/ErrorBadge.png")}
          style={styles.errorImage}
          contentFit="contain"
        />
      </Animated.View>
      <Text style={styles.title}>{"Payment not completed"}</Text>
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
