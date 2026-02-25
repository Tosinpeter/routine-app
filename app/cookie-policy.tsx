import React from "react";
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Linking
} from "react-native";

import { AppText as Text } from "@/components/app-text";
import { PrimaryButton } from "@/components/primary-button";
import { moderateScale, scale, verticalScale } from "@/constants/scaling";
import { AeonikFonts, Colors, BorderRadius, Shadows } from "@/constants/theme";
import { ThemedView } from "@/components/themed-view";
import { useAppData } from "@/contexts/AppDataProvider";
import { t } from "@/i18n";
import { Image } from "expo-image";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function CookiePolicyScreen() {
    const { cookieConsentKey } = useAppData();

    const handleAcceptAll = async () => {
        await AsyncStorage.setItem(cookieConsentKey, "true");
        router.replace("/photo-prep");
    };

    const handleReadPolicy = () => {
        // Open cookie policy URL
        Linking.openURL("https://yourwebsite.com/cookie-policy");
    };

    return (
        <ThemedView style={styles.container}>
            <View style={styles.centeredContent}>
                <View style={styles.card}>
                    {/* Cookie Character Illustration */}
                    <View style={styles.illustrationContainer}>
                        <Image
                            source={require("@/assets/images/img_cookies-Illustration.png")}
                            style={styles.cookieImage}
                            contentFit="contain"
                        />
                    </View>

                    {/* Title */}
                    <Text style={styles.title}>{t("cookiePolicy.title")}</Text>

                    {/* Description */}
                    <Text style={styles.description}>
                        {t("cookiePolicy.description")}
                    </Text>
                    
                    <TouchableOpacity onPress={handleReadPolicy}>
                        <Text style={styles.link}>{t("cookiePolicy.readPolicy")}</Text>
                    </TouchableOpacity>

                    {/* Additional Info */}
                    <Text style={styles.additionalInfo}>
                        {t("cookiePolicy.additionalInfo")}
                    </Text>

                    {/* Accept Button */}
                    <PrimaryButton
                        title={t("cookiePolicy.acceptAll")}
                        onPress={handleAcceptAll}
                        style={styles.button}
                    />
                </View>
            </View>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.light.scaffold,
    },
    centeredContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: scale(20),
    },
    card: {
        backgroundColor: Colors.light.white,
        borderRadius: BorderRadius.lg,
        padding: scale(24),
        width: '100%',
        maxWidth: 400,
        ...Shadows.lg,
    },
    illustrationContainer: {
        alignItems: 'center',
        marginBottom: verticalScale(24),
    },
    cookieImage: {
        width: scale(200),
        height: scale(188),
    },
    title: {
        fontSize: moderateScale(24),
        fontFamily: AeonikFonts.bold,
        color: Colors.light.text,
        textAlign: 'left',
        marginBottom: verticalScale(16),
    },
    description: {
        fontSize: moderateScale(14),
        fontFamily: AeonikFonts.regular,
        color: Colors.light.grey700,
        lineHeight: moderateScale(20),
        marginBottom: verticalScale(8),
    },
    link: {
        fontSize: moderateScale(14),
        fontFamily: AeonikFonts.regular,
        color: '#2563EB',
        textDecorationLine: 'none',
        marginBottom: verticalScale(16),
    },
    additionalInfo: {
        fontSize: moderateScale(14),
        fontFamily: AeonikFonts.regular,
        color: Colors.light.grey700,
        lineHeight: moderateScale(20),
        marginBottom: verticalScale(24),
    },
    button: {
        marginTop: verticalScale(8),
    },
});
