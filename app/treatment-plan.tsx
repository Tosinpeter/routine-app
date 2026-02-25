import { AppText as Text } from '@/components/app-text';
import { ActiveIngredients } from '@/components/treatment-plan/ActiveIngredients';
import { BenefitsGrid } from '@/components/treatment-plan/BenefitsGrid';
import { PreparationStatus } from '@/components/treatment-plan/PreparationStatus';
import { ProtocolSection } from '@/components/treatment-plan/ProtocolSection';
import { TrustRating } from '@/components/treatment-plan/TrustRating';
import { WhatsInsideAccordion } from '@/components/treatment-plan/WhatsInsideAccordion';
import { scale, verticalScale, SCREEN_WIDTH } from '@/constants/scaling';
import { AeonikFonts, Colors, Fonts } from '@/constants/theme';
import { AppTextStyle } from '@/constants/typography';
import { router } from 'expo-router';
import React, { useState, useRef, useCallback } from 'react';
import { ScrollView, StyleSheet, View, FlatList, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';

import { DermatologistSupportCard } from '@/components/home/DermatologistSupportCard';
import { t } from "@/i18n";
import { ComparisonSlider } from '@/components/treatment-plan/ComparisonSlider';
import type { ImageSource } from 'expo-image';
import { PrimaryButton } from '@/components/primary-button';

const BEFORE_AFTER_SLIDES: { id: string; beforeImage: ImageSource; afterImage: ImageSource }[] = [
    { id: '1', beforeImage: require("@/assets/images/client1beforeimage.webp"), afterImage: require("@/assets/images/client1afterimage.webp") },
    { id: '2', beforeImage: require("@/assets/images/client2beforeimage.webp"), afterImage: require("@/assets/images/client2afterimage.webp") },
    { id: '3', beforeImage: require("@/assets/images/client3beforeimage.webp"), afterImage: require("@/assets/images/client3afterimage.webp") },
];

const slideGap = scale(16);
const slideWidth = SCREEN_WIDTH - scale(32);
const beforeAfterSnapInterval = slideWidth + slideGap;


const keyExtractor = (item: typeof BEFORE_AFTER_SLIDES[0]) => item.id;
const getItemLayout = (_: unknown, index: number) => ({
    length: beforeAfterSnapInterval,
    offset: beforeAfterSnapInterval * index,
    index,
});

export default function TreatmentPlanScreen() {
    const [beforeAfterIndex, setBeforeAfterIndex] = useState(0);
    const beforeAfterListRef = useRef<FlatList>(null);

    const handleBeforeAfterScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const offset = event.nativeEvent.contentOffset.x;
        const index = Math.round(offset / beforeAfterSnapInterval);
        setBeforeAfterIndex(Math.min(Math.max(0, index), BEFORE_AFTER_SLIDES.length - 1));
    }, []);

    const renderBeforeAfterSlide = useCallback(({ item }: { item: typeof BEFORE_AFTER_SLIDES[0] }) => (
        <View style={[styles.beforeAfterSlide, { width: slideWidth }]}>
            <ComparisonSlider
                beforeImage={item.beforeImage}
                afterImage={item.afterImage}
                height={verticalScale(545)}
            />
        </View>
    ), []);

    return (
        <View style={styles.container}>
            <ScrollView
                contentInsetAdjustmentBehavior='always'
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}>
                {/* Header Section */}
                <View style={styles.header}>
                    <Text style={styles.title}>{t("treatmentPlan.title")}</Text>
                    <Text style={styles.subtitle}>{t("treatmentPlan.subtitle")}</Text>
                    <Text style={styles.caption}>{t("treatmentPlan.caption")}</Text>
                </View>

                {/* Before/After client results carousel (3 slides) */}
                <View style={styles.beforeAfterCarousel}>
                    <FlatList
                        ref={beforeAfterListRef}
                        data={BEFORE_AFTER_SLIDES}
                        renderItem={renderBeforeAfterSlide}
                        keyExtractor={keyExtractor}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        onScroll={handleBeforeAfterScroll}
                        scrollEventThrottle={16}
                        snapToOffsets={BEFORE_AFTER_SLIDES.map((_, i) => i * beforeAfterSnapInterval)}
                        snapToInterval={beforeAfterSnapInterval}
                        snapToAlignment="start"
                        decelerationRate="fast"
                        contentContainerStyle={styles.beforeAfterListContent}
                        initialNumToRender={1}
                        maxToRenderPerBatch={1}
                        windowSize={3}
                        removeClippedSubviews
                        getItemLayout={getItemLayout}
                    />
                    <View style={styles.dotsContainer}>
                        {BEFORE_AFTER_SLIDES.map((_, i) => (
                            <View
                                key={i}
                                style={[
                                    styles.dot,
                                    i === beforeAfterIndex && styles.activeDot,
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

                <PrimaryButton
                    title={"Continue"}
                    onPress={() => router.push("/payment")}
                />
            </ScrollView>
        </View>
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
    beforeAfterCarousel: {
        width: '100%',
        alignItems: 'center',
        marginBottom: verticalScale(8),
    },
    beforeAfterListContent: {
        paddingRight: scale(16),
    },
    beforeAfterSlide: {
        marginRight: scale(16),
        alignItems: 'center',
        justifyContent: 'center',
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
