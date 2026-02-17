import React from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { AppText as Text } from '@/components/app-text';
import { moderateScale, scale, verticalScale } from '@/constants/scaling';
import { MetricCard } from '@/components/progress/MetricCard';
import ProgressMetricIcon from '@/components/progress/ProgressMetricIcon';
import { RoutineConsistencyCard } from '@/components/progress/RoutineConsistencyCard';

export default function TopImprovementsScreen() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            {/* Custom Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={scale(24)} color="#20201E" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Top Improvements</Text>
                <View style={{ width: scale(40) }} />{/* Spacer to center title */}
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
                <View style={styles.consistencyWrapper}>
                    {/* <Text style={styles.sectionTitle}>Routine Consistency</Text> */}
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
        backgroundColor: '#EDEBE3', // Beige background
        paddingTop: verticalScale(50), // Verify safe area or status bar height
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
        fontFamily: 'Aeonik-Medium',
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
        fontFamily: 'Aeonik-Medium',
        fontSize: moderateScale(20),
        color: '#20201E',
    }
});


