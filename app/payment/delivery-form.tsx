import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CountryPicker } from "react-native-country-codes-picker";

import { AppText as Text } from "@/components/app-text";
import { AppTextInput as TextInput } from "@/components/app-text-input";
import { PrimaryButton } from "@/components/primary-button";
import { moderateScale, scale, verticalScale } from "@/constants/scaling";
import { AeonikFonts, Colors } from "@/constants/theme";
import { AppTextStyle } from "@/constants/typography";
import { t } from "@/i18n";

export default function DeliveryFormScreen() {
  const [email, _setEmail] = useState("example@gmail.com");
  const [signUpForNews, setSignUpForNews] = useState(false);
  const [showCountryPicker, setShowCountryPicker] = useState(false);
  const [showPhoneCountryPicker, setShowPhoneCountryPicker] = useState(false);
  const [countryCode, setCountryCode] = useState("US");
  const [countryName, setCountryName] = useState("United stated");
  const [phoneCountryCode, setPhoneCountryCode] = useState("+31");
  const [phoneCountryFlag, setPhoneCountryFlag] = useState("🇳🇱");
  const [firstName, setFirstName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [address, setAddress] = useState("");
  const [apartment, setApartment] = useState("");
  const [city, setCity] = useState("");
  const [county, _setCounty] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [phone, setPhone] = useState("6 84562056");

  const handlePlaceOrder = () => {
    // Validate required fields
    if (!firstName || !formEmail || !address || !city || !postalCode) {
      alert(t("payment.delivery.fillRequired"));
      return;
    }

    // Navigate to checkout summary with form data
    router.push({
      pathname: "/payment/checkout-summary",
      params: {
        firstName,
        email: formEmail,
        address,
        apartment,
        city,
        county,
        postalCode,
        phone: `${phoneCountryCode} ${phone}`,
        countryCode,
        countryName,
      },
    });
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header with Logo and Email */}
        <View style={styles.headerSection}>
          <View style={styles.logoContainer}>
            <Text style={styles.logoText}>{t("common.brandName")}</Text>
            <View style={styles.logoDot} />

            <View style={styles.emailMenuContainer}>
              <Text style={styles.emailText}>{email}</Text>
              <TouchableOpacity hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}>
                <Ionicons name="ellipsis-vertical" size={scale(20)} color={Colors.light.mainDarkColor} />
              </TouchableOpacity>
            </View>
           
          </View>
         
        </View>

        {/* Newsletter Checkbox */}
        <TouchableOpacity
          style={styles.checkboxContainer}
          onPress={() => setSignUpForNews(!signUpForNews)}
          activeOpacity={0.7}
        >
          <View style={[styles.checkbox, signUpForNews && styles.checkboxChecked]}>
            {signUpForNews && (
              <Ionicons name="checkmark" size={scale(14)} color={Colors.light.white} />
            )}
          </View>
          <Text style={styles.checkboxLabel}>
            {t("payment.delivery.signUpNews")}
          </Text>
        </TouchableOpacity>

        {/* Delivery Section */}
        <Text style={styles.sectionTitle}>{t("payment.delivery.title")}</Text>

        {/* Country/Region Dropdown */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>{t("payment.delivery.countryRegion")}</Text>
          <TouchableOpacity
            style={styles.dropdownInput}
            activeOpacity={0.7}
            onPress={() => setShowCountryPicker(true)}
          >
            <Text style={styles.dropdownText}>{countryName}</Text>
            <Ionicons
              name="chevron-down"
              size={scale(20)}
              color={Colors.light.mainDarkColor}
            />
          </TouchableOpacity>
        </View>

        {/* First Name */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder={t("payment.delivery.firstName")}
            placeholderTextColor={Colors.light.grey500}
            value={firstName}
            onChangeText={setFirstName}
          />
        </View>

        {/* Email */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder={t("payment.delivery.email")}
            placeholderTextColor={Colors.light.grey500}
            value={formEmail}
            onChangeText={setFormEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        {/* Address */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder={t("payment.delivery.address")}
            placeholderTextColor={Colors.light.grey500}
            value={address}
            onChangeText={setAddress}
          />
        </View>

        {/* Apartment (optional) */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder={t("payment.delivery.apartment")}
            placeholderTextColor={Colors.light.grey500}
            value={apartment}
            onChangeText={setApartment}
          />
        </View>

        {/* City */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder={t("payment.delivery.city")}
            placeholderTextColor={Colors.light.grey500}
            value={city}
            onChangeText={setCity}
          />
        </View>

        {/* County Dropdown */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>{t("payment.delivery.county")}</Text>
          <TouchableOpacity style={styles.dropdownInput} activeOpacity={0.7}>
            <Text style={styles.dropdownPlaceholder}>{t("payment.delivery.county")}</Text>
            <Ionicons
              name="chevron-down"
              size={scale(20)}
              color={Colors.light.mainDarkColor}
            />
          </TouchableOpacity>
        </View>

        {/* Postal Code */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder={t("payment.delivery.postalCode")}
            placeholderTextColor={Colors.light.grey500}
            value={postalCode}
            onChangeText={setPostalCode}
            keyboardType="numeric"
          />
        </View>

        {/* Phone */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>{t("payment.delivery.phone")}</Text>
          <View style={styles.phoneInputContainer}>
            <TouchableOpacity
              style={styles.countryCodeButton}
              activeOpacity={0.7}
              onPress={() => setShowPhoneCountryPicker(true)}
            >
              <Ionicons name="help-circle-outline" size={scale(16)} color={Colors.light.grey500} />
              <Text style={styles.flagEmoji}>{phoneCountryFlag}</Text>
              <Ionicons
                name="chevron-down"
                size={scale(16)}
                color={Colors.light.mainDarkColor}
              />
            </TouchableOpacity>
            <TextInput
              style={styles.phoneInput}
              placeholder={`${phoneCountryCode} 6 84562056`}
              placeholderTextColor={Colors.light.grey500}
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />
          </View>
        </View>

        {/* Bottom Spacing */}
        <View style={{ height: verticalScale(24) }} />
      </ScrollView>

      {/* Bottom Button */}
      <View style={styles.bottomButtonContainer}>
        <PrimaryButton title={t("payment.delivery.placeOrder")} onPress={handlePlaceOrder} />
      </View>

      {/* Country Picker Modal */}
      <CountryPicker
        show={showCountryPicker}
        lang="en"
        pickerButtonOnPress={(item: any) => {
          setCountryCode(item.code);
          setCountryName(item.name.en);
          setShowCountryPicker(false);
        }}
        onBackdropPress={() => setShowCountryPicker(false)}
        style={{
          modal: {
            height: verticalScale(500),
            backgroundColor: Colors.light.white,
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
          },
          countryButtonStyles: {
            height: verticalScale(50),
            borderBottomWidth: 1,
            borderBottomColor: Colors.light.grey200,
          },
          countryName: {
            fontSize: moderateScale(15),
            fontFamily: AeonikFonts.regular,
            color: Colors.light.mainDarkColor,
          },
        }}
      />

      {/* Phone Country Picker Modal */}
      <CountryPicker
        show={showPhoneCountryPicker}
        lang="en"
        pickerButtonOnPress={(item: any) => {
          setPhoneCountryCode(item.dial_code);
          setPhoneCountryFlag(item.flag);
          setShowPhoneCountryPicker(false);
        }}
        onBackdropPress={() => setShowPhoneCountryPicker(false)}
        style={{
          modal: {
            height: verticalScale(500),
            backgroundColor: Colors.light.white,
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
          },
          countryButtonStyles: {
            height: verticalScale(50),
            borderBottomWidth: 1,
            borderBottomColor: Colors.light.grey200,
          },
          countryName: {
            fontSize: moderateScale(15),
            fontFamily: AeonikFonts.regular,
            color: Colors.light.mainDarkColor,
          },
          dialCode: {
            fontSize: moderateScale(15),
            fontFamily: AeonikFonts.regular,
            color: Colors.light.grey500,
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: scale(20),
    paddingTop: verticalScale(16),
  },
  headerSection: {
    marginBottom: verticalScale(24),
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: verticalScale(16),
  },
  logoText: {
    fontSize: moderateScale(22),
    fontFamily: AeonikFonts.medium,
    color: Colors.light.mainDarkColor,
  },
  logoDot: {
    width: scale(8),
    height: scale(8),
    borderRadius: scale(4),
    backgroundColor: "#4F8FF7",
    marginLeft: scale(4),
  },
  emailMenuContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: 'flex-end',
    alignItems: "center",
    gap: scale(6),
  },
  emailText: {
    fontSize: moderateScale(13),
    fontFamily: AeonikFonts.regular,
    color: Colors.light.mainDarkColor,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: verticalScale(32),
  },
  checkbox: {
    width: scale(20),
    height: scale(20),
    borderRadius: scale(4),
    borderWidth: 1.5,
    borderColor: "rgba(217, 217, 217, 1)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: scale(12),
  },
  checkboxChecked: {
    backgroundColor: Colors.light.tint,
    borderColor: Colors.light.tint,
  },
  checkboxLabel: {
    flex: 1,
    fontSize: moderateScale(13),
    fontFamily: AeonikFonts.regular,
  },
  sectionTitle: {
    ...AppTextStyle.headline6,
    fontFamily: AeonikFonts.medium,
    color: Colors.light.mainDarkColor,
    marginBottom: verticalScale(16),
  },
  inputContainer: {
    marginBottom: verticalScale(16),
  },
  inputLabel: {
    ...AppTextStyle.bodyText1,
    fontFamily: AeonikFonts.regular,
    color: Colors.light.grey500,
    marginBottom: verticalScale(8),
  },
  textInput: {
    height: verticalScale(56),
    borderWidth: 1,
    borderColor: Colors.light.grey200,
    borderRadius: scale(8),
    paddingHorizontal: scale(16),
    fontSize: moderateScale(15),
    fontFamily: AeonikFonts.regular,
    color: Colors.light.mainDarkColor,
    backgroundColor: Colors.light.white,
  },
  dropdownInput: {
    height: verticalScale(56),
    borderWidth: 1,
    borderColor: Colors.light.grey200,
    borderRadius: scale(12),
    paddingHorizontal: scale(16),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.light.white,
  },
  dropdownText: {
    fontSize: moderateScale(15),
    fontFamily: AeonikFonts.regular,
    color: Colors.light.mainDarkColor,
  },
  dropdownPlaceholder: {
    fontSize: moderateScale(15),
    fontFamily: AeonikFonts.regular,
    color: Colors.light.grey500,
  },
  phoneInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(12),
  },
  countryCodeButton: {
    height: verticalScale(56),
    borderWidth: 1,
    borderColor: Colors.light.grey200,
    borderRadius: scale(12),
    paddingHorizontal: scale(12),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: scale(6),
    backgroundColor: Colors.light.white,
  },
  flagEmoji: {
    fontSize: moderateScale(20),
  },
  phoneInput: {
    flex: 1,
    height: verticalScale(56),
    borderWidth: 1,
    borderColor: Colors.light.grey200,
    borderRadius: scale(12),
    paddingHorizontal: scale(16),
    fontSize: moderateScale(15),
    fontFamily: AeonikFonts.regular,
    color: Colors.light.mainDarkColor,
    backgroundColor: Colors.light.white,
  },
  bottomButtonContainer: {
    paddingHorizontal: scale(20),
    paddingTop: verticalScale(16),
    paddingBottom: verticalScale(24),
    backgroundColor: Colors.light.white,
  },
});
