import { AppText as Text } from "@/components/app-text";
import { CheckedRoundedIcon, UndoIcon } from "@/components/icons";
import { PrimaryButton } from "@/components/primary-button";
import { scale, verticalScale, moderateScale, SCREEN_WIDTH } from "@/constants/scaling";
import { AeonikFonts, BorderRadius, Colors, primaryColor, Shadows } from "@/constants/theme";
import { AppTextStyle } from "@/constants/typography";
import { t } from "@/i18n";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useCallback, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import PagerView from "react-native-pager-view";
import Animated, {
    FadeInDown,
    FadeInUp,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { AnimatedDot } from "../components/animated-dot";
import type { PreviewParams } from "../types";

export default function PhotoPreviewScreen() {
    const { frontUri, leftUri, rightUri } = useLocalSearchParams<PreviewParams>();
    const router = useRouter();
    const [sliderPage, setSliderPage] = useState(0);
    const pagerRef = useRef<PagerView>(null);

    const imageUris = [frontUri, leftUri, rightUri];

    const handleRetake = useCallback(() => {
        router.back();
    }, [router]);

    const handleContinue = useCallback(() => {
        router.push({
            pathname: "/face-scan/analyze-sheet" as any,
            params: { frontUri, leftUri, rightUri },
        });
    }, [router, frontUri, leftUri, rightUri]);

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
                    <Text style={styles.subtitle}>{t("photoPrep.preview.wellDone")}</Text>
                </Animated.View>
            </View>

            {/* Action Buttons */}
            <Animated.View entering={FadeInDown.delay(400).duration(400)} style={styles.buttonContainer}>
                <PrimaryButton
                    title={t("photoPrep.preview.retake")}
                    onPress={handleRetake}
                    style={styles.primaryButton}
                    icon={<UndoIcon height={20} width={20} color={Colors.light.white} />}
                    iconPosition="left"
                />
                <PrimaryButton
                    title={t("photoPrep.preview.send")}
                    onPress={handleContinue}
                    style={{ ...styles.primaryButton, backgroundColor: primaryColor }}
                    icon={<CheckedRoundedIcon width={20} height={20} color={Colors.light.white} />}
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
        backgroundColor: Colors.light.mainDarkColor,
        justifyContent: 'space-between'
    },
    primaryButton: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: Colors.light.whiteAlpha16,
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
        start: 0,
        end: 0,
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
        color: Colors.light.white,
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
        backgroundColor: Colors.light.primaryAlpha10,
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
