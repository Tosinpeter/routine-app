import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet } from "react-native";
import { router } from "expo-router";
import { Loader } from "@/components/loader";
import { AppTextStyle } from "@/constants/typography";
import { AeonikFonts, Colors } from "@/constants/theme";
import { scale } from "@/constants/scaling";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { chargeCard, createOrder, type CreateOrderPayload } from "@/store/slices/payment-slice";
import { t } from "@/i18n";

export default function CreatingOrderSheet() {
  const dispatch = useAppDispatch();
  const ran = useRef(false);
  const order = useAppSelector((state) => state.order);
  const {
    checkoutDeliveryInfo,
    appliedCoupon,
    cards,
  } = useAppSelector((state) => state.payment);

  const defaultCard = cards.find((c) => c.is_default) ?? cards[0];
  const deliveryInfo = checkoutDeliveryInfo ?? {
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
  const discountCents = appliedCoupon?.discount_cents ?? 0;
  const totalCents = Math.max(0, order.subtotalCents - discountCents);

  useEffect(() => {
    if (!defaultCard) {
      router.replace("/payment/checkout-summary");
      return;
    }
    if (ran.current) return;
    ran.current = true;

    (async () => {
      const chargeResult = await dispatch(
        chargeCard({ card_id: defaultCard.id, amount_cents: totalCents })
      );
      if (chargeCard.rejected.match(chargeResult)) {
        const msg = chargeResult.payload ?? t("payment.order.errorGeneric");
        router.replace({
          pathname: "/payment/order-error",
          params: { message: msg },
        });
        return;
      }

      const payload: CreateOrderPayload = {
        delivery_first_name: deliveryInfo.firstName,
        delivery_email: deliveryInfo.email,
        delivery_address: deliveryInfo.address,
        delivery_apartment: deliveryInfo.apartment || undefined,
        delivery_city: deliveryInfo.city,
        delivery_postal_code: deliveryInfo.postalCode,
        delivery_phone: deliveryInfo.phone || undefined,
        delivery_country: deliveryInfo.countryName,
        subtotal_cents: order.subtotalCents,
        shipment_cents: order.shipmentCents,
        insurance_cents: order.insuranceCents,
        discount_cents: discountCents,
        total_cents: totalCents,
        card_last4: defaultCard.last4,
        coupon_code: appliedCoupon?.code,
      };

      const orderResult = await dispatch(createOrder(payload));
      if (createOrder.rejected.match(orderResult)) {
        const msg = orderResult.payload ?? t("payment.order.errorGeneric");
        router.replace({
          pathname: "/payment/order-error",
          params: { message: msg },
        });
        return;
      }

      router.replace({
        pathname: "/payment/order-sheet",
        params: {
          orderId: orderResult.payload.id,
          totalCents: String(totalCents),
        },
      });
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.content}>
      <View style={styles.loadingContainer}>
        <Loader
          image={require("@/assets/images/AnalyzeLoaderIndicator.png")}
          size={70}
        />
      </View>
      <Text style={styles.title}>{t("payment.order.creatingTitle")}</Text>
      <Text style={styles.subTitle}>{t("payment.order.creatingSubtitle")}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    textAlign: "center",
    padding: scale(32),
    backgroundColor: Colors.light.white,
  },
  title: {
    ...AppTextStyle.subtitle1,
    textAlign: "center",
    fontFamily: AeonikFonts.medium,
  },
  subTitle: {
    ...AppTextStyle.bodyText2,
    marginTop: scale(10),
    textAlign: "center",
    fontFamily: AeonikFonts.regular,
  },
  loadingContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: scale(24),
  },
});
