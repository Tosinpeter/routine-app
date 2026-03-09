import React from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { AppText as Text } from '@/components/app-text';
import { moderateScale, scale, verticalScale } from '@/constants/scaling';
import { AeonikFonts, Colors } from '@/constants/theme';
import { MetricCard } from '@/features/progress/components/MetricCard';
import ProgressMetricIcon from '@/features/progress/components/ProgressMetricIcon';
import { RoutineConsistencyCard } from '@/features/progress/components/RoutineConsistencyCard';
import { t } from "@/i18n";

export default function TopImprovementsScreen() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            {/* Custom Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={scale(24)} color={Colors.light.mainDarkColor} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{t("progress.topImprovements.title")}</Text>
                <View style={{ width: scale(40) }} />
            </View>

            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.contentContainer}
                showsVerticalScrollIndicator={false}
            >
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
                <View style={styles.consistencyWrapper}>
                    <RoutineConsistencyCard />
                </View>

                {/* Bottom Padding */}
                <View style={{ height: verticalScale(100) }} />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EDEBE3',
        paddingTop: verticalScale(50),
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: scale(16),
        marginBottom: verticalScale(16),
        height: verticalScale(44),
    },
    backButton: {
        width: scale(40),
        height: scale(40),
        borderRadius: scale(20),
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        fontFamily: AeonikFonts.medium,
        fontSize: moderateScale(20),
        color: '#20201E',
    },
    scrollView: {
        flex: 1,
    },
    contentContainer: {
        paddingHorizontal: scale(16),
        paddingBottom: verticalScale(20),
    },
    grid: {
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: 12,
        marginBottom: verticalScale(24),
    },
    consistencyWrapper: {
        width: '100%',
        gap: verticalScale(16),
    },
    sectionTitle: {
        fontFamily: AeonikFonts.medium,
        fontSize: moderateScale(20),
        color: '#20201E',
    }
});
