import React from "react";
import { ScrollView, StyleSheet, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { ThemedView } from "@/components/themed-view";
import { AppText as Text } from "@/components/app-text";
import { t } from "@/i18n";

import { scale, moderateScale } from "@/constants/scaling";
import { Colors, AeonikFonts } from "@/constants/theme";
import { BackButton } from "@/components/back-button";
import { AppTextStyle } from "@/constants/typography";
import { HomeIcon, WorkIcon, LocationAddIcon } from "@/components/icons";

interface AddressOption {
  id: string;
  icon: React.ComponentType<{ size?: number; color?: string }>;
  title: string;
  route: string;
}

export default function SavedAddressScreen() {
  const addressOptions: AddressOption[] = [
    {
      id: "home",
      icon: HomeIcon,
      title: t("address.addHome"),
      route: "/profile/saved-address/add-address?type=home",
    },
    {
      id: "work",
      icon: WorkIcon,
      title: t("address.addWork"),
      route: "/profile/saved-address/add-address?type=work",
    },
    {
      id: "new",
      icon: LocationAddIcon,
      title: t("address.addNew"),
      route: "/profile/saved-address/add-address?type=new",
    },
  ];

  const handleAddressPress = (route: string) => {
    router.push(route as any);
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.bgSolid} />

      <SafeAreaView style={styles.safeArea} edges={["top"]}>
        {/* Header */}
        <View style={styles.header}>
          <BackButton style={styles.backButton} />
          <Text style={styles.headerTitle}>{t("address.savedAddress")}</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Address Options List */}
          <View style={styles.addressList}>
            {addressOptions.map((option, index) => {
              const IconComponent = option.icon;
              return (
                <React.Fragment key={option.id}>
                  <TouchableOpacity
                    style={styles.addressItem}
                    onPress={() => handleAddressPress(option.route)}
                    activeOpacity={0.7}
                  >
                    <IconComponent
                      size={scale(24)}
                      color={Colors.light.mainDarkColor}
                    />
                  
                    <Text style={styles.addressTitle}>{option.title}</Text>
                    <Ionicons
                      name="chevron-forward"
                      size={scale(20)}
                      color={Colors.light.mainDarkColor}
                    />
                  </TouchableOpacity>
                  {index < addressOptions.length - 1 && (
                    <View style={styles.divider} />
                  )}
                </React.Fragment>
              );
            })}
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
    paddingTop: scale(24),
  },
  addressList: {
    backgroundColor: Colors.light.white,
    borderRadius: scale(16),
    overflow: "hidden",
  },
  addressItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(12),
    paddingVertical: scale(16),
    paddingHorizontal: scale(16),
    backgroundColor: Colors.light.white,
  },
  iconContainer: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(20),
    backgroundColor: Colors.light.scaffold,
    alignItems: "center",
    justifyContent: "center",
    marginRight: scale(12),
  },
  addressTitle: {
    flex: 1,
    fontSize: moderateScale(17),
    fontFamily: AeonikFonts.regular,
    color: Colors.light.mainDarkColor,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.light.grey200,
  },
});
