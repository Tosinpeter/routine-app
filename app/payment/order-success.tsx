import React, { useEffect, useRef } from "react";
import {
  Animated,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";

import { AppText as Text } from "@/components/app-text";
import { PrimaryButton } from "@/components/primary-button";
import { scale, verticalScale, moderateScale } from "@/constants/scaling";
import { AeonikFonts, Colors, Shadows } from "@/constants/theme";
import { AppTextStyle } from "@/constants/typography";
import { t } from "@/i18n";

interface OrderProduct {
  name: string;
  price: number;
  image?: string;
}

const SPARKLE_COUNT = 12;



const successStyles = StyleSheet.create({
  container: {
    width: scale(140),
    height: scale(140),
    alignItems: "center",
    justifyContent: "center",
  },
  circle: {
    width: scale(100),
    height: scale(100),
    borderRadius: scale(50),
    backgroundColor: "#2ECC71",
    alignItems: "center",
    justifyContent: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#2ECC71",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.35,
        shadowRadius: 12,
      },
      android: { elevation: 8 },
    }),
  },
  sparkle: {
    position: "absolute",
  },
});

export default function OrderSuccessScreen() {
  const params = useLocalSearchParams<{
    orderId?: string;
    totalCents?: string;
  }>();

  const successImageScale = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(successImageScale, {
      toValue: 1,
      tension: 50,
      friction: 7,
      useNativeDriver: true,
    }).start();
  }, []);

  const orderId = params.orderId ?? "12345";
  const totalCents = params.totalCents ? Number(params.totalCents) : 4000;
  const totalDollars = (totalCents / 100).toFixed(2);

  const products: OrderProduct[] = [
    { name: "Niacinamide Serum", price: 25.0 },
    { name: "Niacinamide Serum", price: 15.0 },
  ];

  const handleViewRoutine = () => {
    router.dismissAll();
    router.push({
      pathname: "/payment/order-tracking",
      params: { orderId },
    });
  };

  const handleTrackOrder = () => {
    router.push({
      pathname: "/payment/order-tracking",
      params: { orderId },
    });
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.checkmarkSection}>
          <Animated.View style={{ transform: [{ scale: successImageScale }] }}>
            <Image
              source={require("@/assets/images/OrderSuccessImage.png")}
              style={styles.successImage}
              contentFit="contain"
            />
          </Animated.View>
        </View>

        <Text style={styles.title}>{t("payment.orderSuccess.title")}</Text>
        <Text style={styles.orderId}>
          {t("payment.orderSuccess.orderId", { id: orderId })}
        </Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            {t("payment.orderSuccess.cardTitle")}
          </Text>

          {products.map((product, index) => (
            <View key={index} style={styles.productRow}>
              <View style={styles.productImageContainer}>
                <Image
                  source={require("@/assets/images/img_product-image.png")}
                  style={styles.productImage}
                  contentFit="contain"
                />
              </View>
              <View style={styles.productInfo}>
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.productPrice}>
                  ${product.price.toFixed(2)}
                </Text>
              </View>
            </View>
          ))}

          <View style={styles.cardDivider} />

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>
              {t("payment.orderSuccess.total")}
            </Text>
            <Text style={styles.totalValue}>${totalDollars}</Text>
          </View>
        </View>

        <View style={{ height: verticalScale(32) }} />
      </ScrollView>

      <View style={styles.bottomContainer}>
        <PrimaryButton
          title={t("payment.orderSuccess.viewRoutine")}
          onPress={handleViewRoutine}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(237, 235, 227, 1)",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: scale(20),
    alignItems: "center",
  },
  checkmarkSection: {
    marginTop: verticalScale(30),
    marginBottom: verticalScale(22),
    alignItems: "center",
  },
  title: {
    fontSize: moderateScale(28),
    fontFamily: AeonikFonts.bold,
    color: Colors.light.mainDarkColor,
    textAlign: "center",
    lineHeight: moderateScale(34),
    marginBottom: verticalScale(12),
  },
  orderId: {
    ...AppTextStyle.subtitle2,
    fontFamily: AeonikFonts.medium,
    color: "rgba(32, 32, 30, 1)",
    opacity: 0.8,
    textAlign: "center",
    marginBottom: verticalScale(28),
  },
  card: {
    width: "100%",
    backgroundColor: Colors.light.white,
    borderRadius: scale(20),
    padding: scale(20),
    ...Shadows.md,
  },
  cardTitle: {
    ...AppTextStyle.subtitle1,
    fontFamily: AeonikFonts.bold,
    color: Colors.light.mainDarkColor,
    marginBottom: verticalScale(16),
  },
  productRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: verticalScale(12),
  },
  productImageContainer: {
    width: scale(56),
    height: scale(56),
    borderRadius: scale(12),
    backgroundColor: "rgba(246, 240, 238, 1)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: scale(12),
    overflow: "hidden",
  },
  productImage: {
    width: scale(51),
    height: scale(51),
  },

  successImage: {
    width: scale(187),
    height: scale(187),
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    ...AppTextStyle.subtitle2,
    fontFamily: AeonikFonts.medium,
    color: Colors.light.mainDarkColor,
    marginBottom: verticalScale(2),
  },
  productPrice: {
    ...AppTextStyle.bodyText1,
    fontFamily: AeonikFonts.medium,
    color: Colors.light.grey500,
  },
  cardDivider: {
    height: 1,
    backgroundColor: Colors.light.grey200,
    marginVertical: verticalScale(14),
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  totalLabel: {
    ...AppTextStyle.subtitle2,
    fontFamily: AeonikFonts.medium,
    color: Colors.light.mainDarkColor,
  },
  totalValue: {
    ...AppTextStyle.subtitle1,
    fontFamily: AeonikFonts.medium,
    color: Colors.light.mainDarkColor,
  },
  bottomContainer: {
    paddingHorizontal: scale(20),
    paddingTop: verticalScale(12),
    paddingBottom: verticalScale(16),
    backgroundColor: Colors.light.scaffold,
  },
});
