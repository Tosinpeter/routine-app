import React, { useRef, useState } from "react";
import { I18nManager, StyleSheet, View, ScrollView, NativeSyntheticEvent, NativeScrollEvent, Dimensions } from "react-native";
import { Image } from "expo-image";
import { AppText as Text } from "@/components/app-text";
import { AeonikFonts, Colors } from "@/constants/theme";
import { moderateScale, scale, verticalScale } from "@/constants/scaling";
import { t } from "@/i18n";

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_GAP = scale(12); // Gap between cards

interface Slide {
    id: number;
    badge: string;
    title: string;
    description: string;
    imageSource: any;
}

function getSlides(): Slide[] {
    return [
        {
            id: 1,
            badge: t("home.dermatologistSupport.badgeFree"),
            title: t("home.dermatologistSupport.title"),
            description: t("home.dermatologistSupport.description"),
            imageSource: require('@/assets/images/doctor.png'),
        },
        {
            id: 2,
            badge: t("home.dermatologistSupport.badge247"),
            title: t("home.dermatologistSupport.titleExpert"),
            description: t("home.dermatologistSupport.descriptionExpert"),
            imageSource: require('@/assets/images/doctor.png'),
        },
        {
            id: 3,
            badge: t("home.dermatologistSupport.badgePremium"),
            title: t("home.dermatologistSupport.titlePersonalized"),
            description: t("home.dermatologistSupport.descriptionPersonalized"),
            imageSource: require('@/assets/images/doctor.png'),
        },
    ];
}

export function DermatologistSupportCard() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollViewRef = useRef<ScrollView>(null);

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const contentOffsetX = event.nativeEvent.contentOffset.x;
        const cardWidth = SCREEN_WIDTH - (scale(16) * 2) + CARD_GAP; // Account for padding and gap
        const index = Math.round(contentOffsetX / cardWidth);
        setCurrentIndex(index);
    };

    return (
        <View style={styles.wrapper}>
            <ScrollView
                ref={scrollViewRef}
                horizontal
                pagingEnabled={false}
                showsHorizontalScrollIndicator={false}
                onScroll={handleScroll}
                scrollEventThrottle={16}
                decelerationRate="fast"
                snapToInterval={SCREEN_WIDTH - (scale(16) * 2) + CARD_GAP}
                snapToAlignment="start"
                contentContainerStyle={styles.scrollContent}
            >
                {getSlides().map((slide) => (
                    <View
                        key={slide.id}
                        style={styles.container}
                        accessible={true}
                        accessibilityLabel={`${slide.title}. ${slide.badge}. ${slide.description}`}
                    >
                        {/* Background */}
                        <View style={styles.backgroundContainer}>
                            <View style={[StyleSheet.absoluteFill, { backgroundColor: Colors.light.dermatologistCardBg, borderRadius: scale(16) }]} />
                        </View>

                        <View style={styles.content}>
                            <Image
                                source={require('@/assets/images/OnboardingTextHeader.png')}
                                style={styles.badge}
                                contentFit="contain"
                                cachePolicy="memory-disk"
                                transition={150}
                            />

                            <Text style={styles.title}>{slide.title}</Text>
                            <Text style={styles.description}>{slide.description}</Text>

                            {/* Pagination Dots */}
                            <View style={styles.pagination}>
                                {getSlides().map((_, index) => (
                                    <View
                                        key={index}
                                        style={[
                                            styles.dot,
                                            currentIndex === index && styles.activeDot,
                                        ]}
                                    />
                                ))}
                            </View>
                        </View>

                        {/* Doctor Image - Absolute Positioned */}
                        <Image
                            source={slide.imageSource}
                            style={[styles.doctorImage, I18nManager.isRTL && styles.flipped]}
                            contentFit="contain"
                            cachePolicy="memory-disk"
                            transition={200}
                        />
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        width: "100%",
        height: verticalScale(190),
        marginBottom: scale(16),
    },
    scrollContent: {
        paddingHorizontal: 0,
        gap: CARD_GAP,
    },
    container: {
        width: SCREEN_WIDTH - (scale(16) * 2), // Account for screen padding
        height: verticalScale(190),
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
        start: -50,
        width: 200,
        height: 200,
        backgroundColor: Colors.light.dermatologistCardBlob,
        opacity: 0.3,
        borderRadius: 100,
    },
    content: {
        padding: scale(24), // Rule 15: 20 -> 24
        paddingEnd: scale(120), // Make room for image (RTL-aware)
        justifyContent: 'center',
        height: '100%',
        gap: scale(8),
    },
    badge: {
        width: scale(60),
        height: verticalScale(30),
        alignSelf: 'flex-start',
    },
    flipped: {
        transform: [{ scaleX: -1 }],
    },
    badgeText: {
        fontFamily: AeonikFonts.medium,
        fontSize: moderateScale(12),
        color: Colors.light.dermatologistBadgeText,
    },
    title: {
        fontFamily: AeonikFonts.bold,
        fontSize: moderateScale(18),
        color: Colors.light.grey800,
        lineHeight: scale(22),
    },
    description: {
        fontFamily: AeonikFonts.regular,
        fontSize: moderateScale(14),
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
        end: 0,
        bottom: 0,
        width: scale(180),
        height: scale(180),
    }
});


