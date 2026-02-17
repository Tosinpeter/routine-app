import { LinearGradient } from "expo-linear-gradient";
import { Image, StyleSheet, View } from "react-native";

import { AppText as Text } from "@/components/app-text";
import { AeonikFonts } from "@/constants/theme";
import { moderateScale, scale } from "@/constants/scaling";
import { t } from "@/i18n";

export function DermatologyInsightCard() {
    return (
        <View style={styles.card}>
            {/* Background Image - Positioned absolutely per Figma */}
            {/* Left: -113px, Top: -9px, Height: 215px */}
            <Image
                source={require("@/assets/images/dermatology-insight-bg.png")}
                style={styles.backgroundImage}
                resizeMode="cover"
            />

            {/* Gradient Overlay - Left side fade */}
            {/* Width: 258px, Height: 171px */}
            <LinearGradient
                colors={['#F7D5B7', 'rgba(248, 212, 182, 0)']}
                start={{ x: 0, y: 0.5 }} // Left (Beige)
                end={{ x: 1, y: 0.5 }}   // Right (Transparent)
                style={styles.gradientOverlay}
            />

            {/* Text Content Group */}
            {/* Left: 20px, Top: 20px */}
            <View style={styles.textGroup}>
                <View style={styles.textContent}>
                    <Text style={styles.title}>{t("home.dermatologyInsight.title")}</Text>
                    <Text style={styles.subtitle}>
                        {t("home.dermatologyInsight.subtitle")}
                    </Text>
                </View>

                {/* Slider Indicators */}
                <View style={styles.indicators}>
                    <View style={styles.activeIndicator} />
                    <View style={styles.inactiveIndicator} />
                    <View style={styles.inactiveIndicator} />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        width: "100%", // 358px
        minWidth: scale(358),
        height: scale(200),
        backgroundColor: "#FFFFFF",
        borderRadius: scale(16),
        marginBottom: scale(16),
        overflow: 'hidden',
        position: 'relative',
    },
    backgroundImage: {
        position: 'absolute',
        left: scale(0),
        top: scale(0),
        // Calculate width: Container(358) + LeftBleed(113) + RightBleed(53) = 524
        // width: scale(524),
        width: "100%",
        height: "100%",
        // height: scale(215),
    },
    gradientOverlay: {
        position: 'absolute',
        width: scale(258),
        height: scale(171),
        left: 0,
        top: 0,
    },
    textGroup: {
        position: 'absolute',
        left: scale(20),
        top: scale(20),
        width: scale(184),
        height: scale(136),
        justifyContent: 'space-between', // Gap 37px effectively distributes space or we use explicit gap
    },
    textContent: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: scale(8),
        width: scale(184),
    },
    title: {
        width: "100%",
        height: scale(58), // approx based on line height
        fontFamily: AeonikFonts.bold, // 700
        fontSize: moderateScale(24),
        lineHeight: scale(29), // 120%
        color: "#20201E",
    },
    subtitle: {
        width: scale(165), // 159px in Figma
        fontFamily: AeonikFonts.regular, // 400
        fontSize: moderateScale(12),
        lineHeight: scale(17), // 140%
        color: "#20201E",
    },
    indicators: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 0,
        gap: scale(12),
        width: scale(66),
        height: scale(7),
        marginTop: scale(25) // Manual adjustment to match gap 37px from text
    },
    activeIndicator: {
        width: scale(28),
        height: scale(7),
        backgroundColor: "#CF604A", // Primary Color
        borderRadius: scale(50),
    },
    inactiveIndicator: {
        width: scale(7),
        height: scale(7),
        backgroundColor: "#CF604A",
        opacity: 0.34,
        borderRadius: scale(3.5), // Circle
    }
});

