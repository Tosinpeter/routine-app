import { AppText as Text } from '@/components/app-text';
import { scale, verticalScale } from '@/constants/scaling';
import { Fonts, Colors } from '@/constants/theme';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Image } from 'expo-image';
import { t } from "@/i18n";

function getIngredients() {
    return [
        t("treatmentPlan.activeIngredients.tretinoin"),
        t("treatmentPlan.activeIngredients.clindamycin"),
        t("treatmentPlan.activeIngredients.azelaicAcid"),
    ];
}

export function ActiveIngredients() {
    return (
        <View style={styles.card}>
            <View style={styles.list}>
                {getIngredients().map((item, index) => (
                    <View key={index} style={styles.item}>
                        <View style={styles.iconCircle}>
                            <Image
                                source={require('@/assets/images/img_anua.png')}
                                style={styles.icon}
                                contentFit="contain"
                                cachePolicy="memory-disk"
                                transition={150}
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
        backgroundColor: Colors.light.sage,
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
        paddingEnd: 20, // Extra padding for text balance (RTL-aware)
        gap: 12,
        backgroundColor: Colors.light.whiteAlpha24,
        borderWidth: 1,
        borderColor: Colors.light.whiteAlpha08,
        borderRadius: 100,
        width: '100%', // Take full width of the container (which has padding)
        maxWidth: scale(260), // Cap width for aesthetics
    },
    iconCircle: {
        width: scale(32),
        height: scale(32),
        borderRadius: 16,
        backgroundColor: Colors.light.white,
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
        color: Colors.light.white,
        lineHeight: scale(19),
    },
});
