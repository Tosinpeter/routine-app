import { router } from "expo-router";
import React from "react";
import {
    StatusBar,
    StyleSheet,
    View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";

import { AppText as Text } from "@/components/app-text";
import { PrimaryButton } from "@/components/primary-button";
import { moderateScale, scale, SCREEN_WIDTH, tabBarHeight, verticalScale } from "@/constants/scaling";
import { AeonikFonts, Colors } from "@/constants/theme";
import { AppTextStyle } from "@/constants/typography";
import { ThemedView } from "@/components/themed-view";
import { FaceIcon } from "@/components/icons";

export default function StartAnalysisScreen() {
    const handleContinue = () => {
        router.push('/cookie-policy');
    };
    return (
        <ThemedView style={styles.container}>
                <Image
                    source={require("@/assets/images/BackgroundImage.png")}
                    style={styles.backgroundImage}
                    contentFit="fill"
            />
            <LinearGradient
                colors={['rgba(228, 214, 203, 0)', 'rgba(32, 32, 30, 0.23)']}
                style={styles.gradientOverlay}
            />
            
            <View style={styles.content}>
                <Text style={styles.title}>{"Analyze your\nskin now."}</Text>

                <PrimaryButton
                    title="Start Analysis"
                    icon={<FaceIcon color="#FFFFFF"/>}
                    onPress={handleContinue}
                />

                <Text style={styles.brand}>{"Powered by Gloord"}</Text>
            </View>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.light.scaffold, // #EDEBE3
    },
   
    backgroundImage: { 
        position: "absolute",
        width: SCREEN_WIDTH,
        height: '100%',
    },

    gradientOverlay: {
        position: "absolute",
        width: SCREEN_WIDTH,
        height: '100%',
    },

    content: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: scale(16),
        paddingBottom: verticalScale(40),
    }, 

    title: {
        fontSize: moderateScale(48),
        textAlign: 'center',
        color: Colors.light.white,
        marginBottom: scale(40),
        fontFamily: AeonikFonts.medium,
    }, 
    brand: {
        ...AppTextStyle.bodyText1, 
        color: '#FCFCFD', 
        marginTop: scale(16),
        alignSelf: 'center',
    }
});
