import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

import { commentsSeed, currentUser, feedSeed } from '@/data/dummy';
import type { FeedComment, FeedPost, User } from '@/types/social';
import { apiJson, tokenPairFrom, type BackendMe } from '@/utils/backend';

function syncCommentCounts(posts: FeedPost[], comments: FeedComment[]) {
  const counts = new Map<string, number>();
  for (const c of comments) counts.set(c.postId, (counts.get(c.postId) ?? 0) + 1);
  return posts.map((p) => ({ ...p, commentCount: counts.get(p.id) ?? 0 }));
}

function userFromBackend(me: BackendMe, previous?: User): User {
  const fullName = `${me.first_name ?? ''} ${me.last_name ?? ''}`.trim();
  const name = fullName || previous?.name || me.username;
  return {
    id: String(me.id),
    name,
    username: me.username,
    headline: me.profile?.bio || '',
    skills: previous?.skills ?? [],
    avatarUri: previous?.avatarUri,
    bannerUri: previous?.bannerUri,
    isVerified: previous?.isVerified ?? false,
  };
}

type AppStateValue = {
  isAuthed: boolean;
  me: User;
  feed: FeedPost[];
  comments: FeedComment[];
  loginWithPassword: (username: string, password: string) => Promise<void>;
  registerWithPassword: (args: {
    username: string;
    password: string;
    email?: string;
    name?: string;
  }) => Promise<void>;
  logout: () => void;
  updateProfile: (patch: Partial<Pick<User, 'name' | 'headline' | 'avatarUri' | 'bannerUri'>>) => void;
  addFeedPost: (content: string, imageUri?: string) => void;
  toggleLike: (postId: string) => void;
  addComment: (postId: string, text: string) => void;
};

const AppStateContext = createContext<AppStateValue | null>(null);

export function AppStateProvider({ children }: { children: React.ReactNode }) {
  const [isAuthed, setIsAuthed] = useState(false);
  const [me, setMe] = useState<User>(currentUser);
  const [comments, setComments] = useState<FeedComment[]>(commentsSeed);
  const [feed, setFeed] = useState<FeedPost[]>(() => syncCommentCounts(feedSeed, commentsSeed));
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);

  const loginWithPassword = useCallback(async (username: string, password: string) => {
    const tokenRes = await apiJson<unknown>('/api/auth/token/', {
      method: 'POST',
      body: { username: username.trim(), password },
    });
    const pair = tokenPairFrom(tokenRes);
    setAccessToken(pair.access);
    setRefreshToken(pair.refresh);
    setIsAuthed(true);

    const meRes = await apiJson<BackendMe>('/api/auth/me/', { token: pair.access });
    setMe((prev) => {
      const next = userFromBackend(meRes, prev);
      setFeed((feedPrev) => feedPrev.map((p) => (p.author.id === prev.id ? { ...p, author: next } : p)));
      setComments((commentsPrev) =>
        commentsPrev.map((c) => (c.author.id === prev.id ? { ...c, author: next } : c)),
      );
      return next;
    });
  }, []);

  const registerWithPassword = useCallback(
    async ({ username, password, email, name }: { username: string; password: string; email?: string; name?: string }) => {
      await apiJson('/api/auth/register/', {
        method: 'POST',
        body: {
          username: username.trim(),
          password,
          email: email?.trim() || '',
          name: name?.trim() || '',
        },
      });
      await loginWithPassword(username, password);
    },
    [loginWithPassword],
  );

  const logout = useCallback(() => {
    setAccessToken(null);
    setRefreshToken(null);
    setIsAuthed(false);
  }, []);

  const value = useMemo<AppStateValue>(
    () => ({
      isAuthed,
      me,
      feed,
      comments,
      loginWithPassword,
      registerWithPassword,
      logout,
      updateProfile: (patch) => {
        setMe((prev) => {
          const next = { ...prev, ...patch };
          setFeed((feedPrev) =>
            feedPrev.map((p) => (p.author.id === prev.id ? { ...p, author: next } : p)),
          );
          setComments((commentsPrev) =>
            commentsPrev.map((c) => (c.author.id === prev.id ? { ...c, author: next } : c)),
          );
          return next;
        });
      },
      addFeedPost: (content: string, imageUri?: string) => {
        const trimmed = content.trim();
        if (!trimmed) return;
        const newPost: FeedPost = {
          id: `p_${Date.now()}`,
          author: me,
          content: trimmed,
          imageUri: imageUri?.trim() ? imageUri.trim() : undefined,
          createdAt: 'Now',
          likedByMe: false,
          likeCount: 0,
          commentCount: 0,
        };
        setFeed((prev) => [newPost, ...prev]);
      },
      toggleLike: (postId: string) => {
        setFeed((prev) =>
          prev.map((p) => {
            if (p.id !== postId) return p;
            const liked = !p.likedByMe;
            return {
              ...p,
              likedByMe: liked,
              likeCount: Math.max(0, p.likeCount + (liked ? 1 : -1)),
            };
          }),
        );
      },
      addComment: (postId: string, text: string) => {
        const trimmed = text.trim();
        if (!trimmed) return;
        const newComment: FeedComment = {
          id: `cm_${Date.now()}`,
          postId,
          author: me,
          text: trimmed,
          createdAt: 'Now',
        };
        setComments((prev) => [...prev, newComment]);
        setFeed((prev) =>
          prev.map((p) => (p.id === postId ? { ...p, commentCount: p.commentCount + 1 } : p)),
        );
      },
    }),
    [comments, feed, isAuthed, loginWithPassword, logout, me, registerWithPassword],
  );

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppState() {
  const ctx = useContext(AppStateContext);
  if (!ctx) throw new Error('useAppState must be used within AppStateProvider');
  return ctx;
}
