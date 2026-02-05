import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

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

// Icon size that works well on both platforms
const TAB_ICON_SIZE = scaleIcon(24);

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tabIconSelected,
        tabBarInactiveTintColor: Colors[colorScheme ?? 'light'].tabIconDefault,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          height: tabBarHeight,
          paddingBottom: Platform.select({ ios: 20, android: 10, default: 10 }),
          paddingTop: Platform.select({ ios: 12, android: 8, default: 10 }),
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
          title: 'Home',
          tabBarIcon: ({ color }) => <HomeIcon size={TAB_ICON_SIZE} color={color} />,
        }}
      />
      <Tabs.Screen
        name="routine"
        options={{
          title: 'Routine',
          tabBarIcon: ({ color }) => <RoutineIcon size={TAB_ICON_SIZE} color={color} />,
        }}
      />
      <Tabs.Screen
        name="skincare"
        options={{
          title: 'Skincare',
          tabBarIcon: ({ color }) => <FaceIcon size={TAB_ICON_SIZE} color={color} />,
        }}
      />
      <Tabs.Screen
        name="progress"
        options={{
          title: 'Progress',
          tabBarIcon: ({ color }) => <StatsIcon size={TAB_ICON_SIZE} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <ProfileIcon size={TAB_ICON_SIZE} color={color} />,
        }}
      />
    </Tabs>
  );
}
