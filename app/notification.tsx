import {
    Animated,
    Image,
    ScrollView,
    StyleSheet,
    View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import { AppText as Text } from "@/components/app-text";
import { ThemedView } from "@/components/themed-view";

import { ApiErrorDisplay } from "@/components/api-error-display";
import { BackButton } from "@/components/back-button";
import { NotificationCard } from "@/components/notification-card";
import { scale, verticalScale } from "@/constants/scaling";
import { AeonikFonts, Colors } from "@/constants/theme";
import { AppTextStyle } from "@/constants/typography";
import { HealthIcon } from "@/components/icons/health-icon";
import { ConicalFlaskIcon } from "@/components/icons/conical-flask-icon";
import { CubeIcon } from "@/components/icons/cube-icon";
import { MoonIcon } from "@/components/icons/moon-icon";
import { Loader } from "@/components/loader";
import { t } from "@/i18n";
import type { RootState, AppDispatch } from "@/store";
import {
    fetchNotifications,
    markNotificationRead,
    type AppNotification,
} from "@/store/slices/notification-slice";
import { useAuth } from "@/contexts/AuthContext";

// Helper function to get icon component and color
const getIconComponent = (notificationType: AppNotification["notification_type"]) => {
    switch (notificationType) {
        case "prescription_ready":
            return { icon: <HealthIcon size={24} color="#CF604A" />, color: "#F3EDE7" };
        case "review_completed":
            return { icon: <ConicalFlaskIcon size={24} color="#CF604A" />, color: "#F3EDE7" };
        case "night_routine":
            return { icon: <MoonIcon size={24} color="#CF604A" />, color: "#F3EDE7" };
        case "order_shipped":
            return { icon: <CubeIcon size={24} color="#CF604A" />, color: "#F3EDE7" };
        default:
            return { icon: <HealthIcon size={24} color="#CF604A" />, color: "#F3EDE7" };
    }
};



// Helper function to format date and time
const formatDateTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const months = [
        t("months.short.jan"), t("months.short.feb"), t("months.short.mar"),
        t("months.short.apr"), t("months.short.may"), t("months.short.jun"),
        t("months.short.jul"), t("months.short.aug"), t("months.short.sep"),
        t("months.short.oct"), t("months.short.nov"), t("months.short.dec"),
    ];
    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? t("notification.time.pm") : t("notification.time.am");
    const displayHours = hours % 12 || 12;

    return `${month} ${day} ${year}, ${displayHours}:${minutes} ${ampm}`;
};

// Helper function to convert timestamp to "time ago" format or date
const getTimeAgo = (timestamp: string) => {
    const now = new Date();
    const notificationTime = new Date(timestamp);
    
    // Check if notification is from today
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const notificationDay = new Date(
        notificationTime.getFullYear(),
        notificationTime.getMonth(),
        notificationTime.getDate()
    );
    
    // If not today, return formatted date
    if (notificationDay.getTime() !== today.getTime()) {
        return formatDateTime(timestamp);
    }
    
    // If today, return "time ago" format
    const diffInMs = now.getTime() - notificationTime.getTime();
    const diffInSeconds = Math.floor(diffInMs / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);

    if (diffInSeconds < 60) {
        return t("notification.time.justNow");
    } else if (diffInMinutes < 60) {
        return diffInMinutes === 1 ? t("notification.time.minuteAgo") : t("notification.time.minutesAgo", { count: diffInMinutes });
    } else if (diffInHours < 24) {
        return diffInHours === 1 ? t("notification.time.hourAgo") : t("notification.time.hoursAgo", { count: diffInHours });
    } else {
        return t("notification.time.today");
    }
};

// Helper function to group notifications by date
const groupNotificationsByDate = (notifications: AppNotification[]) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const weekStart = new Date(today);
    weekStart.setDate(weekStart.getDate() - 7);

    const todayLabel = t("notification.groups.today");
    const yesterdayLabel = t("notification.groups.yesterday");
    const thisWeekLabel = t("notification.groups.thisWeek");

    const groups: { [key: string]: AppNotification[] } = {
        [todayLabel]: [],
        [yesterdayLabel]: [],
        [thisWeekLabel]: [],
    };

    notifications.forEach((notification) => {
        const notificationDate = new Date(notification.createdAt);
        const notificationDay = new Date(
            notificationDate.getFullYear(),
            notificationDate.getMonth(),
            notificationDate.getDate()
        );

        if (notificationDay.getTime() === today.getTime()) {
            groups[todayLabel].push(notification);
        } else if (notificationDay.getTime() === yesterday.getTime()) {
            groups[yesterdayLabel].push(notification);
        } else if (notificationDay >= weekStart) {
            groups[thisWeekLabel].push(notification);
        } else {
            const months = [
                t("months.short.jan"), t("months.short.feb"), t("months.short.mar"),
                t("months.short.apr"), t("months.short.may"), t("months.short.jun"),
                t("months.short.jul"), t("months.short.aug"), t("months.short.sep"),
                t("months.short.oct"), t("months.short.nov"), t("months.short.dec"),
            ];
            const groupKey = `${notificationDate.getDate()} ${months[notificationDate.getMonth()]} ${notificationDate.getFullYear()}`;
            if (!groups[groupKey]) {
                groups[groupKey] = [];
            }
            groups[groupKey].push(notification);
        }
    });

    // Remove empty groups
    Object.keys(groups).forEach((key) => {
        if (groups[key].length === 0) {
            delete groups[key];
        }
    });

    return groups;
};

