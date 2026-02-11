import { Stack } from "expo-router";
import { Platform } from "react-native";

export default function LabTestLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
                animation: Platform.select({
                    ios: 'default',
                    android: 'slide_from_right',
                }),
                contentStyle: { backgroundColor: 'transparent' },
            }}
        >
            <Stack.Screen name="index" />
        </Stack>
    );
}
