import { useEffect } from "react";
import { View } from "react-native";
import Animated, {
  Easing,
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Svg, { Circle, Defs, LinearGradient, Stop } from "react-native-svg";

import { Colors } from "@/constants/theme";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export interface GradientProgressRingProps {
  size?: number;
  strokeWidth?: number;
  progress?: number;
  children?: React.ReactNode;
}

export function GradientProgressRing({
  size = 80,
  strokeWidth = 6,
  progress = 0.75,
  children,
}: GradientProgressRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const animatedProgress = useSharedValue(0);

  useEffect(() => {
    animatedProgress.value = withTiming(progress, {
      duration: 1000,
      easing: Easing.out(Easing.cubic),
    });
  }, [progress]);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: circumference * (1 - animatedProgress.value),
  }));

  return (
    <View style={{ width: size, height: size, alignItems: "center", justifyContent: "center" }}>
      <Svg width={size} height={size} style={{ position: "absolute" }}>
        <Defs>
          <LinearGradient id="progressGradient" x1="100%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0%" stopColor={Colors.light.gradientPurple} />
            <Stop offset="100%" stopColor={Colors.light.gradientBlue} />
          </LinearGradient>
        </Defs>
        {/* Background circle */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={Colors.light.lightGrey100}
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        {/* Progress circle with gradient */}
        <AnimatedCircle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="url(#progressGradient)"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          animatedProps={animatedProps}
          strokeLinecap="round"
          rotation="-90"
          origin={`${size / 2}, ${size / 2}`}
        />
      </Svg>
      {children}
    </View>
  );
}
