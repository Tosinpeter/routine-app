import React, { useEffect, useRef } from "react";
import { Animated } from "react-native";

import { ConicalFlaskIcon } from "@/components/icons/conical-flask-icon";
import { CubeIcon } from "@/components/icons/cube-icon";
import { HealthIcon } from "@/components/icons/health-icon";
import { MoonIcon } from "@/components/icons/moon-icon";
import { NotificationCard } from "./notification-card";
import { Colors } from "@/constants/theme";
import type { AppNotification } from "@/shared/store/slices/notification-slice";
import { getTimeAgo } from "@/shared/utils/date-helpers";

function getIconComponent(notificationType: AppNotification["notification_type"]) {
    switch (notificationType) {
        case "prescription_ready":
            return { icon: <HealthIcon size={24} color={Colors.light.tint} />, color: Colors.light.notificationBg };
        case "review_completed":
            return { icon: <ConicalFlaskIcon size={24} color={Colors.light.tint} />, color: Colors.light.notificationBg };
        case "night_routine":
            return { icon: <MoonIcon size={24} color={Colors.light.tint} />, color: Colors.light.notificationBg };
        case "order_shipped":
            return { icon: <CubeIcon size={24} color={Colors.light.tint} />, color: Colors.light.notificationBg };
        default:
            return { icon: <HealthIcon size={24} color={Colors.light.tint} />, color: Colors.light.notificationBg };
    }
}

interface AnimatedNotificationItemProps {
    notification: AppNotification;
    index: number;
    onPress: (id: string) => void;
}

export const AnimatedNotificationItem: React.FC<AnimatedNotificationItemProps> = ({ notification, index, onPress }) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(50)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 600,
                delay: index * 100,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 600,
                delay: index * 100,
                useNativeDriver: true,
            }),
        ]).start();
    }, [fadeAnim, slideAnim, index]);

    const { icon, color } = getIconComponent(notification.notification_type);

    return (
        <Animated.View
            style={{
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
            }}
        >
            <NotificationCard
                key={notification.id}
                title={notification.title}
                subtitle={notification.subtitle}
                date={getTimeAgo(notification.createdAt)}
                icon={icon}
                iconBackgroundColor={color}
                showUnreadIndicator={!notification.is_read}
                onPress={() => onPress(notification.id)}
            />
        </Animated.View>
    );
};
