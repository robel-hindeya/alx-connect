import React from 'react';
import { StyleSheet, Text, type TextProps } from 'react-native';

import { ALXTheme } from '@/constants/alxTheme';

type Variant = 'title' | 'h2' | 'body' | 'caption';

export function ALXText({
  variant = 'body',
  muted,
  style,
  ...props
}: TextProps & { variant?: Variant; muted?: boolean }) {
  return (
    <Text
      {...props}
      style={[
        styles.base,
        variant === 'title' && styles.title,
        variant === 'h2' && styles.h2,
        variant === 'caption' && styles.caption,
        muted && styles.muted,
        style,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  base: {
    color: ALXTheme.colors.text,
    fontSize: ALXTheme.typography.body,
  },
  muted: { color: ALXTheme.colors.subtext },
  title: { fontSize: ALXTheme.typography.title, fontWeight: '800' },
  h2: { fontSize: ALXTheme.typography.h2, fontWeight: '700' },
  caption: { fontSize: ALXTheme.typography.caption },
});

