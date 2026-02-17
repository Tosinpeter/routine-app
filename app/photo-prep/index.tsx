import React, { useState, useRef } from "react";
import {
    StyleSheet,
    View,
    TouchableOpacity,
    FlatList,
    Dimensions,
    ViewToken,
    Platform,
} from "react-native";
import { Image } from "expo-image";
import { AppText as Text } from "@/components/app-text";
import { PrimaryButton } from "@/components/primary-button";
import { moderateScale, scale, verticalScale } from "@/constants/scaling";
import { AeonikFonts, Colors, BorderRadius, Shadows } from "@/constants/theme";
import { ThemedView } from "@/components/themed-view";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { CameraIcon, CameraPlusIcon, GalleryIcon } from "@/components/icons";

const SCREEN_WIDTH = Dimensions.get("window").width;

interface PreparationTip {
    id: string;
    tipNumber: number;
    title: string;
    image: any;
}

const preparationTips: PreparationTip[] = [
    {
        id: "1",
        tipNumber: 1,
        title: "Remove extensive make-up or mask",
        image: require("@/assets/images/skincare-tip-1.png"),
    },
    {
        id: "2",
        tipNumber: 2,
        title: "Ensure good lighting conditions",
        image: require("@/assets/images/preparation-man.png"),
    },
    {
        id: "3",
        tipNumber: 3,
        title: "Position your face in the frame",
        image: require("@/assets/images/preparation-man.png"),
    },
    {
        id: "4",
        tipNumber: 4,
        title: "Keep a neutral facial expression",
        image: require("@/assets/images/preparation-man.png"),
    },
];

export default function PhotoPreparationScreen() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const flatListRef = useRef<FlatList>(null);

    const onViewableItemsChanged = useRef(
        ({ viewableItems }: { viewableItems: ViewToken[] }) => {
            if (viewableItems.length > 0) {
                setCurrentIndex(viewableItems[0].index || 0);
            }
        }
    ).current;

    const viewabilityConfig = useRef({
        itemVisiblePercentThreshold: 50,
    }).current;

    const handleTakePhoto = () => {
        // Navigate to camera screen
        console.log("Taking photo...");
    };

    const handleUploadFromDevice = () => {
        // Navigate to image picker
        console.log("Uploading from device...");
    };

    const renderTipCard = ({ item }: { item: PreparationTip }) => (
        <View style={styles.tipCard}>
            {/* Tip Badge */}
            <View style={styles.tipBadge}>
                <Text style={styles.tipBadgeText}>Tip {item.tipNumber}/4</Text>
            </View>

            {/* Image Container */}
            {/* <View style={styles.imageContainer}>
                <Image
                    source={item.image}
                    style={styles.tipImage}
                    contentFit="cover"
                />
            </View> */}

            {/* Title */}
            {/* <Text style={styles.tipTitle}>{item.title}</Text> */}

            {/* Pagination Dots */}
            {/* <View style={styles.paginationContainer}>
                {preparationTips.map((_, index) => (
                    <View
                        key={index}
                        style={[
                            styles.paginationDot,
                            index === currentIndex && styles.paginationDotActive,
                        ]}
                    />
                ))}
            </View> */}
        </View>
    );

    return (
        <ThemedView style={styles.container}>
            {/* Tips Carousel */}
            {/* <FlatList
                ref={flatListRef}
                data={preparationTips}
                renderItem={renderTipCard}
                keyExtractor={(item) => item.id}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onViewableItemsChanged={onViewableItemsChanged}
                viewabilityConfig={viewabilityConfig}
                decelerationRate="fast"
                snapToInterval={SCREEN_WIDTH}
                snapToAlignment="center"
                contentContainerStyle={styles.carouselContainer}
            /> */}

            {/* Action Buttons */}
            <View style={styles.buttonContainer}>
                <PrimaryButton
                    title="Take a photo"
                    onPress={handleTakePhoto}
                    style={styles.primaryButton}
                    icon={<CameraPlusIcon width={20} height={20} color="#fff" />}
                    iconPosition="left"
                />

                <PrimaryButton
                    title="Upload from device"
                    onPress={handleTakePhoto}
                    style={styles.primaryButton}
                    icon={<GalleryIcon width={20} height={20} color="#fff" />}
                    iconPosition="left"
                />
            </View>
            <StatusBar style={'light'} />

        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#20201E",
    },
    carouselContainer: {
        paddingTop: verticalScale(60),
    },
    tipCard: {
        width: SCREEN_WIDTH,
        paddingHorizontal: scale(20),
        alignItems: "center",
    },
    tipBadge: {
        backgroundColor: Colors.light.white,
        paddingHorizontal: scale(16),
        paddingVertical: verticalScale(8),
        borderRadius: BorderRadius.full,
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
    },
    paginationDot: {
        width: scale(8),
        height: scale(8),
        borderRadius: BorderRadius.full,
        backgroundColor: Colors.light.grey500,
    },
    paginationDotActive: {
        width: scale(32),
        backgroundColor: Colors.light.tint,
    },
    buttonContainer: {
        paddingHorizontal: scale(20),
        paddingBottom: verticalScale(40),
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
