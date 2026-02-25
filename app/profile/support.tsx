import React from "react";
import { ThemedView } from "@/components/themed-view";
import { ScrollView, StyleSheet, View, Image, Pressable, Linking, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AppText as Text } from "@/components/app-text";
import { BackButton } from "@/components/back-button";
import { Colors, AeonikFonts } from "@/constants/theme";
import { scale, verticalScale } from "@/constants/scaling";
import { AppTextStyle } from "@/constants/typography";
import { t } from "@/i18n";

export default function SupportScreen() {
    const handleCallPress = () => {
        const phone = '2015550124';
        const whatsappUrl = `whatsapp://send?phone=${phone}`;
        Linking.canOpenURL(whatsappUrl)
            .then((supported) => {
                if (supported) {
                    return Linking.openURL(whatsappUrl);
                } else {
                    return Linking.openURL(`https://wa.me/${phone}`);
                }
            })
            .catch((err) => {
                Alert.alert(t("common.error"), t("support.error.callFailed"));
                console.error('Error opening WhatsApp:', err);
            });
    };

    return (
        <ThemedView style={styles.container}>
            <SafeAreaView style={styles.safeArea} edges={["top"]}>
                {/* Header */}
                <View style={styles.header}>
                    <BackButton color={Colors.light.mainDarkColor} />
                    <Text style={styles.headerTitle}>{t("profile.emergencySupport")}</Text>
                    <View style={styles.headerSpacer} />
                </View>

                {/* Content */}
                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >

                    <Pressable 
                        onPress={handleCallPress}
                        style={({ pressed }) => [
                            styles.supportCard,
                            pressed && styles.supportCardPressed
                        ]}
                    >
                        <Image
                            source={require("@/assets/images/img_whatsapp.png")}
                            style={{
                                height: scale(56), 
                                width: scale(56)
                            }}
                            resizeMode="contain"
                        />
                        <Text style={styles.supportPhone}>(201) 555-0124</Text>
                    </Pressable>
                   
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
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: scale(16),
        paddingVertical: verticalScale(8),
        backgroundColor: Colors.light.scaffold,
    },
    headerTitle: {
        ...AppTextStyle.headline4,
        fontFamily: AeonikFonts.medium,
        color: Colors.light.mainDarkColor,
        flex: 1,
        textAlign: "center",
        marginHorizontal: scale(8),
    },
    supportPhone: {
        ...AppTextStyle.headline4,
        textAlign: 'center',
        alignItems: 'center',
        fontFamily: AeonikFonts.medium,
        color: Colors.light.mainDarkColor,
    },
    headerSpacer: {
        width: scale(40),
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        padding: scale(20),
        paddingBottom: verticalScale(40),
    },
    subtitleContainer: {
        marginBottom: verticalScale(24),
    },

    supportCard: {
        gap: scale(20),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.light.white,
        borderRadius: scale(16),
        padding: scale(22)
    },
    supportCardPressed: {
        opacity: 0.7,
        transform: [{ scale: 0.98 }]
    }
    
});
