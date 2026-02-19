import { router } from "expo-router";
import { useEffect, useRef } from "react";
import {
    Animated,
    Platform,
    ScrollView,
    StyleSheet,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AppText as Text } from "@/components/app-text";
import { BackButton } from "@/components/back-button";
import { ThemedView } from "@/components/themed-view";
import { PrimaryButton } from "@/components/primary-button";
import {
    moderateScale,
    scale,
    scaledRadius,
    touchTarget,
    verticalScale,
} from "@/constants/scaling";
import { AeonikFonts, BorderRadius, Colors, Fonts } from "@/constants/theme";
import { AppTextStyle } from "@/constants/typography";
import { SuccessIllustrationIcon } from "@/components/icons/success-illustration-icon";
import { t } from "@/i18n";

export default function PrecriptionDownLoadScreen() {
    const scaleAnim = useRef(new Animated.Value(0)).current;
    const opacityAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Start the popup animation
        Animated.parallel([
            Animated.spring(scaleAnim, {
                toValue: 1,
                tension: 50,
                friction: 7,
                useNativeDriver: true,
            }),
            Animated.timing(opacityAnim, {
                toValue: 1,
                duration: 400,
                useNativeDriver: true,
            }),
        ]).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSubmit = () => {
        router.push("/select-lab-test");
    };

    return (
        <ThemedView style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                {/* Back Button */}
                <BackButton style={styles.backButton} />

                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Header */}
                    <View style={styles.header}>
                        <Animated.View
                            style={{
                                alignSelf: "center",
                                marginBottom: verticalScale(24),
                                marginTop: verticalScale(5),
                                transform: [{ scale: scaleAnim }],
                                opacity: opacityAnim,
                            }}
                        >
                            <SuccessIllustrationIcon />
                        </Animated.View>
                        <Text style={styles.title}>{t("labTest.prescription.title")}</Text>
                        <Text style={styles.subtitle}>{t("labTest.prescription.subtitle")}</Text>
                    </View>

                    <View style={styles.bottomContainer}>
                        <PrimaryButton
                            onPress={handleSubmit}
                            title={t("labTest.prescription.downloadButton")}
                        />
                    </View>
                </ScrollView>
            </SafeAreaView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    safeArea: {
        flex: 1,
    },
    backButton: {
        marginLeft: scale(16),
    },
    scrollView: {
        padding: scale(16),
        // flex: 1,
    },
    scrollContent: {
        backgroundColor: Colors.light.white,
        paddingHorizontal: scale(16),
        borderRadius: BorderRadius.lg,
        paddingTop: verticalScale(16),
        paddingBottom: verticalScale(24),
    },
    header: {
        textAlign: "center",
        marginBottom: verticalScale(20),
    },
    title: {
        ...AppTextStyle.headline4,
        color: Colors.light.text,
        textAlign: "center",
        fontFamily: AeonikFonts.medium,
        marginBottom: verticalScale(12),
    },
    subtitle: {
        ...AppTextStyle.bodyText1,
        fontFamily: AeonikFonts.regular,
        textAlign: "center",
        opacity: 0.7,
        color: Colors.light.mainDarkColor,
        lineHeight: moderateScale(22),
    },
    // Upload Zone
    uploadZone: {
        borderWidth: 1.2,
        borderColor: Colors.light.lightGrey300,
        borderStyle: "dashed",
        borderRadius: BorderRadius.lg,
        paddingVertical: verticalScale(40),
        paddingHorizontal: scale(24),
        alignItems: "center",
        backgroundColor: Colors.light.scaffold,
        marginBottom: verticalScale(16),
    },
    uploadIconContainer: {
        marginBottom: verticalScale(16),
    },
    uploadText: {
        ...AppTextStyle.bodyText1,
        color: Colors.light.mainDarkColor,
        fontFamily: AeonikFonts.regular,
        marginBottom: verticalScale(10),
    },
    browseText: {
        ...AppTextStyle.labelMedium,
        fontFamily: AeonikFonts.medium,
        color: Colors.light.text,
        borderBottomWidth: 1,
        borderBottomColor: Colors.light.text,
        paddingBottom: 1,
    },
    // File List
    fileList: {
        gap: scale(8),
    },
    fileItem: {
        backgroundColor: Colors.light.white,
        borderRadius: BorderRadius.md,
        padding: scale(16),
        borderColor: Colors.light.grey200,
        borderWidth: 1,
    },
    fileInfo: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginBottom: verticalScale(12),
    },
    pdfIconContainer: {
        marginRight: scale(12),
    },
    fileDetails: {
        flex: 1,
    },
    fileName: {
        ...AppTextStyle.bodyText1,
        fontFamily: AeonikFonts.regular,
        color: Colors.light.text,
        marginBottom: verticalScale(2),
    },
    fileSize: {
        ...AppTextStyle.bodyText2,
        color: Colors.light.grey500,
    },
    checkmarkContainer: {
        borderRadius: BorderRadius.md,
        backgroundColor: Colors.light.successLight,
        alignItems: "center",
        justifyContent: "center",
    },
    deleteButton: {
        alignItems: "center",
        justifyContent: "center",
        minWidth: touchTarget(20),
        minHeight: touchTarget(20),
    },
    // Progress Bar
    progressContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: scale(12),
    },
    progressBarBackground: {
        flex: 1,
        height: verticalScale(6),
        backgroundColor: Colors.light.grey200,
        borderRadius: scaledRadius(3),
        overflow: "hidden",
    },
    progressBarFill: {
        height: "100%",
        borderRadius: scaledRadius(3),
    },
    progressText: {
        ...AppTextStyle.bodyText2,
        fontFamily: Fonts.medium,
        color: Colors.light.grey500,
        minWidth: scale(36),
        textAlign: "right",
        ...Platform.select({
            android: { includeFontPadding: false },
        }),
    },
    // Bottom Container
    bottomContainer: {
        paddingTop: verticalScale(16),
    },
});
