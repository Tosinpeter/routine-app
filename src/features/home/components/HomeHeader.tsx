import { BlurView } from "expo-blur";
import { router } from "expo-router";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import { AppText as Text } from "@/components/app-text";
import { NotificationIcon } from "@/components/icons/notification-icon";
import { Colors, Fonts } from "@/constants/theme";
import { scale, touchTarget } from "@/constants/scaling";
import { useAuth } from "@/shared/store/hooks/use-auth";
import { t } from "@/i18n";

export function HomeHeader() {
    const { profile } = useAuth();
    const userName = profile?.fullname ?? "";

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return t("home.greetings.goodMorning");
        if (hour < 17) return t("home.greetings.goodAfternoon");
        return t("home.greetings.goodEvening");
    };

    return (
        <View style={styles.container}>
            {/* User Info */}
            <View style={styles.userInfo}>
                <Text style={styles.greetingText}>{getGreeting()}</Text>


                <View style={styles.nameContainer}>
                    <Text style={styles.userName}>{userName}</Text>
                    <Text style={styles.emoji}>👋</Text>
                </View>
            </View>

            {/* Notification Bell */}
            <TouchableOpacity
                style={styles.notificationWrapper}
                onPress={() => router.push("/notification")}
                activeOpacity={0.7} >
                <BlurView intensity={20} tint="light" style={styles.notificationButton}>
                    <NotificationIcon
                        width={scale(27)}
                        height={scale(27)}
                        color={Colors.light.grey700}
                    />
                    {/* Notification Dot (Optional if active) */}
                    <View style={styles.notificationDot} />
                </BlurView>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: scale(20),
    },
    userInfo: {
        alignItems: 'flex-start',
        gap: scale(4),
    },
    greetingText: {
        fontFamily: Fonts.regular,
        fontSize: scale(16),
        color: Colors.light.text,
        opacity: 0.8,
    },
    nameContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: scale(8),
    },
    userName: {
        fontFamily: Fonts.medium, // Aeonik Medium
        fontSize: scale(32),
        color: Colors.light.mainDarkColor,
        lineHeight: scale(32), // Tight line height as per figma
    },
    emoji: {
        fontSize: scale(20),
        transform: [{ scaleX: -1 }], // Flip the hand emoji as per design
    },
    notificationWrapper: {
        width: touchTarget(44), // 44px
        height: touchTarget(44), // 44px
        borderRadius: scale(157), // Circle (157.143px)
        overflow: "hidden", // For BlurView
    },
    notificationButton: {
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.light.whiteAlpha70,
    },
    notificationDot: {
        position: "absolute",
        top: scale(11),
        end: scale(12),
        width: scale(8),
        height: scale(8),
        borderRadius: scale(4),
        backgroundColor: Colors.light.grey700, // or Red if active
        borderWidth: 1.5,
        borderColor: Colors.light.white,
        display: "none", // Hidden in screenshot, enable if needed
    },
});
