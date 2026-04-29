import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { ALXText, Card, Screen, TextField } from '@/components/alx';
import { ALXTheme } from '@/constants/alxTheme';

const VIEWS_PER_100_BIRR = 1000;
const BIRR_PER_1000_VIEWS = 100;
const BIRR_PER_VIEW = BIRR_PER_1000_VIEWS / VIEWS_PER_100_BIRR;

export function EarningsDashboardScreen() {
  const router = useRouter();
  const [viewsText, setViewsText] = useState('');

  const views = useMemo(() => {
    const cleaned = viewsText.replace(/[^\d]/g, '');
    const parsed = Number.parseInt(cleaned || '0', 10);
    return Number.isFinite(parsed) ? parsed : 0;
  }, [viewsText]);

  const earningsBirr = useMemo(() => views * BIRR_PER_VIEW, [views]);

  const remainingToNext = useMemo(() => {
    if (views <= 0) return VIEWS_PER_100_BIRR;
    const mod = views % VIEWS_PER_100_BIRR;
    return mod === 0 ? 0 : VIEWS_PER_100_BIRR - mod;
  }, [views]);

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
        <ALXText style={styles.topTitle}>Earnings</ALXText>
        <View style={{ width: 38 }} />
      </View>

      <View style={styles.content}>
        <Card style={{ padding: ALXTheme.spacing.xl }}>
          <ALXText variant="caption" muted style={{ fontWeight: '900' }}>
            Business rule
          </ALXText>
          <ALXText style={{ marginTop: 6, lineHeight: 21 }}>
            {VIEWS_PER_100_BIRR} video views = {BIRR_PER_1000_VIEWS} Birr
          </ALXText>

          <ALXText variant="caption" muted style={{ fontWeight: '900', marginTop: 14 }}>
            Video views
          </ALXText>
          <View style={{ marginTop: 10 }}>
            <TextField
              value={viewsText}
              onChangeText={setViewsText}
              placeholder="e.g. 2500"
              keyboardType="number-pad"
              inputMode="numeric"
              returnKeyType="done"
            />
          </View>

          <View style={styles.metrics}>
            <View style={styles.metric}>
              <ALXText muted variant="caption" style={{ fontWeight: '900' }}>
                Estimated earnings
              </ALXText>
              <ALXText variant="title" style={{ fontWeight: '900', marginTop: 6 }}>
                {earningsBirr.toFixed(2)} Birr
              </ALXText>
            </View>

            <View style={styles.metric}>
              <ALXText muted variant="caption" style={{ fontWeight: '900' }}>
                Next milestone
              </ALXText>
              <ALXText style={{ marginTop: 6, lineHeight: 21 }}>
                {remainingToNext === 0 ? 'Milestone reached' : `${remainingToNext} views to next 100 Birr`}
              </ALXText>
            </View>
          </View>
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
  metrics: { marginTop: 16, gap: 12 },
  metric: {
    borderWidth: 1,
    borderColor: ALXTheme.colors.border,
    borderRadius: ALXTheme.radius.md,
    backgroundColor: '#fff',
    paddingHorizontal: ALXTheme.spacing.lg,
    paddingVertical: 14,
  },
});

