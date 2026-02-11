import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { AppText as Text } from '@/components/app-text';
import { Fonts } from '@/constants/theme';
import { scale } from '@/constants/scaling';
import RoutineConsistencyIcon from '@/components/progress/RoutineConsistencyIcon';

export function RoutineConsistencyCard() {
    return (
        <View style={styles.card}>
            {/* Matches "RoutineInfo" 358x96 */}
            <View style={styles.routineInfo}>
                {/* RoutineHeader (Left 16, Top 16) */}
                <View style={styles.headerContainer}>
                    <Text style={styles.title}>Routine Consistency</Text>

                    <View style={styles.valueRow}>
                        <RoutineConsistencyIcon />

                        <Text style={styles.description}>
                            You followed your routine <Text style={styles.highlight}>85% of days</Text>
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        width: '100%',
        height: 96,
        // The container usually controls margins
    },
    routineInfo: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: scale(16),
        // Layout: gap 16 (Header -> Content)
        gap: scale(16),
    },
    headerContainer: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: scale(16),
    },
    title: {
        fontFamily: 'Aeonik-Medium',
        fontSize: scale(20),
        lineHeight: scale(20), // 100%
        letterSpacing: -0.005,
        color: '#20201E',
    },
    valueRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: scale(8),
        height: scale(24),
    },
    iconContainer: {
        width: scale(24),
        height: scale(24),
        borderRadius: 100, // Circle
        backgroundColor: '#3736FD',
        justifyContent: 'center',
        alignItems: 'center',
    },
    description: {
        fontFamily: 'Aeonik-Regular',
        fontSize: scale(16),
        lineHeight: scale(16),
        color: '#20201E',
        opacity: 0.8,
    },
    highlight: {
        fontFamily: 'Aeonik-Regular', // CSS doesn't explicitly bold this, but context implies it.
        // Wait, CSS says "Routine Value" has only regular font. 
        // "You followed your routine 85%..." 
        // Screenshot shows text is uniform?
        // Let's assume uniform opacity 0.8 based on CSS "Routine Value".
        // But the previous implementation had highlight. I'll keep the text props but maybe remove specific bold if not in CSS.
        // CSS: "Routine Value" -> weight 400.
        // I'll keep it simple.
    }
});
