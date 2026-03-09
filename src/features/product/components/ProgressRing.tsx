import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

interface ProgressRingProps {
    image: any;
    size?: number;
    strokeWidth?: number;
    progress?: number; // 0 to 1
}

export function ProgressRing({
    image,
    size = 56,
    strokeWidth = 5.3,
    progress = 0.75 // Default progress for visual demo based on CSS naming 'Line' which often implies partial
}: ProgressRingProps) {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDashoffset = circumference - progress * circumference;

    return (
        <View style={[styles.container, { width: size, height: size }]}>
            <View style={StyleSheet.absoluteFill}>
                <Svg width={size} height={size}>
                    {/* Background Ring */}
                    <Circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        stroke="#F2F4F7"
                        strokeWidth={strokeWidth}
                        fill="none"
                    />
                    {/* Progress Ring */}
                    <Circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        stroke="#CF604A"
                        strokeWidth={strokeWidth}
                        fill="none"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        rotation="-90"
                        origin={`${size / 2}, ${size / 2}`}
                    />
                </Svg>
            </View>

            {/* Image Container - Centered */}
            <View style={[styles.imageContainer, { width: size - strokeWidth * 3, height: size - strokeWidth * 3, borderRadius: (size - strokeWidth * 3) / 2 }]}>
                {/* The CSS has a specific image size logic, but centering is safer */}
                <Image source={image} style={styles.image} resizeMode="contain" />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF', // Optional, matching background possibly
        overflow: 'hidden',
    },
    image: {
        width: '80%',
        height: '80%',
    },
});
