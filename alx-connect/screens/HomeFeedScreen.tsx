import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { FlatList, Pressable, StyleSheet, TextInput, View } from 'react-native';

import { ALXText, PostCard, Screen } from '@/components/alx';
import { useAppState } from '@/context/AppState';
import { ALXTheme } from '@/constants/alxTheme';

export function HomeFeedScreen() {
  const router = useRouter();
  const { feed, toggleLike } = useAppState();
  const [query, setQuery] = useState('');

  const visibleFeed = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return feed;
    return feed.filter((p) => {
      const haystack = `${p.author.name} ${p.author.username} ${p.content}`.toLowerCase();
      return haystack.includes(q);
    });
  }, [feed, query]);

  return (
    <Screen>
      <FlatList
        data={visibleFeed}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        ListHeaderComponent={
          <View style={styles.header}>
            <View style={styles.searchRow}>
              <Ionicons name="search-outline" size={18} color={ALXTheme.colors.subtext} />
              <TextInput
                value={query}
                onChangeText={setQuery}
                placeholder="Search posts"
                placeholderTextColor="#94A3B8"
                autoCapitalize="none"
                returnKeyType="search"
                accessibilityLabel="Search posts"
                style={styles.searchInput}
              />
              {!!query.trim() && (
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Clear search"
                  onPress={() => setQuery('')}
                  style={({ pressed }) => [{ padding: 4 }, pressed && { opacity: 0.8 }]}>
                  <Ionicons name="close-circle" size={18} color={ALXTheme.colors.subtext} />
                </Pressable>
              )}
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

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Create post"
        onPress={() => router.navigate('/create-post')}
        style={({ pressed }) => [styles.fab, pressed && { opacity: 0.9, transform: [{ scale: 0.98 }] }]}>
        <Ionicons name="add" size={28} color="#fff" />
      </Pressable>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: { paddingTop: 14, paddingBottom: 10 },
  list: { paddingHorizontal: ALXTheme.spacing.xl, paddingBottom: 28 },
  searchRow: {
    height: 48,
    borderRadius: ALXTheme.radius.md,
    borderWidth: 1,
    borderColor: ALXTheme.colors.border,
    backgroundColor: '#fff',
    paddingHorizontal: ALXTheme.spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    color: ALXTheme.colors.text,
    fontSize: ALXTheme.typography.body,
  },
  fab: {
    position: 'absolute',
    right: ALXTheme.spacing.xl,
    bottom: ALXTheme.spacing.xl,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: ALXTheme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#0B1220',
    shadowOpacity: 0.18,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
  },
});
