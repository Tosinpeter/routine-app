import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView, { Marker } from "react-native-maps";

import { AppText as Text } from "@/components/app-text";
import { AppTextInput as TextInput } from "@/components/app-text-input";
import { BackButton } from "@/components/back-button";
import { PrimaryButton } from "@/components/primary-button";
import { moderateScale, scale, verticalScale } from "@/constants/scaling";
import { AeonikFonts, Colors } from "@/constants/theme";
import { AppTextStyle } from "@/constants/typography";
import { t } from "@/i18n";

export default function CheckoutSummaryScreen() {
  const params = useLocalSearchParams();
  const [discountCode, setDiscountCode] = useState("");
  
  // Extract delivery information from params
  const deliveryInfo = {
    firstName: params.firstName as string || "",
    email: params.email as string || "",
    address: params.address as string || "",
    apartment: params.apartment as string || "",
    city: params.city as string || "",
    county: params.county as string || "",
    postalCode: params.postalCode as string || "",
    phone: params.phone as string || "",
    countryName: params.countryName as string || "United stated",
  };

  // Format full address
  const fullAddress = `${deliveryInfo.address}${
    deliveryInfo.apartment ? `, ${deliveryInfo.apartment}` : ""
  }, ${deliveryInfo.city}, ${deliveryInfo.postalCode}`;
  
  // Address coordinates (Allentown, New Mexico - default)
  const addressCoordinates = {
    latitude: 35.2227,
    longitude: -106.6630,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  const handleChangePayment = () => {
    // Handle payment method change
    console.log("Change payment method");
  };

  const handleApplyDiscount = () => {
    // Handle discount code application
    console.log("Apply discount code:", discountCode);
  };

  const handleConfirm = () => {
    // Handle order confirmation
    console.log("Order confirmed with details:", {
      deliveryInfo,
      discountCode,
    });
    // Navigate to success screen or show confirmation
    // router.push("/payment/success");
  };

  const handleEditAddress = () => {
    // Handle edit address
    router.back();
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
        {/* Delivery Address Section */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{t("payment.summary.deliveryAddress")}</Text>
            <TouchableOpacity
              onPress={handleEditAddress}
              activeOpacity={0.7}
              hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
            >
              <Ionicons
                name="pencil"
                size={scale(20)}
                color={Colors.light.mainDarkColor}
              />
            </TouchableOpacity>
          </View>

          {/* Map Container */}
          <View style={styles.mapContainer}>
            <MapView
              style={styles.map}
              initialRegion={addressCoordinates}
              scrollEnabled={false}
              zoomEnabled={false}
              pitchEnabled={false}
              rotateEnabled={false}
            >
              <Marker
                coordinate={{
                  latitude: addressCoordinates.latitude,
                  longitude: addressCoordinates.longitude,
                }}
                title={t("payment.summary.deliveryAddress")}
                description={fullAddress || "4140 Parker Rd. Allentown, New Mexico 31134"}
              />
            </MapView>
            <TouchableOpacity style={styles.locateButton} activeOpacity={0.8}>
              <View style={styles.locateIconContainer}>
                <Ionicons
                  name="locate"
                  size={scale(20)}
                  color={Colors.light.mainDarkColor}
                />
              </View>
            </TouchableOpacity>
          </View>

          {/* Address Text */}
          <Text style={styles.addressText}>
            {fullAddress || "4140 Parker Rd. Allentown, New Mexico 31134"}
          </Text>
        </View>

        {/* Payment Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>{t("payment.summary.payment")}</Text>

          {/* Pay with Card */}
          <View style={styles.paymentCard}>
            <Text style={styles.payWithLabel}>{t("payment.summary.payWith")}</Text>
            <View style={styles.cardInfoContainer}>
              <View style={styles.cardBrandContainer}>
                <View style={styles.mastercardLogo}>
                  <View style={[styles.mastercardCircle, styles.mastercardRed]} />
                  <View style={[styles.mastercardCircle, styles.mastercardOrange]} />
                </View>
                <Text style={styles.cardNumber}>•••• 5941</Text>
              </View>
              <TouchableOpacity
                style={styles.changeButton}
                onPress={handleChangePayment}
                activeOpacity={0.7}
              >
                <Text style={styles.changeButtonText}>{t("common.change")}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Order Summary Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>{t("payment.summary.orderSummary")}</Text>

          {/* Discount Code Input */}
          <View style={styles.discountContainer}>
            <TextInput
              style={styles.discountInput}
              placeholder={t("payment.summary.discountCode")}
              placeholderTextColor={Colors.light.grey500}
              value={discountCode}
              onChangeText={setDiscountCode}
            />
            <TouchableOpacity
              style={styles.applyButton}
              onPress={handleApplyDiscount}
              activeOpacity={0.7}
            >
              <Text style={styles.applyButtonText}>{t("common.apply")}</Text>
            </TouchableOpacity>
          </View>

          {/* Cost Breakdown */}
          <View style={styles.costBreakdown}>
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
          </View>
        </View>

        {/* Total Section */}
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>{t("payment.checkout.total")}</Text>
          <Text style={styles.totalValue}>$200.00</Text>
        </View>

        {/* Bottom Spacing */}
        <View style={{ height: verticalScale(24) }} />
      </ScrollView>

      {/* Bottom Button */}
      <View style={styles.bottomButtonContainer}>
        <PrimaryButton title={t("common.confirm")} onPress={handleConfirm} />
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
  sectionContainer: {
    marginBottom: verticalScale(24),
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: verticalScale(16),
  },
  sectionTitle: {
    ...AppTextStyle.headline6,
    fontFamily: AeonikFonts.medium,
    color: Colors.light.mainDarkColor,
  },
  mapContainer: {
    position: "relative",
    width: "100%",
    height: verticalScale(150),
    borderRadius: scale(16),
    marginBottom: verticalScale(12),
    overflow: "hidden",
  },
  map: {
    width: "100%",
    height: "100%",
  },
  locateButton: {
    position: "absolute",
    bottom: scale(12),
    right: scale(12),
  },
  locateIconContainer: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(20),
    backgroundColor: Colors.light.white,
    alignItems: "center",
    justifyContent: "center",
    ...Platform.select({
      ios: {
        shadowColor: Colors.light.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  addressText: {
    ...AppTextStyle.bodyText1,
    fontFamily: AeonikFonts.regular,
    color: Colors.light.mainDarkColor,
    lineHeight: scale(20),
  },
  paymentCard: {
    backgroundColor: Colors.light.white,
    borderRadius: scale(16),
    padding: scale(16),
    borderWidth: 1,
    borderColor: Colors.light.grey200,
  },
  payWithLabel: {
    ...AppTextStyle.bodyText1,
    fontFamily: AeonikFonts.medium,
    color: Colors.light.mainDarkColor,
    marginBottom: verticalScale(12),
  },
  cardInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardBrandContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(12),
  },
  mastercardLogo: {
    width: scale(48),
    height: scale(32),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  mastercardCircle: {
    width: scale(24),
    height: scale(24),
    borderRadius: scale(12),
    position: "absolute",
  },
  mastercardRed: {
    backgroundColor: "#EB001B",
    left: 0,
  },
  mastercardOrange: {
    backgroundColor: "#FF5F00",
    right: 0,
  },
  cardNumber: {
    ...AppTextStyle.bodyText1,
    fontFamily: AeonikFonts.medium,
    color: Colors.light.mainDarkColor,
  },
  changeButton: {
    backgroundColor: Colors.light.mainDarkColor,
    borderRadius: scale(20),
    paddingVertical: verticalScale(8),
    paddingHorizontal: scale(20),
  },
  changeButtonText: {
    ...AppTextStyle.bodyText1,
    fontFamily: AeonikFonts.medium,
    color: Colors.light.white,
  },
  discountContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(12),
    marginBottom: verticalScale(16),
  },
  discountInput: {
    flex: 1,
    height: verticalScale(48),
    borderWidth: 1,
    borderColor: Colors.light.grey200,
    borderRadius: scale(12),
    paddingHorizontal: scale(16),
    fontSize: moderateScale(15),
    fontFamily: AeonikFonts.regular,
    color: Colors.light.mainDarkColor,
    backgroundColor: Colors.light.white,
  },
  applyButton: {
    height: verticalScale(48),
    paddingHorizontal: scale(20),
    alignItems: "center",
    justifyContent: "center",
  },
  applyButtonText: {
    ...AppTextStyle.bodyText1,
    fontFamily: AeonikFonts.medium,
    color: Colors.light.grey500,
  },
  costBreakdown: {
    gap: verticalScale(12),
  },
  costRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  costLabel: {
    fontSize: moderateScale(15),
    fontFamily: AeonikFonts.regular,
    color: Colors.light.mainDarkColor,
  },
  costValue: {
    fontSize: moderateScale(17),
    fontFamily: AeonikFonts.medium,
    color: Colors.light.mainDarkColor,
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: verticalScale(16),
    borderTopWidth: 1,
    borderTopColor: Colors.light.grey200,
    marginBottom: verticalScale(24),
  },
  totalLabel: {
    fontSize: moderateScale(15),
    fontFamily: AeonikFonts.regular,
    color: Colors.light.mainDarkColor,
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
