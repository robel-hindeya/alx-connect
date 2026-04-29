import React from 'react';
import { StyleSheet, TextInput, View, type TextInputProps } from 'react-native';

import { ALXTheme } from '@/constants/alxTheme';

export function TextField({ style, ...props }: TextInputProps) {
  return (
    <View style={styles.wrap}>
      <TextInput
        placeholderTextColor="#94A3B8"
        autoCapitalize="none"
        {...props}
        style={[styles.input, style]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: '#fff',
    borderRadius: ALXTheme.radius.md,
    borderWidth: 1,
    borderColor: ALXTheme.colors.border,
    paddingHorizontal: ALXTheme.spacing.md,
  },
  input: {
    height: 48,
    color: ALXTheme.colors.text,
    fontSize: ALXTheme.typography.body,
  },
});

