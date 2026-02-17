import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CountryPicker } from "react-native-country-codes-picker";

import { AppText as Text } from "@/components/app-text";
import { PrimaryButton } from "@/components/primary-button";
import { moderateScale, scale, verticalScale } from "@/constants/scaling";
import { AeonikFonts, Colors } from "@/constants/theme";
import { BackButton } from "@/components/back-button";
import { AppTextStyle } from "@/constants/typography";

export default function PhoneVerificationScreen() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("+1");
  const [countryFlag, setCountryFlag] = useState("🇺🇸");
  const [showCountryPicker, setShowCountryPicker] = useState(false);

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
    // Remove all non-numeric characters
    const cleaned = text.replace(/\D/g, "");
    // Limit to 10 digits
    const limited = cleaned.slice(0, 10);
    setPhoneNumber(limited);
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
     
        {/* Header */}
        <View style={styles.header}>
          <BackButton/>
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
            <TouchableOpacity
              style={styles.countryCodeButton}
              onPress={() => setShowCountryPicker(true)}
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
              placeholder="(316) 555-0116"
              placeholderTextColor={Colors.light.grey400}
              keyboardType="phone-pad"
              maxLength={14} // (XXX) XXX-XXXX
            />
          </View>

          {/* Spacer */}
          <View style={styles.spacer} />

          {/* Continue Button */}
          <PrimaryButton
            title="Continue"
            onPress={handleContinue}
            disabled={phoneNumber.length < 10}
          />

        <PrimaryButton
          title=" I haven't done my skin analysis yet"
          onPress={handleContinue}
          textStyle={{
            color: Colors.light.mainDarkColor
          }}
          style={{
            marginTop: verticalScale(12),
            backgroundColor: Colors.light.white,
          }}
        />

          {/* Skip Link */}
         
        </View>

      {/* Country Picker Modal */}
      <CountryPicker
        show={showCountryPicker}
        lang="en"
        pickerButtonOnPress={(item: any) => {
          setCountryCode(item.dial_code);
          setCountryFlag(item.flag);
          setShowCountryPicker(false);
        }}
        onBackdropPress={() => setShowCountryPicker(false)}
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
