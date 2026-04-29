import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import { ALXText, Avatar, Button, Card, Screen, TextField } from '@/components/alx';
import { ALXTheme } from '@/constants/alxTheme';
import { useAppState } from '@/context/AppState';

type PickTarget = 'avatar' | 'banner';
type PickSource = 'gallery' | 'camera';

export function EditProfileScreen() {
  const router = useRouter();
  const { me, updateProfile } = useAppState();

  const [name, setName] = useState(me.name);
  const [headline, setHeadline] = useState(me.headline ?? '');
  const [avatarUri, setAvatarUri] = useState(me.avatarUri ?? '');
  const [bannerUri, setBannerUri] = useState(me.bannerUri ?? '');

  const dirty = useMemo(() => {
    return (
      name.trim() !== me.name.trim() ||
      headline.trim() !== (me.headline ?? '').trim() ||
      (avatarUri.trim() || '') !== (me.avatarUri ?? '') ||
      (bannerUri.trim() || '') !== (me.bannerUri ?? '')
    );
  }, [avatarUri, bannerUri, headline, me.avatarUri, me.bannerUri, me.headline, me.name, name]);

  const pickImage = async (target: PickTarget, source: PickSource) => {
    if (source === 'gallery') {
      const perms = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!perms.granted) {
        Alert.alert('Permission needed', 'Allow photo access to upload images.');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: target === 'banner' ? [16, 9] : [1, 1],
        quality: 0.9,
      });
      if (result.canceled) return;
      const asset = result.assets?.[0];
      if (!asset?.uri) return;
      target === 'avatar' ? setAvatarUri(asset.uri) : setBannerUri(asset.uri);
      return;
    }

    const perms = await ImagePicker.requestCameraPermissionsAsync();
    if (!perms.granted) {
      Alert.alert('Permission needed', 'Allow camera access to take a photo.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: target === 'banner' ? [16, 9] : [1, 1],
      quality: 0.9,
    });
    if (result.canceled) return;
    const asset = result.assets?.[0];
    if (!asset?.uri) return;
    target === 'avatar' ? setAvatarUri(asset.uri) : setBannerUri(asset.uri);
  };

  const onSave = () => {
    const trimmedName = name.trim();
    if (!trimmedName) {
      Alert.alert('Name required', 'Please enter your name.');
      return;
    }
    updateProfile({
      name: trimmedName,
      headline: headline.trim() ? headline.trim() : undefined,
      avatarUri: avatarUri.trim() ? avatarUri.trim() : undefined,
      bannerUri: bannerUri.trim() ? bannerUri.trim() : undefined,
    });
    router.back();
  };

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
        <ALXText style={styles.topTitle}>Edit profile</ALXText>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Save profile"
          onPress={onSave}
          disabled={!dirty}
          style={({ pressed }) => [
            styles.saveBtn,
            !dirty && { opacity: 0.45 },
            pressed && dirty && { opacity: 0.85 },
          ]}>
          <ALXText style={styles.saveText}>Save</ALXText>
        </Pressable>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <View style={styles.banner}>
          {!!bannerUri.trim() ? (
            <Image source={{ uri: bannerUri.trim() }} style={StyleSheet.absoluteFill} contentFit="cover" />
          ) : (
            <>
              <View style={styles.bannerAccent} />
              <View style={styles.bannerAccent2} />
            </>
          )}
        </View>

        <View style={styles.avatarWrap}>
          <Avatar name={name.trim() || me.name} seed={me.username} uri={avatarUri.trim() || undefined} size={86} />
        </View>

        <Card style={{ padding: ALXTheme.spacing.xl, marginTop: 14 }}>
          <ALXText muted variant="caption" style={{ fontWeight: '800' }}>
            Profile photo
          </ALXText>
          <View style={styles.row}>
            <Button
              title="Gallery"
              variant="secondary"
              left={<Ionicons name="images-outline" size={18} color={ALXTheme.colors.primary} />}
              onPress={() => pickImage('avatar', 'gallery')}
              containerStyle={{ flex: 1, height: 46 }}
            />
            <Button
              title="Camera"
              variant="secondary"
              left={<Ionicons name="camera-outline" size={18} color={ALXTheme.colors.primary} />}
              onPress={() => pickImage('avatar', 'camera')}
              containerStyle={{ flex: 1, height: 46 }}
            />
          </View>
          {!!avatarUri.trim() && (
            <Button
              title="Remove photo"
              variant="ghost"
              onPress={() => setAvatarUri('')}
              containerStyle={{ marginTop: 10, height: 46 }}
            />
          )}

          <View style={{ height: 16 }} />

          <ALXText muted variant="caption" style={{ fontWeight: '800' }}>
            Banner
          </ALXText>
          <View style={styles.row}>
            <Button
              title="Gallery"
              variant="secondary"
              left={<Ionicons name="images-outline" size={18} color={ALXTheme.colors.primary} />}
              onPress={() => pickImage('banner', 'gallery')}
              containerStyle={{ flex: 1, height: 46 }}
            />
            <Button
              title="Camera"
              variant="secondary"
              left={<Ionicons name="camera-outline" size={18} color={ALXTheme.colors.primary} />}
              onPress={() => pickImage('banner', 'camera')}
              containerStyle={{ flex: 1, height: 46 }}
            />
          </View>
          {!!bannerUri.trim() && (
            <Button
              title="Remove banner"
              variant="ghost"
              onPress={() => setBannerUri('')}
              containerStyle={{ marginTop: 10, height: 46 }}
            />
          )}
        </Card>

        <Card style={{ padding: ALXTheme.spacing.xl, marginTop: 12 }}>
          <ALXText muted variant="caption" style={{ fontWeight: '800' }}>
            Name
          </ALXText>
          <View style={{ marginTop: 10 }}>
            <TextField
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
              placeholder="Your name"
            />
          </View>

          <ALXText muted variant="caption" style={{ fontWeight: '800', marginTop: 14 }}>
            Headline
          </ALXText>
          <View style={{ marginTop: 10 }}>
            <TextField
              value={headline}
              onChangeText={setHeadline}
              autoCapitalize="sentences"
              placeholder="What do you do?"
            />
          </View>
        </Card>

        <View style={{ height: 18 }} />
      </ScrollView>
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
  saveBtn: {
    height: 38,
    borderRadius: 14,
    paddingHorizontal: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: ALXTheme.colors.border,
    backgroundColor: '#fff',
  },
  saveText: { fontWeight: '900', color: ALXTheme.colors.primary },
  content: { paddingHorizontal: ALXTheme.spacing.xl, paddingTop: 14, paddingBottom: 28 },
  banner: {
    height: 148,
    backgroundColor: ALXTheme.colors.primary,
    borderRadius: ALXTheme.radius.lg,
    overflow: 'hidden',
  },
  bannerAccent: {
    position: 'absolute',
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: 'rgba(255,255,255,0.12)',
    right: -60,
    top: -80,
  },
  bannerAccent2: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(0,0,0,0.12)',
    left: -40,
    bottom: -60,
  },
  avatarWrap: {
    marginTop: -44,
    alignSelf: 'flex-start',
    marginLeft: 16,
    padding: 3,
    borderRadius: 999,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: ALXTheme.colors.border,
  },
  row: { marginTop: 10, flexDirection: 'row', gap: 10 },
});
