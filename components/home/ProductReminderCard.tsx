import { Image, StyleSheet, View } from "react-native";
import Svg, { Circle, Defs, LinearGradient, Stop } from "react-native-svg";

import { AppText as Text } from "@/components/app-text";
import { AlarmIcon } from "@/components/icons/alarm-icon";
import { Colors, Fonts } from "@/constants/theme";
import { scale, verticalScale } from "@/constants/scaling";
import { Ionicons } from "@expo/vector-icons";

export function ProductReminderCard() {
    const products = [
        { id: 1, type: 'purple', days: 12, progress: 0.75 },
        { id: 2, type: 'green', days: 8, progress: 0.5 },
        { id: 3, type: 'orange', days: 3, progress: 0.25 },
    ];

    return (
        <View style={styles.card}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <AlarmIcon width={scale(24)} height={scale(24)} color="#CF604A" />
                    <Text style={styles.headerTitle}>Product Reminder</Text>
                </View>

                <View style={styles.headerRight}>
                    <Text style={styles.viewText}>View</Text>
                    <Ionicons name="chevron-forward" size={scale(16)} color={Colors.light.mainDarkColor} />
                </View>
            </View>

            {/* Product List */}
            <View style={styles.productList}>
                {products.map((item) => (
                    <View key={item.id} style={styles.productItem}>
                        {/* 68px Container */}
                        <View style={styles.imageContainer}>
                            {/* Outer Shadow Circle (68px) */}
                            <View style={styles.outerCircle} />

                            {/* Progress Circle Container (60px) - Absolute 4px, 4px */}
                            <View style={styles.progressCircleContainer}>
                                {/* Progress Circle (60px) */}
                                <ProgressCircle type={item.type} progress={item.progress} />

                                {/* Inner White Circle (50.87px) - Centered in 60px container */}
                                <View style={styles.innerCircle}>
                                    {/* Product Image (42.48px) */}
                                    <Image
                                        source={require("@/assets/images/product-placeholder.png")}
                                        style={styles.productImage}
                                        resizeMode="contain"
                                    />
                                </View>
                            </View>
                        </View>
                        <Text style={styles.daysText}>{item.days} Days left</Text>
                    </View>
                ))}

                {/* Locked Item */}
                <View style={styles.productItem}>
                    <View style={styles.imageContainer}>
                        <View style={styles.outerCircle} />
                        <View style={styles.progressCircleContainer}>
                            <ProgressCircle type="locked" progress={0} />
                            <View style={styles.innerCircle}>
                                <Ionicons name="lock-closed" size={scale(18)} color={Colors.light.lightGrey300} />
                            </View>
                        </View>
                    </View>
                    <Text style={styles.daysText}>Under Review</Text>
                </View>
            </View>
        </View>
    );
}

// Sub-component for Progress Circle
interface ProgressCircleProps {
    type: string;
    progress: number; // 0 to 1
}

function ProgressCircle({ type, progress }: ProgressCircleProps) {
    const size = scale(60);
    const strokeWidth = scale(6);
    const radius = (size - strokeWidth) / 2;
    const center = size / 2;
    const circumference = 2 * Math.PI * radius;
    
    // Clamp progress between 0 and 1
    const clampedProgress = Math.min(Math.max(progress, 0), 1);
    const strokeDashoffset = circumference * (1 - clampedProgress);

    const gradients: Record<string, string[]> = {
        purple: ['#A7CDFF', '#614BE1'],
        green: ['#D0F230', '#32D583'],
        orange: ['#FDA29B', '#F79009'],
        locked: ['#F2F4F7', '#F2F4F7'],
    };

    const colors = gradients[type] || gradients.locked;

    return (
        <View style={StyleSheet.absoluteFillObject}>
            <Svg width={size} height={size}>
                <Defs>
                    <LinearGradient id={`progress-grad-${type}`} x1="0%" y1="0%" x2="100%" y2="100%">
                        <Stop offset="0" stopColor={colors[0]} />
                        <Stop offset="1" stopColor={colors[1]} />
                    </LinearGradient>
                </Defs>
                {/* Background Circle */}
                <Circle
                    cx={center}
                    cy={center}
                    r={radius}
                    stroke="#F2F4F7"
                    strokeWidth={strokeWidth}
                    fill="transparent"
                />
                {/* Progress Circle */}
                {type !== 'locked' && (
                    <Circle
                        cx={center}
                        cy={center}
                        r={radius}
                        stroke={`url(#progress-grad-${type})`}
                        strokeWidth={strokeWidth}
                        fill="transparent"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        rotation="-90"
                        origin={`${center}, ${center}`}
                    />
                )}
            </Svg>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: Colors.light.white,
        borderRadius: scale(16),
        padding: scale(16),
        width: "100%", // 358px
        height: verticalScale(200),
        marginBottom: scale(16),
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: verticalScale(24),
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: scale(8)
    },
    headerTitle: {
        fontFamily: Fonts.medium,
        fontSize: scale(18),
        color: "#20201E"
    },
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
        opacity: 0.8
    },
    viewText: {
        fontFamily: Fonts.regular,
        fontSize: scale(14),
        color: "#20201E",
        marginRight: scale(4)
    },
    // List
    productList: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        gap: scale(16),
    },
    productItem: {
        width: scale(68),
        height: scale(84),
        alignItems: 'center',
        gap: scale(6),
    },
    // The Container 68x68
    imageContainer: {
        width: scale(68),
        height: scale(68),
        position: 'relative',
    },
    outerCircle: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: scale(68),
        height: scale(68),
        borderRadius: scale(34),
        backgroundColor: '#FFFFFF',
        borderWidth: 2,
        borderColor: '#F9FAFB',
        // Shadow: 0px 0px 12px rgba(37, 62, 111, 0.08)
        shadowColor: "rgba(37, 62, 111, 0.08)",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 12,
        elevation: 2,
    },
    progressCircleContainer: {
        position: 'absolute',
        top: scale(4),
        left: scale(4),
        width: scale(60),
        height: scale(60),
        justifyContent: 'center',
        alignItems: 'center',
    },
    innerCircle: {
        position: 'absolute',
        // Center within 60px. 60 - 50.87 = 9.13 / 2 = 4.56
        width: scale(50.87),
        height: scale(50.87),
        borderRadius: scale(25.4),
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 1, // Ensure white bg is on top of ring if filled, but ring is stroke only so fine.
    },
    productImage: {
        width: scale(42.48),
        height: scale(38.98),
    },
    daysText: {
        fontFamily: 'Aeonik-Medium', // 500
        fontSize: scale(10),
        color: "#20201E",
        opacity: 0.7,
        textAlign: 'center'
    }
});
