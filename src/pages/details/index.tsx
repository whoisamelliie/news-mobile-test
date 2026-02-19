import React from 'react';
import { Platform, Text, View, Linking, Pressable } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { WebView } from 'react-native-webview';
import type { RootStackParamList } from '../../app/navigation/RootNavigator';

type DetailsRoute = RouteProp<RootStackParamList, 'Details'>;

export function DetailsScreen() {
  const route = useRoute<DetailsRoute>();
  const { url } = route.params;

  if (Platform.OS === 'web') {
    return (
      <View style={{ flex: 1, padding: 16 }}>
        <Text style={{ fontSize: 18, fontWeight: '700', marginBottom: 8 }}>
          Статья
        </Text>
        <Text style={{ marginBottom: 12 }}>
          WebView на web-платформе не поддерживается.
        </Text>

        <Pressable
          onPress={() => Linking.openURL(url)}
          style={{
            backgroundColor: '#000',
            paddingVertical: 12,
            paddingHorizontal: 16,
            borderRadius: 12,
            alignSelf: 'flex-start',
          }}
        >
          <Text style={{ color: '#fff', fontWeight: '600' }}>
            Открыть в браузере
          </Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <WebView source={{ uri: url }} />
    </View>
  );
}
