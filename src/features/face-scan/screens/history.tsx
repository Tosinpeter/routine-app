import React from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";

import { ThemedView } from "@/components/themed-view";
import { AppText as Text } from "@/components/app-text";

import { scale, moderateScale, tabBarHeight } from "@/constants/scaling";
import { AeonikFonts, Colors } from "@/constants/theme";
import { BackButton } from "@/components/back-button";
import { AppTextStyle } from "@/constants/typography";
import { t } from "@/i18n";

interface MetricData {
  id: string;
  label: string;
  value: string | number;
}

interface MetricCardProps {
  label: string;
  value: string | number;
}

function MetricCard({ label, value }: MetricCardProps) {
  return (
    <View style={styles.metricCard}>
      <Text style={styles.metricLabel}>{label}</Text>
      <Text style={styles.metricValue}>{value}</Text>
    </View>
  );
}

const METRICS_DATA: MetricData[] = [
  { id: "1", label: t("faceScan.metrics.spot"), value: "8.1" },
  { id: "2", label: t("faceScan.metrics.oiliness"), value: "8.9" },
  { id: "3", label: t("faceScan.metrics.droopyUpperEyelid"), value: "8.4" },
  { id: "4", label: t("faceScan.metrics.droopyLowerEyelid"), value: "8.7" },
  { id: "5", label: t("faceScan.metrics.firmness"), value: "9.2" },
  { id: "6", label: t("faceScan.metrics.darkCircles"), value: "8.5" },
];

export default function FaceScanHistoryScreen() {
  return (
    <ThemedView style={styles.container}>
      <View style={styles.bgSolid} />

      <SafeAreaView style={styles.safeArea} edges={["top"]}>
        {/* Header */}
        <View style={styles.header}>
          <BackButton style={styles.backButton} />
          <Text style={styles.headerTitle}>{t("faceScan.title")}</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Face Scan Image */}
          <View style={styles.imageContainer}>
            <Image
              source={require("@/assets/images/ImageContainer.webp")}
              style={styles.faceScanImage}
              contentFit="cover"
            />
          </View>

          {/* Metrics Grid */}
          <FlatList
            data={METRICS_DATA}
            keyExtractor={(item) => item.id}
            numColumns={2}
            scrollEnabled={false}
            columnWrapperStyle={styles.columnWrapper}
            renderItem={({ item }) => (
              <MetricCard label={item.label} value={item.value} />
            )}
          />
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
    paddingVertical: scale(8),
    backgroundColor: Colors.light.scaffold,
  },
  backButton: {
    marginTop: 0,
  },
  headerTitle: {
    ...AppTextStyle.headline4,
    fontFamily: AeonikFonts.medium,
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
  imageContainer: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: scale(16),
    overflow: "hidden",
    backgroundColor: Colors.light.white,
    marginBottom: scale(24),
  },
  faceScanImage: {
    width: "100%",
    height: "100%",
  },
  columnWrapper: {
    justifyContent: "space-between",
    marginBottom: scale(12),
  },
  metricCard: {
    flex: 0.48,
    backgroundColor: Colors.light.white,
    borderRadius: scale(12),
    padding: scale(14),
  },
  metricLabel: {
    ...AppTextStyle.subtitle2,
    fontFamily: AeonikFonts.regular,
    color: Colors.light.mainDarkColor,
    marginBottom: scale(8),
  },
  metricValue: {
    ...AppTextStyle.headline4,
    fontFamily: AeonikFonts.medium,
    color: Colors.light.mainDarkColor,
    lineHeight: moderateScale(34),
  },
});
