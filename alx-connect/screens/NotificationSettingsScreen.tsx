import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { ALXText, Card, Screen } from '@/components/alx';
import { ALXTheme } from '@/constants/alxTheme';

export function NotificationSettingsScreen() {
  const router = useRouter();

  return (
    <Screen>
      <View style={styles.topBar}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Back"
          onPress={() => router.back()}
          style={({ pressed }) => [styles.iconBtn, pressed && { opacity: 0.85 }]}>
          <Ionicons name="chevron-back" size={22} color={ALXTheme.colors.text} />
        </Pressable>
        <ALXText style={styles.topTitle}>Notifications</ALXText>
        <View style={{ width: 38 }} />
      </View>

      <View style={styles.content}>
        <Card>
          <ALXText variant="h2" style={{ fontWeight: '900' }}>
            Coming soon
          </ALXText>
          <ALXText muted style={{ marginTop: 8, lineHeight: 21 }}>
            Notification preferences UI will live here (demo placeholder).
          </ALXText>
        </Card>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: ALXTheme.spacing.lg,
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: ALXTheme.colors.border,
    backgroundColor: ALXTheme.colors.bg,
  },
  iconBtn: {
    width: 38,
    height: 38,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topTitle: { flex: 1, textAlign: 'center', fontWeight: '900' },
  content: { paddingHorizontal: ALXTheme.spacing.xl, paddingTop: 14 },
});

