import React from "react";
import { StyleSheet, View, ImageBackground } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AppText as Text } from "@/components/app-text";
import { Colors, Fonts } from "@/constants/theme";
import { scale, verticalScale } from "@/constants/scaling";
import { t } from "@/i18n";

export function ProgressBeforeAfterCard() {
    return (
        <View style={styles.wrapper}>
            <Text style={styles.headerTitle}>{t("home.progress.title")}</Text>

            <View style={styles.card}>
                {/* Main Image Background - Need to simulate split face or use placeholder */}
                <ImageBackground
                    source={require('@/assets/images/progress-preview-bg.png')} // Reuse background for now
                    style={styles.imageBackground}
                    resizeMode="cover"
                    imageStyle={{ borderRadius: scale(16) }}
                >
                    {/* Overlay Controls */}
                    <View style={styles.overlay}>

                        {/* Before Label */}
                        <View style={[styles.labelBadge, { left: scale(16) }]}>
                            <Text style={styles.labelText}>Before</Text>
                        </View>

                        {/* After Label */}
                        <View style={[styles.labelBadge, { right: scale(16) }]}>
                            <Text style={styles.labelText}>After</Text>
                        </View>

                        {/* Center Slider Handle */}
                        <View style={styles.sliderHandle}>
                            <Ionicons name="code" size={16} color={Colors.light.tint} />
                        </View>

                        {/* Date Badges */}
                        <View style={[styles.dateBadge, { left: scale(16), bottom: scale(16) }]}>
                            <Ionicons name="calendar-outline" size={14} color={Colors.light.white} />
                            <Text style={styles.dateText}>Feb 02{'\n'}2025</Text>
                        </View>

                        <View style={[styles.dateBadge, { right: scale(16), bottom: scale(16) }]}>
                            <Ionicons name="calendar-outline" size={14} color={Colors.light.white} />
                            <Text style={styles.dateText}>Feb 02{'\n'}2025</Text>
                        </View>

                    </View>
                </ImageBackground>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        gap: scale(16),
        marginBottom: scale(24),
    },
    headerTitle: {
        fontFamily: Fonts.bold, // Aeonik Bold
        fontSize: scale(24),
        color: Colors.light.grey800,
    },
    card: {
        width: '100%',
        height: verticalScale(246), // From Figma
        borderRadius: scale(16),
        overflow: 'hidden',
    },
    imageBackground: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    overlay: {
        flex: 1,
        position: 'relative',
        backgroundColor: 'rgba(0,0,0,0.1)', // Light tint
    },
    labelBadge: {
        position: 'absolute',
        top: '50%',
        marginTop: -15, // Approx center vertically relative to face center
        backgroundColor: 'rgba(0,0,0,0.3)',
        paddingHorizontal: scale(12),
        paddingVertical: verticalScale(6),
        borderRadius: 100,
    },
    labelText: {
        color: Colors.light.white,
        fontFamily: 'Aeonik-Medium',
        fontSize: scale(12),
    },
    sliderHandle: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginLeft: -16,
        marginTop: -16,
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: Colors.light.white,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
    },
    dateBadge: {
        position: 'absolute',
        backgroundColor: 'rgba(255,255,255,0.2)',
        backdropFilter: 'blur(4px)',
        padding: scale(8),
        borderRadius: scale(10),
        alignItems: 'center',
        gap: 4,
        minWidth: scale(40),
    },
    dateText: {
        color: Colors.light.white,
        fontFamily: 'Aeonik-Medium',
        fontSize: scale(10),
        textAlign: 'center',
        lineHeight: 12,
    },
});
