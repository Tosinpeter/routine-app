import { AppText as Text } from '@/components/app-text';
import { ProgressHelpedCard } from './ProgressHelpedCard';
import { ScanHistoryCard } from './ScanHistoryCard';
import { TopImprovementsCard } from './TopImprovementsCard';
import { scale, scaledRadius, verticalScale } from '@/constants/scaling';
import { AeonikFonts, Colors } from '@/constants/theme';
import { AppTextStyle } from '@/constants/typography';
import { t } from "@/i18n";
import { BlurView } from 'expo-blur';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { CalendarIcon } from '@/components/icons/CalendarIcon';
import { ComparisonSlider } from '@/features/treatment-plan/components/ComparisonSlider';

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
                beforeLabel={t("progress.comparison.before")}
                afterLabel={t("progress.comparison.after")}
                overlay={<>

                    <View style={{
                        bottom: 10,
                        start: 10,
                        paddingHorizontal: scale(10),
                        paddingVertical: verticalScale(8),
                        position: 'absolute',
                        borderRadius: scaledRadius(10),
                        alignItems: 'center',
                        backgroundColor: Colors.light.greyOverlay
                    }}>
                        <BlurView intensity={10} />
                        <CalendarIcon size={16} />
                        <Text style={styles.dateTitle}>Feb 02</Text>
                        <Text style={styles.dateSubtitle}>2025</Text>
                    </View>

                    <View style={{
                        bottom: 10,
                        end: 10,
                        paddingHorizontal: scale(10),
                        paddingVertical: verticalScale(8),
                        position: 'absolute',
                        borderRadius: scaledRadius(10),
                        alignItems: 'center',
                        backgroundColor: Colors.light.greyOverlay
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
        color: Colors.light.white,
    },
    dateSubtitle: {
        ...AppTextStyle.bodyText2,
        textAlign: 'center',
        fontFamily: AeonikFonts.medium,
        color: Colors.light.white
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
