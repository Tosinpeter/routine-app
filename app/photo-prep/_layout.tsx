import { Colors } from "@/constants/theme";
import { Stack } from "expo-router";

export default function PhotoPrepLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
                contentStyle: { backgroundColor: "transparent" },
                animation: "default",
            }}
        >
            <Stack.Screen name="index" />
            <Stack.Screen name="preview" />
            <Stack.Screen name="scan-result" />
            <Stack.Screen name="analyze-sheet"
                options={{
                    contentStyle: { backgroundColor: Colors.light.white },
                    presentation: "formSheet",
                    sheetAllowedDetents: [0.25],
                    gestureEnabled: false,
                }}
            />
        </Stack>
    );
}
