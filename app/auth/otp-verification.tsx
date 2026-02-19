import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { OtpInput } from "react-native-otp-entry";
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

export default function OTPVerificationScreen() {
  const { phoneNumber } = useLocalSearchParams();
  const { verifyOtp, isLoading } = useAuth();
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(30);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const handleContinue = async () => {
    Keyboard.dismiss();

    if (otp.length !== 6) return;
    const phone = typeof phoneNumber === "string" ? phoneNumber : "";
    if (!phone) {
      toast.error(t("auth.otp.errorMissingPhone"));
      return;
    }
    const result = await verifyOtp(phone, otp);
    if (result.success) {
      // router.replace("/(tabs)");
    } else {
      const message = t(`auth.errorCodes.${result.error}` as any);
      toast.error(message);
    }
  };

  const handleResendCode = () => {
    if (timer === 0) {
      setTimer(15);
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
        behavior={Platform.OS === "ios" ? "padding" : undefined}
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

          {/* OTP Input */}
          <View style={styles.otpContainer}>
            <OtpInput
              numberOfDigits={6}
              type="numeric"
              autoFocus
              onTextChange={setOtp}
              focusColor={Colors.light.tint}
              theme={{
                containerStyle: styles.otpInputContainer,
                pinCodeContainerStyle: styles.otpInput,
                pinCodeTextStyle: styles.otpInputText,
                focusStickStyle: styles.otpFocusStick,
                focusedPinCodeContainerStyle: styles.otpInputFocused,
                filledPinCodeContainerStyle: styles.otpInputFilled,
              }}
            />
          </View>

       

          {/* Resend Code */}
          <TouchableOpacity
            onPress={handleResendCode}
            disabled={timer > 0}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.resendText,
                timer === 0 && styles.resendTextActive,
              ]}
            >
              {timer > 0 ? t("auth.otp.resendCodeIn", { time: formatTimer(timer) }) : t("auth.otp.resendCode")}
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
            onPress={handleContinue}
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
  },
  otpInputContainer: {
    width: "auto",
    gap: scale(12),
  },
  otpInput: {
    width: scale(46),
    height: verticalScale(60),
    backgroundColor: Colors.light.white,
    borderRadius: scale(12),
    borderWidth: 1,
    borderColor: Colors.light.grey200,
    justifyContent: "center",
    alignItems: "center",
  },
  otpInputText: {
    fontSize: moderateScale(24),
    fontFamily: AeonikFonts.medium,
    color: Colors.light.mainDarkColor,
  },
  otpFocusStick: {
    backgroundColor: Colors.light.tint,
  },
  otpInputFocused: {
    borderColor: Colors.light.tint,
  },
  otpInputFilled: {
    borderColor: Colors.light.grey200,
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
