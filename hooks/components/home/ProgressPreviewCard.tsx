import { Image, ImageBackground, StyleSheet, View } from "react-native";
import { BlurView } from "expo-blur";
import { AppText as Text } from "@/components/app-text";
import { Fonts } from "@/constants/theme";
import { scale, verticalScale } from "@/constants/scaling";
import { t } from "@/i18n";

export function ProgressPreviewCard() {
    return (
        <View style={styles.wrapper}>
            <View style={styles.container}>
                {/* Background Image */}
                <ImageBackground
                    source={require("@/assets/images/progress-preview-bg.png")}
                    style={styles.backgroundImage}
                    resizeMode="cover"
                    blurRadius={2} //control the blur 
                    imageStyle={{ borderRadius: scale(12) }}
                >
                    {/* Blur Overlay */}
                    <BlurView intensity={100} style={styles.blurOverlay} tint="dark">
                        <View style={styles.overlayColor} />

                        <View style={styles.contentContainer}>
                            {/* Lock Container */}
                            <View style={styles.lockContainer}>
                                {/* Golden Lock Image */}
                                <Image
                                    source={require("@/assets/images/golden-lock.png")}
                                    style={{ width: scale(72), height: scale(72) }} // Adjust size as needed, starting with 40x40
                                    resizeMode="contain"
                                />
                            </View>

                            {/* Text Container */}
                            <View style={styles.textContainer}>
                                <Text style={styles.subtitle}>{t("home.progressPreview.subtitle")}</Text>
                                <Text style={styles.description}>{t("home.progressPreview.unlocksIn", { days: 12 })}</Text>
                            </View>
                        </View>
                    </BlurView>
                </ImageBackground>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        marginBottom: scale(24),
        width: '100%',
    },
    container: {
        width: "100%", // Fit parent width
        height: verticalScale(180),
        borderRadius: scale(16),
        overflow: 'hidden',
    },
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    blurOverlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
    },
    overlayColor: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.38)',
    },
    contentContainer: {
        alignItems: 'center',
        gap: scale(8),
    },
    lockContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: scale(72),
        height: scale(62),
        // Placeholder sizing
        marginBottom: scale(8),
    },
    textContainer: {
        alignItems: 'center',
        gap: scale(8),
    },
    subtitle: {
        fontFamily: Fonts.medium, // Aeonik Medium
        fontSize: scale(20),
        lineHeight: scale(24), // 120%
        textAlign: 'center',
        color: '#FFFFFF',
    },
    description: {
        fontFamily: Fonts.regular, // Aeonik Regular
        fontSize: scale(16),
        lineHeight: scale(16), // 100%
        textAlign: 'center',
        color: '#FFFFFF',
    }
});
