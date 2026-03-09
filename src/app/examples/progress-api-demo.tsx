import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { AppText as Text } from '@/components/app-text';
import { useProgress, useUnlockStatus } from '@/hooks/useProgress';
import { scale, verticalScale } from '@/constants/scaling';
import { AeonikFonts, Colors } from '@/constants/theme';
import { MetricCard } from '@/features/progress/components/MetricCard';
import ProgressMetricIcon from '@/features/progress/components/ProgressMetricIcon';

/**
 * Example component showing how to use the Progress API
 */
export default function ProgressApiDemo() {
  const { data, loading, error, refresh } = useProgress();
  const {
    unlockStatus,
    loading: unlockLoading,
    error: unlockError,
  } = useUnlockStatus();

  if (loading || unlockLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={Colors.light.tint} />
        <Text style={styles.loadingText}>Loading progress data...</Text>
      </View>
    );
  }

  if (error || unlockError) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>
          Error: {error || unlockError}
        </Text>
        <TouchableOpacity style={styles.retryButton} onPress={refresh}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!data) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>No data available</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Progress API Demo</Text>
        <TouchableOpacity style={styles.refreshButton} onPress={refresh}>
          <Text style={styles.refreshButtonText}>Refresh</Text>
        </TouchableOpacity>
      </View>

      {/* Unlock Status */}
      {unlockStatus && (
        <View style={styles.unlockCard}>
          <Text style={styles.sectionTitle}>Unlock Status</Text>
          <Text style={styles.infoText}>
            {unlockStatus.isUnlocked
              ? '✅ Progress Unlocked!'
              : `🔒 Unlocks in ${unlockStatus.daysUntilUnlock} days`}
          </Text>
          <Text style={styles.infoText}>
            Progress: {unlockStatus.percentComplete}%
          </Text>
          <Text style={styles.infoText}>
            Days completed: {unlockStatus.currentDays} / {unlockStatus.requirementDays}
          </Text>
        </View>
      )}

      {/* Metrics Grid */}
      <Text style={styles.sectionTitle}>Skin Metrics</Text>
      <View style={styles.grid}>
        <MetricCard
          title={data.metrics.skinScore.title}
          value={data.metrics.skinScore.value}
          icon={<ProgressMetricIcon />}
          trend={data.metrics.skinScore.trend}
        />
        <MetricCard
          title={data.metrics.skinAge.title}
          value={data.metrics.skinAge.value}
          unit={data.metrics.skinAge.unit}
          icon={<ProgressMetricIcon />}
          trend={data.metrics.skinAge.trend}
        />
        <MetricCard
          title={data.metrics.hydration.title}
          value={data.metrics.hydration.value}
          icon={<ProgressMetricIcon />}
          trend={data.metrics.hydration.trend}
        />
        <MetricCard
          title={data.metrics.acne.title}
          value={data.metrics.acne.value}
          icon={<ProgressMetricIcon />}
          trend={data.metrics.acne.trend}
        />
        <MetricCard
          title={data.metrics.texture.title}
          value={data.metrics.texture.value}
          icon={<ProgressMetricIcon />}
          trend={data.metrics.texture.trend}
        />
        <MetricCard
          title={data.metrics.wrinkles.title}
          value={data.metrics.wrinkles.value}
          icon={<ProgressMetricIcon />}
          trend={data.metrics.wrinkles.trend}
        />
        <MetricCard
          title={data.metrics.darkSpots.title}
          value={data.metrics.darkSpots.value}
          icon={<ProgressMetricIcon />}
          trend={data.metrics.darkSpots.trend}
        />
        <MetricCard
          title={data.metrics.poreSize.title}
          value={data.metrics.poreSize.value}
          icon={<ProgressMetricIcon />}
          trend={data.metrics.poreSize.trend}
        />
      </View>

      {/* Routine Consistency */}
      <View style={styles.consistencyCard}>
        <Text style={styles.sectionTitle}>Routine Consistency</Text>
        <Text style={styles.infoText}>
          Current Streak: {data.routineConsistency.currentStreak} days
        </Text>
        <Text style={styles.infoText}>
          Longest Streak: {data.routineConsistency.longestStreak} days
        </Text>
        <Text style={styles.infoText}>
          Completion Rate: {data.routineConsistency.completionRate}%
        </Text>

        <View style={styles.weeklyData}>
          {data.routineConsistency.weeklyData.map((day, index) => (
            <View key={index} style={styles.dayCard}>
              <Text style={styles.dayText}>{day.day}</Text>
              <Text style={styles.dayStatus}>
                {day.completed ? '✅' : '❌'}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Last Updated */}
      <Text style={styles.lastUpdated}>
        Last updated: {new Date(data.lastUpdated).toLocaleString()}
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EDEBE3',
  },
  content: {
    padding: scale(16),
    paddingTop: verticalScale(60),
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: scale(20),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: verticalScale(24),
  },
  title: {
    fontFamily: AeonikFonts.medium,
    fontSize: scale(28),
    color: '#20201E',
  },
  refreshButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: scale(16),
    paddingVertical: scale(8),
    borderRadius: scale(8),
  },
  refreshButtonText: {
    fontFamily: AeonikFonts.medium,
    fontSize: scale(14),
    color: '#FFFFFF',
  },
  loadingText: {
    marginTop: verticalScale(16),
    fontFamily: AeonikFonts.regular,
    fontSize: scale(16),
    color: '#666',
  },
  errorText: {
    fontFamily: AeonikFonts.regular,
    fontSize: scale(16),
    color: '#F04438',
    textAlign: 'center',
  },
  retryButton: {
    marginTop: verticalScale(16),
    backgroundColor: '#007AFF',
    paddingHorizontal: scale(24),
    paddingVertical: scale(12),
    borderRadius: scale(8),
  },
  retryButtonText: {
    fontFamily: AeonikFonts.medium,
    fontSize: scale(16),
    color: '#FFFFFF',
  },
  unlockCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: scale(12),
    padding: scale(16),
    marginBottom: verticalScale(24),
  },
  sectionTitle: {
    fontFamily: AeonikFonts.medium,
    fontSize: scale(20),
    color: '#20201E',
    marginBottom: verticalScale(12),
  },
  infoText: {
    fontFamily: AeonikFonts.regular,
    fontSize: scale(16),
    color: '#20201E',
    marginBottom: verticalScale(8),
  },
  grid: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: scale(12),
    marginBottom: verticalScale(24),
  },
  consistencyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: scale(12),
    padding: scale(16),
    marginBottom: verticalScale(24),
  },
  weeklyData: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: verticalScale(12),
  },
  dayCard: {
    alignItems: 'center',
    padding: scale(8),
    backgroundColor: '#F9F9F9',
    borderRadius: scale(8),
  },
  dayText: {
    fontFamily: AeonikFonts.regular,
    fontSize: scale(12),
    color: '#20201E',
    marginBottom: scale(4),
  },
  dayStatus: {
    fontSize: scale(16),
  },
  lastUpdated: {
    fontFamily: AeonikFonts.regular,
    fontSize: scale(12),
    color: '#666',
    textAlign: 'center',
    marginBottom: verticalScale(20),
  },
});
