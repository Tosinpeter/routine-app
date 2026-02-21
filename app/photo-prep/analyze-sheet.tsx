import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { AppTextStyle } from '@/constants/typography'
import { AeonikFonts, Colors } from '@/constants/theme'
import { scale } from '@/constants/scaling'
import { Loader } from '@/components/loader'
import { router, useLocalSearchParams } from 'expo-router'
import { PreviewParams } from './preview'

export default function AnalyzeSheet() {
    const { frontUri, leftUri, rightUri } = useLocalSearchParams<PreviewParams>();

    useEffect(() => {
        // Auto-hide after 2 seconds
        const timer = setTimeout(() => {
            router.replace({
                pathname: "/photo-prep/scan-result" as any,
                params: { frontUri, leftUri, rightUri },
            });
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <View style={styles.content}>
            <View style={styles.loadingContainer}>
                <Loader image={require("@/assets/images/AnalyzeLoaderIndicator.png")} size={70} />
            </View>
            <Text style={styles.title}>Just a sec...</Text>
            <Text style={styles.subTitle}>Analyzing pigmentation patterns...</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    content: {
        textAlign: 'center',
        padding: scale(32),
        backgroundColor: Colors.light.white,
    },
    title: {
        ...AppTextStyle.subtitle1,
        textAlign: 'center',
        fontFamily: AeonikFonts.medium,
    },
    subTitle: {
        ...AppTextStyle.bodyText2,
        marginTop: scale(10),
        textAlign: 'center',
        fontFamily: AeonikFonts.regular,
    },
    loadingContainer: {
        alignItems: "center",
        justifyContent: "center",
        marginBottom: scale(24),
    },
})