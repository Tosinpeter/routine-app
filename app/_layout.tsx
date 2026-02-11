import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as NavigationBar from 'expo-navigation-bar';
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import 'react-native-reanimated';
import { Provider } from 'react-redux';

import { AnimatedSplashScreen } from '@/components/splash-screen';
import { scale } from '@/constants/scaling';
import { Colors, FontAssets } from '@/constants/theme';
import { AppDataProvider } from '@/contexts/AppDataProvider';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { store } from '@/store';
import { hasCompletedOnboarding } from '@/utils/onboarding';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

function RootLayoutNav() {
  const router = useRouter();
  const [hasNavigated, setHasNavigated] = useState(false);

  useEffect(() => {

    if (!hasNavigated) {
      // Delay showing the notification sheet after component mounts
      const timer = setTimeout(() => {
        router.push('/notification-sheet');
        setHasNavigated(true);
      }, 1000); // 2 second delay

      return () => clearTimeout(timer);
    }


    // const checkOnboardingStatus = async () => {
    //   if (!hasNavigated) {
    //     try {
    //       const onboardingCompleted = await hasCompletedOnboarding();
          
    //       // Small delay for smooth transition
    //       setTimeout(() => {
    //         if (onboardingCompleted) {
    //           // User has completed onboarding, go to main app
    //           router.replace('/(tabs)');
    //         } else {
    //           // First time user, show onboarding
    //           router.push('/onboarding');
    //         }
    //         setHasNavigated(true);
    //       }, 500);
    //     } catch (error) {
    //       console.error("Error checking onboarding status:", error);
    //       // Default to showing onboarding if there's an error
    //       router.push('/onboarding');
    //       setHasNavigated(true);
    //     }
    //   }
    // };

    // checkOnboardingStatus();
  }, [hasNavigated]);

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: 'transparent' },
        animation: 'default',
      }}
    >
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="onboarding" />
      <Stack.Screen name="upload" />
      <Stack.Screen name="select-lab-test" />
      <Stack.Screen name="lab-test" />
      <Stack.Screen name="notification" />
      <Stack.Screen name="payment" />
      <Stack.Screen name="order" />
      <Stack.Screen name="profile" />
      <Stack.Screen name="notification-sheet"
        options={{
          presentation: 'formSheet',
          sheetAllowedDetents: [0.65],
          sheetCornerRadius: scale(24),
          contentStyle: {
            backgroundColor: Colors.light.white,
            paddingTop: scale(8),
          }
        }}
      />
    </Stack>
  );
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [fontsLoaded, fontError] = useFonts(FontAssets);
  const [showSplash, setShowSplash] = useState(true);
  const [assetsReady, setAssetsReady] = useState(false);

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
      setAssetsReady(true);
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

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <Provider store={store}>
      <AppDataProvider>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          {!showSplash && <RootLayoutNav />}
          {/* Use dark status bar on light backgrounds for better contrast */}
          <StatusBar style={Platform.OS === 'ios' ? 'dark' : 'auto'} />

          {/* Show custom splash screen when assets are ready */}
          {showSplash && assetsReady && (
            <AnimatedSplashScreen onComplete={handleSplashComplete} />
          )}
        </ThemeProvider>
      </AppDataProvider>
    </Provider>
  );
}
