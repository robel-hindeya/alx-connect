import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View } from 'react-native';

import { ALXTheme } from '@/constants/alxTheme';

export function VerifiedBadge({ size = 16 }: { size?: number }) {
  return (
    <View accessibilityLabel="Verified" accessibilityRole="image">
      <Ionicons name="checkmark-circle" size={size} color={ALXTheme.colors.primary} />
    </View>
  );
}

