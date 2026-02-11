import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AppText as Text } from "@/components/app-text";
import { PrimaryButton } from "@/components/primary-button";
import { moderateScale, scale, verticalScale } from "@/constants/scaling";
import { AeonikFonts, Colors } from "@/constants/theme";

export default function OTPVerificationScreen() {
  const { phoneNumber } = useLocalSearchParams();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(15);

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

  const handleKeyPress = (key: string) => {
    if (key === "backspace") {
      const lastFilledIndex = otp.findLastIndex((digit) => digit !== "");
      if (lastFilledIndex >= 0) {
        const newOtp = [...otp];
        newOtp[lastFilledIndex] = "";
        setOtp(newOtp);
      }
    } else {
      const firstEmptyIndex = otp.findIndex((digit) => digit === "");
      if (firstEmptyIndex >= 0) {
        const newOtp = [...otp];
        newOtp[firstEmptyIndex] = key;
        setOtp(newOtp);
      }
    }
  };

  const handleContinue = () => {
    if (otp.every((digit) => digit !== "")) {
      // Verify OTP and navigate to main app
      router.push("/(tabs)");
    }
  };

  const handleResendCode = () => {
    if (timer === 0) {
      setTimer(15);
      // Resend OTP logic here
    }
  };

  const handleSkip = () => {
    // Navigate to onboarding or main app
    router.push("/onboarding");
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
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
            hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
          >
            <Ionicons
              name="arrow-back"
              size={scale(24)}
              color={Colors.light.mainDarkColor}
            />
          </TouchableOpacity>
        </View>

        {/* Content */}
        <View style={styles.content}>
          <Text style={styles.title}>Enter the 6-digit code</Text>
          <Text style={styles.subtitle}>
            We sent a code to {phoneNumber || "+1 (316) 555-0116"}
          </Text>

          {/* OTP Input Boxes */}
          <View style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <View key={index} style={styles.otpBox}>
                <Text style={styles.otpText}>{digit}</Text>
              </View>
            ))}
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
              {timer > 0 ? `Resend code in ${formatTimer(timer)}` : "Resend code"}
            </Text>
          </TouchableOpacity>

          {/* Spacer */}
          <View style={styles.spacer} />

          {/* Continue Button */}
          <PrimaryButton
            title="Continue"
            onPress={handleContinue}
            disabled={otp.some((digit) => digit === "")}
          />

          {/* Skip Link */}
          <TouchableOpacity
            style={styles.skipButton}
            onPress={handleSkip}
            activeOpacity={0.7}
          >
            <Text style={styles.skipText}>
              I haven't done my skin analysis yet
            </Text>
          </TouchableOpacity>
        </View>

        {/* Custom Numeric Keyboard */}
        <View style={styles.keyboard}>
          {[
            ["1", "2", "3"],
            ["4", "5", "6"],
            ["7", "8", "9"],
            ["", "0", "backspace"],
          ].map((row, rowIndex) => (
            <View key={rowIndex} style={styles.keyboardRow}>
              {row.map((key, keyIndex) => (
                <TouchableOpacity
                  key={keyIndex}
                  style={[
                    styles.key,
                    key === "" && styles.keyEmpty,
                  ]}
                  onPress={() => key && handleKeyPress(key)}
                  activeOpacity={0.6}
                  disabled={key === ""}
                >
                  {key === "backspace" ? (
                    <Ionicons
                      name="backspace-outline"
                      size={scale(24)}
                      color={Colors.light.mainDarkColor}
                    />
                  ) : key !== "" ? (
                    <View style={styles.keyContent}>
                      <Text style={styles.keyNumber}>{key}</Text>
                      {key !== "0" && (
                        <Text style={styles.keyLetters}>
                          {
                            ["", "ABC", "DEF", "GHI", "JKL", "MNO", "PQRS", "TUV", "WXYZ"][
                            parseInt(key)
                            ]
                          }
                        </Text>
                      )}
                    </View>
                  ) : null}
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.scaffold,
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
    fontSize: moderateScale(28),
    fontFamily: AeonikFonts.regular,
    color: Colors.light.mainDarkColor,
    marginBottom: verticalScale(12),
  },
  subtitle: {
    fontSize: moderateScale(16),
    fontFamily: AeonikFonts.regular,
    color: Colors.light.grey500,
    marginBottom: verticalScale(32),
    lineHeight: moderateScale(22),
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: scale(12),
    marginBottom: verticalScale(24),
  },
  otpBox: {
    width: scale(48),
    height: verticalScale(56),
    backgroundColor: Colors.light.white,
    borderRadius: scale(12),
    justifyContent: "center",
    alignItems: "center",
  },
  otpText: {
    fontSize: moderateScale(24),
    fontFamily: AeonikFonts.medium,
    color: Colors.light.mainDarkColor,
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
