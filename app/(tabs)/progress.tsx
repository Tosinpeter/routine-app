import { scale, verticalScale } from '@/constants/scaling';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { ProgressLogView } from '@/components/progress/ProgressLogView';
import { ProgressUnlockedView } from '@/components/progress/ProgressUnlockedView';

export default function ProgressScreen() {
    // Demo State: Default to Logged (false) - Change this value to true to see Unlocked View
    const [isUnlocked] = useState(false);

    return (
        <View style={styles.container}>
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.contentContainer}
                showsVerticalScrollIndicator={false}
            >
                {!isUnlocked ? (
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
