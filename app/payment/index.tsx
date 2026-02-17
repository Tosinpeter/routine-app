import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Image } from "expo-image";

import { AppText as Text } from "@/components/app-text";
import { BackButton } from "@/components/back-button";
import { PrimaryButton } from "@/components/primary-button";
import { moderateScale, scale, verticalScale } from "@/constants/scaling";
import { AeonikFonts, Colors } from "@/constants/theme";
import { AppTextStyle } from "@/constants/typography";
import { t } from "@/i18n";

type DeliveryMethod = "delivery" | "pickup";

export default function CheckoutScreen() {
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>("delivery");

  const handleContinueToPurchase = () => {
    // Navigate to delivery form
    router.push("/payment/delivery-form");
  };

  const handleApplyCoupon = () => {
    // Handle apply coupon
    // router.push("/payment/apply-coupon");
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* Header */}
      <View style={styles.header}>
        <BackButton />
        <Text style={styles.headerTitle}>{t("payment.checkout.title")}</Text>
        <View style={{ width: scale(40) }} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Your Added Section */}
        <Text style={styles.addedText}>{t("payment.checkout.yourAdded", { count: 4 })}</Text>

        {/* Illustration */}
        <View style={styles.illustrationContainer}>
          <Image
            source={require("@/assets/images/Illustration.png")}
            style={styles.illustrationImage}
            contentFit="contain"
            contentPosition="center"
          />
        </View>

        {/* Description */}
        <Text style={styles.descriptionText}>
          {t("payment.checkout.description")}
        </Text>

        {/* Delivery Method Toggle */}
        <View style={styles.deliveryToggleContainer}>
          <View style={styles.deliveryToggleWrapper}>
            <TouchableOpacity
              style={[
                styles.deliveryOption,
                deliveryMethod === "delivery" && styles.deliveryOptionActive,
              ]}
              onPress={() => setDeliveryMethod("delivery")}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.deliveryOptionText,
                  deliveryMethod === "delivery" && styles.deliveryOptionTextActive,
                ]}
              >
                {t("payment.checkout.delivery")}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.deliveryOption,
                deliveryMethod === "pickup" && styles.deliveryOptionActive,
              ]}
              onPress={() => setDeliveryMethod("pickup")}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.deliveryOptionText,
                  deliveryMethod === "pickup" && styles.deliveryOptionTextActive,
                ]}
              >
                {t("payment.checkout.pickup")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Apply Coupon */}
        <TouchableOpacity
          style={styles.couponContainer}
          onPress={handleApplyCoupon}
          activeOpacity={0.7}
        >
          <View style={styles.couponLeft}>
            <View style={styles.couponIconContainer}>
              <Image
                source={require("@/assets/images/img_coupon-Icon.png")}
                style={{
                  width: scale(32),
                  height: scale(32)
                }}
                contentFit="contain"
                contentPosition="center"
              />
            </View>
            <Text style={styles.couponText}>{t("payment.checkout.applyCoupon")}</Text>
          </View>
          <Ionicons
            name="chevron-forward"
            size={scale(20)}
            color={Colors.light.grey525}
          />
        </TouchableOpacity>

        {/* Cost Breakdown */}
        <View style={styles.costBreakdownContainer}>
          <View style={styles.costRow}>
            <Text style={styles.costLabel}>{t("payment.checkout.shipmentCost")}</Text>
            <Text style={styles.costValue}>$200.00</Text>
          </View>

          <View style={styles.costRow}>
            <Text style={styles.costLabel}>{t("payment.checkout.insurance")}</Text>
            <Text style={styles.costValue}>$50.00</Text>
          </View>

          <View style={styles.costRow}>
            <Text style={styles.costLabel}>{t("payment.checkout.totalPayment")}</Text>
            <Text style={styles.costValue}>$250.00</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.costRow}>
            <Text style={styles.totalLabel}>{t("payment.checkout.total")}</Text>
            <Text style={styles.totalValue}>$200.00</Text>
          </View>
        </View>

        {/* Bottom Spacing */}
        <View style={{ height: verticalScale(24) }} />
      </ScrollView>

      {/* Bottom Button */}
      <View style={styles.bottomButtonContainer}>
        <PrimaryButton
          title={t("payment.checkout.continueButton")}
          onPress={handleContinueToPurchase}
        />
      </View>
    </SafeAreaView>
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
    paddingHorizontal: scale(20),
    paddingBottom: verticalScale(16),
    backgroundColor: Colors.light.scaffold,
  },
  headerTitle: {
    ...AppTextStyle.headline5,
    fontFamily: AeonikFonts.medium,
    color: Colors.light.mainDarkColor,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: scale(20),
  },
  addedText: {
    ...AppTextStyle.headline6,
    fontFamily: AeonikFonts.regular,
    color: Colors.light.mainDarkColor,
    marginBottom: verticalScale(24),
  },
  illustrationContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: verticalScale(36),
    // paddingVertical: verticalScale(32),
    // borderRadius: scale(16),
  },
  illustrationImage: {
    width: scale(358),
    height: scale(245.55),
  },
  descriptionText: {
    ...AppTextStyle.headline4,
    fontFamily: AeonikFonts.medium,
    marginBottom: verticalScale(24),
    lineHeight: scale(24),
  },
  deliveryToggleContainer: {
    width: scale(151),
    marginBottom: verticalScale(16),
  },
  deliveryToggleWrapper: {
    flexDirection: "row",
    flexGrow: 0,
    backgroundColor: "rgba(248, 248, 248, 1)",
    borderRadius: scale(100),
    padding: scale(4),
  },
  deliveryOption: {
    // flex: 1,
    paddingVertical: verticalScale(8),
    borderRadius: scale(100),
    paddingHorizontal: scale(12),
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },
  deliveryOptionActive: {
    backgroundColor: Colors.light.tint,
  },
  deliveryOptionText: {
    ...AppTextStyle.bodyText1,
    fontFamily: AeonikFonts.medium,
    color: "rgba(153, 153, 153, 1)",
    fontSize: scale(14),
  },
  deliveryOptionTextActive: {
    color: Colors.light.white,
  },
  couponContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: verticalScale(8),
    backgroundColor: Colors.light.white,
    borderRadius: scale(16),
    marginBottom: verticalScale(24),
    borderWidth: 1,
    borderColor: "rgba(235, 235, 235, 1)",
  },
  couponLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(12),
  },
  couponIconContainer: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(20),
    alignItems: "center",
    justifyContent: "center",
  },
  couponText: {
    ...AppTextStyle.bodyText1,
    fontFamily: AeonikFonts.medium,
    color: Colors.light.mainDarkColor,
  },
  costBreakdownContainer: {
    borderRadius: scale(12),
    gap: verticalScale(16),
  },
  costRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  costLabel: {
    fontSize: moderateScale(15),
    fontFamily: AeonikFonts.regular,
  },
  costValue: {
    fontSize: moderateScale(17),
    fontFamily: AeonikFonts.medium,
    fontWeight: '500',
    color: Colors.light.mainDarkColor,
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(235, 235, 235, 1)",
  },
  totalLabel: {
    fontSize: moderateScale(15),
    fontFamily: AeonikFonts.regular,
  },
  totalValue: {
    ...AppTextStyle.headline6,
    fontFamily: AeonikFonts.medium,
    color: Colors.light.mainDarkColor,
  },
  bottomButtonContainer: {
    paddingHorizontal: scale(20),
    paddingTop: verticalScale(16),
    paddingBottom: verticalScale(24),
    backgroundColor: Colors.light.scaffold,
  },
});
