import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
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
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(15);
  const [error, setError] = useState<string | null>(null);
  const inputRefs = useRef<(TextInput | null)[]>([]);

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
  }, []);

  // Auto-focus first input on mount
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleOtpChange = (text: string, index: number) => {
    // Only allow numeric input
    const numericText = text.replace(/[^0-9]/g, "");

    if (numericText.length > 1) {
      // Handle paste
      const digits = numericText.slice(0, 6).split("");
      const newOtp = [...otp];
      digits.forEach((digit, i) => {
        if (index + i < 6) {
          newOtp[index + i] = digit;
        }
      });
      setOtp(newOtp);

      // Focus last filled or next empty
      const nextIndex = Math.min(index + digits.length, 5);
      inputRefs.current[nextIndex]?.focus();
    } else {
      // Single character input
      const newOtp = [...otp];
      newOtp[index] = numericText;
      setOtp(newOtp);

      // Auto-focus next input
      if (numericText && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      // Focus previous input on backspace if current is empty
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleContinue = async () => {
    if (otp.some((digit) => digit === "")) return;
    const code = otp.join("");
    const phone = typeof phoneNumber === "string" ? phoneNumber : "";
    if (!phone) {
      toast.error(t("auth.otp.errorMissingPhone"))
      return;
    }
    setError(null);
    const result = await verifyOtp(phone, code);
    console.log(result);
    if (result.success) {
      // router.replace("/(tabs)");
    } else {
      const message = t(`auth.errorCodes.${result.error}` as any)
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

          {/* OTP Input Boxes */}
          <View style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <React.Fragment key={index}>
                <TextInput
                  ref={(ref) => {
                    if (ref) {
                      inputRefs.current[index] = ref;
                    }
                  }}
                  style={styles.otpInput}
                  value={digit}
                  onChangeText={(text) => handleOtpChange(text, index)}
                  onKeyPress={(e) => handleKeyPress(e, index)}
                  keyboardType="number-pad"
                  maxLength={1}
                  selectTextOnFocus
                  textAlign="center"
                />
                {index === 2 && (
                  <View style={styles.dashContainer}>
                    <Text style={styles.dashText}>-</Text>
                  </View>
                )}
              </React.Fragment>
            ))}
          </View>

          {error ? (
            <Text style={styles.errorText}>{error}</Text>
          ) : null}

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
            disabled={otp.some((digit) => digit === "") || isLoading}
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
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: scale(12),
    marginBottom: verticalScale(24),
  },
  otpInput: {
    width: scale(46),
    height: verticalScale(60),
    backgroundColor: Colors.light.white,
    borderRadius: scale(12),
    fontSize: moderateScale(24),
    fontFamily: AeonikFonts.medium,
    color: Colors.light.mainDarkColor,
    borderWidth: 1,
    borderColor: Colors.light.grey200,
  },
  dashContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  dashText: {
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
