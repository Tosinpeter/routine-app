import React from "react";
import {
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedView } from "@/components/themed-view";
import {
  scale,
  SCREEN_WIDTH,
  tabBarHeight,
  verticalScale,
} from "@/constants/scaling";
import { Colors } from "@/constants/theme";

// Import Views
import { HomeLockedView } from "@/components/home/HomeLockedView";
import { HomeUnlockedView } from "@/components/home/HomeUnlockedView";
import { StatusBar } from "expo-status-bar";
import { AppText as Text } from "@/components/app-text";
import { useAppSelector } from "@/store/hooks";

export default function HomeScreen() {
  const { homeData, isLoading, error } = useAppSelector((state) => state.home);

  const isUnlocked = homeData?.isUnlocked ?? true;

  // Loading happens in background - no loading screen
  // Data will populate when available

  if (error && !homeData) {
    return (
      <ThemedView style={styles.container}>
        <View style={styles.bgSolid} />
        <View style={[styles.safeArea, styles.centerContent]}>
          <Text style={styles.errorText}>Failed to load home data</Text>
          <Text style={styles.errorDetail}>{error}</Text>
        </View>
        <StatusBar style="dark" />
      </ThemedView>
    );
  }

  return (
    
    <ThemedView style={styles.container}>
      {/* Background Color forced to match design #EDEBE3 */}
      <View style={styles.bgSolid} />

      <SafeAreaView style={styles.safeArea} edges={["top"]}>
        {/* Background Texture/Image */}
        {/* <Image
          source={require("@/assets/images/img_background-effects.png")}
          style={styles.backgroundImage}
        /> */}

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {!isUnlocked ? (
            <HomeUnlockedView />
          ) : (
            <HomeLockedView />
          )}
        </ScrollView>
      </SafeAreaView>
      <StatusBar style="dark" />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.scaffold, // #EDEBE3
  },
  bgSolid: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.light.scaffold,
  },
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: tabBarHeight + scale(40),
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    alignSelf: "center",
    width: SCREEN_WIDTH,
    height: SCREEN_WIDTH,
    opacity: 0.5, // Subtle background effect
    zIndex: -1,
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: scale(20),
  },
  errorText: {
    fontFamily: 'Aeonik-Medium',
    fontSize: scale(18),
    color: '#20201E',
    marginBottom: verticalScale(8),
  },
  errorDetail: {
    fontFamily: 'Aeonik-Regular',
    fontSize: scale(14),
    color: '#666',
    textAlign: 'center',
  },
});

