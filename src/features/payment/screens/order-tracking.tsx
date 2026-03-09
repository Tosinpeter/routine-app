import React, { useCallback } from "react";
import {
  ActivityIndicator,
  Linking,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import * as Clipboard from "expo-clipboard";
import { useLocalSearchParams } from "expo-router";
import { Image } from "expo-image";
import { toast } from "@backpackapp-io/react-native-toast";

import { AppText as Text } from "@/components/app-text";
import { BackButton } from "@/components/back-button";
import { scale, verticalScale, moderateScale } from "@/constants/scaling";
import { AeonikFonts, BorderRadius, Colors, Shadows } from "@/constants/theme";
import { AppTextStyle } from "@/constants/typography";
import { t } from "@/i18n";
import { OpenInNewIcon } from "@/components/icons/OpenInNewIcon";
import { CopyCTAIcon } from "@/components/icons/CopyCTAIcon";
import { useOrderTracking } from "../hooks/useOrderTracking";

const STATUS_KEY_MAP: Record<string, string> = {
  in_transit: "payment.tracking.inTransit",
  shipped: "payment.tracking.shipped",
  out_for_delivery: "payment.tracking.outForDelivery",
  delivered: "payment.tracking.delivered",
};

export default function OrderTrackingScreen() {
  const params = useLocalSearchParams<{ orderId?: string }>();
  const orderId = params.orderId ?? "";

  const { data, customerName, isLoading, error, refetch } =
    useOrderTracking(orderId);

  const trackingNumber = data?.trackingNumber ?? "";
  const carrier = data?.carrier ?? "";
  const statusKey = STATUS_KEY_MAP[data?.status ?? ""] ?? "payment.tracking.inTransit";
  const arrivalDay = data?.estimatedArrivalDay ?? "";
  const brandName = data?.brandName ?? "";
  const orderDate = data?.orderDate ?? "";

  const handleCopyTracking = useCallback(() => {
    if (!trackingNumber) return;
    Clipboard.setStringAsync(trackingNumber);
    toast.success(t("payment.tracking.copiedToClipboard"));
  }, [trackingNumber]);

  const handleOpenTracking = useCallback(() => {
    if (!trackingNumber) return;
    const url = `https://www.dhl.com/us-en/home/tracking.html?tracking-id=${trackingNumber}`;
    Linking.openURL(url).catch(() => {});
  }, [trackingNumber]);

  if (isLoading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color={Colors.light.tint} />
      </View>
    );
  }

  if (error || !data) {
    return (
      <View style={[styles.container, styles.centered]}>
        <View style={styles.backButtonOverlay}>
          <BackButton style={styles.backButton} />
        </View>
        <Text style={styles.errorText}>
          {t("payment.tracking.loadError")}
        </Text>
        <TouchableOpacity onPress={refetch} style={styles.retryBtn}>
          <Text style={styles.retryText}>{t("payment.tracking.retry")}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Map placeholder for web - react-native-maps is native-only */}
      <View style={styles.mapSection}>
        <View style={styles.mapPlaceholder}>
          <Text style={styles.mapPlaceholderText}>
            {t(statusKey)}
          </Text>
          <TouchableOpacity
            onPress={handleOpenTracking}
            style={styles.mapPlaceholderLink}
          >
            <Text style={styles.mapPlaceholderLinkText}>
              {t("payment.tracking.viewTracking")}
            </Text>
            <OpenInNewIcon width={18} height={18} color={Colors.light.tint} />
          </TouchableOpacity>
        </View>

        {/* Product image floating over map */}
        <View style={styles.productFloater}>
          <View style={styles.productImageBg}>
            <Image
              source={require("@/assets/images/img_product-image.png")}
              style={styles.productImage}
              contentFit="contain"
            />
          </View>
        </View>

        {/* Back button overlay */}
        <View style={styles.backButtonOverlay}>
          <BackButton style={styles.backButton} />
        </View>
      </View>

      {/* Bottom Sheet */}
      <View style={styles.sheet}>
        <View style={styles.sheetHandle} />

        <View style={styles.sheetContent}>
          {brandName ? (
            <Text style={styles.brandName}>{brandName}</Text>
          ) : null}
          {arrivalDay ? (
            <Text style={styles.arrivalText}>
              {t("payment.tracking.arrivesDay", { day: arrivalDay })}
            </Text>
          ) : null}
          <Text style={styles.statusText}>
            {t(statusKey)}
          </Text>

          <View style={styles.carrierCard}>
            <View style={styles.carrierHeader}>
              <View style={styles.dhlLogo}>
                <Image
                  source={require("@/assets/images/PartnerImage.png")}
                  style={{
                    width: scale(32),
                    height: scale(32),
                    borderRadius: BorderRadius.full
                  }}
                  contentFit="cover"
                />
              </View>
              <Text style={styles.carrierName}>{carrier}</Text>
            </View>

            <Text style={styles.trackingLabel}>
              {t("payment.tracking.trackingNo")}
            </Text>
            <View style={styles.trackingRow}>
              <Text style={styles.trackingNumber} numberOfLines={1}>
                {trackingNumber}
              </Text>
              <View style={styles.trackingActions}>
                <TouchableOpacity
                  onPress={handleCopyTracking}
                  style={styles.trackingActionBtn}
                  hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                >
                  <CopyCTAIcon width={24} height={24} color={Colors.light.mainDarkColor} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleOpenTracking}
                  style={styles.trackingActionBtn}
                  hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                >
                  <OpenInNewIcon width={24} height={24} color={Colors.light.grey600} />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.customerCard}>
            <Text style={styles.customerName}>
              {customerName ?? t("payment.tracking.customer")}
            </Text>
            <View style={styles.customerBadge}>
              <Text style={styles.customerBadgeText}>
                {t("payment.tracking.orderBadge", { id: orderId, date: orderDate })}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.white,
  },
  mapSection: {
    height: "45%",
    position: "relative",
  },
  mapPlaceholder: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.light.grey200,
    alignItems: "center",
    justifyContent: "center",
    gap: scale(12),
  },
  mapPlaceholderText: {
    ...AppTextStyle.bodyText1,
    fontFamily: AeonikFonts.medium,
    color: Colors.light.grey600,
  },
  mapPlaceholderLink: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(6),
  },
  mapPlaceholderLinkText: {
    ...AppTextStyle.bodyText1,
    fontFamily: AeonikFonts.medium,
    color: Colors.light.tint,
  },
  backButtonOverlay: {
    position: "absolute",
    top: verticalScale(16),
    start: scale(16),
    zIndex: 10,
  },
  backButton: {
    backgroundColor: Colors.light.white,
    ...Shadows.md,
  },
  productFloater: {
    position: "absolute",
    top: "25%",
    alignSelf: "center",
    zIndex: 5,
  },
  productImageBg: {
    width: scale(100),
    height: scale(100),
    borderRadius: scale(16),
    borderColor: Colors.light.white,
    borderWidth: 4,
    backgroundColor: Colors.light.orderTrackingPink,
    alignItems: "center",
    justifyContent: "center",
    ...Shadows.lg,
  },
  productImage: {
    width: scale(60),
    height: scale(70),
  },
  sheet: {
    flex: 1,
    backgroundColor: Colors.light.white,
    borderTopLeftRadius: scale(24),
    borderTopRightRadius: scale(24),
    marginTop: -scale(20),
    shadowColor: Colors.light.black,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
  },
  sheetHandle: {
    width: scale(40),
    height: scale(4),
    borderRadius: scale(2),
    backgroundColor: Colors.light.grey200,
    alignSelf: "center",
    marginTop: verticalScale(10),
    marginBottom: verticalScale(16),
  },
  sheetContent: {
    paddingHorizontal: scale(20),
  },
  brandName: {
    ...AppTextStyle.bodyText2,
    fontFamily: AeonikFonts.regular,
    color: Colors.light.grey500,
    marginBottom: verticalScale(4),
  },
  arrivalText: {
    fontSize: moderateScale(22),
    fontFamily: AeonikFonts.bold,
    color: Colors.light.mainDarkColor,
    lineHeight: moderateScale(28),
    marginBottom: verticalScale(6),
  },
  statusText: {
    ...AppTextStyle.bodyText1,
    fontFamily: AeonikFonts.medium,
    color: Colors.light.tint,
    marginBottom: verticalScale(20),
  },
  carrierCard: {
    backgroundColor: Colors.light.scaffold,
    borderRadius: scale(16),
    padding: scale(20),
    marginBottom: verticalScale(16),
  },
  carrierHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(10),
    marginBottom: verticalScale(12),
  },
  dhlLogo: {
    alignItems: "center",
    justifyContent: "center",
  },
  carrierName: {
    ...AppTextStyle.subtitle2,
    fontFamily: AeonikFonts.medium,
  },
  trackingLabel: {
    ...AppTextStyle.bodyText2,
    fontFamily: AeonikFonts.medium,
    opacity: 0.64,
    marginBottom: verticalScale(4),
  },
  trackingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  trackingNumber: {
    ...AppTextStyle.bodyText1,
    fontFamily: AeonikFonts.medium,
    flex: 1,
    marginEnd: scale(8),
  },
  trackingActions: {
    flexDirection: "row",
    gap: scale(12),
  },
  trackingActionBtn: {
    padding: scale(4),
  },
  customerCard: {
    borderWidth: 1,
    borderColor: Colors.light.grey200,
    borderRadius: scale(16),
    padding: scale(20),
    alignItems: "center",
  },
  customerName: {
    fontSize: moderateScale(38),
    fontFamily: AeonikFonts.bold,
    color: Colors.light.grey500,
    textAlign: "center",
    marginBottom: verticalScale(10),
  },
  customerBadge: {
    backgroundColor: Colors.light.scaffold,
    borderRadius: BorderRadius.full,
    paddingVertical: verticalScale(8),
    paddingHorizontal: scale(16),
  },
  customerBadgeText: {
    ...AppTextStyle.bodyText2,
    fontFamily: AeonikFonts.medium,
    color: Colors.light.grey600,
  },
  centered: {
    alignItems: "center",
    justifyContent: "center",
  },
  errorText: {
    ...AppTextStyle.bodyText1,
    fontFamily: AeonikFonts.medium,
    color: Colors.light.grey600,
    marginBottom: verticalScale(16),
    textAlign: "center",
    paddingHorizontal: scale(32),
  },
  retryBtn: {
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(24),
    backgroundColor: Colors.light.tint,
    borderRadius: scale(12),
  },
  retryText: {
    ...AppTextStyle.bodyText1,
    fontFamily: AeonikFonts.medium,
    color: Colors.light.white,
  },
});
