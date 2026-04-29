import { Redirect } from 'expo-router';

import { useAppState } from '@/context/AppState';

export default function Index() {
  const { isAuthed } = useAppState();
  return <Redirect href={isAuthed ? '/(tabs)' : '/(auth)'} />;
}

