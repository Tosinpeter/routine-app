import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppText as Text } from '@/components/app-text';
import { scale } from '@/constants/scaling';
import { t } from "@/i18n";

export function ScanHistoryCard() {
    return (
        <View style={styles.card}>
            <Text style={styles.title}>{t("progress.scanHistory.title")}</Text>
            <View style={styles.item}>
                <Ionicons name="checkmark" size={scale(18)} color="#CF604A" />
                <Text style={styles.text}>{t("progress.scanHistory.followedRoutine")}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        width: '100%',
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 16,
        justifyContent: 'center',
    },
    title: {
        fontFamily: 'Aeonik-Medium',
        fontSize: scale(20),
        color: '#20201E',
        marginBottom: 4,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    text: {
        fontFamily: 'Aeonik-Regular',
        fontSize: scale(16),
        color: '#20201E',
        opacity: 0.8,
    }
});
