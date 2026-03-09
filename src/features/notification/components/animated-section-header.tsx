import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet } from "react-native";

import { AppText as Text } from "@/components/app-text";
import { scale } from "@/constants/scaling";
import { AeonikFonts, Colors } from "@/constants/theme";
import { AppTextStyle } from "@/constants/typography";

interface AnimatedSectionHeaderProps {
    title: string;
    index: number;
}

export const AnimatedSectionHeader: React.FC<AnimatedSectionHeaderProps> = ({ title, index }) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            delay: index * 150,
            useNativeDriver: true,
        }).start();
    }, [fadeAnim, index]);

    return (
        <Animated.View style={{ opacity: fadeAnim }}>
            <Text style={styles.cardSeparatorText}>{title}</Text>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    cardSeparatorText: {
        ...AppTextStyle.bodyText1,
        fontFamily: AeonikFonts.regular,
        color: Colors.light.grey400,
        marginBottom: scale(12),
        opacity: 0.5,
    },
});
