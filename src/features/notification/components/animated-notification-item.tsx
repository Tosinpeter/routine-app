import React, { useEffect } from "react";
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withTiming } from "react-native-reanimated";

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
    const fadeProgress = useSharedValue(0);
    const slideProgress = useSharedValue(50);

    useEffect(() => {
        fadeProgress.value = withDelay(index * 100, withTiming(1, { duration: 600 }));
        slideProgress.value = withDelay(index * 100, withTiming(0, { duration: 600 }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [index]);

    const animatedStyle = useAnimatedStyle(() => ({
        opacity: fadeProgress.value,
        transform: [{ translateY: slideProgress.value }],
    }));

    const { icon, color } = getIconComponent(notification.notification_type);

    return (
        <Animated.View style={animatedStyle}>
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
