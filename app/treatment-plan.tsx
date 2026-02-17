import { AppText as Text } from '@/components/app-text';
import { ActiveIngredients } from '@/components/treatment-plan/ActiveIngredients';
import { BenefitsGrid } from '@/components/treatment-plan/BenefitsGrid';
import { PreparationStatus } from '@/components/treatment-plan/PreparationStatus';
import { ProtocolSection } from '@/components/treatment-plan/ProtocolSection';
import { TrustRating } from '@/components/treatment-plan/TrustRating';
import { TryAgainButton } from '@/components/treatment-plan/TryAgainButton';
import { WhatsInsideAccordion } from '@/components/treatment-plan/WhatsInsideAccordion';
import { scale, verticalScale, SCREEN_WIDTH } from '@/constants/scaling';
import { AeonikFonts, Colors, Fonts } from '@/constants/theme';
import { AppTextStyle } from '@/constants/typography';
import React, { useState, useRef } from 'react';
import { ScrollView, StyleSheet, View, FlatList, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Image } from "expo-image";
import { DermatologistSupportCard } from '@/components/home/DermatologistSupportCard';
import { t } from "@/i18n";

// Treatment plan slides data
const TREATMENT_SLIDES = [
    { id: '1', image: require("@/assets/images/img_treatment-plan.png") },
    { id: '2', image: require("@/assets/images/img_treatment-plan.png") },
    { id: '3', image: require("@/assets/images/img_treatment-plan.png") },
    { id: '4', image: require("@/assets/images/img_treatment-plan.png") },
];

export default function TreatmentPlanScreen() {
    const [activeIndex, setActiveIndex] = useState(0);
    const flatListRef = useRef<FlatList>(null);

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const index = Math.round(event.nativeEvent.contentOffset.x / SCREEN_WIDTH);
        setActiveIndex(index);
    };

    const renderSlide = ({ item }: { item: typeof TREATMENT_SLIDES[0] }) => (
        <View style={styles.slideContainer}>
            <Image
                source={item.image}
                style={styles.slideImage}
                contentFit="contain"
            />
        </View>
    );

    return (
        <SafeAreaView style={styles.container} edges={["top"]}>
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {/* Header Section */}
                <View style={styles.header}>
                    <Text style={styles.title}>{t("treatmentPlan.title")}</Text>
                    <Text style={styles.subtitle}>{t("treatmentPlan.subtitle")}</Text>
                    <Text style={styles.caption}>{t("treatmentPlan.caption")}</Text>
                </View>

                {/* Treatment Plan Slider */}
                <View style={styles.sliderWrapper}>
                    <FlatList
                        ref={flatListRef}
                        data={TREATMENT_SLIDES}
                        renderItem={renderSlide}
                        keyExtractor={(item) => item.id}
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        onScroll={handleScroll}
                        scrollEventThrottle={16}
                        decelerationRate="fast"
                        snapToInterval={SCREEN_WIDTH}
                        snapToAlignment="center"
                        style={styles.flatList}
                    />

                    {/* Pagination Dots */}
                    <View style={styles.dotsContainer}>
                        {TREATMENT_SLIDES.map((_, index) => (
                            <View
                                key={index}
                                style={[
                                    styles.dot,
                                    activeIndex === index && styles.activeDot,
                                ]}
                            />
                        ))}
                    </View>
                </View>

                {/* Active Ingredients */}
                <ActiveIngredients />

                {/* Benefits Grid */}
                <BenefitsGrid />

                {/* Protocol Section */}
                <ProtocolSection />

                {/* What's Inside Accordion */}
                <WhatsInsideAccordion />

                {/* Support Banner */}
                <DermatologistSupportCard />


                {/* Trust & Rating */}
                <TrustRating />

                {/* Preparation Status */}
                {/* Preparation Status */}
                <PreparationStatus />

                {/* Try Again Button */}
                <TryAgainButton />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(237, 235, 227, 1)', // From Figma
    },
    scrollContent: {
        marginTop: scale(24),
        // paddingVertical: verticalScale(60),
        paddingHorizontal: scale(16),
        gap: verticalScale(16),
    },
    header: {
        alignItems: 'center',
        gap: verticalScale(8),
    },
    title: {
        fontFamily: AeonikFonts.bold,
        fontSize: scale(32),
        color: Colors.light.mainDarkColor,
        textAlign: 'center',
        marginBottom: scale(8)
    },
    subtitle: {
        ...AppTextStyle.subtitle2,
        fontFamily: AeonikFonts.regular,
        color: Colors.light.mainDarkColor,
        opacity: 0.8,
        marginBottom: scale(24),
        textAlign: 'center',
    },
    caption: {
        fontFamily: Fonts.regular,
        fontSize: scale(16),
        color: Colors.light.mainDarkColor,
        textAlign: 'center',
    },
    placeholderSection: {
        width: '90%',
        height: 100,
        backgroundColor: '#rgba(0,0,0,0.05)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderStyle: 'dashed',
        borderRadius: 8,
    },
    sliderWrapper: {
        width: SCREEN_WIDTH,
        alignItems: 'center',
        gap: verticalScale(16),
        marginLeft: scale(-16), // Offset the parent padding
    },
    flatList: {
        width: SCREEN_WIDTH,
    },
    slideContainer: {
        width: SCREEN_WIDTH,
        alignItems: 'center',
        justifyContent: 'center',
    },
    slideImage: {
        height: scale(545),
        width: scale(350),
    },
    dotsContainer: {
        flexDirection: 'row',
        gap: scale(8),
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: verticalScale(8),
    },
    dot: {
        width: scale(8),
        height: scale(8),
        borderRadius: scale(4),
        backgroundColor: Colors.light.mainDarkColor,
        opacity: 0.3,
    },
    activeDot: {
        opacity: 1,
        width: scale(24),
        backgroundColor: Colors.light.mainDarkColor,
    },
});
