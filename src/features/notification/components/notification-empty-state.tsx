import React from "react";
import { Image, StyleSheet, View } from "react-native";

import { AppText as Text } from "@/components/app-text";
import { scale } from "@/constants/scaling";
import { AeonikFonts, Colors } from "@/constants/theme";
import { AppTextStyle } from "@/constants/typography";
import { t } from "@/i18n";

export function NotificationEmptyState() {
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
    emptyStateContent: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    emptyStateImage: {
        width: scale(100),
        marginBottom: 24,
        height: scale(100),
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
});
