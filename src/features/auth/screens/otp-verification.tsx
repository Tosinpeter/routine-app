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
import { SafeAreaView } from "react-native-safe-area-context";

import { OtpCodeField } from "../components/OtpCodeField";

import { AppText as Text } from "@/components/app-text";
import { BackButton } from "@/components/back-button";
import { PrimaryButton } from "@/components/primary-button";
import { moderateScale, scale, verticalScale } from "@/constants/scaling";
import { AeonikFonts, Colors } from "@/constants/theme";
import { AppTextStyle } from "@/constants/typography";
import { useAuth } from "@/shared/store/hooks/use-auth";
import { t } from "@/i18n";
import { useAppDispatch, useAppSelector } from "@/shared/store/hooks";
import {
    decrementOtpResendTimer,
    setAuthLoading,
    setOtp,
    startOtpResendTimer,
} from "@/shared/store/slices/auth-slice";
import { toast } from "@backpackapp-io/react-native-toast";

const CELL_COUNT = 6;

export default function OTPVerificationScreen() {
    const { phoneNumber, rawPhone } = useLocalSearchParams();
    const { verifyOtp } = useAuth();
    const dispatch = useAppDispatch();
    const { otp, isLoading, otpResendTimer } = useAppSelector((state) => state.auth);

    const setOtpValue = (value: string) => dispatch(setOtp(value));

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
                router.replace("/start-analysis");
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
                        <OtpCodeField
                            value={otp}
                            onChangeText={setOtpValue}
                            cellCount={CELL_COUNT}
                        />
                    </View>



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

                    <View style={styles.spacer} />

                    <PrimaryButton
                        title={t("common.continue")}
                        onPress={handleContinue}
                        disabled={otp.length !== 6 || isLoading}
                        loading={isLoading}
                    />

                    {/* Skip Link */}
                    <PrimaryButton
                        title={t("auth.skipAnalysis")}
                        onPress={() => { router.replace("/onboarding"); }}
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
    )
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
