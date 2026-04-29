import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, View, type ViewProps } from 'react-native';

import { ALXTheme } from '@/constants/alxTheme';

export function Screen({ style, ...props }: ViewProps) {
  return (
    <SafeAreaView style={styles.safe}>
      <View {...props} style={[styles.container, style]} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: ALXTheme.colors.bg },
  container: { flex: 1, backgroundColor: ALXTheme.colors.bg },
});

