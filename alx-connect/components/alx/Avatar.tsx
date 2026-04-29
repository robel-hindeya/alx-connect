import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Image } from 'expo-image';

import { ALXText } from '@/components/alx/ALXText';
import { colorFromSeed, initialsFromName } from '@/utils/avatar';

export function Avatar({
  name,
  seed,
  uri,
  size = 42,
}: {
  name: string;
  seed?: string;
  uri?: string;
  size?: number;
}) {
  const bg = colorFromSeed(seed ?? name);
  const initials = initialsFromName(name);

  return (
    <View
      style={[
        styles.circle,
        { width: size, height: size, borderRadius: size / 2, backgroundColor: uri ? '#E5E7EB' : bg },
      ]}>
      {!!uri ? (
        <Image source={{ uri }} style={{ width: size, height: size }} contentFit="cover" />
      ) : (
        <ALXText
          variant="caption"
          style={{ color: '#fff', fontWeight: '800', fontSize: Math.max(12, size * 0.34) }}>
          {initials}
        </ALXText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  circle: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.25)',
    overflow: 'hidden',
  },
});
