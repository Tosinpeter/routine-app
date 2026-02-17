import { StyleSheet, View } from "react-native";

import { AppText as Text } from "@/components/app-text";
import { AlarmIcon } from "@/components/icons/alarm-icon";
import { BorderRadius, Colors, Fonts, Shadows } from "@/constants/theme";
import { scale, scaledRadius, scaleIcon, verticalScale } from "@/constants/scaling";
import { Ionicons } from "@expo/vector-icons";
import { GradientProgressRing } from "../gradient-progress-ring";
import { LockIcon } from "../icons/lock-icon";
import { Image } from "expo-image";
import { t } from "@/i18n";


export function ProductReminderCard() {
    const products = [
        { id: 1, type: 'purple', days: 12, progress: 0.75 },
        { id: 2, type: 'green', days: 8, progress: 0.5 },
        { id: 3, type: 'orange', days: 3, progress: 0.25 },
    ];

    // Gradient colors for different product types
    const gradients: Record<string, { start: string; end: string }> = {
        purple: { start: '#A7CDFF', end: '#614BE1' },
        green: { start: '#D0F230', end: '#32D583' },
        orange: { start: '#FDA29B', end: '#F79009' },
        locked: { start: '#F2F4F7', end: '#F2F4F7' },
    };

    const getGradientColors = (type: string) => {
        return gradients[type] || gradients.locked;
    };

    return (
        <View style={styles.card}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <AlarmIcon width={scale(24)} height={scale(24)} color="#CF604A" />
                    <Text style={styles.headerTitle}>{t("home.productReminder.title")}</Text>
                </View>

                <View style={styles.headerRight}>
                    <Text style={styles.viewText}>{t("home.productReminder.view")}</Text>
                    <Ionicons name="chevron-forward" size={scale(16)} color={Colors.light.mainDarkColor} />
                </View>
            </View>

            {/* Product List */}
            <View style={styles.productList}>
                {products.map((item) => {
                    const colors = getGradientColors(item.type);
                    return (
                        <View key={item.id} style={styles.productItem}>
                            <View style={styles.productImageContainer}>
                                <GradientProgressRing 
                                    size={scale(55)}
                                    strokeWidth={scale(6)} 
                                    progress={item.progress}
                                    gradientStartColor={colors.start}
                                    gradientEndColor={colors.end}
                                >
                                    <View style={styles.productImageWrapper}>
                                        {item.progress === 0 ? (
                                            <LockIcon size={scaleIcon(25)} />
                                        ) : (
                                            <Image
                                                source={require("@/assets/images/img_product-image.png")}
                                                style={styles.productImage}
                                                contentFit="cover"
                                            />
                                        )}
                                    </View>
                                </GradientProgressRing>
                            </View>
                            <Text style={styles.daysText}>{item.days} {t("home.productReminder.daysLeft")}</Text>
                        </View>
                    );
                })}

                {/* Locked Item */}
                <View style={styles.productItem}>
                    <View style={styles.productImageContainer}>
                        <GradientProgressRing 
                            size={scale(55)} 
                            strokeWidth={scale(6)} 
                            progress={0}
                            gradientStartColor={gradients.locked.start}
                            gradientEndColor={gradients.locked.end}
                        >
                            <View style={styles.productImageWrapper}>
                                <LockIcon size={scaleIcon(25)} />
                            </View>
                        </GradientProgressRing>
                    </View>
                    <Text style={styles.daysText}>{t("home.productReminder.underReview")}</Text>
                </View>
            </View>
        </View>
    );
}

// // Sub-component for Progress Circle
// interface ProgressCircleProps {
//     type: string;
//     progress: number; // 0 to 1
// }

// function ProgressCircle({ type, progress }: ProgressCircleProps) {
//     const radius = (size - strokeWidth) / 2;
//     const circumference = 2 * Math.PI * radius;

//     const animatedProgress = useSharedValue(0);

//     useEffect(() => {
//         animatedProgress.value = withTiming(progress, {
//             duration: 1000,
//             easing: Easing.out(Easing.cubic),
//         });
//     }, [progress]);

//     const animatedProps = useAnimatedProps(() => ({
//         strokeDashoffset: circumference * (1 - animatedProgress.value),
//     }));

//     const gradients: Record<string, string[]> = {
//         purple: ['#A7CDFF', '#614BE1'],
//         green: ['#D0F230', '#32D583'],
//         orange: ['#FDA29B', '#F79009'],
//         locked: ['#F2F4F7', '#F2F4F7'],
//     };

//     const colors = gradients[type] || gradients.locked;

//     return (
//         <View style={{ width: size, height: size, alignItems: "center", justifyContent: "center" }}>
//             <Svg width={size} height={size} style={{ position: "absolute" }}>
//                 <Defs>
//                     <LinearGradient id="progressGradient" x1="100%" y1="0%" x2="0%" y2="100%">
//                         <Stop offset="0%" stopColor={Colors.light.gradientPurple} />
//                         <Stop offset="100%" stopColor={Colors.light.gradientBlue} />
//                     </LinearGradient>
//                 </Defs>
//                 {/* Background circle */}
//                 <Circle
//                     cx={size / 2}
//                     cy={size / 2}
//                     r={radius}
//                     stroke={Colors.light.lightGrey100}
//                     strokeWidth={strokeWidth}
//                     fill="transparent"
//                 />
//                 {/* Progress circle with gradient */}
//                 <AnimatedCircle
//                     cx={size / 2}
//                     cy={size / 2}
//                     r={radius}
//                     stroke="url(#progressGradient)"
//                     strokeWidth={strokeWidth}
//                     fill="transparent"
//                     strokeDasharray={circumference}
//                     animatedProps={animatedProps}
//                     strokeLinecap="round"
//                     rotation="-90"
//                     origin={`${size / 2}, ${size / 2}`}
//                 />
//             </Svg>
//             {children}
//         </View>
//     );
// }

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
    productImageContainer: {
        backgroundColor: Colors.light.white,
        borderRadius: BorderRadius.full,
        padding: scale(6),
        ...Shadows.md,
    },
    productImageWrapper: {
        width: scale(43),
        height: scale(43),
        borderRadius: scaledRadius(27),
        backgroundColor: Colors.light.lightGrey50,
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
    },
    productImage: {
        width: scale(43),
        height: scale(40),
    },
    daysText: {
        fontFamily: 'Aeonik-Medium', // 500
        fontSize: scale(10),
        color: "#20201E",
        opacity: 0.7,
        textAlign: 'center'
    }
});
