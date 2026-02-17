import { scale, verticalScale } from '@/constants/scaling';
import React from 'react';
import { ScrollView, StyleSheet, View, ActivityIndicator } from 'react-native';

import { ProgressLogView } from '@/components/progress/ProgressLogView';
import { ProgressUnlockedView } from '@/components/progress/ProgressUnlockedView';
import { AppText as Text } from '@/components/app-text';
import { useAppSelector } from '@/store/hooks';
import { t } from '@/i18n';

export default function ProgressScreen() {
    const { data: progressData, isLoading, error } = useAppSelector(
        (state) => state.progress
    );

    const isUnlocked = progressData?.isUnlocked ?? true;

    if (isLoading && !progressData) {
        return (
            <View style={[styles.container, styles.centerContent]}>
                <ActivityIndicator size="large" color="#20201E" />
                <Text style={styles.loadingText}>{t("progress.loading")}</Text>
            </View>
        );
    }

    if (error && !progressData) {
        return (
            <View style={[styles.container, styles.centerContent]}>
                <Text style={styles.errorText}>{t("progress.error.failedToLoad")}</Text>
                <Text style={styles.errorDetail}>{error}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.contentContainer}
                showsVerticalScrollIndicator={false}
            >
                {isUnlocked ? (
                    <ProgressUnlockedView />
                ) : (
                    <ProgressLogView />
                )}

                {/* Bottom Padding for TabBar */}
                <View style={{ height: verticalScale(100) }} />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EDEBE3', // Beige background
    },
    scrollView: {
        flex: 1,
    },
    contentContainer: {
        paddingTop: verticalScale(60),
        paddingHorizontal: scale(16),
        paddingBottom: verticalScale(20),
        alignItems: 'center',
    },
    centerContent: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: scale(20),
    },
    loadingText: {
        marginTop: verticalScale(16),
        fontFamily: 'Aeonik-Regular',
        fontSize: scale(16),
        color: '#20201E',
    },
    errorText: {
        fontFamily: 'Aeonik-Medium',
        fontSize: scale(18),
        color: '#20201E',
        marginBottom: verticalScale(8),
    },
    errorDetail: {
        fontFamily: 'Aeonik-Regular',
        fontSize: scale(14),
        color: '#666',
        textAlign: 'center',
    },
    demoToggle: {
        marginBottom: 10,
        padding: 5,
        backgroundColor: 'rgba(0,0,0,0.05)',
        borderRadius: 4,
        alignSelf: 'center',
    },
    demoText: {
        fontFamily: 'Aeonik-Regular',
        fontSize: 12,
        color: '#666',
    }
});
