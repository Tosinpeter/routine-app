import React from 'react';
import { StyleSheet, View } from 'react-native';
import { AppText as Text } from '@/components/app-text';
import { Colors, Fonts } from '@/constants/theme';
import { scale, verticalScale } from '@/constants/scaling';
import { ProgressPreviewCard } from '@/components/home/ProgressPreviewCard';
import { MetricCard } from '@/components/progress/MetricCard';
import { RoutineConsistencyCard } from '@/components/progress/RoutineConsistencyCard';
import ProgressMetricIcon from '@/components/progress/ProgressMetricIcon';

export function ProgressLogView() {
    return (
        <View style={styles.contentContainer}>
            {/* Hero Section */}
            <Text style={styles.headerTitle}>Your Progress</Text>
            <ProgressPreviewCard />

            {/* Description Text */}
            <Text style={styles.description}>
                We’re tracking changes in your skin. Full visual comparison unlocks after 30 days
            </Text>

            {/* Metrics Grid */}
            <View style={styles.grid}>
                {/* Row 1 */}
                <MetricCard
                    title="Skin Score"
                    value="85"
                    icon={<ProgressMetricIcon />}
                />
                <MetricCard
                    title="Skin Age"
                    value="25"
                    unit="years old"
                    icon={<ProgressMetricIcon />}
                />

                {/* Row 2 */}
                <MetricCard
                    title="Skin Score"
                    value="85"
                    icon={<ProgressMetricIcon />}
                />
                <MetricCard
                    title="Skin Age"
                    value="25"
                    unit="years old"
                    icon={<ProgressMetricIcon />}
                />

                {/* Row 3 */}
                <MetricCard
                    title="Hydration"
                    value="85"
                    icon={<ProgressMetricIcon />}
                    trend={{ value: '10%', direction: 'up' }}
                />
                <MetricCard
                    title="Acne"
                    value="90"
                    icon={<ProgressMetricIcon />}
                    trend={{ value: '-5%', direction: 'down' }}
                />

                {/* Row 4 */}
                <MetricCard
                    title="Texture"
                    value="90"
                    icon={<ProgressMetricIcon />}
                    trend={{ value: '+5%', direction: 'up' }}
                />
                <MetricCard
                    title="Acne"
                    value="90"
                    icon={<ProgressMetricIcon />}
                    trend={{ value: '-5%', direction: 'down' }}
                />

                {/* Row 5 */}
                <MetricCard
                    title="Wrinkles"
                    value="85"
                    icon={<ProgressMetricIcon />}
                    trend={{ value: '-5%', direction: 'down' }}
                />
                <MetricCard
                    title="Dark Spots"
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
        fontFamily: 'Aeonik-Medium',
        fontSize: scale(30),
        color: "#20201E",
        marginBottom: scale(16),
        alignSelf: 'flex-start',
        width: '100%',
    },
    description: {
        fontFamily: 'Aeonik-Regular',
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
