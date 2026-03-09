import React from "react";
import { Platform, StyleSheet, View } from "react-native";
import type { TextInputProps } from "react-native";
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from "react-native-confirmation-code-field";
import { AppText as Text } from "@/components/app-text";
import { scale, verticalScale, moderateScale } from "@/constants/scaling";
import { AeonikFonts, Colors } from "@/constants/theme";

const DEFAULT_CELL_COUNT = 6;
const autoComplete = Platform.select<TextInputProps["autoComplete"]>({
    android: "sms-otp",
    default: "one-time-code",
});

export type OtpCodeFieldProps = {
    value: string;
    onChangeText: (value: string) => void;
    cellCount?: number;
};

export function OtpCodeField({
    value,
    onChangeText,
    cellCount = DEFAULT_CELL_COUNT,
}: OtpCodeFieldProps) {
    const codeFieldRef = useBlurOnFulfill({ value, cellCount });
    const [codeFieldProps, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue: onChangeText,
    });

    return (
        <CodeField
            ref={codeFieldRef}
            {...codeFieldProps}
            value={value}
            onChangeText={onChangeText}
            cellCount={cellCount}
            rootStyle={styles.codeFieldRoot}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            autoComplete={autoComplete}
            renderCell={({ index, symbol, isFocused }) => (
                <React.Fragment key={index}>
                    {index === 3 && (
                        <View style={styles.otpDash}>
                            <Text style={styles.otpDashText}>-</Text>
                        </View>
                    )}
                    <View
                        style={[
                            styles.otpCell,
                            isFocused && styles.otpCellFocused,
                        ]}
                        onLayout={getCellOnLayoutHandler(index)}
                    >
                        <Text style={styles.otpCellText}>
                            {symbol || (isFocused ? <Cursor /> : null)}
                        </Text>
                    </View>
                </React.Fragment>
            )}
        />
    );
}

const styles = StyleSheet.create({
    codeFieldRoot: {
        gap: scale(10),
    },
    otpCell: {
        width: scale(46),
        height: verticalScale(60),
        backgroundColor: Colors.light.white,
        borderRadius: scale(12),
        borderWidth: 1,
        borderColor: Colors.light.grey200,
        justifyContent: "center",
        alignItems: "center",
    },
    otpCellFocused: {
        borderColor: Colors.light.tint,
    },
    otpCellText: {
        fontSize: moderateScale(24),
        fontFamily: AeonikFonts.medium,
        color: Colors.light.mainDarkColor,
    },
    otpDash: {
        width: scale(20),
        height: verticalScale(60),
        justifyContent: "center",
        alignItems: "center",
    },
    otpDashText: {
        fontSize: moderateScale(24),
        fontFamily: AeonikFonts.medium,
        color: Colors.light.grey400,
    },
});
