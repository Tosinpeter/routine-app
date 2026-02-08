import React from "react";
import { ScrollView, StyleSheet, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { ThemedView } from "@/components/themed-view";
import { AppText as Text } from "@/components/app-text";

import { scale, moderateScale, tabBarHeight } from "@/constants/scaling";
import { Colors, AeonikFonts } from "@/constants/theme";

export default function OrderHistoryScreen() {
  return (
    <ThemedView style={styles.container}>
      <View style={styles.bgSolid} />

      <SafeAreaView style={styles.safeArea} edges={["top"]}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
            hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
          >
            <Ionicons
              name="arrow-back"
              size={scale(24)}
              color={Colors.light.mainDarkColor}
            />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Order History</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.emptyState}>
            <Ionicons
              name="receipt-outline"
              size={scale(64)}
              color={Colors.light.grey400}
            />
            <Text style={styles.emptyTitle}>No orders yet</Text>
            <Text style={styles.emptyText}>
              Your order history will appear here
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.scaffold,
  },
  bgSolid: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.light.scaffold,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: scale(16),
    paddingVertical: scale(12),
    backgroundColor: Colors.light.scaffold,
  },
  backButton: {
    padding: scale(8),
  },
  headerTitle: {
    fontSize: moderateScale(20),
    fontFamily: AeonikFonts.bold,
    color: Colors.light.mainDarkColor,
  },
  placeholder: {
    width: scale(40),
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: scale(16),
    paddingBottom: tabBarHeight + scale(40),
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: scale(60),
  },
  emptyTitle: {
    fontSize: moderateScale(20),
    fontFamily: AeonikFonts.bold,
    color: Colors.light.mainDarkColor,
    marginTop: scale(16),
    marginBottom: scale(8),
  },
  emptyText: {
    fontSize: moderateScale(15),
    fontFamily: AeonikFonts.regular,
    color: Colors.light.grey500,
    textAlign: "center",
  },
});
