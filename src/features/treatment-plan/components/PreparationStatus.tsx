import { AppText as Text } from '@/components/app-text';
import { scale, verticalScale } from '@/constants/scaling';
import { Fonts } from '@/constants/theme';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Image } from 'expo-image';
import { t } from "@/i18n";

export function PreparationStatus() {
    return (
        <View style={styles.container}>
            {/* Content Wrapper */}
            <View style={styles.content}>

                {/* Status Text */}
                <Text style={styles.title}>
                    {t("treatmentPlan.preparation.title")}
                </Text>

                {/* Illustration */}
                <Image
                    source={require('@/assets/images/preparation-man.png')}
                    style={styles.illustration}
                    contentFit="contain"
                    cachePolicy="memory-disk"
                    transition={200}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: verticalScale(333),
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#EAECF0',
        borderRadius: 16,
        paddingTop: verticalScale(21),
        paddingHorizontal: scale(23),
        alignSelf: 'center',
    },
    content: {
        width: scale(312),
        height: verticalScale(297.69),
        gap: verticalScale(10),
        alignItems: 'center',
    },
    title: {
        width: scale(312),
        textAlign: 'center',
        fontFamily: Fonts.medium,
        fontSize: scale(20),
        lineHeight: scale(24),
        color: '#20201E',
    },
    illustration: {
        width: '100%',
        height: verticalScale(238.69),
    },
});
