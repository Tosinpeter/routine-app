import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
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

export default function PhoneVerificationScreen() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("+1");

  const handleContinue = () => {
    if (phoneNumber.length >= 10) {
      // Navigate to OTP screen with the phone number
      router.push({
        pathname: "/auth/otp-verification",
        params: {
          phoneNumber: `${countryCode} ${phoneNumber}`,
        },
      });
    }
  };

  const handleSkip = () => {
    // Navigate to onboarding or main app
    router.push("/onboarding");
  };

  const handleKeyPress = (key: string) => {
    if (key === "backspace") {
      setPhoneNumber(phoneNumber.slice(0, -1));
    } else if (phoneNumber.length < 10) {
      setPhoneNumber(phoneNumber + key);
    }
  };

  const formatPhoneNumber = (number: string) => {
    if (!number) return "";
    const cleaned = number.replace(/\D/g, "");
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return number;
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
          <Text style={styles.title}>Enter your phone number</Text>
          <Text style={styles.subtitle}>
            We'll check if you've already done a skin analysis and link your
            results.
          </Text>

          {/* Phone Input */}
          <View style={styles.phoneInputContainer}>
            <View style={styles.countryCodeButton}>
              <Text style={styles.flagEmoji}>🇺🇸</Text>
              <Text style={styles.countryCodeText}>{countryCode}</Text>
            </View>
            <View style={styles.phoneInputWrapper}>
              <Text
                style={[
                  styles.phoneNumberText,
                  phoneNumber.length === 0 && styles.phoneNumberPlaceholder,
                ]}
              >
                {formatPhoneNumber(phoneNumber) || "(316) 555-0116"}
              </Text>
            </View>
          </View>

          {/* Spacer */}
          <View style={styles.spacer} />

          {/* Continue Button */}
          <PrimaryButton
            title="Continue"
            onPress={handleContinue}
            disabled={phoneNumber.length < 10}
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
  phoneInputContainer: {
    flexDirection: "row",
    gap: scale(12),
    marginBottom: verticalScale(24),
  },
  countryCodeButton: {
    height: verticalScale(56),
    paddingHorizontal: scale(16),
    backgroundColor: Colors.light.white,
    borderRadius: scale(12),
    flexDirection: "row",
    alignItems: "center",
    gap: scale(8),
  },
  flagEmoji: {
    fontSize: moderateScale(24),
  },
  countryCodeText: {
    fontSize: moderateScale(17),
    fontFamily: AeonikFonts.regular,
    color: Colors.light.mainDarkColor,
  },
  phoneInputWrapper: {
    flex: 1,
    height: verticalScale(56),
    backgroundColor: Colors.light.white,
    borderRadius: scale(12),
    paddingHorizontal: scale(16),
    justifyContent: "center",
  },
  phoneNumberText: {
    fontSize: moderateScale(17),
    fontFamily: AeonikFonts.regular,
    color: Colors.light.mainDarkColor,
  },
  phoneNumberPlaceholder: {
    color: Colors.light.grey400,
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
