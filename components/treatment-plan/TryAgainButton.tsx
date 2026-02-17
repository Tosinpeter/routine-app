import { AppText as Text } from '@/components/app-text';
import { scale, verticalScale } from '@/constants/scaling';
import { Fonts } from '@/constants/theme';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

export function TryAgainButton() {
    return (
        <TouchableOpacity style={styles.button} activeOpacity={0.8}>
            <Text style={styles.text}>Try again</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        width: '100%',
        height: verticalScale(56),
        backgroundColor: '#CF604A',
        borderRadius: 100, // Pill shape
        marginBottom: scale(50),
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    text: {
        fontFamily: Fonts.medium,
        fontSize: scale(18),
        lineHeight: scale(24),
        color: '#FFFFFF',
    },
});
