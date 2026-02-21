import { toast } from "@backpackapp-io/react-native-toast";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { CountryPicker } from "react-native-country-codes-picker";
import { SafeAreaView } from "react-native-safe-area-context";

import { AppText as Text } from "@/components/app-text";
import { BackButton } from "@/components/back-button";
import { PrimaryButton } from "@/components/primary-button";
import { moderateScale, scale, verticalScale } from "@/constants/scaling";
import { AeonikFonts, Colors, Fonts } from "@/constants/theme";
import { AppTextStyle } from "@/constants/typography";
import { useAuth } from "@/contexts/AuthContext";
import { t } from "@/i18n";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  setAuthLoading,
  setCountry,
  setPhoneNumber,
  setShowCountryPicker,
} from "@/store/slices/auth-slice";
import { router } from "expo-router";

export default function PhoneVerificationScreen() {
  const { requestOtp } = useAuth();
  const dispatch = useAppDispatch();
  const { phoneNumber, countryCode, countryFlag, showCountryPicker, isLoading } =
    useAppSelector((state) => state.auth);

  const handleContinue = async () => {
    Keyboard.dismiss();
    if (phoneNumber.length < 10) return;
    const phoneForApi = `${countryCode}${phoneNumber.replace(/\D/g, "")}`;

    try {
      dispatch(setAuthLoading(true));
      const result = await requestOtp(phoneForApi);
      console.log(result);
      
      if (result.success) {
        router.push({
          pathname: "/auth/otp-verification",
          params: {
            phoneNumber: `${countryCode} ${formatPhoneNumber(phoneNumber)}`,
          },
        });
      } else {
        const message = t(`auth.errorCodes.${result.error}` as any);        
        toast.error(message);
      }
    } finally {
      dispatch(setAuthLoading(false));
    }
  };

  const formatPhoneNumber = (number: string) => {
    if (!number) return "";
    const cleaned = number.replace(/\D/g, "");

    // Format as user types
    if (cleaned.length <= 3) {
      return cleaned;
    } else if (cleaned.length <= 6) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
    } else {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
    }
  };

  const handlePhoneChange = (text: string) => {
    const cleaned = text.replace(/\D/g, "");
    const limited = cleaned.slice(0, 10);
    if (limited.length >= 10) {
      Keyboard.dismiss();

    }
    dispatch(setPhoneNumber(limited));
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoid}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 10 : 20}
      >
        {/* Header */}
        <View style={styles.header}>
          <BackButton />
        </View>

        {/* Content */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.content}>
            <Text style={styles.title}>{t("auth.phone.title")}</Text>
            <Text style={styles.subtitle}>
              {t("auth.phone.subtitle")}
            </Text>

            {/* Phone Input */}
            <View style={styles.phoneInputContainer}>
              <TouchableOpacity
                style={styles.countryCodeButton}
                onPress={() => dispatch(setShowCountryPicker(true))}
                activeOpacity={0.7}
              >
                <Text style={styles.flagEmoji}>{countryFlag}</Text>
                <Text style={styles.countryCodeText}>{countryCode}</Text>
                <Ionicons
                  name="chevron-down"
                  size={scale(18)}
                  color={Colors.light.grey500}
                />
              </TouchableOpacity>
              <TextInput
                style={styles.phoneInput}
                value={formatPhoneNumber(phoneNumber)}
                onChangeText={handlePhoneChange}
                placeholder={t("auth.phone.placeholder")}
                placeholderTextColor={Colors.light.grey400}
                keyboardType="phone-pad"
                maxLength={14} // (XXX) XXX-XXXX
              />
            </View>

            {/* Spacer */}
            <View style={styles.spacer} />

            {/* Continue Button */}
            <PrimaryButton
              title={t("common.continue")}
              loading={isLoading}
              onPress={handleContinue}
              disabled={phoneNumber.length < 10}
            />

            <PrimaryButton
              title={t("auth.skipAnalysis")}
              onPress={() => { }}
              textStyle={{
                fontFamily: Fonts.regular,
                color: Colors.light.mainDarkColor
              }}
              style={{
                marginTop: verticalScale(12),
                backgroundColor: Colors.light.white,
              }}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
        

      {/* Country Picker Modal */}
      <CountryPicker
        show={showCountryPicker}
        lang="en"
        pickerButtonOnPress={(item: any) => {
          dispatch(
            setCountry({
              code: item.dial_code,
              flag: item.flag,
            })
          );
          dispatch(setShowCountryPicker(false));
        }}
        onBackdropPress={() => dispatch(setShowCountryPicker(false))}
        style={{
          modal: {
            height: verticalScale(500),
            backgroundColor: Colors.light.white,
            borderTopLeftRadius: scale(20),
            borderTopRightRadius: scale(20),
          },
          backdrop: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
          textInput: {
            height: verticalScale(48),
            borderRadius: scale(12),
            borderWidth: 1,
            borderColor: Colors.light.grey200,
            paddingHorizontal: scale(16),
            fontSize: moderateScale(15),
            fontFamily: AeonikFonts.regular,
            color: Colors.light.mainDarkColor,
            backgroundColor: Colors.light.white,
          },
          countryButtonStyles: {
            height: verticalScale(56),
            borderBottomWidth: 1,
            borderBottomColor: Colors.light.grey200,
            paddingHorizontal: scale(16),
          },
          countryName: {
            fontSize: moderateScale(16),
            fontFamily: AeonikFonts.regular,
            color: Colors.light.mainDarkColor,
          },
          dialCode: {
            fontSize: moderateScale(15),
            fontFamily: AeonikFonts.regular,
            color: Colors.light.grey500,
          },
          flag: {
            fontSize: moderateScale(28),
          },
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F1EE",
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    paddingHorizontal: scale(20),
    paddingTop: verticalScale(16),
    paddingBottom: verticalScale(8),
  },
  backButton: {
    width: scale(40),
    height: scale(40),
    justifyContent: "center",
  },
  content: {
    flex: 1,
    paddingHorizontal: scale(20),
    paddingTop: verticalScale(40),
  },
  title: {
    ...AppTextStyle.headline1,
    fontFamily: AeonikFonts.medium,
    marginBottom: verticalScale(16),
  },
  subtitle: {
    fontSize: moderateScale(16),
    color: Colors.light.grey500,
    marginBottom: verticalScale(32),
    lineHeight: moderateScale(22),
  },
  phoneInputContainer: {
    flexDirection: "row",
    gap: scale(12),
    marginBottom: verticalScale(24),
  },
  countryCodeButton: {
    height: verticalScale(56),
    paddingHorizontal: scale(12),
    backgroundColor: Colors.light.white,
    borderRadius: scale(12),
    flexDirection: "row",
    alignItems: "center",
    gap: scale(6),
    borderWidth: 1,
    borderColor: Colors.light.grey200,
  },
  flagEmoji: {
    fontSize: moderateScale(24),
  },
  countryCodeText: {
    fontSize: moderateScale(17),
    fontFamily: AeonikFonts.regular,
    color: Colors.light.mainDarkColor,
  },
  phoneInput: {
    flex: 1,
    height: verticalScale(56),
    backgroundColor: Colors.light.white,
    borderRadius: scale(12),
    paddingHorizontal: scale(16),
    fontSize: moderateScale(17),
    fontFamily: AeonikFonts.regular,
    color: Colors.light.mainDarkColor,
    borderWidth: 1,
    borderColor: Colors.light.grey200,
  },
  spacer: {
    flex: 1,
  },

  skipText: {
    fontSize: moderateScale(16),
    fontFamily: AeonikFonts.regular,
    color: Colors.light.mainDarkColor,
  },
  keyboard: {
    backgroundColor: Colors.light.lightGrey100,
    paddingHorizontal: scale(4),
    paddingTop: verticalScale(8),
    paddingBottom: verticalScale(8),
  },
  keyboardRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: verticalScale(8),
  },
  key: {
    width: scale(110),
    height: verticalScale(50),
    backgroundColor: Colors.light.white,
    borderRadius: scale(8),
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: scale(4),
  },
  keyEmpty: {
    backgroundColor: "transparent",
  },
  keyContent: {
    alignItems: "center",
  },
  keyNumber: {
    fontSize: moderateScale(28),
    fontFamily: AeonikFonts.regular,
    color: Colors.light.mainDarkColor,
  },
  keyLetters: {
    fontSize: moderateScale(10),
    fontFamily: AeonikFonts.regular,
    color: Colors.light.mainDarkColor,
    marginTop: verticalScale(-4),
  },
});
