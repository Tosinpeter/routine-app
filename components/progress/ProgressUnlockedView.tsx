import { AppText as Text } from '@/components/app-text';
import { ProgressHelpedCard } from '@/components/progress/ProgressHelpedCard';
import { ScanHistoryCard } from '@/components/progress/ScanHistoryCard';
import { TopImprovementsCard } from '@/components/progress/TopImprovementsCard';
import { scale, scaledRadius, verticalScale } from '@/constants/scaling';
import { AeonikFonts } from '@/constants/theme';
import { AppTextStyle } from '@/constants/typography';
import { t } from "@/i18n";
import { BlurView } from 'expo-blur';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { CalendarIcon } from '../icons/CalendarIcon';
import { ComparisonSlider } from '../treatment-plan/ComparisonSlider';

export function ProgressUnlockedView() {
    return (
        <View style={styles.contentContainer}>
            {/* Title: Your Skin Progress */}
            <Text style={styles.screenTitle}>{t("progress.unlocked.title")}</Text>

            {/* Comparison Card (Before/After) */}
            <ComparisonSlider
                beforeImage={require("@/assets/images/client1beforeimage.webp")}
                afterImage={require("@/assets/images/client1afterimage.webp")}
                height={verticalScale(213)}
                beforeLabel='Before'
                afterLabel='After'
                overlay={<>

                    <View style={{
                        bottom: 10,
                        left: 10,
                        paddingHorizontal: scale(10),
                        paddingVertical: verticalScale(8),
                        position: 'absolute',
                        borderRadius: scaledRadius(10),
                        alignItems: 'center',
                        backgroundColor: 'rgba(118, 115, 115, 0.16)'
                    }}>
                        <BlurView intensity={10} />
                        <CalendarIcon size={16} />
                        <Text style={styles.dateTitle}>Feb 02</Text>
                        <Text style={styles.dateSubtitle}>2025</Text>
                    </View>

                    <View style={{
                        bottom: 10,
                        right: 10,
                        paddingHorizontal: scale(10),
                        paddingVertical: verticalScale(8),
                        position: 'absolute',
                        borderRadius: scaledRadius(10),
                        alignItems: 'center',
                        backgroundColor: 'rgba(118, 115, 115, 0.16)'
                    }}>
                        <BlurView intensity={10} />
                        <CalendarIcon size={16} />
                        <Text style={styles.dateTitle}>Feb 02</Text>
                        <Text style={styles.dateSubtitle}>2025</Text>
                    </View>
                </>}
            />


            <View style={{ height: verticalScale(24) }} />

            {/* Top Improvements */}
            <Text style={styles.sectionTitle}>{t("progress.unlocked.topImprovements")}</Text>
            <TopImprovementsCard />

            <View style={{ height: verticalScale(24) }} />


            <ProgressHelpedCard />

            <View style={{ height: verticalScale(24) }} />


            <ScanHistoryCard />

        </View>
    );
}

const styles = StyleSheet.create({
    contentContainer: {
        alignItems: 'center',
        width: '100%',
    },
    dateTitle: {
        ...AppTextStyle.bodyText2,
        textAlign: 'center',
        fontFamily: AeonikFonts.medium,
        color: 'rgba(255, 255, 255, 1)',
    },
    dateSubtitle: {
        ...AppTextStyle.bodyText2,
        textAlign: 'center',
        fontFamily: AeonikFonts.medium,
        color: 'rgba(255, 255, 255, 1)'
    },
    screenTitle: {
        ...AppTextStyle.headline1,
        fontFamily: AeonikFonts.medium,
        lineHeight: scale(36),
        alignSelf: 'flex-start',
        marginBottom: verticalScale(16),
        width: '100%',
    },
    sectionTitle: {
        ...AppTextStyle.headline4,
        fontFamily: AeonikFonts.medium,
        alignSelf: 'flex-start',
        marginBottom: verticalScale(16),
        width: '100%',
    },
});
