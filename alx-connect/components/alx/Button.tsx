import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  View,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

import { ALXText } from '@/components/alx/ALXText';
import { ALXTheme } from '@/constants/alxTheme';

type Variant = 'primary' | 'secondary' | 'ghost';

export function Button({
  title,
  variant = 'primary',
  loading,
  left,
  containerStyle,
  disabled,
  ...props
}: Omit<PressableProps, 'style'> & {
  title: string;
  variant?: Variant;
  loading?: boolean;
  left?: React.ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
}) {
  const isDisabled = disabled || loading;

  return (
    <Pressable
      accessibilityRole="button"
      {...props}
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.base,
        variant === 'primary' && styles.primary,
        variant === 'secondary' && styles.secondary,
        variant === 'ghost' && styles.ghost,
        isDisabled && styles.disabled,
        pressed && !isDisabled && styles.pressed,
        containerStyle,
      ]}>
      <View style={styles.row}>
        {loading ? (
          <ActivityIndicator
            size="small"
            color={variant === 'primary' ? '#fff' : ALXTheme.colors.primary}
          />
        ) : (
          left
        )}
        <ALXText
          variant="body"
          style={[
            styles.title,
            variant === 'primary' ? styles.titleOnPrimary : styles.titleOnLight,
          ]}>
          {title}
        </ALXText>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    height: 48,
    borderRadius: ALXTheme.radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: ALXTheme.spacing.lg,
    borderWidth: 1,
  },
  row: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  pressed: { transform: [{ scale: 0.99 }] },
  disabled: { opacity: 0.6 },
  primary: {
    backgroundColor: ALXTheme.colors.primary,
    borderColor: ALXTheme.colors.primary,
  },
  secondary: {
    backgroundColor: ALXTheme.colors.primarySoft,
    borderColor: ALXTheme.colors.primarySoft,
  },
  ghost: {
    backgroundColor: 'transparent',
    borderColor: ALXTheme.colors.border,
  },
  title: { fontWeight: '800' },
  titleOnPrimary: { color: '#fff' },
  titleOnLight: { color: ALXTheme.colors.primary },
});
