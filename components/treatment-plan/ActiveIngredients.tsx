import { AppText as Text } from '@/components/app-text';
import { scale, verticalScale } from '@/constants/scaling';
import { Fonts } from '@/constants/theme';
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

const ingredients = [
    'Tretinoin',
    'Clindamycin',
    'Azelaic acid',
];

export function ActiveIngredients() {
    return (
        <View style={styles.card}>
            <View style={styles.list}>
                {ingredients.map((item, index) => (
                    <View key={index} style={styles.item}>
                        <View style={styles.iconCircle}>
                            <Image
                                source={require('@/assets/images/img_anua.png')}
                                style={styles.icon}
                                resizeMode="contain"
                            />
                        </View>
                        <Text style={styles.label}>{item}</Text>
                    </View>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        width: '100%',
        // maxWidth removed to fill container (which has 16px padding)
        backgroundColor: '#7B988A', // From Figma CSS
        borderRadius: scale(16),
        paddingVertical: verticalScale(75),
        paddingHorizontal: scale(44), // From Figma "padding: 24px 44px"
        alignItems: 'center',
        justifyContent: 'center',
    },
    list: {
        width: '80%',
        gap: verticalScale(12),
        alignItems: 'center', // Center the items in the card
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 4,
        paddingRight: 20, // Extra padding on right for text balance
        gap: 12,
        backgroundColor: 'rgba(255, 255, 255, 0.24)',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.08)',
        borderRadius: 100,
        width: '100%', // Take full width of the container (which has padding)
        maxWidth: scale(260), // Cap width for aesthetics
    },
    iconCircle: {
        width: scale(32),
        height: scale(32),
        borderRadius: 16,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        width: 20,
        height: 20,
    },
    label: {
        fontFamily: Fonts.medium,
        fontSize: scale(16),
        color: '#FFFFFF',
        lineHeight: scale(19),
    },
});
