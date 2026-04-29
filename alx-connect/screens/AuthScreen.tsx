import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useMemo, useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { ALXText, Button, Card, Screen, TextField } from '@/components/alx';
import { useAppState } from '@/context/AppState';
import { ALXTheme } from '@/constants/alxTheme';

type Mode = 'login' | 'signup';

export function AuthScreen() {
  const router = useRouter();
  const { loginWithPassword, registerWithPassword, isAuthed } = useAppState();

  const [mode, setMode] = useState<Mode>('login');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const copy = useMemo(
    () =>
      mode === 'login'
        ? { title: 'Welcome back', subtitle: 'Login to connect with ALX students.' }
        : { title: 'Create account', subtitle: 'Join ALX Connect to collaborate and share.' },
    [mode],
  );

  useEffect(() => {
    if (isAuthed) router.replace('/(tabs)');
  }, [isAuthed, router]);

  const onSubmit = async () => {
    if (!username.trim()) {
      Alert.alert('Missing info', 'Please enter your username.');
      return;
    }
    if (!password.trim()) {
      Alert.alert('Missing info', 'Please enter your password.');
      return;
    }

    try {
      setLoading(true);
      if (mode === 'signup') {
        await registerWithPassword({
          username,
          password,
          email,
          name,
        });
      } else {
        await loginWithPassword(username, password);
      }
      router.replace('/(tabs)');
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Login failed';
      Alert.alert('Auth error', msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Screen style={styles.screen}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        keyboardVerticalOffset={12}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}>
          <View style={styles.hero}>
            <View style={styles.logo}>
              <Ionicons name="people" size={22} color="#fff" />
            </View>
            <ALXText variant="title">ALX Connect</ALXText>
            <ALXText muted style={{ marginTop: 6 }}>
              A social platform for ALX students.
            </ALXText>
          </View>

          <Card style={styles.card}>
            <View style={styles.segment}>
              <Pressable onPress={() => setMode('login')} style={[styles.segBtn, mode === 'login' && styles.segActive]}>
                <ALXText style={[styles.segText, mode === 'login' && styles.segTextActive]}>Login</ALXText>
              </Pressable>
              <Pressable onPress={() => setMode('signup')} style={[styles.segBtn, mode === 'signup' && styles.segActive]}>
                <ALXText style={[styles.segText, mode === 'signup' && styles.segTextActive]}>Signup</ALXText>
              </Pressable>
            </View>

            <ALXText variant="h2" style={{ marginTop: 14 }}>
              {copy.title}
            </ALXText>
            <ALXText muted style={{ marginTop: 6 }}>
              {copy.subtitle}
            </ALXText>

            {mode === 'signup' && (
              <View style={{ marginTop: 14 }}>
                <ALXText muted variant="caption" style={styles.label}>
                  Full name
                </ALXText>
                <TextField value={name} onChangeText={setName} placeholder="e.g. Robel Tesfaye" />
              </View>
            )}

            <View style={{ marginTop: 14 }}>
              <ALXText muted variant="caption" style={styles.label}>
                Username
              </ALXText>
              <TextField
                value={username}
                onChangeText={setUsername}
                placeholder="e.g. robel.alx"
                autoCapitalize="none"
              />
            </View>

            {mode === 'signup' && (
              <View style={{ marginTop: 14 }}>
                <ALXText muted variant="caption" style={styles.label}>
                  Email (optional)
                </ALXText>
                <TextField
                  value={email}
                  onChangeText={setEmail}
                  placeholder="you@alx.africa"
                  keyboardType="email-address"
                />
              </View>
            )}

            <View style={{ marginTop: 14 }}>
              <ALXText muted variant="caption" style={styles.label}>
                Password
              </ALXText>
              <TextField
                value={password}
                onChangeText={setPassword}
                placeholder="••••••••"
                secureTextEntry
              />
            </View>

            <Button
              title={mode === 'login' ? 'Login' : 'Create account'}
              loading={loading}
              onPress={onSubmit}
              containerStyle={{ marginTop: 18 }}
            />

            <ALXText muted variant="caption" style={{ marginTop: 12, textAlign: 'center' }}>
              Uses Django backend (JWT)
            </ALXText>
          </Card>
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: { paddingHorizontal: ALXTheme.spacing.xl, paddingTop: 10 },
  scrollContent: { paddingBottom: ALXTheme.spacing.xl },
  hero: { paddingTop: 20, paddingBottom: 18 },
  logo: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: ALXTheme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  card: { padding: ALXTheme.spacing.xl },
  segment: {
    flexDirection: 'row',
    padding: 4,
    borderRadius: ALXTheme.radius.pill,
    backgroundColor: '#F1F5F9',
    borderWidth: 1,
    borderColor: ALXTheme.colors.border,
  },
  segBtn: { flex: 1, paddingVertical: 10, borderRadius: ALXTheme.radius.pill, alignItems: 'center' },
  segActive: { backgroundColor: '#fff', borderWidth: 1, borderColor: ALXTheme.colors.border },
  segText: { fontWeight: '800', color: ALXTheme.colors.subtext },
  segTextActive: { color: ALXTheme.colors.text },
  label: { marginBottom: 8, fontWeight: '700' },
});
