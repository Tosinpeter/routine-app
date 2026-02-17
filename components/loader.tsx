import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, View, ViewStyle } from "react-native";
import { Image } from "expo-image";
import { scale } from "@/constants/scaling";

interface LoaderProps {
  size?: number;
  style?: ViewStyle;
}

export function Loader({ size = 164, style }: LoaderProps) {
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Start infinite rotation animation
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      })
    ).start();
  }, [rotateAnim]);

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={[styles.container, style]}>
      <Animated.View
        style={{
          transform: [{ rotate }],
        }}
      >
        <Image
          source={require("@/assets/images/img_LoaderIndicator.png")}
          style={[styles.image, { width: scale(size), height: scale(size) }]}
          contentFit="cover"
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    // Size is set dynamically via props
  },
});
