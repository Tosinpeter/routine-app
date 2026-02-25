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
        name="add-card"
        options={{
          presentation: "formSheet",
          sheetAllowedDetents: "fitToContents",

          contentStyle: { backgroundColor: Colors.light.scaffold },
        }}
      />
      <Stack.Screen
        name="apply-coupon"
        options={{
          presentation: "formSheet",
          sheetAllowedDetents: [0.32],
          contentStyle: { backgroundColor: Colors.light.scaffold },
        }}
      />
      <Stack.Screen
        name="creating-order"
        options={{
          presentation: "formSheet",
          sheetAllowedDetents: [0.25],
          contentStyle: { backgroundColor: Colors.light.white },
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="order-error"
        options={{
          presentation: "formSheet",
          sheetAllowedDetents: "fitToContents",
          contentStyle: { backgroundColor: Colors.light.white },
        }}
      />
      <Stack.Screen
        name="order-sheet"
        options={{
          presentation: "formSheet",
          sheetAllowedDetents: "fitToContents",
          gestureEnabled: false,
          contentStyle: { backgroundColor: Colors.light.white },
        }}
      />
      <Stack.Screen
        name="order-tracking"
        options={{
          contentStyle: { backgroundColor: Colors.light.white },
        }}
      />

      {/* <Stack.Screen
        name="order-success"
        options={{
          contentStyle: { backgroundColor: Colors.light.white },
        }}
      /> */}
    </Stack>
  );
}
