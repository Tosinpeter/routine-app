import { Colors } from '@/constants/theme';
import { Stack } from 'expo-router';

export default function ProfileLayout() {
  return (
    <Stack
      screenOptions={{
        contentStyle: { backgroundColor: 'transparent' },
        animation: 'default',
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="profile-details" />
      <Stack.Screen
        name="select-gender"
        options={{
          presentation: 'formSheet',
          sheetAllowedDetents: [0.35],
          headerShown: false,
          contentStyle: { backgroundColor: Colors.light.white }
        }}
      />
      <Stack.Screen name="saved-address" />
      <Stack.Screen name="order-history" />
      <Stack.Screen name="skin-progress" />
      <Stack.Screen name="history" />
      <Stack.Screen name="doctor-review" />
      <Stack.Screen name="treatment-starts" />
      <Stack.Screen name="emergency-support" />
      <Stack.Screen name="faq" />
      <Stack.Screen name="language" />
      <Stack.Screen name="permissions" />
      <Stack.Screen name="privacy" />
      <Stack.Screen name="support" />
      <Stack.Screen name="terms" />
    </Stack>
  );
}
