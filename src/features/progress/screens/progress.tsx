import { scale, verticalScale } from '@/constants/scaling';
import { AeonikFonts, Colors } from '@/constants/theme';
import React from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, View } from 'react-native';

import { AppText as Text } from '@/components/app-text';
import { ProgressLockView } from '@/features/progress/components/ProgressLockView';
import { ProgressUnlockedView } from '@/features/progress/components/ProgressUnlockedView';
import { t } from '@/i18n';
import { useAppSelector } from '@/shared/store/hooks';

export default function ProgressScreen() {
    const { data: progressData, isLoading, error } = useAppSelector(
        (state) => state.progress
    );

    const isUnlocked = progressData?.isUnlocked ?? true;

    if (isLoading && !progressData) {
        return (
            <View style={[styles.container, styles.centerContent]}>
                <ActivityIndicator size="large" color={Colors.light.mainDarkColor} />
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
                    <ProgressLockView />
                )}

                <View style={{ height: verticalScale(100) }} />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.light.scaffold,
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
        fontFamily: AeonikFonts.regular,
        fontSize: scale(16),
        color: Colors.light.mainDarkColor,
    },
    errorText: {
        fontFamily: AeonikFonts.medium,
        fontSize: scale(18),
        color: Colors.light.mainDarkColor,
        marginBottom: verticalScale(8),
    },
    errorDetail: {
        fontFamily: AeonikFonts.regular,
        fontSize: scale(14),
        color: Colors.light.greyMid,
        textAlign: 'center',
    },
    demoToggle: {
        marginBottom: 10,
        padding: 5,
        backgroundColor: Colors.light.blackAlpha05,
        borderRadius: 4,
        alignSelf: 'center',
    },
    demoText: {
        fontFamily: AeonikFonts.regular,
        fontSize: 12,
        color: Colors.light.greyMid,
    }
});
