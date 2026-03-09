import {
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
    Alert,
    ActivityIndicator
} from "react-native";
import { Image } from "expo-image";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from "react";
import { Paths, File } from 'expo-file-system';
import * as Sharing from 'expo-sharing';

import { AppText as Text } from "@/components/app-text";
import { ThemedView } from "@/components/themed-view";
import { BackButton } from "@/components/back-button";
import { moderateScale, scale, verticalScale } from "@/constants/scaling";
import { AeonikFonts, Colors } from "@/constants/theme";
import { AppTextStyle } from "@/constants/typography";
import { WarningIcon } from "@/components/icons/warning-icon";
import { t } from "@/i18n";

const PDF_URL = "https://ontheline.trincoll.edu/images/bookdown/sample-local-pdf.pdf";

export default function LabTestScreen() {
    const [isDownloading, setIsDownloading] = useState(false);

    const handleDownloadPDF = async () => {
        try {
            setIsDownloading(true);

            // Create a file reference in the document directory
            const fileName = `lab-test-${Date.now()}.pdf`;
            const destinationFile = new File(Paths.document, fileName);

            // Download the PDF using the static method
            const downloadedFile = await File.downloadFileAsync(PDF_URL, destinationFile, {
                idempotent: true // Overwrite if file exists
            });

            // Check if sharing is available
            const isAvailable = await Sharing.isAvailableAsync();
            
            if (isAvailable) {
                // Share the downloaded file (allows user to save to Files, etc.)
                await Sharing.shareAsync(downloadedFile.uri, {
                    mimeType: 'application/pdf',
                    dialogTitle: t("labTest.download.dialogTitle"),
                    UTI: 'com.adobe.pdf'
                });
            } else {
                Alert.alert(
                    t("labTest.download.completeTitle"),
                    t("labTest.download.completeMessage"),
                    [{ text: t("common.ok") }]
                );
            }
        } catch (error) {
            console.error("Error downloading PDF:", error);
            Alert.alert(
                t("labTest.download.failedTitle"),
                t("labTest.download.failedMessage"),
                [{ text: t("common.ok") }]
            );
        } finally {
            setIsDownloading(false);
        }
    };

    return (
        <ThemedView style={styles.container}>
            <SafeAreaView edges={['top', 'left', 'right']} style={[styles.safeArea]}>
                {/* Back Button */}
                <BackButton style={styles.backButton} />

                {/* Content */}
                <ScrollView 
                    style={styles.scrollView}
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Header */}
                    <Text style={styles.headerText}>{t("labTest.title")}</Text>
                    <Text style={styles.subtitleText}>
                        {t("labTest.subtitle")}
                    </Text>

                    {/* Lab Test Card */}
                    <Image
                        source={require("@/assets/images/DocumentPreviewCard.webp")}
                        style={styles.documentCard}
                        contentFit="contain"
                        cachePolicy="memory-disk"
                    />
                    {/* Download Button */}
                    <TouchableOpacity 
                        style={[
                            styles.downloadButton,
                            isDownloading && styles.downloadButtonDisabled
                        ]}
                        onPress={handleDownloadPDF}
                        activeOpacity={0.8}
                        disabled={isDownloading}
                    >
                        {isDownloading ? (
                            <View style={styles.downloadButtonContent}>
                                <ActivityIndicator color={Colors.light.white} size="small" />
                                <Text style={styles.downloadButtonText}>{t("labTest.downloading")}</Text>
                            </View>
                        ) : (
                            <Text style={styles.downloadButtonText}>{t("labTest.downloadPdf")}</Text>
                        )}
                    </TouchableOpacity>

                    {/* Warning Message */}
                    <View style={styles.warningContainer}>
                        <WarningIcon size={24} color={Colors.light.warning} />
                        <Text style={styles.warningMessage}>
                            {t("labTest.warningPrefix")}<Text style={styles.warningBold}>{t("labTest.warningBoldPresent")}</Text>{t("labTest.warningMiddle")}
                            <Text style={styles.warningBold}>{t("labTest.warningBoldPharmacist")}</Text>{t("labTest.warningSuffix")}
                        </Text>
                    </View>
                </ScrollView>
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
        paddingHorizontal: scale(20),
        paddingTop: verticalScale(16),
        paddingBottom: verticalScale(40),
    },
    backButton: {
        marginStart: scale(16),
        marginTop: verticalScale(8),
    },
    headerText: {
        ...AppTextStyle.headline1,
        fontFamily: AeonikFonts.medium,
        textAlign: 'center',
        color: Colors.light.mainDarkColor,
        marginBottom: verticalScale(8),
    },
    subtitleText: {
        ...AppTextStyle.bodyText1,
        fontFamily: AeonikFonts.regular,
        color: Colors.light.mainDarkColor,
        opacity: 0.7,
        marginBottom: verticalScale(52),
        textAlign: "center",
    },
    labTestCard: {
        backgroundColor: Colors.light.white,
        borderRadius: scale(6),
        padding: scale(24),
        marginBottom: verticalScale(24),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    labTestTitle: {
        fontSize: moderateScale(32),
        fontFamily: AeonikFonts.bold,
        color: Colors.light.mainDarkColor,
        letterSpacing: 2,
        marginBottom: verticalScale(24),
    },
    infoRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: verticalScale(32),
        paddingBottom: verticalScale(20),
        borderBottomWidth: 1,
        borderBottomColor: "#E5E5E5",
    },
    infoColumn: {
        flex: 1,
    },
    doctorColumn: {
        flex: 1,
        alignItems: "flex-end",
    },
    infoLabel: {
        fontSize: moderateScale(16),
        fontFamily: AeonikFonts.regular,
        color: Colors.light.mainDarkColor,
        marginBottom: verticalScale(8),
    },
    signatureText: {
        fontSize: moderateScale(24),
        fontFamily: AeonikFonts.regular,
        color: Colors.light.mainDarkColor,
        fontStyle: "italic",
        opacity: 0.6,
    },
    signatureLabel: {
        fontSize: moderateScale(12),
        fontFamily: AeonikFonts.regular,
        color: Colors.light.mainDarkColor,
        opacity: 0.5,
        marginTop: verticalScale(4),
    },
    productSection: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: verticalScale(24),
    },
    productIcon: {
        width: scale(48),
        height: scale(48),
        borderRadius: scale(24),
        backgroundColor: Colors.light.mainDarkColor,
        alignItems: "center",
        justifyContent: "center",
        marginEnd: scale(12),
    },
    productIconText: {
        fontSize: moderateScale(24),
        fontFamily: AeonikFonts.bold,
        color: Colors.light.white,
    },
    productText: {
        fontSize: moderateScale(18),
        fontFamily: AeonikFonts.medium,
        color: Colors.light.mainDarkColor,
    },
    barcodeContainer: {
        alignItems: "flex-end",
        marginBottom: verticalScale(24),
    },
    barcode: {
        flexDirection: "row",
        alignItems: "center",
        gap: 2,
        opacity: 0.3,
    },
    barcodeLine: {
        height: scale(40),
        backgroundColor: Colors.light.mainDarkColor,
    },
    warningsText: {
        fontSize: moderateScale(14),
        fontFamily: AeonikFonts.regular,
        color: Colors.light.mainDarkColor,
        opacity: 0.5,
    },
    downloadButton: {
        backgroundColor: "#CF604A",
        borderRadius: scale(100),
        paddingVertical: verticalScale(18),
        alignItems: "center",
        marginBottom: verticalScale(20),
        shadowColor: "#C85A54",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    downloadButtonDisabled: {
        backgroundColor: "#CF604A",
        opacity: 0.7,
    },
    downloadButtonContent: {
        flexDirection: "row",
        alignItems: "center",
        gap: scale(8),
    },
    downloadButtonText: {
        fontSize: moderateScale(16),
        fontFamily: AeonikFonts.medium,
        color: Colors.light.white,
    },
    warningContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: scale(11),
        paddingHorizontal: scale(24),
    },
    warningIcon: {
        marginEnd: scale(8),
        marginTop: scale(2),
    },
    warningMessage: {
        flex: 1,
        fontSize: moderateScale(13),
        color: Colors.light.grey700,
        opacity: 0.7,
        lineHeight: moderateScale(20),
    },
    warningBold: {
        fontWeight: 600,
    },
    documentCard: {
        height: scale(380), 
        alignSelf: 'center',
        marginBottom: verticalScale(52),
        width: scale(361)
    },
});
