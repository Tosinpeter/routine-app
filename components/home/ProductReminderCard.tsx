import { Image, StyleSheet, View } from "react-native";
import Svg, { Circle, Defs, LinearGradient, Path, Stop } from "react-native-svg";

import { AppText as Text } from "@/components/app-text";
import { AlarmIcon } from "@/components/icons/alarm-icon";
import { Colors, Fonts } from "@/constants/theme";
import { scale, verticalScale } from "@/constants/scaling";
import { Ionicons } from "@expo/vector-icons";

export function ProductReminderCard() {
    const products = [
        { id: 1, type: 'purple', days: 0 },
        { id: 2, type: 'green', days: 0 },
        { id: 3, type: 'orange', days: 0 },
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
                                {/* Gradient Ring (57.75px) */}
                                <GradientRing type={item.type} />

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
                            <GradientRing type="locked" />
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

// Sub-component for Gradient Ring
function GradientRing({ type }: { type: string }) {
    const size = scale(60);

    if (type === 'purple') {
        return (
            <View style={StyleSheet.absoluteFillObject}>
                <Svg width={size} height={size} viewBox="0 0 60 60" fill="none">
                    <Circle cx="30.3653" cy="30.3664" r="25.4367" fill="white" />
                    <Path d="M30.213 4.04883C33.6493 4.04883 37.0519 4.72566 40.2267 6.04068C43.4014 7.35571 46.2861 9.28316 48.7159 11.713C51.1458 14.1429 53.0732 17.0275 54.3882 20.2022C55.7033 23.377 56.3801 26.7797 56.3801 30.216C56.3801 33.6523 55.7033 37.055 54.3882 40.2297C53.0732 43.4045 51.1458 46.2891 48.7159 48.7189C46.2861 51.1488 43.4014 53.0762 40.2267 54.3913C37.0519 55.7063 33.6493 56.3831 30.2129 56.3831C26.7766 56.3831 23.374 55.7063 20.1992 54.3913C17.0245 53.0762 14.1398 51.1488 11.71 48.7189C9.28014 46.2891 7.35268 43.4044 6.03766 40.2297C4.72264 37.055 4.04581 33.6523 4.04581 30.216C4.04581 26.7796 4.72264 23.377 6.03767 20.2022C7.35269 17.0275 9.28015 14.1428 11.71 11.713C14.1398 9.28315 17.0245 7.3557 20.1992 6.04068C23.374 4.72566 26.7767 4.04883 30.213 4.04883L30.213 4.04883Z" stroke="#F2F4F7" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
                    <Path d="M30.213 4.04883C33.6493 4.04883 37.0519 4.72566 40.2267 6.04068C43.4014 7.35571 46.2861 9.28316 48.7159 11.713C51.1458 14.1429 53.0732 17.0275 54.3882 20.2022C55.7033 23.377 56.3801 26.7797 56.3801 30.216C56.3801 33.6523 55.7033 37.055 54.3882 40.2297C53.0732 43.4045 51.1458 46.2891 48.7159 48.7189C46.2861 51.1488 43.4014 53.0762 40.2267 54.3913C37.0519 55.7063 33.6493 56.3831 30.2129 56.3831C26.7766 56.3831 23.374 55.7063 20.1992 54.3913C17.0245 53.0762 14.1398 51.1488 11.71 48.7189C9.28014 46.2891 7.35268 43.4044 6.03766 40.2297C4.72264 37.055 4.04581 33.6523 4.04581 30.216C4.04581 26.7796 4.72264 23.377 6.03767 20.2022C7.35269 17.0275 9.28015 14.1428 11.71 11.713C14.1398 9.28315 17.0245 7.3557 20.1992 6.04068C23.374 4.72566 26.7767 4.04883 30.213 4.04883L30.213 4.04883Z" stroke="url(#paint0_linear_44_9231)" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
                    <Defs>
                        <LinearGradient id="paint0_linear_44_9231" x1="30.213" y1="4.04883" x2="3.99991" y2="33.5" gradientUnits="userSpaceOnUse">
                            <Stop stopColor="#A7CDFF" />
                            <Stop offset="1" stopColor="#614BE1" />
                        </LinearGradient>
                    </Defs>
                </Svg>
            </View>
        );
    }

    const strokeWidth = scale(8);
    const radius = scale(24.875);
    const center = size / 2;

    const gradients: Record<string, string[]> = {
        green: ['#D0F230', '#32D583'],
        orange: ['#FDA29B', '#F79009'],
        locked: ['#F2F4F7', '#F2F4F7'],
    };

    const colors = gradients[type] || gradients.locked;

    return (
        <View style={StyleSheet.absoluteFillObject}>
            <Svg width={size} height={size}>
                <Defs>
                    <LinearGradient id={`grad-${type}`} x1="0%" y1="0%" x2="100%" y2="100%">
                        <Stop offset="0" stopColor={colors[0]} />
                        <Stop offset="1" stopColor={colors[1]} />
                    </LinearGradient>
                </Defs>
                <Circle
                    cx={center}
                    cy={center}
                    r={radius}
                    stroke={type === 'locked' ? '#F2F4F7' : `url(#grad-${type})`}
                    strokeWidth={strokeWidth}
                    fill="transparent"
                />
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
