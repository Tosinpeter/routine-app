import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";
import { scale, verticalScale } from "@/constants/scaling";
import { Colors, Shadows } from "@/constants/theme";

interface ShimmerProps {
  width?: number | string;
  height?: number | string;
  borderRadius?: number;
  style?: any;
}

function ShimmerBox({ width, height, borderRadius = scale(8), style }: ShimmerProps) {
  const shimmerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(shimmerAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [shimmerAnim]);

  const opacity = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  });

  return (
    <Animated.View
      style={[
        {
          width,
          height,
          borderRadius,
          backgroundColor: Colors.light.grey200,
          opacity,
        },
        style,
      ]}
    />
  );
}

export function RoutineStepShimmer() {
  return (
    <View style={styles.stepCard}>
      <View style={styles.stepHeader}>
        <ShimmerBox width={scale(40)} height={scale(40)} borderRadius={scale(20)} />
        <View style={styles.stepHeaderText}>
          <ShimmerBox width={scale(80)} height={scale(14)} />
          <ShimmerBox width={scale(120)} height={scale(18)} style={{ marginTop: verticalScale(4) }} />
        </View>
      </View>

      <View style={styles.productInfo}>
        <ShimmerBox width={scale(64)} height={scale(64)} borderRadius={scale(8)} />
        <View style={styles.productDetails}>
          <ShimmerBox width="70%" height={scale(16)} />
          <ShimmerBox width="90%" height={scale(14)} style={{ marginTop: verticalScale(6) }} />
          <ShimmerBox width="50%" height={scale(12)} style={{ marginTop: verticalScale(8) }} />
        </View>
      </View>

      <View style={styles.progressSection}>
        <ShimmerBox width="100%" height={scale(8)} borderRadius={scale(4)} />
        <View style={styles.progressLabels}>
          <ShimmerBox width={scale(60)} height={scale(12)} />
          <ShimmerBox width={scale(40)} height={scale(12)} />
        </View>
      </View>
    </View>
  );
}

export function DaySelectorShimmer() {
  return (
    <View style={styles.daySelector}>
      {[1, 2, 3, 4, 5, 6, 7].map((i) => (
        <ShimmerBox
          key={i}
          width={scale(44)}
          height={scale(44)}
          borderRadius={scale(32)}
        />
      ))}
    </View>
  );
}

export function RoutineShimmer() {
  return (
    <View style={styles.container}>
      {/* Greeting Shimmer */}
      <ShimmerBox width={scale(200)} height={scale(32)} style={{ marginBottom: verticalScale(24) }} />

      {/* Day Selector Shimmer */}
      <DaySelectorShimmer />

      {/* Time Toggle Shimmer */}
      <ShimmerBox
        width="100%"
        height={verticalScale(56)}
        borderRadius={scale(100)}
        style={{ marginTop: verticalScale(24) }}
      />

      {/* Routine Steps Shimmer */}
      <View style={{ marginTop: verticalScale(24) }}>
        <RoutineStepShimmer />
        <RoutineStepShimmer />
        <RoutineStepShimmer />
        <RoutineStepShimmer />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: verticalScale(24),
    paddingHorizontal: scale(16),
  },
  daySelector: {
    flexDirection: "row",
    gap: scale(12),
  },
  stepCard: {
    backgroundColor: Colors.light.white,
    borderRadius: scale(16),
    padding: scale(16),
    marginBottom: verticalScale(12),
    ...Shadows.md,
  },
  stepHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: verticalScale(12),
  },
  stepHeaderText: {
    marginLeft: scale(12),
    flex: 1,
  },
  productInfo: {
    flexDirection: "row",
    marginBottom: verticalScale(16),
  },
  productDetails: {
    marginLeft: scale(12),
    flex: 1,
    justifyContent: "center",
  },
  progressSection: {
    marginTop: verticalScale(8),
  },
  progressLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: verticalScale(8),
  },
});
