import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import { AppText as Text } from "@/components/app-text";
import { Colors, Fonts } from "@/constants/theme";
import { scale, verticalScale } from "@/constants/scaling";

export function UploadPrescriptionCard() {
    return (
        <View style={styles.card}>
            <Text style={styles.title}>Upload Your Prescription</Text>
            <Text style={styles.description}>
                Upload lab tests, medical reports, or ID/Insurance if needed. Files must
                be clear and readable.
            </Text>

            <TouchableOpacity style={styles.uploadButton} activeOpacity={0.8}>
                <View style={styles.buttonContent}>
                    <Ionicons
                        name="cloud-upload-outline"
                        size={scale(16)}
                        color={Colors.light.grey600}
                    />
                    <Text style={styles.buttonText}>Select File</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: Colors.light.white,
        borderRadius: scale(16),
        padding: scale(16),
        width: "100%",
        marginBottom: scale(16),
        gap: verticalScale(8),
    },
    title: {
        fontFamily: Fonts.medium, // Aeonik Medium 500
        fontSize: scale(24),
        lineHeight: scale(29),
        color: Colors.light.text,
    },
    description: {
        fontFamily: Fonts.regular, // Aeonik Regular 400
        fontSize: scale(14),
        lineHeight: scale(22), // 160%
        color: Colors.light.mainDarkColor,
        marginBottom: verticalScale(16),
    },
    uploadButton: {
        backgroundColor: Colors.light.lightGrey, // #F2F4F7
        borderWidth: 1,
        borderStyle: "dashed",
        borderColor: Colors.light.lightGrey300, // #D0D5DD
        borderRadius: scale(12),
        height: verticalScale(48),
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
    },
    buttonContent: {
        flexDirection: "row",
        alignItems: "center",
        gap: scale(8),
    },
    buttonText: {
        fontFamily: Fonts.regular,
        fontSize: scale(14),
        color: Colors.light.mainDarkColor,
        textDecorationLine: "underline",
    },
});
