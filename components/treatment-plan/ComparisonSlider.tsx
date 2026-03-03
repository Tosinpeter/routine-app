import { AppText as Text } from '@/components/app-text';
import { scale, verticalScale } from '@/constants/scaling';
import { BorderRadius, Colors, Fonts } from '@/constants/theme';
import { t } from "@/i18n";
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { Image, ImageSource } from 'expo-image';
import React, { useState } from 'react';
import { LayoutChangeEvent, StyleSheet, View } from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, {
    useAnimatedStyle,
    useSharedValue
} from 'react-native-reanimated';

interface ComparisonSliderProps {
    beforeImage: ImageSource;
    afterImage: ImageSource;
    height: number;
    initialProgress?: number;
    overlay?: React.ReactNode;
    beforeLabel?: string;
    afterLabel?: string;
}

export function ComparisonSlider({
    beforeImage,
    afterImage,
    height,
    initialProgress = 0.5,
    overlay,
    beforeLabel = t("treatmentPlan.comparison.withoutProduct"),
    afterLabel = t("treatmentPlan.comparison.withProduct"),
}: ComparisonSliderProps) {
    const [layoutWidth, setLayoutWidth] = useState(0);
    const sliderPos = useSharedValue(0);
    const layoutWidthShared = useSharedValue(0);
    const startPos = useSharedValue(0);

    const onLayout = (event: LayoutChangeEvent) => {
        const { width } = event.nativeEvent.layout;
        setLayoutWidth(width);
        layoutWidthShared.value = width;
        sliderPos.value = width * initialProgress;
    };

    const panGesture = Gesture.Pan()
        .onStart(() => {
            "worklet";
            startPos.value = sliderPos.value;
        })
        .onUpdate((e) => {
            "worklet";
            const w = layoutWidthShared.value;
            let newPos = startPos.value + e.translationX;
            if (newPos < 0) newPos = 0;
            if (newPos > w) newPos = w;
            sliderPos.value = newPos;
        });

    const foregroundStyle = useAnimatedStyle(() => {
        return {
            width: sliderPos.value,
        };
    });

    const handleStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: sliderPos.value }],
        };
    });

    return (
        <GestureHandlerRootView style={[styles.container, { height }]}>
            <View style={[styles.wrapper, { width: '100%', height }]} onLayout={onLayout}>

                {/* Background Layer (After Image - Right Side) */}
                <View style={StyleSheet.absoluteFill}>
                    <Image
                        source={afterImage}
                        style={styles.image}
                        contentFit="cover"
                        cachePolicy="memory-disk"
                        transition={100}
                        priority="high"
                        recyclingKey="after"
                    />
                </View>

                {/* Foreground Layer (Before Image - Left Side) - Clipped */}
                <Animated.View style={[styles.foregroundContainer, foregroundStyle]}>
                    <Image
                        source={beforeImage}
                        style={[styles.image, { width: layoutWidth > 0 ? layoutWidth : scale(358) }]}
                        contentFit="cover"
                        cachePolicy="memory-disk"
                        transition={100}
                        priority="high"
                        recyclingKey="before"
                    />
                </Animated.View>

                {/* Slider Handle - only this area is draggable */}
                <GestureDetector gesture={panGesture}>
                    <Animated.View style={[styles.handleContainer, handleStyle]}>
                        <View style={styles.line} />
                        <View style={styles.circle}>
                            <Ionicons name="caret-back" size={12} color={Colors.light.mainDarkColor} />
                            <Ionicons name="caret-forward" size={12} color={Colors.light.mainDarkColor} />
                        </View>
                        <View style={styles.line} />
                    </Animated.View>
                </GestureDetector>

                {/* Labels */}
                <View style={styles.labelsContainer}>
                    <BlurView intensity={20} tint="dark" style={styles.labelChip}>
                        <Text style={styles.labelText}>{beforeLabel}</Text>
                    </BlurView>
                    <BlurView intensity={20} tint="dark" style={styles.labelChip}>
                        <Text style={styles.labelText}>{afterLabel}</Text>
                    </BlurView>
                </View>



            </View>
            {overlay}
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    wrapper: {
        borderRadius: 24, // Matches Figma "16px" or "24px" - usually >16 for big images
        overflow: 'hidden',
        position: 'relative',
        backgroundColor: '#F2F4F7',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    foregroundContainer: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        overflow: 'hidden',
        zIndex: 1,
        borderRightWidth: 1,
        borderColor: 'rgba(255,255,255,0.8)', // Subtle white line on the cut
    },
    handleContainer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: -22, // Center the 44px handle (width of circle + buffer) on the line
        width: 44,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10,
    },
    line: {
        width: 2,
        flex: 1,
        backgroundColor: '#FFFFFF',
        opacity: 0.8,
    },
    circle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 4,
        marginVertical: 4,
    },
    labelsContainer: {
        position: 'absolute',
        top: '50%',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        marginTop: -18, // Half of label height approx
        zIndex: 999,
        pointerEvents: 'none', // Allow clicks to pass through to slider
    },
    labelChip: {
        overflow: 'hidden',
        paddingHorizontal: scale(22),
        paddingVertical: verticalScale(6),
        borderRadius: BorderRadius.full,
        borderWidth: 1,
        borderColor: 'rgba(243, 242, 242, 0.25)',
    },
    labelText: {
        fontFamily: Fonts.medium,
        fontSize: scale(14),
        color: '#FFFFFF',
    },
});
