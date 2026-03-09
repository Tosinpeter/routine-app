import { PrimaryButton } from "@/components/primary-button";
import { moderateScale, scale, verticalScale } from "@/constants/scaling";
import { AeonikFonts, Colors } from "@/constants/theme";
import { AppTextStyle } from "@/constants/typography";
import { t } from "@/i18n";
import { useOnboarding } from "@/features/onboarding/hooks/useOnboarding";
import { Image as ExpoImage } from "expo-image";
import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import {
    Dimensions,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ViewToken,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { getOnboardingSlides ,OnboardingModel } from "../models/onboarding-model";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function OnboardingScreen() {
    const router = useRouter();
    const { setOnboardingCompleted } = useOnboarding();
    const [currentIndex, setCurrentIndex] = useState(0);
    const flatListRef = useRef<FlatList<OnboardingModel>>(null);
    const insets = useSafeAreaInsets();

    const handleGetStarted = async () => {
        await setOnboardingCompleted();
        router.replace("/auth/phone-verification");
    };

    const handleSkip = () => {
        handleGetStarted();
    };


    const onboardingSlides = getOnboardingSlides();

    const _handleNext = () => {
        if (currentIndex < onboardingSlides.length - 1) {
            flatListRef.current?.scrollToIndex({
                index: currentIndex + 1,
                animated: true,
            });
        } else {
            handleGetStarted();
        }
    };

    const onViewableItemsChanged = useRef(
        ({ viewableItems }: { viewableItems: ViewToken[] }) => {
            if (viewableItems.length > 0 && viewableItems[0].index !== null) {
                setCurrentIndex(viewableItems[0].index);
            }
        }
    ).current;

    const viewabilityConfig = useRef({
        itemVisiblePercentThreshold: 50,
    }).current;

    const renderItem = ({ item }: { item: OnboardingModel }) => (
        <View style={styles.slide}>
            {/* Title */}
            <Text style={styles.title}>{item.title}</Text>


            {/* Text Content */}
            <View style={styles.textContainer}>
                <Text style={styles.subtitle}>{item.subtitle}</Text>
                <Text style={styles.description}>{item.description}</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <ExpoImage
                source={onboardingSlides[currentIndex].image}
                style={styles.backgroundImage}
                contentFit="cover"
                cachePolicy="memory-disk"
                transition={300}
            />
            <View style={[styles.content, { paddingTop: insets.top + verticalScale(10), paddingBottom: insets.bottom + verticalScale(10) }]}>
                {/* Skip Button */}
                {currentIndex < onboardingSlides.length - 1 && (
                    <TouchableOpacity
                        style={styles.skipButton}
                        onPress={handleSkip}
                        activeOpacity={0.7}
                    >
                        <Text style={styles.skipText}>{t("onboarding.skip")}</Text>
                    </TouchableOpacity>
                )}

                {/* Swipeable Slides */}
                <FlatList
                    ref={flatListRef}
                    data={onboardingSlides}
                    renderItem={renderItem}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item.id.toString()}
                    onViewableItemsChanged={onViewableItemsChanged}
                    viewabilityConfig={viewabilityConfig}
                    bounces={false}
                    style={styles.flatList}
                />

                {/* Pagination Dots */}
                <View style={styles.paginationContainer}>
                    {onboardingSlides.map((_: OnboardingModel, index: number) => (
                        <View
                            key={index}
                            style={[
                                styles.dot,
                                index === currentIndex ? styles.activeDot : styles.inactiveDot,
                            ]}
                        />
                    ))}
                </View>

                {/* Get Started Button */}
                <View style={{
                    paddingHorizontal: scale(20)
                }}>

                    <PrimaryButton
                        title={currentIndex === onboardingSlides.length - 1
                            ? t("onboarding.getStarted")
                            : t("onboarding.next")}
                        onPress={_handleNext}
                        withShadow
                    />

                </View>

            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        ...StyleSheet.absoluteFillObject,
        width: "100%",
        height: "100%",
    },
    content: {
        flex: 1,
    },
    skipButton: {
        position: "absolute",
        top: verticalScale(10),
        end: scale(20),
        paddingVertical: verticalScale(8),
        paddingHorizontal: scale(16),
        zIndex: 10,
    },
    skipText: {
        ...AppTextStyle.bodyText1,
        fontSize: moderateScale(16),
        color: Colors.light.grey500,
        fontWeight: "500",
    },
    flatList: {
        flex: 1,
    },
    slide: {
        width: SCREEN_WIDTH,
        justifyContent: 'space-between',
        paddingHorizontal: scale(20),
    },
    title: {
        ...AppTextStyle.headline4,
        textAlign: "center",
        marginTop: scale(50),
        fontFamily: AeonikFonts.bold,
        color: Colors.light.mainDarkColor,
        marginBottom: verticalScale(40),
    },
    imageContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginBottom: verticalScale(32),
        height: SCREEN_HEIGHT * 0.45,
    },
    image: {
        width: SCREEN_WIDTH * 0.85,
        height: "100%",
    },
    textContainer: {
        alignItems: "center",
        marginBottom: verticalScale(24),
    },
    subtitle: {
        ...AppTextStyle.headline1,
        fontFamily: AeonikFonts.bold,
        textAlign: "center",
        color: Colors.light.mainDarkColor,
        marginBottom: verticalScale(12),
    },
    description: {
        ...AppTextStyle.bodyText1,
        fontSize: moderateScale(16),
        textAlign: "center",
        fontFamily: AeonikFonts.regular,
        color: Colors.light.grey500,
        lineHeight: moderateScale(24),
        paddingHorizontal: scale(20),
    },
    paginationContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: verticalScale(32),
        paddingHorizontal: scale(20),
    },
    dot: {
        width: scale(8),
        height: scale(8),
        borderRadius: scale(4),
        marginHorizontal: scale(4),
    },
    activeDot: {
        backgroundColor: Colors.light.tint,
        width: scale(32),
    },
    inactiveDot: {
        backgroundColor: Colors.light.lightGrey300,
    },
    button: {
        marginHorizontal: scale(40),
    },
    buttonText: {
        ...AppTextStyle.button,
        fontSize: moderateScale(18),
        fontWeight: "600",
        color: Colors.light.white,
    },
});
