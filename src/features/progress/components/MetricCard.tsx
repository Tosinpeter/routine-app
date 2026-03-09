import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { AppText as Text } from '@/components/app-text';
import { scale } from '@/constants/scaling';
import { AeonikFonts, Colors } from '@/constants/theme';

interface Trend {
    value: string;
    direction: 'up' | 'down';
    color?: string; // Optional override
}

interface MetricCardProps {
    title: string;
    value: string;
    unit?: string;
    icon: React.ReactNode;
    trend?: Trend;
}

export function MetricCard({ title, value, unit, icon, trend }: MetricCardProps) {
    return (
        <View style={styles.card}>
            {/* InfoWrapper: Matches "HydrationInfo" (w149, h48, gap8) */}
            <View style={styles.infoWrapper}>

                {/* Header: Matches "HydrationHeader" / "ScoreHeader" */}
                <View style={styles.header}>
                    <View style={styles.iconTitleRow}>
                        {icon}
                        <Text style={styles.title}>{title}</Text>
                    </View>
                </View>

                {/* Value Container: Matches "HydrationValueContainer" (h24, justify-between) */}
                <View style={styles.valueContainer}>
                    <View style={styles.valueWrapper}>
                        <Text style={styles.value}>{value}</Text>
                        {unit && <Text style={styles.unit}> {unit}</Text>}
                    </View>

                    {trend && (
                        <View style={[
                            styles.trendPill,
                            { backgroundColor: trend.direction === 'up' ? '#ECFDF3' : '#FEF3F2' }
                        ]}>
                            {/* Icon for trend */}
                            <Ionicons
                                name={trend.direction === 'up' ? 'arrow-up' : 'arrow-down'}
                                size={scale(16)}
                                color={trend.direction === 'up' ? Colors.light.successGreen : Colors.light.error}
                            />
                            <Text style={[
                                styles.trendText,
                                { color: trend.direction === 'up' ? '#077C46' : '#F04438' }
                            ]}>
                                {trend.value}
                            </Text>
                        </View>
                    )}
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        width: '48%', // Fixed from CSS
        // height: 80, // Fixed from CSS
        backgroundColor: '#FFFFFF',
        borderRadius: scale(8),
        padding: scale(16),
    },
    infoWrapper: {
        flexDirection: 'column',
        gap: scale(8),
    },
    header: {
        // height: scale(16),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    iconTitleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: scale(4),
    },
    title: {
        fontFamily: AeonikFonts.regular,
        fontSize: scale(16),
        // lineHeight: scale(16),
        color: '#20201E',
        opacity: 0.7,
    },
    valueContainer: {
        height: scale(24),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    valueWrapper: {
        flexDirection: 'row',
        alignItems: 'baseline',
    },
    value: {
        fontFamily: AeonikFonts.medium,
        fontSize: scale(24),
        lineHeight: scale(24),
        color: '#20201E',
        textAlign: 'center',
    },
    unit: {
        fontFamily: AeonikFonts.regular,
        fontSize: scale(14),
        color: '#20201E',
        opacity: 0.7,
    },
    trendPill: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: scale(8),
        paddingVertical: scale(4),
        gap: scale(6),
        borderRadius: 100,
        height: scale(24),
    },
    trendText: {
        fontFamily: AeonikFonts.regular,
        fontSize: scale(14),
        lineHeight: scale(14),
    }
});
