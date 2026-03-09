import { scale } from "@/constants/scaling";
import { Colors } from "@/constants/theme";
import { Stack } from "expo-router";

export default function NotificationLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen
        name="sheet"
        options={{
          presentation: "formSheet",
          sheetAllowedDetents: [0.65],
          sheetCornerRadius: scale(24),
          contentStyle: {
            backgroundColor: Colors.light.white,
            paddingTop: scale(8),
          },
        }}
      />
    </Stack>
  );
}
