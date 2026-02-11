import React, { useState } from "react";
import { ScrollView, StyleSheet, View, TouchableOpacity, Switch } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

import { ThemedView } from "@/components/themed-view";
import { AppText as Text } from "@/components/app-text";
import { useTranslation } from "@/contexts/AppDataProvider";

import { scale, moderateScale, tabBarHeight } from "@/constants/scaling";
import { Colors, AeonikFonts } from "@/constants/theme";
import { BackButton } from "@/components/back-button";
import { AppTextStyle } from "@/constants/typography";
import { CameraIcon, GalleryIcon, NotificationIcon, LocationIcon } from "@/components/icons";

interface PermissionItemProps {
  icon: React.ReactNode;
  title: string;
  isEnabled: boolean;
  onToggle: (value: boolean) => void;
}

function PermissionItem({ icon, title, isEnabled, onToggle }: PermissionItemProps) {
  return (
    <View style={styles.permissionItem}>
      <View style={styles.permissionLeft}>
        <View>{icon}</View>
        <Text style={styles.permissionTitle}>{title}</Text>
      </View>
      <Switch
        value={isEnabled}
        onValueChange={onToggle}
      />
    </View>
  );
}

export default function PermissionsScreen() {
  const { t } = useTranslation();
  const [permissions, setPermissions] = useState({
    camera: true,
    photos: false,
    notifications: true,
    location: true,
  });

  const togglePermission = (key: keyof typeof permissions) => {
    setPermissions((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.bgSolid} />

      <SafeAreaView style={styles.safeArea} edges={["top"]}>
        {/* Header */}
        <View style={styles.header}>
          <BackButton style={styles.backButton} />
          <Text style={styles.headerTitle}>{t("permissions.title")}</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.permissionsList}>
            <PermissionItem
              icon={<CameraIcon size={scale(24)} color={Colors.light.mainDarkColor} />}
              title={t("permissions.cameraAccess")}
              isEnabled={permissions.camera}
              onToggle={() => togglePermission("camera")}
            />
            <View style={styles.divider} />
            <PermissionItem
              icon={<GalleryIcon size={scale(24)} color={Colors.light.mainDarkColor} />}
              title={t("permissions.photosStorage")}
              isEnabled={permissions.photos}
              onToggle={() => togglePermission("photos")}
            />
            <View style={styles.divider} />
            <PermissionItem
              icon={<NotificationIcon size={scale(24)} color={Colors.light.mainDarkColor} />}
              title={t("permissions.notifications")}
              isEnabled={permissions.notifications}
              onToggle={() => togglePermission("notifications")}
            />
            <View style={styles.divider} />
            <PermissionItem
              icon={<LocationIcon size={scale(24)} color={Colors.light.mainDarkColor} />}
              title={t("permissions.location")}
              isEnabled={permissions.location}
              onToggle={() => togglePermission("location")}
            />
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
  permissionsList: {
    backgroundColor: Colors.light.white,
    borderRadius: scale(16),
    overflow: "hidden",
  },
  permissionItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: scale(16),
    paddingHorizontal: scale(16),
  },
  permissionLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  permissionTitle: {
    fontSize: moderateScale(17),
    fontFamily: AeonikFonts.regular,
    color: Colors.light.mainDarkColor,
    marginLeft: scale(12),
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "rgba(84, 84, 86, 0.34)",
  },
});
