import { Image, StyleSheet, View } from "react-native";
import Svg, { Circle } from "react-native-svg";

import { AppText as Text } from "@/components/app-text";
import { Colors, Fonts } from "@/constants/theme";
import { scale, verticalScale } from "@/constants/scaling";

export function SkinRoutineCard() {
    // Current state from new design: 1/4
    const current = 2;
    const total = 4;

    // Dimensions
    const size = scale(100);
    const center = size / 2;
    // Radius needs to align with the track in the PNG.
    // PNG Outer ~100px. Inner ~62px (r=31*2). 
    // Track center is roughly diameter ~81px. Radius ~40.5px.
    const radius = scale(40.5);
    const strokeWidth = scale(13); // Width of the blue bar

    // Circle math
    const circumference = 2 * Math.PI * radius;
    // Progress calculation (1/4 = 0.25)
    // We want to fill *up to* the percentage.
    const progress = current / total;
    const strokeDashoffset = circumference * (1 - progress);

    // Calculate position for the white knob at the end of the progress
    // -90 degrees is start (top). Angle = -90 + (360 * progress)
    const angleDegrees = -90 + (360 * progress);
    const angleRadians = (angleDegrees * Math.PI) / 180;
    const knobX = center + radius * Math.cos(angleRadians);
    const knobY = center + radius * Math.sin(angleRadians);

    return (
        <View style={styles.card}>
            {/* Left: Circular Progress */}
            <View style={styles.progressContainer}>

                {/* Layer 1: Static PNG Background (Shadows + Gray Dots) */}
                <Image
                    source={require("@/assets/images/skin-routine-ring.png")}
                    style={styles.ringImage}
                    resizeMode="contain"
                />

                {/* Layer 2: Dynamic SVG Overlay */}
                <View style={StyleSheet.absoluteFill}>
                    <Svg width={size} height={size}>
                        {/* Blue Progress Arc */}
                        {/* Rotated -90 to start from top */}
                        <Circle
                            cx={center}
                            cy={center}
                            r={radius}
                            stroke="#5676FF" // Blue from screenshot
                            strokeWidth={strokeWidth}
                            strokeLinecap="round"
                            fill="transparent"
                            strokeDasharray={[circumference, circumference]}
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
                                fill="white"
                            />
                        )}
                    </Svg>
                </View>

                {/* Layer 3: Text */}
                <View style={styles.centerTextContainer}>
                    <Text style={styles.centerText}>{current}/{total}</Text>
                </View>
            </View>

            {/* Right: Text Content */}
            <View style={styles.infoContainer}>
                <Text style={styles.infoTitle}>Treatment Plan</Text>
                <Text style={styles.infoSubtitle}>Your Skin Routine</Text>

                <View style={styles.statusPill}>
                    <Text style={styles.statusText}>{current}/{total} Completed</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: Colors.light.white,
        borderRadius: scale(16),
        padding: scale(16),
        width: "100%",
        marginBottom: scale(16),
        flexDirection: "row",
        alignItems: "center",
        gap: scale(16),
        height: verticalScale(200),
    },
    progressContainer: {
        width: scale(100),
        height: scale(100),
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: scale(20),
        position: 'relative',
    },
    ringImage: {
        width: "100%",
        height: "100%",
    },
    centerTextContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    centerText: {
        fontFamily: Fonts.bold,
        fontSize: scale(20),
        color: Colors.light.mainDarkColor,
    },
    infoContainer: {
        flex: 1,
        justifyContent: 'center',
        gap: verticalScale(12)
    },
    infoTitle: {
        fontFamily: Fonts.regular,
        fontSize: scale(14),
        color: Colors.light.mainDarkColor,
        opacity: 0.7
    },
    infoSubtitle: {
        fontFamily: Fonts.bold,
        fontSize: scale(24),
        color: Colors.light.mainDarkColor,
        letterSpacing: -0.5
    },
    statusPill: {
        backgroundColor: "#F6F0EE",
        paddingHorizontal: scale(14),
        paddingVertical: verticalScale(10),
        borderRadius: scale(100),
        alignSelf: 'flex-start'
    },
    statusText: {
        fontFamily: Fonts.medium,
        fontSize: scale(15),
        color: Colors.light.tint
    }
});
