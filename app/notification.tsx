import {
    Animated,
    Image,
    ScrollView,
    StyleSheet,
    View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useRef, useState } from "react";

import { AppText as Text } from "@/components/app-text";
import { ThemedView } from "@/components/themed-view";

import { ApiErrorDisplay } from "@/components/api-error-display";
import { BackButton } from "@/components/back-button";
import { NotificationCard } from "@/components/notification-card";
import { moderateScale, scale, verticalScale } from "@/constants/scaling";
import { AeonikFonts, Colors } from "@/constants/theme";
import { AppTextStyle } from "@/constants/typography";
import { HealthIcon } from "@/components/icons/health-icon";
import { ConicalFlaskIcon } from "@/components/icons/conical-flask-icon";
import { CubeIcon } from "@/components/icons/cube-icon";
import { MoonIcon } from "@/components/icons/moon-icon";
import { Loader } from "@/components/loader";

// Notification type
interface Notification {
    id: string;
    title: string;
    subtitle: string;
    timestamp: string; // ISO format
    notificationType: "prescription_ready" | "review_completed" | "night_routine" | "order_shipped";
    isRead: boolean;
}

// Helper function to get icon component and color
const getIconComponent = (notificationType: Notification["notificationType"]) => {
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
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "pm" : "am";
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
        return "Just now";
    } else if (diffInMinutes < 60) {
        return diffInMinutes === 1 ? "1 minute ago" : `${diffInMinutes} minutes ago`;
    } else if (diffInHours < 24) {
        return diffInHours === 1 ? "1 hour ago" : `${diffInHours} hours ago`;
    } else {
        return "Today";
    }
};

// Helper function to group notifications by date
const groupNotificationsByDate = (notifications: Notification[]) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const weekStart = new Date(today);
    weekStart.setDate(weekStart.getDate() - 7);

    const groups: { [key: string]: Notification[] } = {
        Today: [],
        Yesterday: [],
        "This Week": [],
    };

    notifications.forEach((notification) => {
        const notificationDate = new Date(notification.timestamp);
        const notificationDay = new Date(
            notificationDate.getFullYear(),
            notificationDate.getMonth(),
            notificationDate.getDate()
        );

        if (notificationDay.getTime() === today.getTime()) {
            groups.Today.push(notification);
        } else if (notificationDay.getTime() === yesterday.getTime()) {
            groups.Yesterday.push(notification);
        } else if (notificationDay >= weekStart) {
            groups["This Week"].push(notification);
        } else {
            // Format as "2 Dec 2021"
            const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
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
    notification: Notification;
    index: number;
}

const AnimatedNotificationItem: React.FC<AnimatedNotificationItemProps> = ({ notification, index }) => {
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

    const { icon, color } = getIconComponent(notification.notificationType);

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
                date={getTimeAgo(notification.timestamp)}
                icon={icon}
                iconBackgroundColor={color}
                showUnreadIndicator={!notification.isRead}
                onPress={() => console.log(`Notification ${notification.id} pressed`)}
            />
        </Animated.View>
    );
};

export default function NotificationScreen() {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    const headerFadeAnim = useRef(new Animated.Value(0)).current;
    
    // Fetch notifications from API
    const fetchNotifications = async () => {
        try {
            setIsLoading(true);
            setError(null);
            
            // To test error state, add ?error=true to the URL
            // Example: const response = await fetch('/api/notification?error=true');
            const response = await fetch('/api/notification');
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            setNotifications(data);
        } catch (err) {
            console.error('Error fetching notifications:', err);
            setError(err instanceof Error ? err.message : 'Failed to load notifications');
        } finally {
            setIsLoading(false);
        }
    };
    
    useEffect(() => {
        fetchNotifications();
    }, []);
    
    useEffect(() => {
        Animated.timing(headerFadeAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start();
    }, [headerFadeAnim]);
    
    const groupedNotifications = groupNotificationsByDate(notifications);
    
    // Calculate global index for staggered animations across groups
    let globalIndex = 0;
    
    return (
        <ThemedView style={styles.container}>
            <SafeAreaView style={styles.safeArea}>

                {/* Back Button */}
                <BackButton style={styles.backButton} />

                {/* Content */}
                <View style={{ ...styles.scrollContent, flex: 1 }} >
                    <Animated.View style={{ opacity: headerFadeAnim }}>
                        <Text style={styles.headerText}>Notification</Text>
                    </Animated.View>

                    {isLoading ? (
                        <View style={styles.loadingContainer}>
                            <Loader size={70} />
                        </View>
                    ) : error ? (
                        <ApiErrorDisplay
                            title="Oops!"
                            errorMessage="Failed to load notifications"
                            description={error || "We're having trouble loading your notifications. Please try again."}
                            onRetry={fetchNotifications}
                            showRetryButton={true}
                        />
                    ) : notifications.length === 0 ? (
                        <EmptyState />
                    ) : (
                        <ScrollView style={styles.scrollView}
                            showsVerticalScrollIndicator={false}>
                                {Object.entries(groupedNotifications).map(([groupName, notifications], groupIndex) => {
                                    const sectionStartIndex = globalIndex;
                                    globalIndex += notifications.length;
                                    
                                    return (
                                        <React.Fragment key={groupName}>
                                            <AnimatedSectionHeader title={groupName} index={groupIndex} />
                                            <View style={{ 
                                                gap: scale(12), 
                                                marginBottom: groupIndex === Object.keys(groupedNotifications).length - 1 
                                                    ? 0 
                                                    : verticalScale(24) 
                                            }}>
                                                {notifications.map((notification, notificationIndex) => (
                                                    <AnimatedNotificationItem
                                                        key={notification.id}
                                                        notification={notification}
                                                        index={sectionStartIndex + notificationIndex}
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
            <Text style={styles.emptyTitle}>Nothing here!!</Text>
            <Text style={styles.emptySubtitle}>{"We'll let you know when we've got\nsomething new for you."}</Text>
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
