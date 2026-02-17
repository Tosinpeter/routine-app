import { AppText as Text } from '@/components/app-text';
import { scale, verticalScale } from '@/constants/scaling';
import { Fonts } from '@/constants/theme';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

export function SupportBanner() {
    return (
        <View style={styles.container}>
            {/* Background Gradient Image */}
            <Image
                source={require('@/assets/images/banner-gradient.png')}
                style={styles.backgroundImage}
                resizeMode="cover"
            />

            {/* Doctor Image */}
            <Image
                source={require('@/assets/images/doctor-cutout.png')}
                style={styles.doctorImage}
                resizeMode="contain"
            />

            {/* Text Content */}
            <View style={styles.textContent}>
                <LinearGradient
                    colors={['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.21)']}
                    start={{ x: 0.5, y: 0.5 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.badge}
                >
                    <Text style={styles.badgeText}>Free</Text>
                </LinearGradient>

                <View style={styles.textGroup}>
                    <Text style={styles.title}>Dermatologist Support</Text>
                    <Text style={styles.description} numberOfLines={2}>
                        Our top dermatologist adjust your plan when needed for free
                    </Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: verticalScale(190), // User updated this to 190 in previous turn, keeping it
        backgroundColor: '#CF604A',
        borderRadius: 8,
        overflow: 'hidden',
        alignSelf: 'center',
        position: 'relative',
    },

    backgroundImage: {
        ...StyleSheet.absoluteFillObject,
        width: '100%',
        height: '100%',
    },

    doctorImage: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        width: scale(180),
        height: scale(180),
        zIndex: 1,
    },
    textContent: {
        position: 'absolute',
        left: scale(16),
        top: verticalScale(33),
        width: scale(260),
        zIndex: 2,
        alignItems: 'flex-start',
        gap: verticalScale(8),
    },
    badge: {
        paddingHorizontal: scale(16),
        paddingVertical: verticalScale(6),
        borderRadius: 100,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.25)',
    },
    badgeText: {
        fontFamily: Fonts.medium,
        fontSize: scale(12),
        color: '#FFFFFF',
        lineHeight: scale(12),
    },
    textGroup: {
        gap: verticalScale(8),
        marginTop: verticalScale(8),
    },
    title: {
        fontFamily: Fonts.bold,
        fontSize: scale(20),
        lineHeight: scale(24),
        color: '#FFFFFF',
        width: scale(213),
    },
    description: {
        fontFamily: Fonts.regular,
        fontSize: scale(14),
        lineHeight: scale(20),
        color: '#FFFFFF',
        opacity: 0.8,
        width: scale(224),
    },
});
