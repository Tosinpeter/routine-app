import { Tabs, router } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { HapticTab } from '@/components/haptic-tab';
import {
  FaceIcon,
  HomeIcon,
  ProfileIcon,
  RoutineIcon,
  StatsIcon,
} from '@/components/icons';
import { scaleIcon, tabBarHeight } from '@/constants/scaling';
import { Colors, Shadows } from '@/constants/theme';
import { AppTextStyle } from '@/constants/typography';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useFetchProgress } from '@/hooks/use-fetch-progress';
import { useFetchHome } from '@/hooks/use-fetch-home';
import { useFetchProfile } from '@/hooks/use-fetch-profile';
import { t } from '@/i18n';

// Icon size that works well on both platforms
const TAB_ICON_SIZE = scaleIcon(24);

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();
  
  // Fetch data when app opens
  useFetchHome();
  useFetchProgress();
  useFetchProfile();
  
  console.log(insets.bottom);
  return (
    <Tabs
      screenOptions={{
        lazy: false,
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tabIconSelected,
        tabBarInactiveTintColor: Colors[colorScheme ?? 'light'].tabIconDefault,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          height: Platform.select({ ios: tabBarHeight, android: tabBarHeight + insets.bottom, default: tabBarHeight }),
          paddingBottom: Platform.select({ ios: insets.bottom || 20, android: 10, default: 10 }),
          paddingTop: Platform.select({ ios: 12, android: 5, default: 10 }),
          backgroundColor: Colors.light.white,
          borderTopWidth: Platform.OS === 'android' ? 0 : 0.5,
          borderTopColor: Colors.light.grey200,
          ...Shadows.tabBar,
        },
        tabBarItemStyle: {
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: Platform.select({ ios: 0, android: 4, default: 0 }),
        },
        tabBarLabelStyle: {
          ...AppTextStyle.tabLabel,
          marginTop: Platform.select({ ios: 4, android: 2, default: 4 }),
          marginBottom: Platform.select({ ios: 0, android: 2, default: 0 }),
        },
        tabBarIconStyle: {
          marginTop: Platform.select({ ios: 0, android: 2, default: 0 }),
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: t("tabs.home"),
          tabBarIcon: ({ color, focused }) => <HomeIcon size={TAB_ICON_SIZE} color={color} filled={focused} />,
        }}
      />
      <Tabs.Screen
        name="routine"
        options={{
          title: t("tabs.routine"),
          tabBarIcon: ({ color }) => <RoutineIcon size={TAB_ICON_SIZE} color={color} />,
        }}
      />
      <Tabs.Screen
        name="skincare"
        options={{
          title: t("tabs.skincare"),
          tabBarIcon: ({ color }) => <FaceIcon size={TAB_ICON_SIZE} color={color} />,
        }}
      />
      <Tabs.Screen
        name="progress"
        options={{
          title: t("tabs.progress"),
          tabBarIcon: ({ color, focused }) => <StatsIcon size={TAB_ICON_SIZE} color={color} filled={focused} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: t("tabs.profile"),
          tabBarIcon: ({ color }) => <ProfileIcon size={TAB_ICON_SIZE} color={color} />,
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            router.push('/profile');
          },
        }}
      />
    </Tabs>
  );
}
