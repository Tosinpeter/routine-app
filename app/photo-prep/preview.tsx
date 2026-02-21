import { AppText as Text } from "@/components/app-text";
import { BackButton } from "@/components/back-button";
import { CameraPlusIcon } from "@/components/icons";
import { PrimaryButton } from "@/components/primary-button";
import { scale, verticalScale, moderateScale } from "@/constants/scaling";
import { AeonikFonts, BorderRadius, Colors, Shadows } from "@/constants/theme";
import { AppTextStyle } from "@/constants/typography";
import { t } from "@/i18n";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import Animated, {
    FadeIn,
    FadeInDown,
    FadeInUp,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

function GuidelineItem({ icon, label, delay }: { icon: string; label: string; delay: number }) {
    return (
        <Animated.View entering={FadeInDown.delay(delay).duration(400)} style={styles.guidelineItem}>
            <View style={styles.guidelineIcon}>
                <Ionicons name={icon as any} size={scale(16)} color={Colors.light.tint} />
            </View>
            <Text style={styles.guidelineText}>{label}</Text>
        </Animated.View>
    );
}

export default function PhotoPreviewScreen() {
    const { imageUri } = useLocalSearchParams<{ imageUri: string }>();
    const router = useRouter();
    const [isProcessing, setIsProcessing] = useState(false);

    const handleRetake = useCallback(() => {
        router.back();
    }, [router]);

    const handleCropAgain = useCallback(async () => {
        if (!imageUri) return;

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images"],
            allowsEditing: true,
            aspect: [3, 4],
            quality: 0.8,
        });

        if (!result.canceled && result.assets[0]) {
            router.setParams({ imageUri: result.assets[0].uri });
        }
    }, [imageUri, router]);

    const handleContinue = useCallback(() => {
        setIsProcessing(true);
        setTimeout(() => {
            setIsProcessing(false);
            router.replace("/(tabs)");
        }, 1500);
    }, [router]);

    if (!imageUri) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.emptyState}>
                    <Text style={styles.emptyText}>{t("common.error")}</Text>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
            {/* Header */}
            <Animated.View entering={FadeIn.duration(300)} style={styles.header}>
                <BackButton variant="back" color={Colors.light.text} />
                <Text style={styles.headerTitle}>{t("photoPrep.preview.title")}</Text>
                <View style={styles.headerSpacer} />
            </Animated.View>

            {/* Image Preview */}
            <View style={styles.content}>
                <Animated.View entering={FadeInUp.duration(500)} style={styles.imageWrapper}>
                    <View style={styles.imageContainer}>
                        <Image
                            source={{ uri: imageUri }}
                            style={styles.previewImage}
                            contentFit="cover"
                            transition={300}
                            cachePolicy="memory-disk"
                        />

                        {/* Face guide overlay */}
                        <View style={styles.faceGuideOverlay}>
                            <View style={styles.faceGuideOval} />
                        </View>
                    </View>
                </Animated.View>

                {/* Subtitle */}
                <Animated.View entering={FadeInDown.delay(200).duration(400)}>
                    <Text style={styles.subtitle}>{t("photoPrep.preview.subtitle")}</Text>
                </Animated.View>

                {/* Guidelines */}
                <Animated.View entering={FadeInDown.delay(300).duration(400)} style={styles.guidelinesCard}>
                    <Text style={styles.guidelinesTitle}>{t("photoPrep.preview.guidelines.title")}</Text>
                    <View style={styles.guidelinesRow}>
                        <GuidelineItem icon="sunny-outline" label={t("photoPrep.preview.guidelines.lighting")} delay={400} />
                        <GuidelineItem icon="scan-outline" label={t("photoPrep.preview.guidelines.centered")} delay={500} />
                        <GuidelineItem icon="eye-outline" label={t("photoPrep.preview.guidelines.clear")} delay={600} />
                    </View>
                </Animated.View>
            </View>

            {/* Action Buttons */}
            <Animated.View entering={FadeInDown.delay(400).duration(400)} style={styles.buttonContainer}>
                <PrimaryButton
                    title={isProcessing ? t("common.loading") : t("photoPrep.preview.continue")}
                    onPress={handleContinue}
                    disabled={isProcessing}
                    icon={isProcessing ? <ActivityIndicator size="small" color="#fff" /> : undefined}
                    iconPosition="left"
                    withShadow
                />

                <View style={styles.secondaryRow}>
                    <PrimaryButton
                        title={t("photoPrep.preview.retake")}
                        onPress={handleRetake}
                        style={styles.secondaryButton}
                        textStyle={styles.secondaryButtonText}
                        icon={<CameraPlusIcon width={18} height={18} color={Colors.light.text} />}
                        iconPosition="left"
                    />
                    <PrimaryButton
                        title={t("photoPrep.preview.cropAgain")}
                        onPress={handleCropAgain}
                        style={styles.secondaryButton}
                        textStyle={styles.secondaryButtonText}
                        icon={<Ionicons name="crop-outline" size={18} color={Colors.light.text} />}
                        iconPosition="left"
                    />
                </View>
            </Animated.View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.light.scaffold,
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
        marginTop: verticalScale(8),
    },
    imageContainer: {
        width: scale(300),
        height: scale(400),
        borderRadius: BorderRadius.xl,
        overflow: "hidden",
        ...Shadows.lg,
    },
    previewImage: {
        width: "100%",
        height: "100%",
    },
    faceGuideOverlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: "center",
        alignItems: "center",
    },
    faceGuideOval: {
        width: scale(200),
        height: scale(270),
        borderRadius: scale(100),
        borderWidth: 2,
        borderColor: "rgba(207, 96, 74, 0.4)",
        borderStyle: "dashed",
    },
    subtitle: {
        ...AppTextStyle.bodyText1,
        fontFamily: AeonikFonts.regular,
        color: Colors.light.grey500,
        textAlign: "center",
        marginTop: verticalScale(16),
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
