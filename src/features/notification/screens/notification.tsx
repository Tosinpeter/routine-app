import React, { useCallback, useEffect } from "react";
import {
    ScrollView,
    StyleSheet,
    View
} from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";

import { AppText as Text } from "@/components/app-text";
import { ThemedView } from "@/components/themed-view";

import { ApiErrorDisplay } from "@/components/api-error-display";
import { BackButton } from "@/components/back-button";
import { Loader } from "@/components/loader";
import { scale, verticalScale } from "@/constants/scaling";
import { AeonikFonts, Colors } from "@/constants/theme";
import { AppTextStyle } from "@/constants/typography";
import { useAuth } from "@/shared/store/hooks/use-auth";
import { t } from "@/i18n";
import type { AppDispatch, RootState } from "@/shared/store";
import {
    fetchNotifications,
    markNotificationRead,
} from "@/shared/store/slices/notification-slice";
import { groupNotificationsByDate } from "@/shared/utils/date-helpers";
import { AnimatedNotificationItem } from "../components/animated-notification-item";
import { AnimatedSectionHeader } from "../components/animated-section-header";
import { NotificationEmptyState } from "../components/notification-empty-state";

export default function NotificationScreen() {
    const dispatch = useDispatch<AppDispatch>();
    const { profile } = useAuth();
    const { notifications, loading, error } = useSelector(
        (state: RootState) => state.notification
    );

    const headerFadeProgress = useSharedValue(0);

    const handleFetch = useCallback(() => {
        if (profile?.id) {
            dispatch(fetchNotifications(profile.id));
        }
    }, [dispatch, profile?.id]);

    useEffect(() => {
        handleFetch();
    }, [handleFetch]);

    useEffect(() => {
        headerFadeProgress.value = withTiming(1, { duration: 500 });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const headerFadeStyle = useAnimatedStyle(() => ({
        opacity: headerFadeProgress.value,
    }));

    const handleNotificationPress = (id: string) => {
        dispatch(markNotificationRead(id));
    };

    const groupedNotifications = groupNotificationsByDate(notifications);

    let globalIndex = 0;

    return (
        <ThemedView style={styles.container}>
            <SafeAreaView style={styles.safeArea} edges={["top"]}>

                <BackButton style={styles.backButton} />

                <View style={{ ...styles.scrollContent, flex: 1 }} >
                    <Animated.View style={headerFadeStyle}>
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
                        <NotificationEmptyState />
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
    scrollContent: {
        paddingHorizontal: scale(16),
        paddingTop: verticalScale(24),
        paddingBottom: verticalScale(24),
    },
    backButton: {
        marginStart: scale(16),
    },
    headerText: {
        ...AppTextStyle.headline1,
        fontFamily: AeonikFonts.medium,
        color: Colors.light.mainDarkColor,
        marginBottom: scale(16),
    },
    loadingContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
});
