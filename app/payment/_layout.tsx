import { Colors } from "@/constants/theme";
import { Stack } from "expo-router";

export default function PaymentLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: Colors.light.scaffold },
        animation: "default",
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="delivery-form" />
      <Stack.Screen name="checkout-summary" />
      <Stack.Screen
        name="apply-coupon"
        options={{
          presentation: "formSheet",
          sheetAllowedDetents: [0.32],
          contentStyle: { backgroundColor: Colors.light.scaffold },
        }}
      />
    </Stack>
  );
}
