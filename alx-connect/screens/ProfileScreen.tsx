import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React, { useMemo } from 'react';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';

import { ALXText, Avatar, PostCard, Screen, VerifiedBadge } from '@/components/alx';
import { useAppState } from '@/context/AppState';
import { ALXTheme } from '@/constants/alxTheme';

export function ProfileScreen() {
  const router = useRouter();
  const { me, feed, toggleLike, logout } = useAppState();

  const myPosts = useMemo(() => feed.filter((p) => p.author.id === me.id), [feed, me.id]);

  const followingCount = 42;
  const followersCount = 128;

  return (
    <Screen>
      <FlatList
        data={myPosts}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        ListHeaderComponent={
          <View style={styles.headerWrap}>
            <View style={styles.banner}>
              {!!me.bannerUri && (
                <Image source={{ uri: me.bannerUri }} style={StyleSheet.absoluteFill} contentFit="cover" />
              )}
              <View style={styles.bannerActions}>
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Settings"
                  onPress={() => router.navigate('/settings')}
                  style={({ pressed }) => [styles.actionBtn, pressed && { opacity: 0.85 }]}>
                  <Ionicons name="settings-outline" size={18} color="#fff" />
                </Pressable>
              </View>
            </View>

            <View style={styles.profileBody}>
              <View style={styles.avatarRow}>
                <View style={styles.avatarWrap}>
                  <Avatar name={me.name} seed={me.username} uri={me.avatarUri} size={74} />
                </View>
              </View>

              <View style={styles.nameRow}>
                <ALXText variant="h2" style={{ fontWeight: '900', marginTop: 6 }}>
                  {me.name}
                </ALXText>
                {me.isVerified && <VerifiedBadge size={18} />}
              </View>
              <ALXText muted style={{ marginTop: 4 }}>
                @{me.username}
              </ALXText>
              {!!me.headline && (
                <ALXText style={{ marginTop: 10, lineHeight: 21 }}>{me.headline}</ALXText>
              )}

              <View style={styles.stats}>
                <ALXText muted>
                  <ALXText style={{ fontWeight: '900' }}>{followingCount}</ALXText> Following
                </ALXText>
                <ALXText muted>
                  <ALXText style={{ fontWeight: '900' }}>{followersCount}</ALXText> Followers
                </ALXText>
                <ALXText muted>
                  <ALXText style={{ fontWeight: '900' }}>{myPosts.length}</ALXText> Posts
                </ALXText>
              </View>
            </View>
          </View>
        }
        renderItem={({ item }) => (
          <PostCard
            post={item}
            onLike={() => toggleLike(item.id)}
            onComment={() => router.navigate(`/post/${item.id}/comments`)}
          />
        )}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  list: { paddingHorizontal: ALXTheme.spacing.xl, paddingBottom: 28 },
  headerWrap: {
    marginHorizontal: -ALXTheme.spacing.xl,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: ALXTheme.colors.border,
    marginBottom: 12,
  },
  banner: { height: 132, backgroundColor: ALXTheme.colors.primary, overflow: 'hidden' },
  bannerActions: {
    position: 'absolute',
    top: 14,
    right: 14,
    flexDirection: 'row',
    gap: 10,
  },
  actionBtn: {
    width: 38,
    height: 38,
    borderRadius: 14,
    backgroundColor: 'rgba(0,0,0,0.22)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileBody: { paddingHorizontal: ALXTheme.spacing.xl, paddingTop: 0, paddingBottom: 12 },
  avatarRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
  avatarWrap: {
    marginTop: -34,
    padding: 3,
    borderRadius: 999,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: ALXTheme.colors.border,
  },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  stats: { flexDirection: 'row', gap: 14, marginTop: 12 },
});
