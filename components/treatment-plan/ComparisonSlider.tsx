import { scale, verticalScale } from '@/constants/scaling';
import { Colors, Fonts } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Image, ImageSourcePropType, LayoutChangeEvent, StyleSheet, View } from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, {
    useAnimatedStyle,
    useSharedValue
} from 'react-native-reanimated';

interface ComparisonSliderProps {
    beforeImage: ImageSourcePropType;
    afterImage: ImageSourcePropType;
    initialProgress?: number; // 0 to 1
}

export function ComparisonSlider({
    beforeImage,
    afterImage,
    initialProgress = 0.5,
}: ComparisonSliderProps) {
    const [layoutWidth, setLayoutWidth] = useState(0);
    const sliderPos = useSharedValue(0);

    const onLayout = (event: LayoutChangeEvent) => {
        const { width } = event.nativeEvent.layout;
        setLayoutWidth(width);
        sliderPos.value = width * initialProgress;
    };

    const panGesture = Gesture.Pan()
        .onUpdate((e) => {
            // Clamp the position between 0 and layoutWidth
            let newPos = e.x;
            if (newPos < 0) newPos = 0;
            if (newPos > layoutWidth) newPos = layoutWidth;
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
        <GestureHandlerRootView style={[styles.container, { height: verticalScale(545) }]}>
            <GestureDetector gesture={panGesture}>
                <View style={[styles.wrapper, { width: '100%', height: verticalScale(545) }]} onLayout={onLayout}>

                    {/* Background Layer (After Image - Right Side) */}
                    <View style={StyleSheet.absoluteFill}>
                        <Image source={afterImage} style={styles.image} resizeMode="cover" />
                    </View>

                    {/* Foreground Layer (Before Image - Left Side) - Clipped */}
                    <Animated.View style={[styles.foregroundContainer, foregroundStyle]}>
                        <Image
                            source={beforeImage}
                            style={[styles.image, { width: layoutWidth > 0 ? layoutWidth : scale(358) }]} // Dynamic width to prevent squashing
                            resizeMode="cover"
                        />
                    </Animated.View>

                    {/* Slider Handle */}
                    <Animated.View style={[styles.handleContainer, handleStyle]}>
                        <View style={styles.line} />
                        <View style={styles.circle}>
                            <Ionicons name="caret-back" size={12} color={Colors.light.mainDarkColor} />
                            <Ionicons name="caret-forward" size={12} color={Colors.light.mainDarkColor} />
                        </View>
                        <View style={styles.line} />
                    </Animated.View>

                    {/* Labels */}
                    <View style={styles.labelsContainer}>
                        <View style={styles.labelChip}>
                            <Text style={styles.labelText}>without product</Text>
                        </View>
                        <View style={styles.labelChip}>
                            <Text style={styles.labelText}>With Product</Text>
                        </View>
                    </View>

                </View>
            </GestureDetector>
        </GestureHandlerRootView>
    );
}

import { AppText as Text } from '@/components/app-text';

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
        paddingHorizontal: 16,
        marginTop: -18, // Half of label height approx
        zIndex: 5,
        pointerEvents: 'none', // Allow clicks to pass through to slider
    },
    labelChip: {
        backgroundColor: 'rgba(255, 255, 255, 0.24)',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.08)',
        backdropFilter: 'blur(12px)', // Note: backdrop-filter not supported natively in RN without Expo Blur, simulating with opacity
    },
    labelText: {
        fontFamily: Fonts.medium,
        fontSize: scale(14),
        color: '#FFFFFF',
    },
});
