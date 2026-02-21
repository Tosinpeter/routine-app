import { View, Text, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { BackButton } from '@/components/back-button'
import { scale, SCREEN_WIDTH, verticalScale } from '@/constants/scaling'
import { AppTextStyle } from '@/constants/typography'
import { AeonikFonts, BorderRadius, Colors, Shadows } from '@/constants/theme'
import { StatusBar } from 'expo-status-bar'
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated'
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from 'expo-router'
import { PrimaryButton } from '@/components/primary-button'
import { AnimatedDot, PreviewParams } from './preview'
import PagerView from 'react-native-pager-view'
import { useAppDispatch } from '@/store/hooks'
import { setUploadedImages } from '@/store/slices/photo-prep-slice'
import { setUserPhotos } from '@/store/slices/usercase-slice'


const SKIN_CONDITION_COLORS = {
    mild: Colors.light.text,
    bad: "#DC2626",
} as const;

export type SkinCondition = keyof typeof SKIN_CONDITION_COLORS;

function getSkinConditionColor(condition: SkinCondition): string {
    return SKIN_CONDITION_COLORS[condition];
}

const SUGGESTIONS = [
    "Based on your answers, your\ndark circles are mild.",
    "Try getting 7–8 hours of sleep\nto help reduce puffiness.",
    "Use a gentle eye cream with\ncaffeine or vitamin C.",
    "Stay hydrated and limit\nsalt before bed.",
    "Consider cold compresses\nin the morning.",
];

export default function ScanResult() {
    const { imageUri, frontUri, leftUri, rightUri } = useLocalSearchParams<PreviewParams>();
    const router = useRouter();
    const dispatch = useAppDispatch();
    const skinCondition: SkinCondition = "mild";
    const conditionColor = getSkinConditionColor(skinCondition);
    const [suggestionIndex, setSuggestionIndex] = useState(0);
    const [sliderPage, setSliderPage] = useState(0);
    const pagerRef = useRef<PagerView>(null);

    const imageUris = [frontUri, leftUri, rightUri];

    const handleContinue = useCallback(() => {
        const photos = {
            imageUri: imageUri ?? undefined,
            frontUri: frontUri ?? undefined,
            leftUri: leftUri ?? undefined,
            rightUri: rightUri ?? undefined,
        };
        dispatch(setUploadedImages(photos));
        dispatch(setUserPhotos(photos));
        router.replace("/quiz");
    }, [dispatch, router, imageUri, frontUri, leftUri, rightUri]);
    useEffect(() => {
        const interval = setInterval(() => {
            setSuggestionIndex((prev) => (prev + 1) % SUGGESTIONS.length);
        }, 2500);
        return () => clearInterval(interval);
    }, []);

    return (
        <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
            <KeyboardAvoidingView
                style={styles.keyboardAvoid}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={Platform.OS === "ios" ? 10 : 20} >
                {/* Header */}
                <View style={styles.header}>
                    <BackButton />
                    <View>
                        <Text style={styles.headerTitle}>Skin Concern</Text>
                    </View>

                    <View style={styles.conditionContainer}>
                        <Text style={[styles.conditionText, { color: conditionColor }]}>
                            {skinCondition.toUpperCase()}
                        </Text>
                    </View>
                </View>

                {/* Content */}
                <View style={styles.content}>
                    <Animated.View entering={FadeInUp.duration(500)} style={styles.imageWrapper}>
                        <View style={styles.imageContainer}>
                            <PagerView
                                ref={pagerRef}
                                style={styles.pagerView}
                                initialPage={0}
                                onPageSelected={(e) => setSliderPage(e.nativeEvent.position)}
                            >
                                {imageUris.map((uri, index) => (
                                    <View key={index} style={styles.pagerPage} collapsable={false}>
                                        <Image
                                            source={{ uri }}
                                            style={styles.previewImage}
                                            contentFit="cover"
                                            transition={300}
                                            cachePolicy="memory-disk"
                                        />
                                    </View>
                                ))}
                            </PagerView>
                            <View style={styles.paginationOverlay}>
                                <View style={styles.paginationContainer}>
                                    {imageUris.map((_, index) => (
                                        <AnimatedDot
                                            key={index}
                                            index={index}
                                            currentIndex={sliderPage}
                                        />
                                    ))}
                                </View>
                            </View>
                        </View>
                    </Animated.View>

                    <View style={styles.suggestionCard}>
                        <Animated.Text
                            key={suggestionIndex}
                            entering={FadeInDown.duration(300)}
                            style={styles.suggestionText}>
                            {SUGGESTIONS[suggestionIndex]}
                        </Animated.Text>
                    </View>

                    <PrimaryButton
                        title={"Continue"}
                        onPress={handleContinue}
                        iconPosition="left"
                    />
                </View>
            </KeyboardAvoidingView>
            <StatusBar style={'dark'} />
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "rgba(245, 241, 238, 1)",
    },
    keyboardAvoid: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: scale(20),
    },
    headerTitle: {
        ...AppTextStyle.headline4,
        fontFamily: AeonikFonts.medium,
        color: Colors.light.mainDarkColor,
    },
    conditionContainer: {
        paddingHorizontal: scale(16),
        backgroundColor: Colors.light.white,
        borderRadius: scale(6),
        paddingVertical: verticalScale(9),
    },
    conditionText: {
        ...AppTextStyle.subtitle2,
        fontFamily: AeonikFonts.bold
    },
    backButton: {
        width: scale(40),
        height: scale(40),
        justifyContent: "center",
    },
    content: {
        flex: 1,
        paddingHorizontal: scale(20),
        alignItems: "center",
    },
    imageWrapper: {
        width: "100%",
        alignItems: "center",
        marginTop: verticalScale(39),
    },
    imageContainer: {
        width: (SCREEN_WIDTH - 20 * 2),
        height: scale(420),
        borderRadius: BorderRadius.xl,
        overflow: "hidden",
        ...Shadows.lg,
    },
    previewImage: {
        width: "100%",
        height: "100%",
    },
    suggestionCard: {
        marginVertical: scale(36),
        flexDirection: 'row',
        padding: scale(28),
        backgroundColor: Colors.light.white,
        borderRadius: BorderRadius.md,
    }, 
    suggestionText: {
        ...AppTextStyle.subtitle2, 
        flex: 1,
        justifyContent: 'center',
        textAlign: 'center',
        fontFamily: AeonikFonts.medium,
    }, 
    pagerView: {
        flex: 1,
        width: "100%",
        height: "100%",
    },
    pagerPage: {
        flex: 1,
        width: "100%",
        height: "100%",
    },
    paginationContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: scale(8),
    },
    paginationDot: {
        height: scale(8),
        borderRadius: BorderRadius.full,
    },
    paginationOverlay: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        paddingVertical: verticalScale(24),
        alignItems: "center",
        justifyContent: "center",
    },
   
})