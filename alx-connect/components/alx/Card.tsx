import React from 'react';
import { StyleSheet, View, type ViewProps } from 'react-native';

import { ALXTheme } from '@/constants/alxTheme';

export function Card({ style, ...props }: ViewProps) {
  return <View {...props} style={[styles.card, style]} />;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: ALXTheme.colors.card,
    borderRadius: ALXTheme.radius.lg,
    padding: ALXTheme.spacing.lg,
    borderWidth: 1,
    borderColor: ALXTheme.colors.border,
    ...ALXTheme.shadow.card,
  },
});

