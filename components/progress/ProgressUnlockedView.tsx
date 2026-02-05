import React from 'react';
import { StyleSheet, View } from 'react-native';
import { AppText as Text } from '@/components/app-text';
import { scale, verticalScale } from '@/constants/scaling';
import { ComparisonCard } from '@/components/progress/ComparisonCard';
import { TopImprovementsCard } from '@/components/progress/TopImprovementsCard';
import { ProgressHelpedCard } from '@/components/progress/ProgressHelpedCard';
import { ScanHistoryCard } from '@/components/progress/ScanHistoryCard';

export function ProgressUnlockedView() {
    return (
        <View style={styles.contentContainer}>
            {/* Title: Your Skin Progress */}
            <Text style={styles.screenTitle}>Your Skin Progress</Text>

            {/* Comparison Card (Before/After) */}
            <ComparisonCard />

            <View style={{ height: verticalScale(24) }} />

            {/* Top Improvements */}
            <Text style={styles.sectionTitle}>Top Improvements</Text>
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
    screenTitle: {
        fontFamily: 'Aeonik-Medium',
        fontSize: scale(30),
        lineHeight: scale(36),
        color: '#20201E',
        alignSelf: 'flex-start',
        marginBottom: verticalScale(16),
        width: '100%',
    },
    sectionTitle: {
        fontFamily: 'Aeonik-Medium',
        fontSize: scale(20),
        color: '#20201E',
        alignSelf: 'flex-start',
        marginBottom: verticalScale(16),
        width: '100%',
    },
});
