import { AppText as Text } from '@/components/app-text';
import { scale, verticalScale } from '@/constants/scaling';
import { Fonts } from '@/constants/theme';
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
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
                    resizeMode="contain"
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        // 358px x 333px
        width: '100%',
        height: verticalScale(333),
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#EAECF0',
        borderRadius: 16,
        // padding: 21px 23px
        paddingTop: verticalScale(21),
        paddingHorizontal: scale(23),
        alignSelf: 'center',
    },
    content: {
        // Width 312px (358 - 23*2)
        width: scale(312),
        height: verticalScale(297.69),
        gap: verticalScale(10), // Gap 10-11px
        alignItems: 'center',
    },
    title: {
        // 312px x 48px
        width: scale(312),
        textAlign: 'center',
        fontFamily: Fonts.medium, // 500
        fontSize: scale(20),
        lineHeight: scale(24), // 120%
        color: '#20201E',
    },
    illustration: {
        // css says 348px width, but container content box is 312px.
        // The image likely needs to scale down to fit, or scale is slightly different.
        // We'll set it to 100% of available width to ensure it fits the padding.
        // Figma often gives unconstrained width if the layer extends.
        width: '100%',
        height: verticalScale(238.69),
    },
});
