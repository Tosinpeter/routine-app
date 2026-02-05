import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppText as Text } from '@/components/app-text';
import { scale } from '@/constants/scaling';

import ImprovementIcon from '@/components/progress/ImprovementIcon';

interface ImprovementItemProps {
    label: string;
    value: string;
    trend: 'down' | 'up';
    progress: number;
    color?: string;
}

function ImprovementItem({ label, value, trend, progress, color = '#3736FD' }: ImprovementItemProps) {
    return (
        <View style={styles.itemContainer}>
            {/* Header: Icon + Label + Percentage */}
            <View style={styles.itemHeader}>
                <View style={styles.iconLabelRow}>
                    <ImprovementIcon />
                    <Text style={styles.itemLabel}>{label}</Text>
                </View>

                <View style={styles.trendContainer}>
                    <Ionicons
                        name={trend === 'down' ? 'arrow-down' : 'arrow-up'}
                        size={scale(12)}
                        color={trend === 'down' ? '#F41D12' : '#077C46'}
                    />
                    <Text style={styles.trendValue}>{value}</Text>
                </View>
            </View>

            {/* Progress Bar */}
            <View style={styles.progressBarBg}>
                <View style={[styles.progressBarFill, { width: `${progress * 100}%`, backgroundColor: color }]} />
            </View>
        </View>
    );
}

import { useRouter } from 'expo-router';

// ... (existing imports)

export function TopImprovementsCard() {
    const router = useRouter();

    return (
        <View style={styles.card}>
            {/* Items */}
            <View style={styles.listContainer}>
                <ImprovementItem
                    label="Acne"
                    value="18%"
                    trend="down"
                    progress={0.5}
                />
                <ImprovementItem
                    label="Redness"
                    value="12%"
                    trend="down"
                    progress={0.4}
                />
                <ImprovementItem
                    label="Hydration"
                    value="22%"
                    trend="up"
                    progress={0.3}
                />
            </View>

            {/* CTA */}
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => router.push('/top-improvements')}
                style={styles.ctaContainer}
            >
                <Text style={styles.ctaText}>View All Metrics</Text>
            </TouchableOpacity>
        </View>
    );
}
// ... styles unchanged

const styles = StyleSheet.create({
    card: {
        width: '100%',
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 16,
        gap: 16,
    },
    listContainer: {
        gap: 24,
    },
    itemContainer: {
        gap: 8,
    },
    itemHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    iconLabelRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    itemLabel: {
        fontFamily: 'Aeonik-Medium',
        fontSize: scale(16),
        color: '#20201E',
    },
    trendContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 2,
    },
    trendValue: {
        fontFamily: 'Aeonik-Regular',
        fontSize: scale(13),
        color: '#000000',
    },
    progressBarBg: {
        height: 10,
        backgroundColor: '#F2F4F7',
        borderRadius: 100,
        width: '100%',
        overflow: 'hidden',
    },
    progressBarFill: {
        height: '100%',
        borderRadius: 100,
    },
    ctaContainer: {
        height: 40,
        backgroundColor: '#EDEBE3', // Beige button
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 8,
    },
    ctaText: {
        fontFamily: 'Aeonik-Medium',
        fontSize: scale(14),
        color: '#344054',
    }
});
