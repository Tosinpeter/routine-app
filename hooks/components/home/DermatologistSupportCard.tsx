import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { AppText as Text } from "@/components/app-text";
import { Colors } from "@/constants/theme";
import { scale, verticalScale } from "@/constants/scaling";
import { t } from "@/i18n";

export function DermatologistSupportCard() {
    return (
        <View
            style={styles.container}
            accessible={true}
            accessibilityLabel={`${t("home.dermatologistSupport.title")}. ${t("home.dermatologistSupport.badgeFree")}. ${t("home.dermatologistSupport.description")}`}
        >
            {/* Background Gradient/Image */}
            <View style={styles.backgroundContainer}>
                <View style={[StyleSheet.absoluteFill, { backgroundColor: Colors.light.dermatologistCardBg, borderRadius: scale(16) }]} />
            </View>

            <View style={styles.content}>
                <View style={styles.badge}>
                    <Text style={styles.badgeText}>{t("home.dermatologistSupport.badgeFree")}</Text>
                </View>

                <Text style={styles.title}>{t("home.dermatologistSupport.title")}</Text>
                <Text style={styles.description}>
                    {t("home.dermatologistSupport.description")}
                </Text>

                {/* Pagination Dots */}
                <View style={styles.pagination}>
                    <View style={[styles.dot, styles.activeDot]} />
                    <View style={styles.dot} />
                    <View style={styles.dot} />
                </View>
            </View>

            {/* Doctor Image - Absolute Positioned */}
            <Image
                source={require('@/assets/images/doctor.png')} // Need a placeholder or use existing asset if any
                // Fallback to a generic user icon if not available, but user needs visual. 
                // I will use the `icon.png` or similar for now as placeholder if I don't have doctor image.
                // Better: Use a simple View holder if no image.
                style={styles.doctorImage}
                resizeMode="contain"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: verticalScale(190), // Increased slightly for better padding capacity
        borderRadius: scale(16),
        overflow: "hidden",
        position: "relative",
    },
    backgroundContainer: {
        ...StyleSheet.absoluteFillObject,
    },
    blob1: { // Simulate the orange glow
        position: 'absolute',
        top: -50,
        left: -50,
        width: 200,
        height: 200,
        backgroundColor: Colors.light.dermatologistCardBlob,
        opacity: 0.3,
        borderRadius: 100,
    },
    content: {
        padding: scale(24), // Rule 15: 20 -> 24
        paddingRight: scale(120), // Make room for image
        justifyContent: 'center',
        height: '100%',
        gap: scale(8),
    },
    badge: {
        backgroundColor: Colors.light.dermatologistBadgeBg, // Orange tint
        paddingHorizontal: scale(16), // Rule 15: 12 -> 16
        paddingVertical: verticalScale(8), // Rule 15: 4 -> 8
        borderRadius: scale(100),
        alignSelf: 'flex-start',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.2)',
    },
    badgeText: {
        fontFamily: 'Aeonik-Medium',
        fontSize: scale(12),
        color: Colors.light.dermatologistBadgeText,
    },
    title: {
        fontFamily: 'Aeonik-Bold',
        fontSize: scale(18),
        color: Colors.light.grey800,
        lineHeight: scale(22),
    },
    description: {
        fontFamily: 'Aeonik-Regular',
        fontSize: scale(14),
        color: Colors.light.grey800,
        opacity: 0.8,
        lineHeight: scale(20),
    },
    pagination: {
        flexDirection: 'row',
        gap: 8, // Rule 15: 6 -> 8
        marginTop: scale(8),
    },
    dot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: Colors.light.tint,
        opacity: 0.3,
    },
    activeDot: {
        width: 24,
        backgroundColor: Colors.light.tint,
        opacity: 1,
    },
    doctorImage: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        width: scale(180),
        height: scale(180),
    }
});
