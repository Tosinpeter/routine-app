import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Svg, { Path, G, Mask, Defs, ClipPath, Rect } from "react-native-svg";
import { useRouter } from "expo-router";

import { AppText as Text } from "@/components/app-text";
import { Colors, Fonts } from "@/constants/theme";
import { scale, verticalScale } from "@/constants/scaling";

function SupportIcon() {
    return (
        <Svg width={scale(24)} height={scale(24)} viewBox="0 0 24 24" fill="none">
            <G clipPath="url(#clip0_44_9319)">
                <Mask id="mask0_44_9319" style={{ maskType: "luminance" }} maskUnits="userSpaceOnUse" x="0" y="0" width="25" height="25">
                    <Path d="M0.0371094 0.431641H24.0371V24.4316H0.0371094V0.431641Z" fill="white" />
                </Mask>
                <G mask="url(#mask0_44_9319)">
                    <Mask id="mask1_44_9319" style={{ maskType: "luminance" }} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="25">
                        <Path d="M23.8416 0.525391H0.234375V24.1318H23.8408L23.8416 0.525391Z" fill="white" />
                    </Mask>
                    <G mask="url(#mask1_44_9319)">
                        <Path d="M11.5463 2.49219C6.93315 2.49219 3.18555 6.23939 3.18555 10.8526C3.18555 15.4658 6.93315 19.2134 11.5463 19.2134H12.0383V22.1642C16.8183 19.8626 19.9067 15.279 19.9067 10.8526C19.9067 6.23939 16.1591 2.49219 11.5463 2.49219ZM12.5299 16.7542H10.5627V14.787H12.5299V16.7542ZM12.5299 13.3118H10.5627C10.5627 10.115 13.5135 10.361 13.5135 8.39379C13.5123 7.87244 13.3046 7.37281 12.936 7.00417C12.5673 6.63552 12.0677 6.42786 11.5463 6.42659C11.025 6.42786 10.5254 6.63552 10.1567 7.00417C9.78808 7.37281 9.58041 7.87244 9.57915 8.39379H7.61155C7.61139 7.87704 7.71306 7.36532 7.91075 6.88788C8.10844 6.41044 8.39828 5.97663 8.7637 5.61125C9.12911 5.24587 9.56295 4.95608 10.0404 4.75844C10.5179 4.5608 11.0296 4.45918 11.5463 4.45939C12.0631 4.45923 12.5747 4.56089 13.0522 4.75855C13.5296 4.95622 13.9634 5.24602 14.3287 5.61139C14.6941 5.97677 14.9839 6.41056 15.1816 6.88797C15.3792 7.36539 15.4809 7.87707 15.4807 8.39379C15.4807 10.8526 12.5299 11.0986 12.5299 13.3118Z" fill="#CF604A" />
                    </G>
                </G>
            </G>
            <Defs>
                <ClipPath id="clip0_44_9319">
                    <Rect width="24" height="24" fill="white" />
                </ClipPath>
            </Defs>
        </Svg>
    );
}

export function ContactSupportButton() {
    const router = useRouter();

    const handlePress = () => {
        router.push('/profile/support');
    };

    return (
        <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={handlePress}>
            <View style={styles.leftContent}>
                <SupportIcon />
                <Text style={styles.text}>Contact Support</Text>
            </View>

            <Ionicons name="chevron-forward" size={scale(20)} color={Colors.light.grey400} />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: Colors.light.white,
        borderRadius: scale(100),
        paddingHorizontal: scale(24),
        paddingVertical: verticalScale(14),
        width: "100%",
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: scale(32) // Space at bottom
    },
    leftContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: scale(12)
    },
    text: {
        fontFamily: Fonts.regular,
        fontSize: scale(16),
        color: Colors.light.mainDarkColor
    }
});
