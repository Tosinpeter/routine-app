import { router } from "expo-router";
import React, { useEffect, useRef } from "react";
import {
    Animated,
    StyleSheet,
    View
} from "react-native";

import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";

import { AppText as Text } from "@/components/app-text";
import { FaceIcon } from "@/components/icons";
import { PrimaryButton } from "@/components/primary-button";
import { ThemedView } from "@/components/themed-view";
import { moderateScale, scale, SCREEN_WIDTH, verticalScale } from "@/constants/scaling";
import { AeonikFonts, Colors } from "@/constants/theme";
import { AppTextStyle } from "@/constants/typography";
import { t } from "@/i18n";
import { useAppData } from "@/shared/store/hooks/use-app-data";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function StartAnalysisScreen() {
    const { cookieConsentKey } = useAppData();
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
        }).start();
    }, [fadeAnim]);

    const handleContinue = async () => {
        const value = await AsyncStorage.getItem(cookieConsentKey);
        if (value === "true") {
            router.push("/face-scan");
        } else {
            router.push("/cookie-policy");
        }
    };
    return (
        <ThemedView style={styles.container}>
            <Animated.View style={[styles.backgroundImage, { opacity: fadeAnim }]}>
                <Image
                    source={require("@/assets/images/BackgroundImage.png")}
                    style={StyleSheet.absoluteFill}
                    contentFit="fill"
                    cachePolicy="memory-disk"
                    priority="high"
                />
            </Animated.View>
            <LinearGradient
                colors={['rgba(228, 214, 203, 0)', 'rgba(32, 32, 30, 0.23)']}
                style={styles.gradientOverlay}
            />

            <View style={styles.content}>
                <Text style={styles.title}>{t("startAnalysis.title")}</Text>

                <PrimaryButton
                    title={t("startAnalysis.button")}
                    icon={<FaceIcon color={Colors.light.white} />}
                    onPress={handleContinue}
                />

                <Text style={styles.brand}>{t("startAnalysis.brand")}</Text>
            </View>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.light.scaffold,
    },

    backgroundImage: {
        position: "absolute",
        width: SCREEN_WIDTH,
        height: '100%',
    },

    gradientOverlay: {
        position: "absolute",
        width: SCREEN_WIDTH,
        height: '100%',
    },

    content: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: scale(16),
        paddingBottom: verticalScale(40),
    },

    title: {
        fontSize: moderateScale(48),
        textAlign: 'center',
        color: Colors.light.white,
        marginBottom: scale(40),
        fontFamily: AeonikFonts.medium,
    },
    brand: {
        ...AppTextStyle.bodyText1,
        color: Colors.light.nearWhite,
        marginTop: scale(16),
        alignSelf: 'center',
    }
});
