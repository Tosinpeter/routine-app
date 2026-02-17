import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import Svg, { Circle } from "react-native-svg";
import { Image } from "expo-image";
import { AppText as Text } from "@/components/app-text";
import { Colors } from "@/constants/theme";
import { scale, verticalScale } from "@/constants/scaling";

export function TreatmentPlanCard() {
    return (
        <View
            style={styles.container}
            accessible={true}
            accessibilityLabel="Your Skin Routine, 1 out of 4 completed"
            accessibilityRole="summary"
        >
            {/* Progress Circle Section */}
            <View style={styles.progressContainer}>
                <CircularProgress current={1} total={4} />
            </View>

            {/* Text Section */}
            <View style={styles.textContainer}>
                <Text style={styles.subtitle}>Treatment Plan</Text>
                <Text style={styles.title}>Your Skin Routine</Text>
                <View style={styles.statusBadge}>
                    <Text style={styles.statusText}>1/4 Completed</Text>
                </View>
            </View>
        </View>
    );
}

function CircularProgress({ current, total }: { current: number; total: number }) {
    const size = scale(80);
    const center = size / 2;
    const strokeWidth = scale(13); // Increased from 8 to 12 to fill donut
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (current / total) * circumference;

    // Calculate knob position
    // Rotation is -90deg (start from top)
    // Angle covers the progress portion.
    // 0 progress = top (-90 degrees)
    // full progress = top (-90 + 360)

    // We work in radians. 
    // Start angle is -Math.PI / 2
    // Progress angle = (current / total) * 2 * Math.PI
    // Target angle = Start angle + Progress angle
    const angle = -Math.PI / 2 + (current / total) * 2 * Math.PI;
    const knobX = center + radius * Math.cos(angle);
    const knobY = center + radius * Math.sin(angle);

    return (
        <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
            {/* Layer 1: Static PNG Background (Shadows + Gray Dots) */}
            <Image
                source={require("@/assets/images/skin-routine-ring.png")}
                style={{ width: size, height: size, position: 'absolute' }}
                contentFit="contain" // Expo Image uses contentFit
            />

            {/* Layer 2: Dynamic SVG Overlay */}
            <View style={StyleSheet.absoluteFill}>
                <Svg width={size} height={size}>
                    {/* Blue Progress Arc */}
                    {/* Rotated -90 to start from top - handled via rotation prop or transform */}
                    <Circle
                        cx={center}
                        cy={center}
                        r={radius}
                        stroke={Colors.light.progressRing}
                        strokeWidth={strokeWidth}
                        strokeLinecap="round"
                        fill="transparent"
                        strokeDasharray={`${circumference} ${circumference}`}
                        strokeDashoffset={strokeDashoffset}
                        rotation="-90"
                        origin={`${center}, ${center}`}
                    />

                    {/* White Knob at the end of the blue bar */}
                    {/* Only show if there is progress > 0 */}
                    {current > 0 && (
                        <Circle
                            cx={knobX}
                            cy={knobY}
                            r={strokeWidth / 2.8} // Slightly smaller than stroke
                            fill={Colors.light.white}
                        />
                    )}
                </Svg>
            </View>

            {/* Layer 3: Text */}
            <View style={styles.progressTextContainer}>
                <Text style={styles.progressValue}>{current}/{total}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: Colors.light.white,
        borderRadius: scale(16),
        padding: scale(24),
        width: "100%",
        height: verticalScale(170),
        gap: scale(24),
    },
    progressContainer: {
        alignItems: "center",
        justifyContent: "center",
    },
    progressTextContainer: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
    },
    progressValue: {
        fontFamily: 'Aeonik-Bold',
        fontSize: scale(20),
        color: Colors.light.mainDarkColor,
    },
    textContainer: {
        flex: 1,
        justifyContent: "center",
        gap: scale(8),
    },
    subtitle: {
        fontFamily: 'Aeonik-Regular',
        fontSize: scale(14),
        color: Colors.light.mainDarkColor,
        opacity: 0.7,
    },
    title: {
        fontFamily: 'Aeonik-Bold',
        fontSize: scale(20),
        color: Colors.light.mainDarkColor,
        letterSpacing: -0.5,
    },
    statusBadge: {
        backgroundColor: Colors.light.statusBadgeBg,
        paddingHorizontal: scale(16),
        paddingVertical: verticalScale(8),
        borderRadius: scale(100),
        alignSelf: "flex-start",
    },
    statusText: {
        fontFamily: 'Aeonik-Medium',
        fontSize: scale(14),
        color: Colors.light.tint,
    },
});
