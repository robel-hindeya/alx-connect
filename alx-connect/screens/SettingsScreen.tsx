import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { ALXText, Card, Screen } from '@/components/alx';
import { ALXTheme } from '@/constants/alxTheme';
import { useAppState } from '@/context/AppState';

function SettingsItem({
  title,
  subtitle,
  icon,
  onPress,
  tone = 'default',
  chevron = true,
}: {
  title: string;
  subtitle?: string;
  icon: React.ComponentProps<typeof Ionicons>['name'];
  onPress: () => void;
  tone?: 'default' | 'danger';
  chevron?: boolean;
}) {
  const accent = tone === 'danger' ? ALXTheme.colors.danger : ALXTheme.colors.primary;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={title}
      onPress={onPress}
      style={({ pressed }) => [styles.item, pressed && { opacity: 0.9 }]}>
      <View style={styles.itemLeft}>
        <View style={styles.iconWrap}>
          <Ionicons name={icon} size={18} color={accent} />
        </View>
        <View style={{ flex: 1 }}>
          <ALXText style={{ fontWeight: '900', color: tone === 'danger' ? ALXTheme.colors.danger : undefined }}>
            {title}
          </ALXText>
          {!!subtitle && (
            <ALXText muted variant="caption" style={{ marginTop: 2 }}>
              {subtitle}
            </ALXText>
          )}
        </View>
      </View>
      {chevron && <Ionicons name="chevron-forward" size={18} color={ALXTheme.colors.subtext} />}
    </Pressable>
  );
}

export function SettingsScreen() {
  const router = useRouter();
  const { logout } = useAppState();

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
        <ALXText style={styles.topTitle}>Settings</ALXText>
        <View style={{ width: 38 }} />
      </View>

      <View style={styles.content}>
        <Card style={{ padding: 0 }}>
          <SettingsItem
            title="Profile settings"
            subtitle="Update profile preferences"
            icon="person-circle-outline"
            onPress={() => router.navigate('/settings/profile')}
          />
          <View style={styles.divider} />
          <SettingsItem
            title="Privacy settings"
            subtitle="Manage account privacy"
            icon="lock-closed-outline"
            onPress={() => router.navigate('/settings/privacy')}
          />
          <View style={styles.divider} />
          <SettingsItem
            title="Notifications"
            subtitle="Push and in-app alerts"
            icon="notifications-outline"
            onPress={() => router.navigate('/settings/notifications')}
          />
          <View style={styles.divider} />
          <SettingsItem
            title="Earnings Dashboard"
            subtitle="Track your video view earnings"
            icon="cash-outline"
            onPress={() => router.navigate('/settings/earnings')}
          />
        </Card>

        <Card style={{ padding: 0, marginTop: 12 }}>
          <SettingsItem
            title="Logout"
            subtitle="Sign out of your account"
            icon="log-out-outline"
            tone="danger"
            chevron={false}
            onPress={() => {
              logout();
              router.replace('/(auth)');
            }}
          />
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
  item: {
    paddingHorizontal: ALXTheme.spacing.lg,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  itemLeft: { flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 14,
    backgroundColor: ALXTheme.colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: { height: 1, backgroundColor: ALXTheme.colors.border, opacity: 0.9 },
});
