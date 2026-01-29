import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as NavigationBar from 'expo-navigation-bar';
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { Platform } from 'react-native';
import 'react-native-reanimated';
import { Provider } from 'react-redux';

import { FontAssets } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { store } from '@/store';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

function RootLayoutNav() {
  const router = useRouter();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        // Ensure consistent animations across platforms
        animation: Platform.select({
          ios: 'default',
          android: 'slide_from_right',
        }),
        // Prevent flash during navigation
        contentStyle: { backgroundColor: 'transparent' },
      }}
    >
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="upload" />
      <Stack.Screen name="select-lab-test" />
    </Stack>
  );
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [fontsLoaded, fontError] = useFonts(FontAssets);

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  // Set Android navigation bar button style for edge-to-edge experience
  // Note: setBackgroundColorAsync is not supported with edge-to-edge enabled
  // The navigation bar background is controlled by your app's content instead
  useEffect(() => {
    if (Platform.OS === 'android') {
      NavigationBar.setButtonStyleAsync('light');
    }
  }, []);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <Provider store={store}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <RootLayoutNav />
        {/* Use dark status bar on light backgrounds for better contrast */}
        <StatusBar style={Platform.OS === 'ios' ? 'dark' : 'auto'} />
      </ThemeProvider>
    </Provider>
  );
}
