import { AppText as Text } from '@/components/app-text';
import { ProgressPreviewCard } from '@/features/home/components/ProgressPreviewCard';
import { MetricCard } from './MetricCard';
import ProgressMetricIcon from './ProgressMetricIcon';
import { RoutineConsistencyCard } from './RoutineConsistencyCard';
import { scale, verticalScale } from '@/constants/scaling';
import { AeonikFonts } from '@/constants/theme';
import { t } from "@/i18n";
import React from 'react';
import { StyleSheet, View } from 'react-native';

export function ProgressLockView() {
    return (
        <View style={styles.contentContainer}>
            {/* Hero Section */}
            <Text style={styles.headerTitle}>{t("progress.log.title")}</Text>
            <ProgressPreviewCard />

            {/* Description Text */}
            <Text style={styles.description}>
                {t("progress.log.description")}
            </Text>

            {/* Metrics Grid */}
            <View style={styles.grid}>
                {/* Row 1 */}
                <MetricCard
                    title={t("progress.metrics.skinScore")}
                    value="85"
                    icon={<ProgressMetricIcon />}
                />
                <MetricCard
                    title={t("progress.metrics.skinAge")}
                    value="25"
                    unit={t("progress.metrics.yearsOld")}
                    icon={<ProgressMetricIcon />}
                />

                {/* Row 2 */}
                <MetricCard
                    title={t("progress.metrics.skinScore")}
                    value="85"
                    icon={<ProgressMetricIcon />}
                />
                <MetricCard
                    title={t("progress.metrics.skinAge")}
                    value="25"
                    unit={t("progress.metrics.yearsOld")}
                    icon={<ProgressMetricIcon />}
                />

                {/* Row 3 */}
                <MetricCard
                    title={t("progress.metrics.hydration")}
                    value="85"
                    icon={<ProgressMetricIcon />}
                    trend={{ value: '10%', direction: 'up' }}
                />
                <MetricCard
                    title={t("progress.metrics.acne")}
                    value="90"
                    icon={<ProgressMetricIcon />}
                    trend={{ value: '-5%', direction: 'down' }}
                />

                {/* Row 4 */}
                <MetricCard
                    title={t("progress.metrics.texture")}
                    value="90"
                    icon={<ProgressMetricIcon />}
                    trend={{ value: '+5%', direction: 'up' }}
                />
                <MetricCard
                    title={t("progress.metrics.acne")}
                    value="90"
                    icon={<ProgressMetricIcon />}
                    trend={{ value: '-5%', direction: 'down' }}
                />

                {/* Row 5 */}
                <MetricCard
                    title={t("progress.metrics.wrinkles")}
                    value="85"
                    icon={<ProgressMetricIcon />}
                    trend={{ value: '-5%', direction: 'down' }}
                />
                <MetricCard
                    title={t("progress.metrics.darkSpots")}
                    value="85"
                    icon={<ProgressMetricIcon />}
                    trend={{ value: '+7%', direction: 'up' }}
                />
            </View>

            {/* Routine Consistency */}
            <RoutineConsistencyCard />
        </View>
    );
}

const styles = StyleSheet.create({
    contentContainer: {
        alignItems: 'center',
        width: '100%',
    },
    headerTitle: {
        fontFamily: AeonikFonts.medium,
        fontSize: scale(30),
        color: "#20201E",
        marginBottom: scale(16),
        alignSelf: 'flex-start',
        width: '100%',
    },
    description: {
        fontFamily: AeonikFonts.regular,
        fontSize: scale(16),
        lineHeight: scale(22),
        color: '#20201E',
        opacity: 0.8,
        textAlign: 'center',
        marginBottom: verticalScale(24),
    },
    grid: {
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignContent: 'flex-start',
        gap: 12,
        marginBottom: verticalScale(24),
    }
});
