import { StyleSheet, View, TouchableOpacity } from "react-native";
import { AppText as Text } from "@/components/app-text";
import { scale, moderateScale } from "@/constants/scaling";
import { AeonikFonts, Colors } from "@/constants/theme";
import { AppTextStyle } from "@/constants/typography";
import React from "react";

interface NotificationCardProps {
    title: string;
    subtitle: string;
    date: string;
    icon: React.ReactNode;
    iconBackgroundColor?: string;
    showUnreadIndicator?: boolean;
    onPress?: () => void;
}

export function NotificationCard({
    title,
    subtitle,
    date,
    icon,
    iconBackgroundColor,
    showUnreadIndicator = false,
    onPress,
}: NotificationCardProps) {
    const CardWrapper = onPress ? TouchableOpacity : View;
    const wrapperProps = onPress ? { onPress, activeOpacity: 0.7 } : {};

    return (
        <CardWrapper style={styles.notificationCard} {...wrapperProps}>
            {showUnreadIndicator && (
                <View style={styles.unreadIndicator} />
            )}
            <View>
                <View style={[
                    styles.iconContainer,
                    iconBackgroundColor && { backgroundColor: iconBackgroundColor }
                ]}>
                    {icon}
                </View>
            </View>
            <View style={styles.contentContainer}>
                <Text style={styles.cardTitle}>{title}</Text>
                <Text style={styles.cardSubtitle}>{subtitle}</Text>
                <Text style={styles.cardDate}>{date}</Text>
            </View>
        </CardWrapper>
    );
}

const styles = StyleSheet.create({
    notificationCard: {
        padding: scale(16),
        backgroundColor: Colors.light.white,
        borderRadius: scale(16),
        flexDirection: "row",
        gap: scale(12),
    },
    unreadIndicator: {
        position: "absolute",
        marginEnd: scale(9),
        marginTop: scale(12),
        end: 0,
        top: 0,
        backgroundColor: "#EF4444",
        height: scale(12),
        width: scale(12),
        borderRadius: scale(6),
    },
    iconContainer: {
        width: scale(48),
        height: scale(48),
        borderRadius: scale(24),
        alignItems: "center",
        justifyContent: "center",
    },
    contentContainer: {
        flex: 1,
    },
    cardTitle: {
        fontSize: moderateScale(17),
        fontFamily: AeonikFonts.medium,
        color: Colors.light.mainDarkColor,
        marginBottom: scale(8),
    },
    cardSubtitle: {
        ...AppTextStyle.bodyText1,
        fontFamily: AeonikFonts.regular,
        color: Colors.light.mainDarkColor,
        opacity: 0.6,
        marginBottom: scale(4),
    },
    cardDate: {
        ...AppTextStyle.bodyText1,
        fontFamily: AeonikFonts.regular,
        color: Colors.light.mainDarkColor,
        opacity: 0.6,
    },
});
