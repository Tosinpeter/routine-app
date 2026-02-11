import React from "react";
import { View, StyleSheet } from "react-native";
import { Colors } from "@/constants/theme";
import { scale, verticalScale } from "@/constants/scaling";

interface QuizProgressBarProps {
  progress: number; // 0-100
}

export function QuizProgressBar({ progress }: QuizProgressBarProps) {
  return (
    <View style={styles.container}>
      <View style={styles.progressBarBackground}>
        <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: verticalScale(5),
    flex: 1,
  },
  progressBarBackground: {
    height: verticalScale(16),
    backgroundColor: Colors.light.white,
    borderRadius: 999,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#2F46FF",
    borderRadius: 999,
  },
});
