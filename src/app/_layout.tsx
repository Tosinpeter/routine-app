import { FontAssets } from '@/constants/theme';
import { useOnboarding } from '@/features/onboarding/hooks/useOnboarding';
import { t } from '@/i18n';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useAuth } from '@/shared/store/hooks/use-auth';
import { loadLanguage, selectLayoutKey } from '@/shared/store/slices/app-data-slice';
import { loadSession } from '@/shared/store/slices/session-slice';
import { store } from '@/shared/store';
import { createNotification, fetchNotifications } from '@/shared/store/slices/notification-slice';
import { useAppDispatch, useAppSelector } from '@/shared/store/hooks';
import { Toasts } from '@backpackapp-io/react-native-toast';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as Haptics from 'expo-haptics';
import * as NavigationBar from 'expo-navigation-bar';
import * as Notifications from 'expo-notifications';
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { PressablesConfig } from 'pressto';
import { useEffect, useRef } from 'react';
import { Platform, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';
import { Provider } from 'react-redux';

SplashScreen.preventAutoHideAsync();

function AppInitializer({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const layoutKey = useAppSelector(selectLayoutKey);

  useEffect(() => {
    void dispatch(loadSession());
    void dispatch(loadLanguage());
  }, [dispatch]);

  return (
    <View key={layoutKey} style={{ flex: 1 }} collapsable={false}>
      {children}
    </View>
  );
}

function RootLayoutNav() {
  const router = useRouter();
  const { profile } = useAuth();
  const notificationListener = useRef<Notifications.EventSubscription | null>(null);
  const responseListener = useRef<Notifications.EventSubscription | null>(null);

  useEffect(() => {
    notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
      const data = notification.request.content.data;
      if (data?.type && profile?.id) {
        store.dispatch(createNotification({
          user_id: profile.id,
          title: notification.request.content.title ?? t("notification.defaultTitle"),
          subtitle: notification.request.content.body ?? "",
          notification_type: (data.type as "prescription_ready" | "review_completed" | "night_routine" | "order_shipped") ?? "night_routine",
        }));
      }
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(() => {
      if (profile?.id) {
        store.dispatch(fetchNotifications(profile.id));
      }
      router.push("/notification");
    });

    return () => {
      notificationListener.current?.remove();
      responseListener.current?.remove();
    };
  }, [profile?.id, router]);

  useOnboarding();
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
      <Stack.Screen name="face-scan" />
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
        <AppInitializer>
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
        </AppInitializer>
      </GestureHandlerRootView>
    </Provider>
  );
}
