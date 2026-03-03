import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import type { TextInputProps } from "react-native";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import { SafeAreaView } from "react-native-safe-area-context";

import { AppText as Text } from "@/components/app-text";
import { BackButton } from "@/components/back-button";
import { PrimaryButton } from "@/components/primary-button";
import { moderateScale, scale, verticalScale } from "@/constants/scaling";
import { AeonikFonts, Colors } from "@/constants/theme";
import { AppTextStyle } from "@/constants/typography";
import { useAuth } from "@/contexts/AuthContext";
import { t } from "@/i18n";
import { toast } from "@backpackapp-io/react-native-toast";
import { Profile } from "@/models/profile";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  decrementOtpResendTimer,
  setAuthLoading,
  setOtp,
  startOtpResendTimer,
} from "@/store/slices/auth-slice";

const CELL_COUNT = 6;
const autoComplete = Platform.select<TextInputProps["autoComplete"]>({
  android: "sms-otp",
  default: "one-time-code",
});

export default function OTPVerificationScreen() {
  const { phoneNumber, rawPhone } = useLocalSearchParams();
  const { verifyOtp } = useAuth();
  const dispatch = useAppDispatch();
  const { otp, isLoading, otpResendTimer } = useAppSelector((state) => state.auth);

  const setOtpValue = (value: string) => dispatch(setOtp(value));

  const codeFieldRef = useBlurOnFulfill({ value: otp, cellCount: CELL_COUNT });
  const [codeFieldProps, getCellOnLayoutHandler] = useClearByFocusCell({
    value: otp,
    setValue: setOtpValue,
  });

  useEffect(() => {
    if (otpResendTimer <= 0) return;
    const interval = setInterval(() => {
      dispatch(decrementOtpResendTimer());
    }, 1000);
    return () => clearInterval(interval);
  }, [otpResendTimer, dispatch]);

  const handleContinue = async () => {
    Keyboard.dismiss();

    if (otp.length !== 6) return;
    const phone = typeof rawPhone === "string" ? rawPhone : (typeof phoneNumber === "string" ? phoneNumber : "");
    if (!phone) {
      toast.error(t("auth.otp.errorMissingPhone"));
      return;
    }
    try {
      dispatch(setAuthLoading(true));
      const result = await verifyOtp(phone, otp);
      console.log("[verify-otp] result:", JSON.stringify(result));
      if (result.success) {
        if (!!(result.data as Profile).isProfileComplete) {
          router.replace("/start-analysis");
        }
      } else {
        const message = t(`auth.errorCodes.${result.error}` as any);
        toast.error(message);
      }
    } finally {
      dispatch(setAuthLoading(false));
    }
  };

  const handleResendCode = () => {
    if (otpResendTimer === 0) {
      dispatch(startOtpResendTimer());
      // Resend OTP logic here
    }
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
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
        <View style={styles.content}>
          <Text style={styles.title}>{t("auth.otp.title")}</Text>
          <Text style={styles.subtitle}>
            {t("auth.otp.subtitle", { phoneNumber: phoneNumber || "+1 (316) 555-0116" })}
          </Text>

          {/* OTP Input (000-000) */}
          <View style={styles.otpContainer}>
            <CodeField
              ref={codeFieldRef}
              {...codeFieldProps}
              value={otp}
              onChangeText={setOtpValue}
              cellCount={CELL_COUNT}
              rootStyle={styles.codeFieldRoot}
              keyboardType="number-pad"
              textContentType="oneTimeCode"
              autoComplete={autoComplete}
              renderCell={({ index, symbol, isFocused }) => (
                <React.Fragment key={index}>
                  {index === 3 && (
                    <View style={styles.otpDash}>
                      <Text style={styles.otpDashText}>-</Text>
                    </View>
                  )}
                  <View
                    style={[
                      styles.otpCell,
                      isFocused && styles.otpCellFocused,
                    ]}
                    onLayout={getCellOnLayoutHandler(index)}
                  >
                    <Text style={styles.otpCellText}>
                      {symbol || (isFocused ? <Cursor /> : null)}
                    </Text>
                  </View>
                </React.Fragment>
              )}
            />
          </View>

       

          {/* Resend Code */}
          <TouchableOpacity
            onPress={handleResendCode}
            disabled={otpResendTimer > 0}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.resendText,
                otpResendTimer === 0 && styles.resendTextActive,
              ]}
            >
              {otpResendTimer > 0
                ? t("auth.otp.resendCodeIn", {
                    time: formatTimer(otpResendTimer),
                  })
                : t("auth.otp.resendCode")}
            </Text>
          </TouchableOpacity>

          {/* Spacer */}
          <View style={styles.spacer} />

          {/* Continue Button */}
          <PrimaryButton
            title={t("common.continue")}
            onPress={handleContinue}
            disabled={otp.length !== 6 || isLoading}
            loading={isLoading}
          />

          {/* Skip Link */}
          <PrimaryButton
            title={t("auth.skipAnalysis")}
            onPress={() => {}}
            textStyle={{
              color: Colors.light.mainDarkColor
            }}
            style={{
              marginTop: verticalScale(12),
              backgroundColor: Colors.light.white,
            }}
          />
        </View>

        </KeyboardAvoidingView>
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
    color: Colors.light.mainDarkColor,
    marginBottom: verticalScale(12),
  },
  subtitle: {
    fontSize: moderateScale(16),
    color: Colors.light.grey500,
    marginBottom: verticalScale(32),
    lineHeight: moderateScale(22),
  },
  otpContainer: {
    marginBottom: verticalScale(24),
    paddingHorizontal: scale(19),
    alignItems: "center",
  },
  codeFieldRoot: {
    gap: scale(10),
  },
  otpCell: {
    width: scale(46),
    height: verticalScale(60),
    backgroundColor: Colors.light.white,
    borderRadius: scale(12),
    borderWidth: 1,
    borderColor: Colors.light.grey200,
    justifyContent: "center",
    alignItems: "center",
  },
  otpCellFocused: {
    borderColor: Colors.light.tint,
  },
  otpCellText: {
    fontSize: moderateScale(24),
    fontFamily: AeonikFonts.medium,
    color: Colors.light.mainDarkColor,
  },
  otpDash: {
    width: scale(20),
    height: verticalScale(60),
    justifyContent: "center",
    alignItems: "center",
  },
  otpDashText: {
    fontSize: moderateScale(24),
    fontFamily: AeonikFonts.medium,
    color: Colors.light.grey400,
  },
  resendText: {
    fontSize: moderateScale(14),
    fontFamily: AeonikFonts.regular,
    color: Colors.light.grey500,
    textAlign: "left",
  },
  resendTextActive: {
    color: Colors.light.tint,
  },
  errorText: {
    fontSize: moderateScale(14),
    fontFamily: AeonikFonts.regular,
    color: "#DC2626",
    marginBottom: verticalScale(12),
    textAlign: "center",
  },
  spacer: {
    flex: 1,
  },
  skipButton: {
    alignItems: "center",
    paddingVertical: verticalScale(16),
    marginTop: verticalScale(12),
  },
  skipText: {
    fontSize: moderateScale(16),
    fontFamily: AeonikFonts.regular,
    color: Colors.light.mainDarkColor,
  },
});
