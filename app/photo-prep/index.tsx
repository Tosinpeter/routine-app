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
import React, { useCallback, useRef, useState } from "react";
import {
    Alert,
    Dimensions,
    InteractionManager,
    Platform,
    StyleSheet,
    TouchableOpacity,
    View,
} from "react-native";
import PagerView from "react-native-pager-view";
import Animated, {
    useAnimatedStyle,
    withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

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
        title: "Remove Glass",
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
const DOT_COLOR_INACTIVE = "rgba(255, 255, 255, 0.3)";
const DOT_COLOR_ACTIVE = "#CF604A";
const TIMING_CONFIG = { duration: 300 };

function AnimatedDot({ index, currentIndex }: { index: number; currentIndex: number }) {
    const isActive = index === currentIndex;

    const animatedStyle = useAnimatedStyle(() => ({
        width: withTiming(isActive ? ACTIVE_DOT_WIDTH : DOT_SIZE, TIMING_CONFIG),
        backgroundColor: withTiming(isActive ? DOT_COLOR_ACTIVE : DOT_COLOR_INACTIVE, TIMING_CONFIG),
    }));

    return <Animated.View style={[styles.paginationDot, animatedStyle]} />;
}

export default function PhotoPreparationScreen() {
    const [_currentIndex, setCurrentIndex] = useState(0);
    const _pagerRef = useRef<PagerView>(null);
    const [showTips, setShowTips] = useState(false);
    const router = useRouter();
    const [cameraPermission, requestCameraPermission] = ImagePicker.useCameraPermissions();

    const handleImageResult = useCallback((uri: string) => {
        router.push({ pathname: "/photo-prep/preview" as any, params: { imageUri: uri } });
    }, [router]);

    const handleTakePhoto = useCallback(async () => {
        const runCamera = async () => {
            try {
                const result = await requestCameraPermission();
                const status = result?.status ?? "denied";
                if (status !== "granted") {
                    Alert.alert(t("common.error"), t("notificationSheet.error.permissionDenied"));
                    return;
                }

                const cameraResult = await ImagePicker.launchCameraAsync({
                    mediaTypes: ["images"],
                    allowsEditing: true,
                    aspect: [3, 4],
                    quality: 0.8,
                    cameraType: ImagePicker.CameraType.front,
                });

                if (!cameraResult.canceled && cameraResult.assets[0]) {
                    handleImageResult(cameraResult.assets[0].uri);
                }
            } catch (err) {
                const message = err instanceof Error ? err.message : String(err);
                Alert.alert(
                    t("common.error"),
                    message.includes("camera") || message.includes("Camera")
                        ? t("notificationSheet.error.permissionDenied")
                        : message
                );
            }
        };

        if (Platform.OS === "ios") {
            InteractionManager.runAfterInteractions(() => {
                runCamera();
            });
        } else {
            runCamera();
        }
    }, [handleImageResult, requestCameraPermission]);

    const handleUploadFromDevice = useCallback(async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images"],
            allowsEditing: true,
            aspect: [3, 4],
            quality: 0.8,
        });

        if (!result.canceled && result.assets[0]) {
            handleImageResult(result.assets[0].uri);
        }
    }, [handleImageResult]);

    return (
        <ThemedView style={styles.container}>
            {/* Tips Carousel */}

            <SafeAreaView style={{ flex: 1, justifyContent: 'space-between' }}>

                {showTips && (
                    <View style={styles.carouselWrapper}>
                        <View style={styles.tipCard}>
                            <PagerView
                                ref={_pagerRef}
                                style={styles.pagerView}
                                initialPage={0}
                                overdrag
                                onPageSelected={(e) => setCurrentIndex(e.nativeEvent.position)}
                            >
                                {_preparationTips.map((item) => (
                                    <View key={item.id} style={styles.page} collapsable={false}>
                                        <Image
                                            source={item.image}
                                            style={styles.tipImage}
                                            contentPosition={'top center'}
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
                                        <AnimatedDot key={index} index={index} currentIndex={_currentIndex} />
                                    ))}
                                </View>
                            </View>
                           
                        </View>

                        
                    </View>
                )}

                {!showTips && <View style={styles.instructionCard}>
                    <Image
                        source={require("@/assets/images/InstructionImage.webp")}
                        style={styles.instructionImage}
                        contentFit="cover"
                        cachePolicy="memory-disk"
                    />

                    <View style={styles.helpContainer}>
                        <Text style={styles.helpText}>How to take a great photo</Text>
                        <TouchableOpacity onPress={() => setShowTips(true)} style={styles.helpBtn}>
                            <ArrowRightIcon size={36} color="#000" />
                        </TouchableOpacity>
                    </View>
                </View>}

                {!showTips && <Text style={styles.captureOptionText}> Select the capture option </Text>}

                {/* Action Buttons */}
                <View style={styles.buttonContainer}>
                    <PrimaryButton
                        title={t("photoPrep.takePhoto")}
                        onPress={handleTakePhoto}
                        style={styles.primaryButton}
                        icon={<CameraPlusIcon width={20} height={20} color="#fff" />}
                        iconPosition="left"
                    />

                    <PrimaryButton
                        title={t("photoPrep.uploadFromDevice")}
                        onPress={handleUploadFromDevice}
                        style={styles.primaryButton}
                        icon={<GalleryIcon width={20} height={20} color="#fff" />}
                        iconPosition="left"
                    />
                </View>
                <StatusBar style={'light'} />
            </SafeAreaView>

        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: scale(15),
        backgroundColor: "#20201E",
    },
    carouselWrapper: {
        flex: 1,
        marginVertical: verticalScale(24),
    },
    tipsOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
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
        left: 24,
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
        backgroundColor: "rgba(237, 235, 227, 0.08)",
        padding: scale(8),
        borderRadius: scale(12),
    },
    instructionImage: {
        height: scale(108),
        width: scale(100),
        marginRight: scale(20),
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
        backgroundColor: "#CF604A"
    },
    captureOptionText: {
        ...AppTextStyle.subtitle2,
        fontFamily: AeonikFonts.regular,
        color: Colors.light.white,
        alignSelf: 'center',
    },
    paginationDot: {
        height: scale(8),
        borderRadius: BorderRadius.full,
    },
    buttonContainer: {
        gap: verticalScale(16),
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
