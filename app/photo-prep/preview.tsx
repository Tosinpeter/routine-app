import { AppText as Text } from "@/components/app-text";
import { BackButton } from "@/components/back-button";
import { CameraPlusIcon, CheckedRoundedIcon, GalleryIcon, UndoIcon } from "@/components/icons";
import { PrimaryButton } from "@/components/primary-button";
import { scale, verticalScale, moderateScale, SCREEN_WIDTH } from "@/constants/scaling";
import { AeonikFonts, BorderRadius, Colors, primaryColor, Shadows } from "@/constants/theme";
import { AppTextStyle } from "@/constants/typography";
import { t } from "@/i18n";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useCallback, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import PagerView from "react-native-pager-view";
import Animated, {
    FadeInDown,
    FadeInUp,
    useAnimatedStyle,
    withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

const DOT_SIZE = scale(8);
const ACTIVE_DOT_WIDTH = scale(24);
const DOT_COLOR_INACTIVE = "rgba(255, 255, 255, 0.3)";
const DOT_COLOR_ACTIVE = "#CF604A";
const PAGINATION_TIMING = { duration: 300 };

export function AnimatedDot({ index, currentIndex }: { index: number; currentIndex: number }) {
    const isActive = index === currentIndex;
    const animatedStyle = useAnimatedStyle(() => ({
        width: withTiming(isActive ? ACTIVE_DOT_WIDTH : DOT_SIZE, PAGINATION_TIMING),
        backgroundColor: withTiming(
            isActive ? DOT_COLOR_ACTIVE : DOT_COLOR_INACTIVE,
            PAGINATION_TIMING
        ),
    }));
    return <Animated.View style={[styles.paginationDot, animatedStyle]} />;
}

export type PreviewParams = {
    imageUri?: string;
    frontUri?: string;
    leftUri?: string;
    rightUri?: string;
};

export default function PhotoPreviewScreen() {
    const { imageUri, frontUri, leftUri, rightUri } = useLocalSearchParams<PreviewParams>();
    const router = useRouter();
    const [sliderPage, setSliderPage] = useState(0);
    const pagerRef = useRef<PagerView>(null);

    const imageUris = [frontUri, leftUri, rightUri];

    const handleRetake = useCallback(() => {
        router.back();
    }, [router]);

    const handleContinue = useCallback(() => {
        router.push({
            pathname: "/photo-prep/analyze-sheet" as any,
            params: { frontUri, leftUri, rightUri },
        });
    }, [router, frontUri, leftUri, rightUri, imageUri]);

    return (
        <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
            {/* Image Preview */}
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

                {/* Subtitle */}
                <Animated.View entering={FadeInDown.delay(200).duration(400)}>
                    <Text style={styles.subtitle}>{"Well done"}</Text>
                </Animated.View>
            </View>

            {/* Action Buttons */}
            <Animated.View entering={FadeInDown.delay(400).duration(400)} style={styles.buttonContainer}>
                <PrimaryButton
                    title={"Retake"}
                    onPress={handleRetake}
                    style={styles.primaryButton}
                    icon={<UndoIcon height={20} width={20} color="#fff" />}
                    iconPosition="left"
                />
                <PrimaryButton
                    title={"Send"}
                    onPress={handleContinue}
                    style={{ ...styles.primaryButton, backgroundColor: primaryColor }}
                    icon={<CheckedRoundedIcon width={20} height={20} color="#fff" />}
                    iconPosition="left"
                />
            </Animated.View>
            <StatusBar style={'light'} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#20201E",
        justifyContent: 'space-between'
    },
    primaryButton: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.16)',
        borderRadius: BorderRadius.full,
        paddingVertical: verticalScale(18),
        paddingHorizontal: scale(8),
        marginTop: 0,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: scale(16),
        paddingVertical: verticalScale(8),
    },
    headerTitle: {
        ...AppTextStyle.subtitle1,
        fontFamily: AeonikFonts.medium,
        color: Colors.light.text,
    },
    headerSpacer: {
        width: scale(40),
    },
    content: {
        flex: 1,
        paddingHorizontal: scale(20),
        alignItems: "center",
    },
    imageWrapper: {
        width: "100%",
        alignItems: "center",
        marginTop: verticalScale(52),
    },
    imageContainer: {
        width: SCREEN_WIDTH - 20 * 2,
        height: scale(500),
        borderRadius: BorderRadius.xl,
        overflow: "hidden",
        ...Shadows.lg,
        position: "relative",
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
    previewImage: {
        width: "100%",
        height: "100%",
    },

    subtitle: {
        ...AppTextStyle.subtitle2,
        fontFamily: AeonikFonts.medium,
        color: "rgba(255, 255, 255, 1)",
        textAlign: "center",
        marginTop: verticalScale(24),
        paddingHorizontal: scale(20),
    },
    guidelinesCard: {
        width: "100%",
        backgroundColor: Colors.light.white,
        borderRadius: BorderRadius.lg,
        padding: scale(16),
        marginTop: verticalScale(20),
        ...Shadows.sm,
    },
    guidelinesTitle: {
        ...AppTextStyle.subtitle3,
        fontFamily: AeonikFonts.medium,
        color: Colors.light.text,
        marginBottom: verticalScale(12),
    },
    guidelinesRow: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    guidelineItem: {
        alignItems: "center",
        gap: verticalScale(6),
        flex: 1,
    },
    guidelineIcon: {
        width: scale(36),
        height: scale(36),
        borderRadius: scale(18),
        backgroundColor: "rgba(207, 96, 74, 0.1)",
        justifyContent: "center",
        alignItems: "center",
    },
    guidelineText: {
        fontSize: moderateScale(12),
        fontFamily: AeonikFonts.medium,
        color: Colors.light.grey700,
        textAlign: "center",
    },
    buttonContainer: {
        paddingHorizontal: scale(20),
        paddingBottom: verticalScale(8),
        gap: verticalScale(12),
    },
    secondaryRow: {
        flexDirection: "row",
        gap: scale(12),
    },
    secondaryButton: {
        flex: 1,
        backgroundColor: Colors.light.white,
        borderWidth: 1,
        borderColor: Colors.light.grey200,
        borderRadius: BorderRadius.xxl,
        marginTop: 0,
    },
    secondaryButtonText: {
        color: Colors.light.text,
        fontSize: moderateScale(14),
    },
    emptyState: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    emptyText: {
        ...AppTextStyle.subtitle2,
        color: Colors.light.grey500,
    },
});
