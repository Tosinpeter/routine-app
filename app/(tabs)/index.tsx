import React, { useState } from "react";
import { Image } from "expo-image";
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
} from "@/constants/scaling";
import { Colors } from "@/constants/theme";

// Import Views
import { HomeLockedView } from "@/components/home/HomeLockedView";
import { HomeUnlockedView } from "@/components/home/HomeUnlockedView";

export default function HomeScreen() {
  // Demo State: Change this value to false to see Locked View
  const [isUnlocked] = useState(true);

  return (
    <ThemedView style={styles.container}>
      {/* Background Color forced to match design #EDEBE3 */}
      <View style={styles.bgSolid} />

      <SafeAreaView style={styles.safeArea} edges={["top"]}>
        {/* Background Texture/Image */}
        <Image
          source={require("@/assets/images/img_background-effects.png")}
          style={styles.backgroundImage}
        />

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {isUnlocked ? (
            <HomeUnlockedView />
          ) : (
            <HomeLockedView />
          )}
        </ScrollView>
      </SafeAreaView>
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
});

