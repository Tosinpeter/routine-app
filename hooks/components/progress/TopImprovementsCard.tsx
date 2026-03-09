import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { AppText as Text } from '@/components/app-text';
import { scale, verticalScale } from '@/constants/scaling';
import { AeonikFonts, Colors } from '@/constants/theme';
// eslint-disable-next-line import/no-named-as-default
import ImprovementIcon from '@/components/progress/ImprovementIcon';
import { t } from "@/i18n";

interface ImprovementItemProps {
    label: string;
    value: string;
    trend: 'down' | 'up';
    progress: number;
    color?: string;
    delay?: number;
}

function ImprovementItem({ label, value, trend, progress, color = '#3736FD', delay = 0 }: ImprovementItemProps) {
    const progressAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Animate the progress bar with a spring animation
        Animated.spring(progressAnim, {
            toValue: progress,
            delay,
            tension: 40,
            friction: 8,
            useNativeDriver: false, // width animation requires false
        }).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [progress, delay]);

    const animatedWidth = progressAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0%', '100%'],
    });

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
                        size={scale(16)}
                        color={trend === 'down' ? Colors.light.errorRed : Colors.light.successGreen}
                    />
                    <Text style={styles.trendValue}>{value}</Text>
                </View>
            </View>

            {/* Progress Bar */}
            <View style={styles.progressBarBg}>
                <Animated.View 
                    style={[
                        styles.progressBarFill, 
                        { 
                            width: animatedWidth, 
                            backgroundColor: color 
                        }
                    ]} 
                />
            </View>
        </View>
    );
}

export function TopImprovementsCard() {
    const router = useRouter();

    return (
        <View style={styles.card}>
            {/* Items */}
            <View style={styles.listContainer}>
                <ImprovementItem
                    label={t("progress.improvements.acne")}
                    value="18%"
                    trend="down"
                    progress={0.9}
                    delay={0}
                />
                <ImprovementItem
                    label={t("progress.improvements.redness")}
                    value="12%"
                    trend="down"
                    progress={0.4}
                    delay={150}
                />
                <ImprovementItem
                    label={t("progress.improvements.hydration")}
                    value="22%"
                    trend="up"
                    progress={0.3}
                    delay={300}
                />
            </View>

            {/* CTA */}
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => router.push('/top-improvements')}
                style={styles.ctaContainer}
            >
                <Text style={styles.ctaText}>{t("progress.improvements.viewAllMetrics")}</Text>
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
        marginBottom: verticalScale(5),
        gap: 8,
    },
    itemLabel: {
        fontFamily: AeonikFonts.medium,
        fontSize: scale(16),
        color: '#20201E',
    },
    trendContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 2,
    },
    trendValue: {
        fontFamily: AeonikFonts.regular,
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
        backgroundColor: '#EDEBE3', // Beige button
        borderRadius: 100,
        paddingVertical: verticalScale(19),
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 8,
    },
    ctaText: {
        fontFamily: AeonikFonts.medium,
        fontSize: scale(14),
        color: '#344054',
    }
});
