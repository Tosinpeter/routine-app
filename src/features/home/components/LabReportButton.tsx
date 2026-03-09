import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { HospitalIcon } from "@/components/icons";
import { AppText as Text } from "@/components/app-text";
import { AeonikFonts, Colors } from "@/constants/theme";
import { scale, verticalScale } from "@/constants/scaling";
import { t } from "@/i18n";

export function LabReportButton() {
    return (
        <TouchableOpacity
            style={styles.container}
            activeOpacity={0.8}
            accessibilityRole="button"
            accessibilityLabel={t("home.labReport.accessibilityLabel")}
            accessibilityHint={t("home.labReport.accessibilityHint")}
        >
            <View style={styles.leftContent}>
                {/* Home Icon in Circle */}
                <View style={styles.iconContainer}>
                    <HospitalIcon width={scale(24)} height={scale(24)} color={Colors.light.tint} />
                </View>
                <Text style={styles.label}>{t("home.labReport.title")}</Text>
            </View>

            <View style={styles.rightContent}>
                <Ionicons name="chevron-forward" size={scale(20)} color={Colors.light.grey400} />
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: Colors.light.white,
        borderRadius: scale(100), // Fully rounded
        paddingHorizontal: scale(16),
        paddingVertical: verticalScale(16), // Adjusted to 16 for Rule 15 (was 14)
        width: "100%",
        height: verticalScale(56), // Adjusted height to accommodate padding (was 52)
    },
    leftContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: scale(16), // Adjusted to 16 for Rule 15 (was 12)
    },
    iconContainer: {
        width: scale(24),
        height: scale(24),
        justifyContent: 'center',
        alignItems: 'center',
    },
    label: {
        fontFamily: AeonikFonts.regular,
        fontSize: scale(16),
        color: Colors.light.mainDarkColor,
    },
    rightContent: {

    }
});
