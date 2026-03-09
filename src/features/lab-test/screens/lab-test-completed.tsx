import { Image } from "expo-image";
import { router } from "expo-router";
import React, { useEffect } from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withSpring,
    withTiming,
} from "react-native-reanimated";

import { AppText as Text } from "@/components/app-text";
import { PrimaryButton } from "@/components/primary-button";
import { moderateScale, scale, verticalScale } from "@/constants/scaling";
import { AeonikFonts, BorderRadius, Colors } from "@/constants/theme";
import { AppTextStyle } from "@/constants/typography";
import { t } from "@/i18n";

export default function LabTestCompletedScreen() {
    const imageScale = useSharedValue(0);
    const contentOpacity = useSharedValue(0);

    useEffect(() => {
        imageScale.value = withSpring(1, { damping: 7, stiffness: 50 });
        contentOpacity.value = withDelay(300, withTiming(1, { duration: 400 }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const imageAnimatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: imageScale.value }],
    }));

    const contentAnimatedStyle = useAnimatedStyle(() => ({
        opacity: contentOpacity.value,
    }));

    const handleViewStatus = () => {
        router.dismissAll();
    };

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View style={styles.topSection}>
                    <Animated.View
                        style={[styles.imageContainer, imageAnimatedStyle]}
                    >
                        <Image
                            source={require("@/assets/images/SuccessIconGroupOrange.webp")}
                            style={styles.successImage}
                            contentFit="contain"
                        />
                    </Animated.View>

                    <Animated.View
                        style={[styles.textSection, contentAnimatedStyle]}
                    >
                        <Text style={styles.title}>
                            {t("labTest.completed.title")}
                        </Text>
                        <Text style={styles.subtitle}>
                            {t("labTest.completed.subtitle")}
                        </Text>
                    </Animated.View>

                    <Animated.View
                        style={[styles.card, contentAnimatedStyle]}
                    >
                        <Text style={styles.cardText}>
                            {t("labTest.completed.emailNotice")}
                        </Text>
                    </Animated.View>
                </View>

                <Animated.View
                    style={[styles.bottomSection, contentAnimatedStyle]}
                >
                    <Text style={styles.reviewNotice}>
                        {t("labTest.completed.reviewNotice")}
                    </Text>

                    <PrimaryButton
                        title={t("labTest.completed.viewStatus")}
                        onPress={handleViewStatus}
                        withShadow
                    />
                </Animated.View>
            </View>
            <StatusBar barStyle="dark-content" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.light.scaffold,
    },
    content: {
        flex: 1,
        paddingHorizontal: scale(24),
        justifyContent: "space-between",
    },
    topSection: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    imageContainer: {
        marginBottom: verticalScale(24),
    },
    successImage: {
        width: scale(160),
        height: scale(160),
    },
    textSection: {
        alignItems: "center",
        marginBottom: verticalScale(24),
    },
    title: {
        fontSize: moderateScale(24),
        fontFamily: AeonikFonts.bold,
        color: Colors.light.mainDarkColor,
        textAlign: "center",
        lineHeight: moderateScale(30),
        marginBottom: verticalScale(10),
    },
    subtitle: {
        ...AppTextStyle.bodyText1,
        fontFamily: AeonikFonts.regular,
        color: '475467',
        opacity: 0.5,
        textAlign: "center",
        lineHeight: moderateScale(22),
    },
    card: {
        width: "100%",
        backgroundColor: Colors.light.white,
        borderRadius: BorderRadius.lg,
        paddingVertical: verticalScale(24),
        paddingHorizontal: scale(24),
    },
    cardText: {
        ...AppTextStyle.subtitle2,
        fontFamily: AeonikFonts.regular,
        color: Colors.light.grey600,
        textAlign: "center",
        lineHeight: moderateScale(22),
    },
    bottomSection: {
        alignItems: "center",
        paddingBottom: verticalScale(24),
    },
    reviewNotice: {
        ...AppTextStyle.bodyText1,
        fontFamily: AeonikFonts.regular,
        color: "#475467",
        textAlign: "center",
        lineHeight: moderateScale(22),
        marginBottom: verticalScale(20),
    },
});
