import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { ALXText } from '@/components/alx/ALXText';
import { Avatar } from '@/components/alx/Avatar';
import { Card } from '@/components/alx/Card';
import { VerifiedBadge } from '@/components/alx/VerifiedBadge';
import { ALXTheme } from '@/constants/alxTheme';
import type { FeedPost } from '@/types/social';

export function PostCard({
  post,
  onLike,
  onComment,
}: {
  post: FeedPost;
  onLike?: () => void;
  onComment?: () => void;
}) {
  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        <Avatar
          name={post.author.name}
          seed={post.author.username}
          uri={post.author.avatarUri}
          size={40}
        />
        <View style={styles.meta}>
          <View style={styles.nameRow}>
            <ALXText style={styles.name}>{post.author.name}</ALXText>
            {post.author.isVerified && <VerifiedBadge size={14} />}
          </View>
          <ALXText muted variant="caption">
            @{post.author.username} • {post.createdAt}
          </ALXText>
        </View>
      </View>

      <ALXText style={styles.content}>{post.content}</ALXText>

      {!!post.imageUri && (
        <Image source={{ uri: post.imageUri }} style={styles.image} contentFit="cover" />
      )}

      <View style={styles.actions}>
        <Pressable onPress={onLike} style={styles.actionBtn}>
          <Ionicons
            name={post.likedByMe ? 'heart' : 'heart-outline'}
            size={20}
            color={post.likedByMe ? ALXTheme.colors.danger : ALXTheme.colors.subtext}
          />
          <ALXText muted variant="caption">
            {post.likeCount}
          </ALXText>
        </Pressable>

        <Pressable onPress={onComment} style={styles.actionBtn}>
          <Ionicons name="chatbubble-ellipses-outline" size={20} color={ALXTheme.colors.subtext} />
          <ALXText muted variant="caption">
            {post.commentCount}
          </ALXText>
        </Pressable>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { padding: ALXTheme.spacing.lg },
  header: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  meta: { flex: 1 },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  name: { fontWeight: '800' },
  content: { marginTop: 12, lineHeight: 21 },
  image: {
    marginTop: 12,
    width: '100%',
    height: 220,
    borderRadius: ALXTheme.radius.lg,
    backgroundColor: '#E5E7EB',
  },
  actions: {
    flexDirection: 'row',
    gap: 18,
    marginTop: 14,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: ALXTheme.colors.border,
  },
  actionBtn: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 6 },
});
