import { AppText as Text } from '@/components/app-text';
import { ActiveIngredients } from '@/features/treatment-plan/components/ActiveIngredients';
import { BenefitsGrid } from '@/features/treatment-plan/components/BenefitsGrid';
import { PreparationStatus } from '@/features/treatment-plan/components/PreparationStatus';
import { ProtocolSection } from '@/features/treatment-plan/components/ProtocolSection';
import { TrustRating } from '@/features/treatment-plan/components/TrustRating';
import { WhatsInsideAccordion } from '@/features/treatment-plan/components/WhatsInsideAccordion';
import { scale, verticalScale, SCREEN_WIDTH } from '@/constants/scaling';
import { AeonikFonts, Colors, Fonts } from '@/constants/theme';
import { AppTextStyle } from '@/constants/typography';
import { router } from 'expo-router';
import React, { useState, useRef, useCallback } from 'react';
import { ScrollView, StyleSheet, View, FlatList, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';

import { DermatologistSupportCard } from '@/features/home/components/DermatologistSupportCard';
import { t } from "@/i18n";
import { ComparisonSlider } from '@/features/treatment-plan/components/ComparisonSlider';
import { PrimaryButton } from '@/components/primary-button';
import { BEFORE_AFTER_SLIDES } from '@/shared/data/treatment-plan-slides';

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
                <PreparationStatus />

                <PrimaryButton
                    title={t("common.continue")}
                    onPress={() => router.push("/payment")}
                />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.light.scaffold,
    },
    scrollContent: {
        marginTop: scale(24),
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
        paddingEnd: scale(16),
    },
    beforeAfterSlide: {
        marginEnd: scale(16),
        alignItems: 'center',
        justifyContent: 'center',
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
