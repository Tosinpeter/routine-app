import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect } from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import MapView, { Marker } from "react-native-maps";

import { AppText as Text } from "@/components/app-text";
import { BackButton } from "@/components/back-button";
import { PrimaryButton } from "@/components/primary-button";
import { moderateScale, scale, verticalScale } from "@/constants/scaling";
import { AeonikFonts, BorderRadius, Colors } from "@/constants/theme";
import { AppTextStyle } from "@/constants/typography";
import { t } from "@/i18n";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  chargeCard,
  fetchCards,
  removeCoupon,
  setCheckoutDeliveryInfo,
} from "@/store/slices/payment-slice";
import type { RootState } from "@/store";

const selectOrderSummary = (state: RootState) => state.order;

const defaultDeliveryInfo = {
  firstName: "",
  email: "",
  address: "",
  apartment: "",
  city: "",
  county: "",
  postalCode: "",
  phone: "",
  countryName: "United States",
};

export default function CheckoutSummaryScreen() {
  const params = useLocalSearchParams<Record<string, string>>();
  const dispatch = useAppDispatch();
  const order = useAppSelector(selectOrderSummary);
  const {
    cards,
    cardsLoading,
    chargeLoading,
    checkoutDeliveryInfo,
    appliedCoupon,
  } = useAppSelector((state) => state.payment);

  const discountCents = appliedCoupon?.discount_cents ?? 0;
  const totalCents = Math.max(0, order.subtotalCents - discountCents);
  const subtotalDollars = order.subtotalCents / 100;
  const totalDollars = totalCents / 100;

  useEffect(() => {
    dispatch(fetchCards());
  }, [dispatch]);

  // Sync navigation params to Redux when coming from delivery form (params present)
  useEffect(() => {
    if (
      params &&
      (params.firstName ?? params.address ?? params.email)
    ) {
      dispatch(
        setCheckoutDeliveryInfo({
          firstName: params.firstName ?? "",
          email: params.email ?? "",
          address: params.address ?? "",
          apartment: params.apartment ?? "",
          city: params.city ?? "",
          county: params.county ?? "",
          postalCode: params.postalCode ?? "",
          phone: params.phone ?? "",
          countryName: params.countryName ?? "United States",
        })
      );
    }
  }, [dispatch, params?.firstName, params?.address, params?.email]);

  const deliveryInfo = checkoutDeliveryInfo ?? defaultDeliveryInfo;
  const defaultCard = cards.find((c) => c.is_default) ?? cards[0];

  const fullAddress = `${deliveryInfo.address}${
    deliveryInfo.apartment ? `, ${deliveryInfo.apartment}` : ""
  }, ${deliveryInfo.city}, ${deliveryInfo.postalCode}`;

  const addressCoordinates = {
    latitude: 35.2227,
    longitude: -106.6630,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  const handleChangePayment = () => {
    router.push("/payment/add-card");
  };

  const handleConfirm = () => {
    if (!defaultCard) {
      router.push("/payment/add-card");
      return;
    }
    router.push("/payment/creating-order");
  };

  const handleEditAddress = () => {
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
              style={{
                backgroundColor: 'rgba(237, 235, 227, 1)', 
                borderRadius: BorderRadius.full, 
                padding: scale(6)
              }}
              hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
            >
              <Ionicons
                name="pencil"
                size={scale(23)}
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


        <View style={styles.divider} />


        {/* Payment Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>{t("payment.summary.payment")}</Text>

          {/* Pay with Card */}
          <View style={styles.paymentCard}>
            <Text style={styles.payWithLabel}>{t("payment.summary.payWith")}</Text>
            {cardsLoading ? (
              <Text style={styles.cardNumber}>{t("common.loading")}</Text>
            ) : defaultCard ? (
              <View style={styles.cardInfoContainer}>
                <View style={styles.cardBrandContainer}>
                  <View style={styles.mastercardLogo}>
                    <View style={[styles.mastercardCircle, styles.mastercardRed]} />
                    <View style={[styles.mastercardCircle, styles.mastercardOrange]} />
                  </View>
                  <Text style={styles.cardNumber}>•••• {defaultCard.last4}</Text>
                </View>
                <TouchableOpacity
                  style={styles.changeButton}
                  onPress={handleChangePayment}
                  activeOpacity={0.7}
                >
                  <Text style={styles.changeButtonText}>{t("common.change")}</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.cardInfoContainer}>
                <Text style={styles.noCardsText}>{t("payment.card.noCards")}</Text>
                <TouchableOpacity
                  style={styles.changeButton}
                  onPress={() => router.push("/payment/add-card")}
                  activeOpacity={0.7}
                >
                  <Text style={styles.changeButtonText}>{t("payment.card.addCard")}</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>

        {/* Order Summary Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>{t("payment.summary.orderSummary")}</Text>

          {/* Apply Coupon - same as payment index */}
          <TouchableOpacity
            style={styles.couponContainer}
            onPress={() => router.push("/payment/apply-coupon")}
            activeOpacity={0.7}
          >
            <View style={styles.couponLeft}>
              <View style={styles.couponIconContainer}>
                <Image
                  source={require("@/assets/images/img_coupon-Icon.png")}
                  style={{ width: scale(32), height: scale(32) }}
                  contentFit="contain"
                  contentPosition="center"
                />
              </View>
              <Text style={styles.couponText}>
                {appliedCoupon
                  ? `${t("payment.checkout.couponDiscount")}: ${appliedCoupon.code} (-$${(appliedCoupon.discount_cents / 100).toFixed(2)})`
                  : t("payment.checkout.applyCoupon")}
              </Text>
            </View>
            {appliedCoupon ? (
              <TouchableOpacity
                onPress={(e) => {
                  e.stopPropagation();
                  dispatch(removeCoupon());
                }}
                hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
              >
                <Ionicons name="close-circle" size={scale(22)} color={Colors.light.grey525} />
              </TouchableOpacity>
            ) : (
              <Ionicons name="chevron-forward" size={scale(20)} color={Colors.light.grey525} />
            )}
          </TouchableOpacity>

          {/* Cost Breakdown - same as payment index */}
          <View style={styles.costBreakdown}>
            <View style={styles.costRow}>
              <Text style={styles.costLabel}>{t("payment.checkout.shipmentCost")}</Text>
              <Text style={styles.costValue}>${(order.shipmentCents / 100).toFixed(2)}</Text>
            </View>

            <View style={styles.costRow}>
              <Text style={styles.costLabel}>{t("payment.checkout.insurance")}</Text>
              <Text style={styles.costValue}>${(order.insuranceCents / 100).toFixed(2)}</Text>
            </View>

            <View style={styles.costRow}>
              <Text style={styles.costLabel}>{t("payment.checkout.totalPayment")}</Text>
              <Text style={styles.costValue}>${subtotalDollars.toFixed(2)}</Text>
            </View>

            {appliedCoupon && (
              <View style={styles.costRow}>
                <Text style={[styles.costLabel, styles.discountLabel]}>
                  {t("payment.checkout.couponDiscount")} ({appliedCoupon.code})
                </Text>
                <Text style={styles.discountValue}>
                  -${(appliedCoupon.discount_cents / 100).toFixed(2)}
                </Text>
              </View>
            )}

            <View style={styles.dividerCost} />

            <View style={styles.costRow}>
              <Text style={styles.totalLabel}>{t("payment.checkout.total")}</Text>
              <Text style={styles.totalValue}>${totalDollars.toFixed(2)}</Text>
            </View>
          </View>
        </View>

        {/* Bottom Spacing */}
        <View style={{ height: verticalScale(24) }} />
      </ScrollView>

      {/* Bottom Button */}
      <View style={styles.bottomButtonContainer}>
        <PrimaryButton
          title={t("common.confirm")}
          onPress={handleConfirm}
          disabled={chargeLoading || (!defaultCard && !cardsLoading)}
          loading={chargeLoading}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(245, 241, 238, 1)',
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(234, 236, 240, 1)",
    marginBottom: scale(40),
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: scale(20),
    paddingBottom: verticalScale(16),
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
    marginBottom: scale(16)
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
    backgroundColor: 'rgba(237, 235, 227, 1)',
    borderRadius: scale(16),
    padding: scale(16),
  },
  payWithLabel: {
    ...AppTextStyle.headline6,
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
  noCardsText: {
    flex: 1,
    ...AppTextStyle.bodyText1,
    fontFamily: AeonikFonts.regular,
    color: Colors.light.grey500,
  },
  couponContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: verticalScale(8),
    backgroundColor: Colors.light.white,
    borderRadius: scale(16),
    marginBottom: verticalScale(16),
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
  costBreakdown: {
    gap: verticalScale(12),
    marginBottom: verticalScale(24),
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
  discountLabel: {
    color: Colors.light.tint,
  },
  discountValue: {
    fontSize: moderateScale(17),
    fontFamily: AeonikFonts.medium,
    color: Colors.light.tint,
  },
  dividerCost: {
    height: 1,
    backgroundColor: Colors.light.grey200,
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
