import React from 'react';
import { StyleSheet, View } from 'react-native';

import { ALXText } from '@/components/alx/ALXText';
import { ALXTheme } from '@/constants/alxTheme';

export function SkillChip({ label }: { label: string }) {
  return (
    <View style={styles.chip}>
      <ALXText variant="caption" style={styles.text}>
        {label}
      </ALXText>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: ALXTheme.radius.pill,
    backgroundColor: '#F1F5F9',
    borderWidth: 1,
    borderColor: ALXTheme.colors.border,
  },
  text: { fontWeight: '700', color: ALXTheme.colors.subtext },
});

