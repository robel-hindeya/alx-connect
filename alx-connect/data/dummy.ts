import type { Chat, ChatMessage, CollabPost, FeedComment, FeedPost, User } from '@/types/social';

export const currentUser: User = {
  id: 'u_me',
  name: 'Robel Tesfaye',
  username: 'robel.alx',
  headline: 'ALX Student • Mobile & Full‑Stack',
  skills: ['React Native', 'React', 'Django', 'PostgreSQL', 'UI/UX'],
  isVerified: true,
};

const u1: User = {
  id: 'u_1',
  name: 'Amina Yusuf',
  username: 'amina.dev',
  headline: 'Frontend • ALX',
  skills: ['React', 'TypeScript', 'UI'],
};

const u2: User = {
  id: 'u_2',
  name: 'Daniel K.',
  username: 'daniel.backend',
  headline: 'Backend • ALX',
  skills: ['Node.js', 'Django', 'APIs'],
};

const u3: User = {
  id: 'u_3',
  name: 'Muna Abdi',
  username: 'muna.design',
  headline: 'Product • ALX',
  skills: ['Figma', 'Research', 'Design Systems'],
};

export const feedSeed: FeedPost[] = [
  {
    id: 'p_me_1',
    author: currentUser,
    content:
      'Building ALX Connect UI — next up: image posts + X-style profile header. Looking for feedback from fellow learners.',
    imageUri:
      'https://images.unsplash.com/photo-1527689368864-3a821dbccc34?auto=format&fit=crop&w=1200&q=80',
    createdAt: 'Just now',
    likedByMe: true,
    likeCount: 12,
    commentCount: 3,
  },
  {
    id: 'p_1',
    author: u1,
    content:
      'Just shipped a clean onboarding flow in Expo Router. If anyone wants to collaborate on a study tracker app, DM me.',
    imageUri:
      'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80',
    createdAt: '2h',
    likedByMe: false,
    likeCount: 24,
    commentCount: 6,
  },
  {
    id: 'p_2',
    author: u2,
    content:
      'Looking for a frontend dev to pair on a capstone project: API + RN client. I can handle backend + deployment.',
    createdAt: '5h',
    likedByMe: true,
    likeCount: 58,
    commentCount: 12,
  },
  {
    id: 'p_3',
    author: u3,
    content:
      'Design tip: use consistent spacing and subtle shadows for a modern card UI. Happy to review your app screens.',
    imageUri:
      'https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=1200&q=80',
    createdAt: '1d',
    likedByMe: false,
    likeCount: 41,
    commentCount: 9,
  },
];

export const commentsSeed: FeedComment[] = [
  {
    id: 'cm_1',
    postId: 'p_me_1',
    author: u1,
    text: 'Looks clean. The profile header is great — keep going!',
    createdAt: '1m',
  },
  {
    id: 'cm_2',
    postId: 'p_me_1',
    author: u2,
    text: 'Nice progress. Would love to see dark mode next.',
    createdAt: '5m',
  },
  {
    id: 'cm_3',
    postId: 'p_1',
    author: currentUser,
    text: 'Yes! Let’s pair — I’m free this afternoon.',
    createdAt: '10m',
  },
  {
    id: 'cm_4',
    postId: 'p_2',
    author: u3,
    text: 'Great. Share the repo link and I can review UI/UX.',
    createdAt: '2h',
  },
  {
    id: 'cm_5',
    postId: 'p_3',
    author: currentUser,
    text: 'Thanks! The spacing + shadows really helped my feed cards.',
    createdAt: '1d',
  },
];

export const collabSeed: CollabPost[] = [
  {
    id: 'c_1',
    author: u2,
    title: 'Need backend developer for project',
    details: 'Building ALX project hub. Need Django/Node API + auth + basic CI. Timeline: 2 weeks.',
    createdAt: 'Today',
    tags: ['Backend', 'Django', 'API'],
  },
  {
    id: 'c_2',
    author: u1,
    title: 'Looking for frontend dev',
    details:
      'Expo RN app for collaboration and portfolios. Want someone strong in UI and navigation.',
    createdAt: 'Yesterday',
    tags: ['Frontend', 'React Native', 'UI'],
  },
  {
    id: 'c_3',
    author: u3,
    title: 'Seeking product/design partner',
    details: 'Need help with user flows, wireframes, and a simple design system for an ALX app.',
    createdAt: '2d',
    tags: ['Design', 'Product', 'Figma'],
  },
];

export const chatsSeed: Chat[] = [
  {
    id: 'chat_1',
    participant: u1,
    lastMessage: 'Nice! Want to pair on the feed UI today?',
    lastAt: '10:21',
    unreadCount: 2,
  },
  {
    id: 'chat_2',
    participant: u2,
    lastMessage: 'I can share the API schema in a doc.',
    lastAt: 'Yesterday',
    unreadCount: 0,
  },
];

export const messagesSeed: ChatMessage[] = [
  { id: 'm_1', chatId: 'chat_1', senderId: 'u_1', text: 'Hey Robel!', createdAt: '10:15' },
  {
    id: 'm_2',
    chatId: 'chat_1',
    senderId: 'u_me',
    text: 'Hi Amina — sure, let’s do it.',
    createdAt: '10:16',
  },
  {
    id: 'm_3',
    chatId: 'chat_1',
    senderId: 'u_1',
    text: 'Nice! Want to pair on the feed UI today?',
    createdAt: '10:21',
  },
  {
    id: 'm_4',
    chatId: 'chat_2',
    senderId: 'u_2',
    text: 'I can share the API schema in a doc.',
    createdAt: 'Yesterday',
  },
];
