import React, { useState } from "react";
import {
  StatusBar,
  StyleSheet,
  View,
  TouchableOpacity
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

import { AppText as Text } from "@/components/app-text";
import { PrimaryButton } from "@/components/primary-button";
import { BackButton } from "@/components/back-button";
import { useNetworkStatus, checkInternetConnection } from "@/hooks";
import { scale, verticalScale } from "@/constants/scaling";
import { AeonikFonts, Colors, BorderRadius } from "@/constants/theme";
import { AppTextStyle } from "@/constants/typography";

/**
 * Demo screen showing how to use network connectivity features
 * This is an example implementation - not meant for production
 */
export default function NetworkDemoScreen() {
  const { isConnected, isInternetReachable, type } = useNetworkStatus();
  const [checkResult, setCheckResult] = useState<string>("");

  const handleCheckConnection = async () => {
    const hasInternet = await checkInternetConnection();
    setCheckResult(hasInternet ? "✅ Connected to internet" : "❌ No internet connection");
  };

  const handleNavigateToNoInternet = () => {
    router.push("/no-internet");
  };

  const getConnectionStatus = () => {
    if (isConnected === null) return "Checking...";
    if (isConnected === false) return "❌ Disconnected";
    if (isInternetReachable === false) return "⚠️ Connected but no internet";
    return "✅ Connected";
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <BackButton />
        <Text style={styles.headerTitle}>Network Demo</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.content}>
        {/* Real-time Status */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Real-time Network Status</Text>
          
          <InfoCard
            label="Connection Status"
            value={getConnectionStatus()}
          />
          
          <InfoCard
            label="Connection Type"
            value={type || "Unknown"}
          />
          
          <InfoCard
            label="Internet Reachable"
            value={isInternetReachable === null ? "Unknown" : isInternetReachable ? "Yes" : "No"}
          />
        </View>

        {/* Manual Check */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Manual Connection Check</Text>
          
          <PrimaryButton
            title="Check Connection Now"
            onPress={handleCheckConnection}
          />
          
          {checkResult !== "" && (
            <View style={styles.resultBox}>
              <Text style={styles.resultText}>{checkResult}</Text>
            </View>
          )}
        </View>

        {/* Demo Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Demo Actions</Text>
          
          <TouchableOpacity
            style={styles.demoButton}
            onPress={handleNavigateToNoInternet}
          >
            <Text style={styles.demoButtonText}>
              Show No Internet Screen
            </Text>
          </TouchableOpacity>
        </View>

        {/* Instructions */}
        <View style={styles.instructionsBox}>
          <Text style={styles.instructionsTitle}>💡 Test Instructions</Text>
          <Text style={styles.instructionsText}>
            • Turn off WiFi/Mobile data to test{'\n'}
            • The status updates automatically{'\n'}
            • NetworkStatusWrapper can show no internet screen automatically
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.infoCard}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.scaffold,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: scale(16),
    paddingVertical: scale(8),
  },
  headerTitle: {
    ...AppTextStyle.headline4,
    fontFamily: AeonikFonts.medium,
    color: Colors.light.mainDarkColor,
  },
  placeholder: {
    width: scale(40),
  },
  content: {
    flex: 1,
    paddingHorizontal: scale(20),
    paddingTop: verticalScale(16),
  },
  section: {
    marginBottom: verticalScale(32),
  },
  sectionTitle: {
    ...AppTextStyle.subtitle1,
    fontFamily: AeonikFonts.bold,
    color: Colors.light.text,
    marginBottom: verticalScale(12),
  },
  infoCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.light.white,
    padding: scale(16),
    borderRadius: BorderRadius.md,
    marginBottom: verticalScale(8),
  },
  infoLabel: {
    ...AppTextStyle.bodyText1,
    fontFamily: AeonikFonts.medium,
    color: Colors.light.grey525,
  },
  infoValue: {
    ...AppTextStyle.bodyText1,
    fontFamily: AeonikFonts.bold,
    color: Colors.light.text,
  },
  resultBox: {
    backgroundColor: Colors.light.successLightBg,
    padding: scale(16),
    borderRadius: BorderRadius.md,
    marginTop: verticalScale(12),
  },
  resultText: {
    ...AppTextStyle.bodyText1,
    fontFamily: AeonikFonts.medium,
    color: Colors.light.text,
    textAlign: "center",
  },
  demoButton: {
    backgroundColor: Colors.light.white,
    padding: scale(16),
    borderRadius: BorderRadius.md,
    borderWidth: 2,
    borderColor: Colors.light.tint,
  },
  demoButtonText: {
    ...AppTextStyle.bodyText1,
    fontFamily: AeonikFonts.bold,
    color: Colors.light.tint,
    textAlign: "center",
  },
  instructionsBox: {
    backgroundColor: Colors.light.infoLight,
    padding: scale(16),
    borderRadius: BorderRadius.md,
  },
  instructionsTitle: {
    ...AppTextStyle.subtitle2,
    fontFamily: AeonikFonts.bold,
    color: Colors.light.text,
    marginBottom: verticalScale(8),
  },
  instructionsText: {
    ...AppTextStyle.bodyText2,
    fontFamily: AeonikFonts.regular,
    color: Colors.light.grey525,
    lineHeight: 18,
  },
});
