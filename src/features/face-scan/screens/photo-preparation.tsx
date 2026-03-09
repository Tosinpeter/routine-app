import { AppText as Text } from "@/components/app-text";
import { ArrowRightIcon, CameraPlusIcon, GalleryIcon } from "@/components/icons";
import { PrimaryButton } from "@/components/primary-button";
import { ThemedView } from "@/components/themed-view";
import { moderateScale, scale, verticalScale } from "@/constants/scaling";
import { AeonikFonts, BorderRadius, Colors } from "@/constants/theme";
import { AppTextStyle } from "@/constants/typography";
import { t } from "@/i18n";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
    Alert,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    View,
} from "react-native";
import PagerView from "react-native-pager-view";
import Animated, {
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import type { FaceView } from "../types";

const SCREEN_WIDTH = Dimensions.get("window").width;

interface PreparationTip {
    id: string;
    title: string;
    image: any;
}

const _preparationTips: PreparationTip[] = [
    {
        id: "1",
        title: t("photoPrep.tips.tip1"),
        image: require("@/assets/images/tips-image1.png"),
    },
    {
        id: "2",
        title: t("photoPrep.tips.tip2RemoveGlass"),
        image: require("@/assets/images/tips-image2.png"),
    },
    {
        id: "3",
        title: t("photoPrep.tips.tip3"),
        image: require("@/assets/images/tips-image3.png"),
    },
    {
        id: "4",
        title: t("photoPrep.tips.tip4"),
        image: require("@/assets/images/tips-image4.png"),
    },
];

const DOT_SIZE = scale(8);
const ACTIVE_DOT_WIDTH = scale(24);
const DOT_COLOR_INACTIVE = Colors.light.whiteAlpha30;
const DOT_COLOR_ACTIVE = Colors.light.tint;
const TIMING_CONFIG = { duration: 300 };

function LocalAnimatedDot({ index, currentIndex }: { index: number; currentIndex: number }) {
    const isActive = index === currentIndex;

    const animatedStyle = useAnimatedStyle(() => ({
        width: withTiming(isActive ? ACTIVE_DOT_WIDTH : DOT_SIZE, TIMING_CONFIG),
        backgroundColor: withTiming(isActive ? DOT_COLOR_ACTIVE : DOT_COLOR_INACTIVE, TIMING_CONFIG),
    }));

    return <Animated.View style={[styles.paginationDot, animatedStyle]} />;
}

const getStepLabels = (): Record<FaceView, string> => ({
    front: t("photoPrep.views.front"),
    left: t("photoPrep.views.left"),
    right: t("photoPrep.views.right"),
});

const HERO_DURATION_MS = 420;

export default function PhotoPreparationScreen() {
    const [_currentIndex, setCurrentIndex] = useState(0);
    const _pagerRef = useRef<PagerView>(null);
    const [showTips, setShowTips] = useState(false);
    const router = useRouter();
    const heroProgress = useSharedValue(0);

    useEffect(() => {
        heroProgress.value = withTiming(showTips ? 1 : 0, {
            duration: HERO_DURATION_MS,
        });
    }, [showTips, heroProgress]);

    const instructionHeroStyle = useAnimatedStyle(() => ({
        opacity: interpolate(heroProgress.value, [0, 1], [1, 0]),
        transform: [
            { scale: interpolate(heroProgress.value, [0, 1], [1, 0.92]) },
        ],
    }));

    const tipsHeroStyle = useAnimatedStyle(() => ({
        opacity: interpolate(heroProgress.value, [0, 1], [0, 1]),
        transform: [
            { scale: interpolate(heroProgress.value, [0, 1], [0.92, 1]) },
        ],
    }));

    const [frontUri, setFrontUri] = useState<string | null>(null);
    const [leftUri, setLeftUri] = useState<string | null>(null);
    const [rightUri, setRightUri] = useState<string | null>(null);
    const slotToFillRef = useRef<FaceView | null>(null);

    const getNextSlotToFill = useCallback((): FaceView | null => {
        if (!frontUri) return "front";
        if (!leftUri) return "left";
        if (!rightUri) return "right";
        return null;
    }, [frontUri, leftUri, rightUri]);

    const currentStep = getNextSlotToFill();
    const stepNumber = currentStep === "front" ? 1 : currentStep === "left" ? 2 : currentStep === "right" ? 3 : 3;
    const allViewsFilled = frontUri != null && leftUri != null && rightUri != null;
    const stepLabels = getStepLabels();

    const setUriForSlot = useCallback((slot: FaceView, uri: string | null) => {
        if (slot === "front") setFrontUri(uri);
        else if (slot === "left") setLeftUri(uri);
        else setRightUri(uri);
    }, []);

    const handleImageResult = useCallback((uri: string) => {
        const slot = slotToFillRef.current;
        if (slot) {
            setUriForSlot(slot, uri);
            slotToFillRef.current = null;
        }
    }, [setUriForSlot]);

    const handleTakePhoto = useCallback(async () => {
        const slot = getNextSlotToFill();
        if (!slot) return;
        try {
            const { status } = await ImagePicker.requestCameraPermissionsAsync();
            if (status !== "granted") {
                Alert.alert(t("common.error"), t("notificationSheet.error.permissionDenied"));
                return;
            }
            slotToFillRef.current = slot;
            const result = await ImagePicker.launchCameraAsync({
                mediaTypes: ["images"],
                allowsEditing: true,
                aspect: [3, 4],
                quality: 0.8,
                cameraType: ImagePicker.CameraType.front,
            });
            if (!result.canceled && result.assets[0]) {
                handleImageResult(result.assets[0].uri);
            } else {
                slotToFillRef.current = null;
            }
        } catch (err) {
            slotToFillRef.current = null;
            const message = err instanceof Error ? err.message : String(err);
            Alert.alert(
                t("common.error"),
                message.includes("camera") || message.includes("Camera")
                    ? t("notificationSheet.error.permissionDenied")
                    : message
            );
        }
    }, [getNextSlotToFill, handleImageResult]);

    const handleUploadFromDevice = useCallback(async () => {
        const slot = getNextSlotToFill();
        if (!slot) return;
        slotToFillRef.current = slot;
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images"],
            allowsEditing: true,
            aspect: [3, 4],
            quality: 0.8,
        });
        if (!result.canceled && result.assets[0]) {
            handleImageResult(result.assets[0].uri);
        } else {
            slotToFillRef.current = null;
        }
    }, [getNextSlotToFill, handleImageResult]);

    const handleContinue = useCallback(() => {
        if (!allViewsFilled) return;
        router.push({
            pathname: "/face-scan/preview" as any,
            params: { frontUri, leftUri, rightUri },
        });
    }, [router, allViewsFilled, frontUri, leftUri, rightUri]);

    return (
        <ThemedView style={styles.container}>
            {/* Tips Carousel */}

            <SafeAreaView style={{ flex: 1, justifyContent: 'space-between' }} edges={["top", "bottom"]}>
                <View style={styles.heroSlot}>
                    <Animated.View
                        style={[styles.heroLayer, styles.instructionLayer, instructionHeroStyle]}
                        pointerEvents={showTips ? "none" : "auto"}
                    >
                        <View style={styles.instructionCard}>
                            <Image
                                source={require("@/assets/images/InstructionImage.webp")}
                                style={styles.instructionImage}
                                contentFit="cover"
                                cachePolicy="memory-disk"
                            />
                            <View style={styles.helpContainer}>
                                <Text style={styles.helpText}>{t("photoPrep.helpPhoto")}</Text>
                                <TouchableOpacity onPress={() => setShowTips(true)} style={styles.helpBtn}>
                                    <ArrowRightIcon size={36} color={Colors.light.black} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Animated.View>

                    <Animated.View
                        style={[styles.heroLayer, styles.tipsLayer, tipsHeroStyle]}
                        pointerEvents={showTips ? "auto" : "none"}
                    >
                        <View style={styles.carouselWrapper}>
                            <View style={styles.tipCard}>
                                <PagerView
                                    ref={_pagerRef}
                                    style={styles.pagerView}
                                    initialPage={0}
                                    onPageSelected={(e) => setCurrentIndex(e.nativeEvent.position)}
                                >
                                    {_preparationTips.map((item) => (
                                        <View key={item.id} style={styles.page} collapsable={false}>
                                            <Image
                                                source={item.image}
                                                style={styles.tipImage}
                                                contentPosition={'center'}
                                                contentFit="cover"
                                                cachePolicy="memory-disk"
                                            />
                                        </View>
                                    ))}
                                </PagerView>
                                <View style={styles.tipBadge}>
                                    <Text style={styles.tipBadgeText}>Tip {(_currentIndex + 1)}/4</Text>
                                </View>
                                <View style={styles.tipsOverlay}>
                                    <Text style={styles.overlayText}>
                                        {_preparationTips[_currentIndex].title}
                                    </Text>
                                    <View style={styles.paginationContainer}>
                                        {_preparationTips.map((_, index) => (
                                            <LocalAnimatedDot key={index} index={index} currentIndex={_currentIndex} />
                                        ))}
                                    </View>
                                </View>
                            </View>
                        </View>
                    </Animated.View>
                </View>

                    <>
                        <Text style={styles.captureOptionText}>
                            {allViewsFilled
                                ? t("photoPrep.allSetContinue")
                                : `Step ${stepNumber} of 3: ${currentStep ? stepLabels[currentStep] : ""}`}
                        </Text>
                        <View style={styles.buttonContainer}>
                            {!allViewsFilled && (
                                <>
                                    <PrimaryButton
                                        title={t("photoPrep.takePhoto")}
                                        onPress={handleTakePhoto}
                                        style={styles.primaryButton}
                                        icon={<CameraPlusIcon width={20} height={20} color={Colors.light.white} />}
                                        iconPosition="left"
                                    />
                                    <PrimaryButton
                                        title={t("photoPrep.uploadFromDevice")}
                                        onPress={handleUploadFromDevice}
                                        style={styles.primaryButton}
                                        icon={<GalleryIcon width={20} height={20} color={Colors.light.white} />}
                                        iconPosition="left"
                                    />
                                </>
                            )}
                            {allViewsFilled && (
                                <PrimaryButton
                                    title={t("common.continue")}
                                    onPress={handleContinue}
                                    style={styles.primaryButton}
                                    icon={<ArrowRightIcon size={20} color={Colors.light.white} />}
                                    iconPosition="right"
                                />
                            )}
                        </View>
                    </>
             
                <StatusBar style={'light'} />
            </SafeAreaView>

        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: scale(15),
        backgroundColor: Colors.light.mainDarkColor,
    },
    heroSlot: {
        flex: 1,
        marginVertical: verticalScale(24),
        position: "relative",
    },
    heroLayer: {
        ...StyleSheet.absoluteFillObject,
    },
    instructionLayer: {
        justifyContent: "flex-start",
    },
    tipsLayer: {},
    carouselWrapper: {
        flex: 1,
    },
    tipsOverlay: {
        position: 'absolute',
        bottom: 0,
        start: 0,
        end: 0,
    },
    overlayText: {
        ...AppTextStyle.headline1, 
        paddingHorizontal: scale(20),
        fontFamily: AeonikFonts.bold,
        textAlign: 'center'
    },
    tipCard: {
        flex: 1,
        backgroundColor: "white",
        borderRadius: scale(20),
        overflow: "hidden",
    },
    pagerView: {
        flex: 1,
    },
    page: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    tipBadge: {
        position: 'absolute',
        start: 24,
        top: 24,
        backgroundColor: Colors.light.white,
        paddingHorizontal: scale(16),
        paddingVertical: verticalScale(8),
        borderRadius: scale(8),
        marginBottom: verticalScale(24),
        alignSelf: "flex-start",
    },
    tipBadgeText: {
        fontSize: moderateScale(14),
        fontFamily: AeonikFonts.medium,
        color: Colors.light.text,
    },
    imageContainer: {
        width: SCREEN_WIDTH - scale(40),
        height: verticalScale(480),
        borderRadius: BorderRadius.xxl,
        overflow: "hidden",
        marginBottom: verticalScale(32),
        backgroundColor: Colors.light.lightGrey,
    },
    tipImage: {
        width: "100%",
        height: "100%",
    },
    helpText: {
        ...AppTextStyle.subtitle2,
        fontFamily: AeonikFonts.regular,
        color: Colors.light.white,
    },
    helpContainer: {
        paddingVertical: verticalScale(18)
    },
    instructionCard: {
        marginTop: verticalScale(24),
        flexDirection: 'row',
        backgroundColor: Colors.light.scaffoldAlpha08,
        padding: scale(8),
        borderRadius: scale(12),
    },
    instructionImage: {
        height: scale(108),
        width: scale(100),
        marginEnd: scale(20),
    },
    tipTitle: {
        fontSize: moderateScale(28),
        fontFamily: AeonikFonts.bold,
        color: Colors.light.white,
        textAlign: "center",
        marginBottom: verticalScale(32),
        paddingHorizontal: scale(20),
        lineHeight: moderateScale(36),
    },
    paginationContainer: {
      
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: scale(8),
        paddingVertical: verticalScale(24),
    },
    helpBtn: {
        width: scale(66),
        height: scale(39),
        alignItems: 'center',
        paddingTop: scale(1),
        marginTop: verticalScale(16),
        borderRadius: scale(19.5),
        backgroundColor: Colors.light.tint
    },
    captureOptionText: {
        ...AppTextStyle.subtitle2,
        fontFamily: AeonikFonts.regular,
        color: Colors.light.white,
        alignSelf: "center",
        marginTop: verticalScale(8),
    },
    paginationDot: {
        height: scale(8),
        borderRadius: BorderRadius.full,
    },
    buttonContainer: {
        marginTop: verticalScale(15),
        gap: verticalScale(16),
    },
    primaryButton: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: Colors.light.whiteAlpha16,
        borderRadius: BorderRadius.full,
        paddingVertical: verticalScale(18),
        paddingHorizontal: scale(8),
    },
    secondaryButton: {
        backgroundColor: Colors.light.white,
        borderRadius: BorderRadius.xxl,
        paddingVertical: verticalScale(19),
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: scale(8),
        borderWidth: 1,
        borderColor: Colors.light.lightGrey300,
    },
    secondaryButtonText: {
        fontSize: moderateScale(16),
        fontFamily: AeonikFonts.medium,
        color: Colors.light.text,
    },
});
