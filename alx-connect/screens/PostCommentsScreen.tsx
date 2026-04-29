import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';

import { ALXText, Avatar, Card, Screen, TextField } from '@/components/alx';
import { ALXTheme } from '@/constants/alxTheme';
import { useAppState } from '@/context/AppState';
import type { FeedComment } from '@/types/social';

function CommentRow({ comment }: { comment: FeedComment }) {
  return (
    <View style={styles.commentRow}>
      <Avatar
        name={comment.author.name}
        seed={comment.author.username}
        uri={comment.author.avatarUri}
        size={34}
      />
      <View style={{ flex: 1 }}>
        <View style={styles.commentMeta}>
          <ALXText style={{ fontWeight: '900' }}>{comment.author.name}</ALXText>
          <ALXText muted variant="caption">
            @{comment.author.username} • {comment.createdAt}
          </ALXText>
        </View>
        <ALXText style={{ marginTop: 6, lineHeight: 21 }}>{comment.text}</ALXText>
      </View>
    </View>
  );
}

export function PostCommentsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ id?: string }>();
  const postId = typeof params.id === 'string' ? params.id : '';

  const { feed, comments, addComment } = useAppState();
  const post = useMemo(() => feed.find((p) => p.id === postId), [feed, postId]);
  const postComments = useMemo(() => comments.filter((c) => c.postId === postId), [comments, postId]);

  const [text, setText] = useState('');

  const onSend = () => {
    addComment(postId, text);
    setText('');
  };

  if (!post) {
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
          <ALXText style={styles.topTitle}>Comments</ALXText>
          <View style={{ width: 38 }} />
        </View>
        <View style={styles.notFound}>
          <ALXText variant="h2" style={{ fontWeight: '900' }}>
            Post not found
          </ALXText>
          <ALXText muted style={{ marginTop: 8 }}>
            This post may have been removed.
          </ALXText>
        </View>
      </Screen>
    );
  }

  return (
    <Screen>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0}
        style={{ flex: 1 }}>
        <View style={styles.topBar}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Back"
            onPress={() => router.back()}
            style={({ pressed }) => [styles.iconBtn, pressed && { opacity: 0.85 }]}>
            <Ionicons name="chevron-back" size={22} color={ALXTheme.colors.text} />
          </Pressable>
          <ALXText style={styles.topTitle}>Comments</ALXText>
          <View style={{ width: 38 }} />
        </View>

        <FlatList
          data={postComments}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          ListHeaderComponent={
            <View>
              <Card style={{ padding: ALXTheme.spacing.xl }}>
                <View style={styles.postHeader}>
                  <Avatar
                    name={post.author.name}
                    seed={post.author.username}
                    uri={post.author.avatarUri}
                    size={40}
                  />
                  <View style={{ flex: 1 }}>
                    <ALXText style={{ fontWeight: '900' }}>{post.author.name}</ALXText>
                    <ALXText muted variant="caption">
                      @{post.author.username} • {post.createdAt}
                    </ALXText>
                  </View>
                </View>
                <ALXText style={{ marginTop: 12, lineHeight: 21 }}>{post.content}</ALXText>
              </Card>

              <View style={styles.sectionHeader}>
                <ALXText variant="caption" muted style={{ fontWeight: '900' }}>
                  {postComments.length} Comments
                </ALXText>
              </View>
            </View>
          }
          renderItem={({ item }) => (
            <Card style={{ padding: ALXTheme.spacing.lg }}>
              <CommentRow comment={item} />
            </Card>
          )}
          ListEmptyComponent={
            <Card style={{ padding: ALXTheme.spacing.xl }}>
              <ALXText style={{ fontWeight: '900' }}>No comments yet</ALXText>
              <ALXText muted style={{ marginTop: 6 }}>
                Be the first to comment.
              </ALXText>
            </Card>
          }
        />

        <View style={styles.composer}>
          <View style={{ flex: 1 }}>
            <TextField
              value={text}
              onChangeText={setText}
              placeholder="Write a comment..."
              returnKeyType="send"
              onSubmitEditing={onSend}
            />
          </View>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Send comment"
            onPress={onSend}
            disabled={!text.trim()}
            style={({ pressed }) => [
              styles.sendBtn,
              !text.trim() && { opacity: 0.45 },
              pressed && text.trim() && { opacity: 0.85 },
            ]}>
            <Ionicons name="send" size={18} color="#fff" />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
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
  list: { paddingHorizontal: ALXTheme.spacing.xl, paddingTop: 14, paddingBottom: 18 },
  postHeader: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  sectionHeader: { marginTop: 12, marginBottom: 10 },
  commentRow: { flexDirection: 'row', gap: 12 },
  commentMeta: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, alignItems: 'center' },
  composer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: ALXTheme.spacing.xl,
    paddingBottom: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: ALXTheme.colors.border,
    backgroundColor: ALXTheme.colors.bg,
  },
  sendBtn: {
    width: 46,
    height: 46,
    borderRadius: 16,
    backgroundColor: ALXTheme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notFound: { flex: 1, paddingHorizontal: ALXTheme.spacing.xl, paddingTop: 18 },
});

