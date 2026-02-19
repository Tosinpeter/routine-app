import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as NavigationBar from 'expo-navigation-bar';
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { Toasts } from '@backpackapp-io/react-native-toast';
import 'react-native-reanimated';
import { Provider } from 'react-redux';
import * as Notifications from 'expo-notifications';
import { PressablesConfig } from 'pressto';
import * as Haptics from 'expo-haptics';
import { scale } from '@/constants/scaling';
import { Colors, FontAssets } from '@/constants/theme';
import { AppDataProvider } from '@/contexts/AppDataProvider';
import { AuthProvider } from '@/contexts/AuthContext';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { store } from '@/store';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

SplashScreen.preventAutoHideAsync();

function RootLayoutNav() {
  const router = useRouter();
  const [hasNavigated, setHasNavigated] = useState(false);

  useEffect(() => {
    const checkNotificationPermission = async () => {
      if (!hasNavigated) {
        try {
          const { status } = await Notifications.getPermissionsAsync();
          
          const timer = setTimeout(() => {
            if (status !== 'granted') {
              router.push('/notification-sheet');
            }
            setHasNavigated(true);
          }, 1000);

          return () => clearTimeout(timer);
        } catch (error) {
          console.error("Error checking notification permission:", error);
          setHasNavigated(true);
        }
      }
    };

    checkNotificationPermission();
  }, [hasNavigated]);

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: 'transparent' },
        animation: 'default',
      }}
    >
      <Stack.Screen name="index" options={{ animation: 'none' }} />
      <Stack.Screen name="(tabs)" options={{ animation: 'none' }} />
      <Stack.Screen name="onboarding" />
      <Stack.Screen name="upload" />
      <Stack.Screen name="select-lab-test" />
      <Stack.Screen name="lab-test" />
      <Stack.Screen name="notification" />
      <Stack.Screen name="payment" />
      <Stack.Screen name="order" />
      <Stack.Screen name="profile" />
      <Stack.Screen name="treatment-plan" />
      <Stack.Screen name="photo-prep" />
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

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

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
      <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <AppDataProvider>
          <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <PressablesConfig
              globalHandlers={{
                onPress: () => {
                  Haptics.selectionAsync();
                },
              }}
            >
              <RootLayoutNav />
            </PressablesConfig>
            <StatusBar style={Platform.OS === 'ios' ? 'dark' : 'auto'} />
            <Toasts />
          </ThemeProvider>
        </AppDataProvider>
        </AuthProvider>
        </GestureHandlerRootView>
    </Provider>
  );
}
