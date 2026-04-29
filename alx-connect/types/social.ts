export type User = {
  id: string;
  name: string;
  username: string;
  headline?: string;
  skills: string[];
  avatarUri?: string;
  bannerUri?: string;
  isVerified?: boolean;
};

export type FeedPost = {
  id: string;
  author: User;
  content: string;
  imageUri?: string;
  createdAt: string;
  likedByMe: boolean;
  likeCount: number;
  commentCount: number;
};

export type FeedComment = {
  id: string;
  postId: string;
  author: User;
  text: string;
  createdAt: string;
};

export type CollabPost = {
  id: string;
  author: User;
  title: string;
  details: string;
  createdAt: string;
  tags: string[];
};

export type Chat = {
  id: string;
  participant: User;
  lastMessage: string;
  lastAt: string;
  unreadCount: number;
};

export type ChatMessage = {
  id: string;
  chatId: string;
  senderId: string;
  text: string;
  createdAt: string;
};
