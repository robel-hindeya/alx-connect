import { Redirect, Tabs } from 'expo-router';
import React from 'react';

import { Ionicons } from '@expo/vector-icons';

import { ALXTheme } from '@/constants/alxTheme';
import { useAppState } from '@/context/AppState';

export default function TabLayout() {
  const { isAuthed } = useAppState();
  if (!isAuthed) return <Redirect href="/(auth)" />;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: ALXTheme.colors.primary,
        tabBarInactiveTintColor: ALXTheme.colors.subtext,
        tabBarStyle: {
          backgroundColor: ALXTheme.colors.tabBar,
          borderTopColor: ALXTheme.colors.border,
        },
        tabBarLabelStyle: { fontWeight: '800' },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <Ionicons name="home-outline" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => <Ionicons name="person-circle-outline" size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}
