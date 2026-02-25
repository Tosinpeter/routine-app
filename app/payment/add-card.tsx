import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AppText as Text } from "@/components/app-text";
import { AppTextInput as TextInput } from "@/components/app-text-input";
import { PrimaryButton } from "@/components/primary-button";
import { moderateScale, scale, verticalScale } from "@/constants/scaling";
import { AeonikFonts, BorderRadius, Colors } from "@/constants/theme";
import { AppTextStyle } from "@/constants/typography";
import { t } from "@/i18n";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  addCard,
  setDefaultCard,
  type SavedCard,
} from "@/store/slices/payment-slice";

function formatCardNumber(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 16);
  return digits.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
}

function formatExpiry(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  if (digits.length >= 2) {
    return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  }
  return digits;
}

function parseExpiry(formatted: string): { month: number; year: number } | null {
  const [m, y] = formatted.split("/").map((s) => s.trim());
  if (!m || !y || m.length !== 2 || y.length !== 2) return null;
  const month = parseInt(m, 10);
  const year = 2000 + parseInt(y, 10);
  if (month < 1 || month > 12) return null;
  return { month, year };
}

export default function AddCardScreen() {
  const dispatch = useAppDispatch();
  const { cards, addCardLoading } = useAppSelector((state) => state.payment);

  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [saveCard, setSaveCard] = useState(true);
  const [setAsDefault, setSetAsDefault] = useState(true);

  const handleCardNumberChange = (text: string) => {
    setCardNumber(formatCardNumber(text));
  };

  const handleExpiryChange = (text: string) => {
    setExpiry(formatExpiry(text));
  };

  const handleSetDefault = (card: SavedCard) => {
    dispatch(setDefaultCard(card.id));
  };

  const handleAddCard = async () => {
    Keyboard.dismiss();
    const rawNumber = cardNumber.replace(/\D/g, "");
    if (rawNumber.length !== 16) {
      return;
    }
    const exp = parseExpiry(expiry);
    if (!exp) {
      return;
    }
    const result = await dispatch(
      addCard({
        number: rawNumber,
        exp_month: exp.month,
        exp_year: exp.year,
        save: saveCard,
        set_default: saveCard && setAsDefault,
      })
    );
    if (addCard.fulfilled.match(result)) {
      setCardNumber("");
      setExpiry("");
      setCvc("");
      router.back();
    }
  };

  const rawNumber = cardNumber.replace(/\D/g, "");
  const exp = parseExpiry(expiry);
  const canSubmit =
    rawNumber.length === 16 &&
    exp != null &&
    exp.month >= 1 &&
    exp.month <= 12;

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.header}>
          <Text style={styles.title}>{t("payment.card.addCardTitle")}</Text>
          <TouchableOpacity
            onPress={() => router.back()}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
          >
            <Ionicons
              name="close"
              size={scale(24)}
              color={Colors.light.mainDarkColor}
            />
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {cards.length > 0 && (
            <View style={styles.existingSection}>
              <Text style={styles.sectionLabel}>
                {t("payment.card.useExisting")}
              </Text>
              {cards.map((card) => (
                <TouchableOpacity
                  key={card.id}
                  style={styles.cardRow}
                  onPress={() => handleSetDefault(card)}
                  activeOpacity={0.7}
                >
                  <View style={styles.mastercardLogo}>
                    <View
                      style={[
                        styles.mastercardCircle,
                        styles.mastercardRed,
                      ]}
                    />
                    <View
                      style={[
                        styles.mastercardCircle,
                        styles.mastercardOrange,
                      ]}
                    />
                  </View>
                  <Text style={styles.cardLast4}>•••• {card.last4}</Text>
                  {card.is_default ? (
                    <Ionicons
                      name="checkmark-circle"
                      size={scale(22)}
                      color={Colors.light.tint}
                    />
                  ) : (
                    <View style={styles.radioEmpty} />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          )}

          <View style={styles.formSection}>
            <Text style={styles.inputLabel}>
              {t("payment.card.cardNumber")}
            </Text>
            <TextInput
              style={styles.input}
              value={cardNumber}
              onChangeText={handleCardNumberChange}
              placeholder={t("payment.card.cardNumberPlaceholder")}
              placeholderTextColor={Colors.light.grey500}
              keyboardType="numeric"
              maxLength={19}
            />

            <View style={styles.row}>
              <View style={styles.half}>
                <Text style={styles.inputLabel}>
                  {t("payment.card.expiry")}
                </Text>
                <TextInput
                  style={styles.input}
                  value={expiry}
                  onChangeText={handleExpiryChange}
                  placeholder={t("payment.card.expiryPlaceholder")}
                  placeholderTextColor={Colors.light.grey500}
                  keyboardType="numeric"
                  maxLength={5}
                />
              </View>
              <View style={styles.half}>
                <Text style={styles.inputLabel}>{t("payment.card.cvc")}</Text>
                <TextInput
                  style={styles.input}
                  value={cvc}
                  onChangeText={setCvc}
                  placeholder={t("payment.card.cvcPlaceholder")}
                  placeholderTextColor={Colors.light.grey500}
                  keyboardType="numeric"
                  maxLength={4}
                  secureTextEntry
                />
              </View>
            </View>

            <TouchableOpacity
              style={styles.checkRow}
              onPress={() => setSaveCard(!saveCard)}
              activeOpacity={0.7}
            >
              <View
                style={[
                  styles.checkbox,
                  saveCard && styles.checkboxChecked,
                ]}
              >
                {saveCard && (
                  <Ionicons
                    name="checkmark"
                    size={scale(14)}
                    color={Colors.light.white}
                  />
                )}
              </View>
              <Text style={styles.checkLabel}>
                {t("payment.card.saveCard")}
              </Text>
            </TouchableOpacity>

            {saveCard && (
              <TouchableOpacity
                style={styles.checkRow}
                onPress={() => setSetAsDefault(!setAsDefault)}
                activeOpacity={0.7}
              >
                <View
                  style={[
                    styles.checkbox,
                    setAsDefault && styles.checkboxChecked,
                  ]}
                >
                  {setAsDefault && (
                    <Ionicons
                      name="checkmark"
                      size={scale(14)}
                      color={Colors.light.white}
                    />
                  )}
                </View>
                <Text style={styles.checkLabel}>
                  {t("payment.card.setAsDefault")}
                </Text>
              </TouchableOpacity>
            )}

            <Text style={styles.hint}>{t("payment.card.mastercardOnly")}</Text>
            <Text style={styles.testHint}>
              {t("payment.card.testCardSuccess")} / {t("payment.card.testCardFail")}
            </Text>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <PrimaryButton
            title={addCardLoading ? "" : t("payment.card.addCard")}
            onPress={handleAddCard}
            disabled={!canSubmit || addCardLoading}
            loading={addCardLoading}
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
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(12),
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.grey200,
  },
  title: {
    ...AppTextStyle.headline6,
    fontFamily: AeonikFonts.medium,
    color: Colors.light.mainDarkColor,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: scale(20),
    paddingTop: verticalScale(20),
    paddingBottom: verticalScale(24),
  },
  existingSection: {
    marginBottom: verticalScale(24),
  },
  sectionLabel: {
    fontSize: moderateScale(13),
    fontFamily: AeonikFonts.regular,
    color: Colors.light.grey500,
    marginBottom: verticalScale(8),
  },
  cardRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(12),
    paddingVertical: verticalScale(12),
    paddingHorizontal: scale(16),
    backgroundColor: Colors.light.white,
    borderRadius: scale(12),
    marginBottom: verticalScale(8),
    borderWidth: 1,
    borderColor: Colors.light.grey200,
  },
  mastercardLogo: {
    width: scale(40),
    height: scale(28),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  mastercardCircle: {
    width: scale(20),
    height: scale(20),
    borderRadius: scale(10),
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
  cardLast4: {
    flex: 1,
    fontSize: moderateScale(15),
    fontFamily: AeonikFonts.medium,
    color: Colors.light.mainDarkColor,
  },
  radioEmpty: {
    width: scale(22),
    height: scale(22),
    borderRadius: BorderRadius.full,
    borderWidth: 2,
    borderColor: Colors.light.grey200,
  },
  formSection: {
    marginBottom: verticalScale(16),
  },
  inputLabel: {
    ...AppTextStyle.bodyText1,
    fontFamily: AeonikFonts.regular,
    color: Colors.light.grey500,
    marginBottom: verticalScale(6),
  },
  input: {
    height: verticalScale(48),
    borderWidth: 1,
    borderColor: Colors.light.grey200,
    borderRadius: scale(12),
    paddingHorizontal: scale(16),
    fontSize: moderateScale(15),
    fontFamily: AeonikFonts.regular,
    color: Colors.light.mainDarkColor,
    backgroundColor: Colors.light.white,
    marginBottom: verticalScale(14),
  },
  row: {
    flexDirection: "row",
    gap: scale(12),
  },
  half: {
    flex: 1,
  },
  checkRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: verticalScale(10),
  },
  checkbox: {
    width: scale(20),
    height: scale(20),
    borderRadius: scale(4),
    borderWidth: 1.5,
    borderColor: Colors.light.grey200,
    alignItems: "center",
    justifyContent: "center",
    marginRight: scale(12),
  },
  checkboxChecked: {
    backgroundColor: Colors.light.tint,
    borderColor: Colors.light.tint,
  },
  checkLabel: {
    flex: 1,
    fontSize: moderateScale(14),
    fontFamily: AeonikFonts.regular,
    color: Colors.light.mainDarkColor,
  },
  hint: {
    fontSize: moderateScale(12),
    fontFamily: AeonikFonts.regular,
    color: Colors.light.grey500,
    marginTop: verticalScale(4),
  },
  testHint: {
    fontSize: moderateScale(11),
    fontFamily: AeonikFonts.regular,
    color: Colors.light.grey500,
    marginTop: verticalScale(2),
  },
  footer: {
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(16),
  },
});
