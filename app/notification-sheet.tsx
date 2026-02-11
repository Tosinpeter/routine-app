import { router } from "expo-router";
import React from "react";
import {
    StyleSheet,
    View
} from "react-native";

import { Image } from "expo-image";

import { AppText as Text } from "@/components/app-text";
import { PrimaryButton } from "@/components/primary-button";
import { scale, verticalScale } from "@/constants/scaling";
import { AeonikFonts, Colors } from "@/constants/theme";
import { AppTextStyle } from "@/constants/typography";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NotificationSheet() {
    const handleEnableNotification = () => {
        // Handle notification permission request here
        // For now, just close the sheet
        router.back();
    };

    const handleMaybeLater = () => {
        router.back();
    };

    return (
        <SafeAreaView style={styles.container} edges={["bottom"]} >
            {/* Content */}
            <View style={styles.content}>
                <View style={{
                    height: scale(6),
                    width: scale(51),
                    borderRadius: scale(100),
                    alignSelf: 'center',
                    marginTop: verticalScale(8),
                    backgroundColor: "rgba(235, 235, 235, 1)",
                }} />
                <Image
                    source={require("@/assets/images/img_notification-permissing.png")}
                    style={styles.iconImage}
                    contentFit="contain"
                    contentPosition="center"
                />

                <View style={styles.textContent}>
                    <Text style={styles.headline}>Unlock your Daily Routine</Text>
                    <Text style={styles.subtitle}>Enable notifications to receive  your morning & evening skincare reminders. Without them, your routine won’t stay consistent.</Text>
                </View>

                {/* Bottom Button */}
                <View style={styles.buttonContainer}>
                    <PrimaryButton
                        title="Enable Notification"
                        onPress={handleEnableNotification}
                    />
                    <PrimaryButton
                        title="Maybe later"
                        style={{
                            backgroundColor: "rgba(237, 235, 227, 1)",
                        }}
                        textStyle={{
                            color: Colors.light.mainDarkColor
                        }}
                        onPress={handleMaybeLater}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        paddingHorizontal: scale(16),
        justifyContent: "space-between",
    },

    iconContainer: {
        marginBottom: verticalScale(32),
        alignItems: "center",
        justifyContent: "center",
    },
    iconImage: {
        marginVertical: verticalScale(16),
        width: scale(358),
        height: scale(169),
    },
    textContent: {
        alignItems: "center",
        marginBottom: verticalScale(24),
    },
    headline: {
        ...AppTextStyle.headline4,
        textAlign: "center",
        fontFamily: AeonikFonts.bold,
        color: Colors.light.text,
        marginBottom: verticalScale(16),
    },
    subtitle: {
        ...AppTextStyle.bodyText1,
        textAlign: "center",
        fontFamily: AeonikFonts.regular,
        color: Colors.light.grey525,
        opacity: 0.8,
        lineHeight: 24,
    },

    error: {
        ...AppTextStyle.subtitle2,
        textAlign: "center",
        fontFamily: AeonikFonts.regular,
        color: 'rgba(240, 68, 56, 1)',
        opacity: 0.8,
        lineHeight: 24,
        marginBottom: verticalScale(16)
    },
    buttonContainer: {
        gap: scale(8),
        paddingBottom: verticalScale(24),
    },
});
