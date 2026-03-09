import React, { useEffect } from "react";
import { ImageSourcePropType, StyleSheet, View, ViewStyle } from "react-native";
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { Image } from "expo-image";
import { scale } from "@/constants/scaling";

const DEFAULT_LOADER_IMAGE = require("@/assets/images/img_LoaderIndicator.png");

interface LoaderProps {
  size?: number;
  style?: ViewStyle;
  image?: ImageSourcePropType;
}

export function Loader({ size = 164, style, image = DEFAULT_LOADER_IMAGE }: LoaderProps) {
  const rotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(1, { duration: 2000, easing: Easing.linear }),
      -1,
      false
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { rotate: `${interpolate(rotation.value, [0, 1], [0, 360])}deg` },
    ],
  }));

  return (
    <View style={[styles.container, style]}>
      <Animated.View style={animatedStyle}>
        <Image
          source={image}
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
