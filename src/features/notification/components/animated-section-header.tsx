import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withTiming } from "react-native-reanimated";

import { AppText as Text } from "@/components/app-text";
import { scale } from "@/constants/scaling";
import { AeonikFonts, Colors } from "@/constants/theme";
import { AppTextStyle } from "@/constants/typography";

interface AnimatedSectionHeaderProps {
    title: string;
    index: number;
}

export const AnimatedSectionHeader: React.FC<AnimatedSectionHeaderProps> = ({ title, index }) => {
    const fadeProgress = useSharedValue(0);

    useEffect(() => {
        fadeProgress.value = withDelay(index * 150, withTiming(1, { duration: 500 }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [index]);

    const fadeStyle = useAnimatedStyle(() => ({
        opacity: fadeProgress.value,
    }));

    return (
        <Animated.View style={fadeStyle}>
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
