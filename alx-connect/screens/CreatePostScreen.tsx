import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';

import { ALXText, Button, Card, Screen } from '@/components/alx';
import { useAppState } from '@/context/AppState';
import { ALXTheme } from '@/constants/alxTheme';

export function CreatePostScreen() {
  const router = useRouter();
  const { addFeedPost } = useAppState();
  const [text, setText] = useState('');
  const [imageUri, setImageUri] = useState('');

  const onPost = () => {
    if (!text.trim()) {
      Alert.alert('Empty post', 'Write something to post.');
      return;
    }
    addFeedPost(text, imageUri);
    setText('');
    setImageUri('');
    router.replace('/(tabs)');
  };

  const pickFromGallery = async () => {
    const perms = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!perms.granted) {
      Alert.alert('Permission needed', 'Allow photo access to attach images to your post.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 0.9,
    });

    if (result.canceled) return;
    const asset = result.assets?.[0];
    if (asset?.uri) setImageUri(asset.uri);
  };

  const takePhoto = async () => {
    const perms = await ImagePicker.requestCameraPermissionsAsync();
    if (!perms.granted) {
      Alert.alert('Permission needed', 'Allow camera access to take a photo for your post.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 0.9,
    });

    if (result.canceled) return;
    const asset = result.assets?.[0];
    if (asset?.uri) setImageUri(asset.uri);
  };

  return (
    <Screen>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0}
        style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <ALXText variant="title">Create post</ALXText>
            <ALXText muted style={{ marginTop: 6 }}>
              Share progress, ideas, or a project update.
            </ALXText>
          </View>

          <Card style={styles.card}>
            <ALXText muted variant="caption" style={{ fontWeight: '700' }}>
              Write
            </ALXText>
            <View style={styles.editor}>
              <Ionicons
                name="create-outline"
                size={18}
                color={ALXTheme.colors.subtext}
                style={{ marginTop: 3 }}
              />
              <TextInput
                value={text}
                onChangeText={setText}
                placeholder="What are you building today?"
                placeholderTextColor="#94A3B8"
                multiline
                textAlignVertical="top"
                style={styles.input}
              />
            </View>

            <View style={{ marginTop: 14 }}>
              <ALXText muted variant="caption" style={{ fontWeight: '700' }}>
                Photo (optional)
              </ALXText>
              <View style={styles.photoRow}>
                <Button
                  title="Gallery"
                  variant="secondary"
                  left={<Ionicons name="images-outline" size={18} color={ALXTheme.colors.primary} />}
                  onPress={pickFromGallery}
                  containerStyle={{ flex: 1, height: 46 }}
                />
                <Button
                  title="Camera"
                  variant="secondary"
                  left={<Ionicons name="camera-outline" size={18} color={ALXTheme.colors.primary} />}
                  onPress={takePhoto}
                  containerStyle={{ flex: 1, height: 46 }}
                />
              </View>
              {!!imageUri.trim() && (
                <View style={{ marginTop: 10 }}>
                  <Image source={{ uri: imageUri.trim() }} style={styles.preview} contentFit="cover" />
                  <Button
                    title="Remove photo"
                    variant="ghost"
                    onPress={() => setImageUri('')}
                    containerStyle={{ marginTop: 10, height: 44 }}
                  />
                </View>
              )}
            </View>

            <View style={{ marginTop: 12 }}>
              <Button title="Post" onPress={onPost} />
            </View>
          </Card>
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: ALXTheme.spacing.xl,
    paddingTop: 14,
    paddingBottom: 28,
  },
  header: { paddingBottom: 12 },
  card: { padding: ALXTheme.spacing.xl },
  editor: {
    flexDirection: 'row',
    gap: 10,
    borderWidth: 1,
    borderColor: ALXTheme.colors.border,
    borderRadius: ALXTheme.radius.md,
    backgroundColor: '#fff',
    padding: 12,
    minHeight: 170,
    marginTop: 10,
  },
  input: {
    flex: 1,
    color: ALXTheme.colors.text,
    fontSize: ALXTheme.typography.body,
    lineHeight: 22,
    padding: 0,
    margin: 0,
  },
  photoRow: { marginTop: 10, flexDirection: 'row', gap: 10 },
  preview: {
    width: '100%',
    height: 220,
    borderRadius: ALXTheme.radius.lg,
    backgroundColor: '#E5E7EB',
  },
});
