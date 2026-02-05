import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { HospitalIcon } from "@/components/icons";
import { AppText as Text } from "@/components/app-text";
import { Colors } from "@/constants/theme";
import { scale, verticalScale } from "@/constants/scaling";

export function LabReportButton() {
    return (
        <TouchableOpacity
            style={styles.container}
            activeOpacity={0.8}
            accessibilityRole="button"
            accessibilityLabel="Show Lab test Report"
            accessibilityHint="Navigates to the lab test report details"
        >
            <View style={styles.leftContent}>
                {/* Home Icon in Circle */}
                <View style={styles.iconContainer}>
                    <HospitalIcon width={scale(24)} height={scale(24)} color={Colors.light.tint} />
                </View>
                <Text style={styles.label}>Show Lab test Report</Text>
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
        fontFamily: 'Aeonik-Regular',
        fontSize: scale(16),
        color: Colors.light.mainDarkColor,
    },
    rightContent: {

    }
});
