import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AppText as Text } from "@/components/app-text";
import { PrimaryButton } from "@/components/primary-button";
import { scale, verticalScale } from "@/constants/scaling";
import { AeonikFonts, Colors } from "@/constants/theme";
import { AppTextStyle } from "@/constants/typography";
import { t } from "@/i18n";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { validateCoupon } from "@/store/slices/payment-slice";

export default function ApplyCouponScreen() {
  const dispatch = useAppDispatch();
  const subtotalCents = useAppSelector((state) => state.order.subtotalCents);
  const appliedCoupon = useAppSelector((state) => state.payment.appliedCoupon);
  const couponLoading = useAppSelector((state) => state.payment.couponLoading);
  const [couponCode, setCouponCode] = useState(appliedCoupon?.code ?? "");

  const handleApply = async () => {
    const result = await dispatch(
      validateCoupon({ code: couponCode, subtotal_cents: subtotalCents })
    );
    if (validateCoupon.fulfilled.match(result)) {
      router.back();
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.header}>
          <Text style={styles.title}>{t("payment.checkout.couponSheetTitle")}</Text>
          <TouchableOpacity onPress={() => router.back()} hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}>
            <Ionicons name="close" size={scale(24)} color={Colors.light.mainDarkColor} />
          </TouchableOpacity>
        </View>

        <View style={styles.inputWrapper}>
          <Text style={styles.inputLabel}>{t("payment.checkout.couponCodeLabel")}</Text>
          <TextInput
            style={styles.input}
            value={couponCode}
            onChangeText={setCouponCode}
            placeholder={t("payment.checkout.couponPlaceholder")}
            placeholderTextColor={Colors.light.grey525}
            autoCapitalize="characters"
            autoCorrect={false}
            editable={!couponLoading}
          />
        </View>

        <View style={styles.actions}>
          <PrimaryButton
            title={couponLoading ? "" : t("payment.checkout.couponApply")}
            onPress={handleApply}
            disabled={couponLoading || !couponCode.trim()}
            loading={couponLoading}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: scale(5),
    backgroundColor: Colors.light.scaffold,
  },
  keyboardView: {
    flex: 1,
    paddingHorizontal: scale(20),
    paddingTop: verticalScale(16),
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: verticalScale(24),
  },
  title: {
    ...AppTextStyle.headline5,
    fontFamily: AeonikFonts.medium,
    color: Colors.light.mainDarkColor,
  },
  inputWrapper: {
    marginBottom: verticalScale(28),
  },
  inputLabel: {
    fontSize: scale(14),
    fontFamily: AeonikFonts.medium,
    color: Colors.light.mainDarkColor,
    marginBottom: verticalScale(8),
  },
  input: {
    borderWidth: 2,
    borderColor: "rgba(32, 32, 30, 0.12)",
    borderRadius: scale(16),
    paddingHorizontal: scale(18),
    paddingVertical: verticalScale(16),
    fontSize: scale(17),
    fontFamily: AeonikFonts.regular,
    color: Colors.light.mainDarkColor,
    backgroundColor: Colors.light.white,
    minHeight: verticalScale(56),
  },
  actions: {
    marginTop: verticalScale(8),
  },
});