// Animated Section Header Component
interface AnimatedSectionHeaderProps {
    title: string;
    index: number;
}

const AnimatedSectionHeader: React.FC<AnimatedSectionHeaderProps> = ({ title, index }) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            delay: index * 150,
            useNativeDriver: true,
        }).start();
    }, [fadeAnim, index]);

    return (
        <Animated.View style={{ opacity: fadeAnim }}>
            <Text style={styles.cardSeparatorText}>{title}</Text>
        </Animated.View>
    );
};

// Animated Notification Card Component
interface AnimatedNotificationItemProps {
    notification: AppNotification;
    index: number;
    onPress: (id: string) => void;
}

const AnimatedNotificationItem: React.FC<AnimatedNotificationItemProps> = ({ notification, index, onPress }) => {
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

export default function NotificationScreen() {
    const dispatch = useDispatch<AppDispatch>();
    const { profile } = useAuth();
    const { notifications, loading, error } = useSelector(
        (state: RootState) => state.notification
    );

    const headerFadeAnim = useRef(new Animated.Value(0)).current;

    const handleFetch = () => {
        if (profile?.id) {
            dispatch(fetchNotifications(profile.id));
        }
    };

    useEffect(() => {
        handleFetch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [profile?.id]);

    useEffect(() => {
        Animated.timing(headerFadeAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start();
    }, [headerFadeAnim]);

    const handleNotificationPress = (id: string) => {
        dispatch(markNotificationRead(id));
    };

    const groupedNotifications = groupNotificationsByDate(notifications);

    let globalIndex = 0;

    return (
        <ThemedView style={styles.container}>
            <SafeAreaView style={styles.safeArea}>

                <BackButton style={styles.backButton} />

                <View style={{ ...styles.scrollContent, flex: 1 }} >
                    <Animated.View style={{ opacity: headerFadeAnim }}>
                        <Text style={styles.headerText}>{t("notification.title")}</Text>
                    </Animated.View>

                    {loading ? (
                        <View style={styles.loadingContainer}>
                            <Loader size={70} />
                        </View>
                    ) : error ? (
                        <ApiErrorDisplay
                            title={t("error.apiError.title")}
                            errorMessage={t("notification.error.failedToLoad")}
                            description={error || t("notification.error.description")}
                            onRetry={handleFetch}
                            showRetryButton={true}
                        />
                    ) : notifications.length === 0 ? (
                        <EmptyState />
                    ) : (
                        <ScrollView style={styles.scrollView}
                            showsVerticalScrollIndicator={false}>
                                {Object.entries(groupedNotifications).map(([groupName, groupItems], groupIndex) => {
                                    const sectionStartIndex = globalIndex;
                                    globalIndex += groupItems.length;

                                    return (
                                        <React.Fragment key={groupName}>
                                            <AnimatedSectionHeader title={groupName} index={groupIndex} />
                                            <View style={{
                                                gap: scale(12),
                                                marginBottom: groupIndex === Object.keys(groupedNotifications).length - 1
                                                    ? 0
                                                    : verticalScale(24)
                                            }}>
                                                {groupItems.map((notification, notificationIndex) => (
                                                    <AnimatedNotificationItem
                                                        key={notification.id}
                                                        notification={notification}
                                                        index={sectionStartIndex + notificationIndex}
                                                        onPress={handleNotificationPress}
                                                    />
                                                ))}
                                            </View>
                                        </React.Fragment>
                                    );
                                })}
                        </ScrollView>
                    )}

                </View>
            </SafeAreaView>
        </ThemedView>
    );
}

// Private widget for empty state
function EmptyState() {
    return (
        <View style={styles.emptyStateContent}>
            <Image
                source={require("@/assets/images/img_notification.png")}
                style={styles.emptyStateImage}
                resizeMode="contain"
            />
            <Text style={styles.emptyTitle}>{t("notification.empty.title")}</Text>
            <Text style={styles.emptySubtitle}>{t("notification.empty.subtitle")}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.light.scaffold,
    },
    safeArea: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
    },
    // Content

    scrollContent: {
        paddingHorizontal: scale(16),
        paddingTop: verticalScale(24),
        paddingBottom: verticalScale(24),
    },
    backButton: {
        marginLeft: scale(16),
    },
    headerText: {
        ...AppTextStyle.headline1,
        fontFamily: AeonikFonts.medium,
        color: Colors.light.mainDarkColor,
        marginBottom: scale(16),
    },
    emptyTitle: {
        ...AppTextStyle.headline4,
        fontFamily: AeonikFonts.medium,
        color: Colors.light.mainDarkColor,
        marginBottom: scale(14),
    },
    emptySubtitle: {
        ...AppTextStyle.subtitle2,
        textAlign: "center",
        fontFamily: AeonikFonts.light,
        color: Colors.light.mainDarkColor,
    },

    emptyStateContent: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },

    emptyStateImage: {
        width: scale(100),
        marginBottom: 24,
        height: scale(100),
    },

    cardSeparatorText: {
        ...AppTextStyle.bodyText1,
        fontFamily: AeonikFonts.regular,
        color: Colors.light.grey400,
        marginBottom: scale(12),
        opacity: 0.5
    },

    loadingContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
});
