import { t } from "@/i18n";
import type { AppNotification } from "@/shared/store/slices/notification-slice";

const getLocalizedShortMonths = () => [
    t("months.short.jan"), t("months.short.feb"), t("months.short.mar"),
    t("months.short.apr"), t("months.short.may"), t("months.short.jun"),
    t("months.short.jul"), t("months.short.aug"), t("months.short.sep"),
    t("months.short.oct"), t("months.short.nov"), t("months.short.dec"),
];

export const formatDateTime = (timestamp: string): string => {
    const date = new Date(timestamp);
    const months = getLocalizedShortMonths();
    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? t("notification.time.pm") : t("notification.time.am");
    const displayHours = hours % 12 || 12;

    return `${month} ${day} ${year}, ${displayHours}:${minutes} ${ampm}`;
};

export const getTimeAgo = (timestamp: string): string => {
    const now = new Date();
    const notificationTime = new Date(timestamp);

    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const notificationDay = new Date(
        notificationTime.getFullYear(),
        notificationTime.getMonth(),
        notificationTime.getDate()
    );

    if (notificationDay.getTime() !== today.getTime()) {
        return formatDateTime(timestamp);
    }

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

export const groupNotificationsByDate = (notifications: AppNotification[]) => {
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

    const months = getLocalizedShortMonths();

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
            const groupKey = `${notificationDate.getDate()} ${months[notificationDate.getMonth()]} ${notificationDate.getFullYear()}`;
            if (!groups[groupKey]) {
                groups[groupKey] = [];
            }
            groups[groupKey].push(notification);
        }
    });

    Object.keys(groups).forEach((key) => {
        if (groups[key].length === 0) {
            delete groups[key];
        }
    });

    return groups;
};
