import React from 'react';
import { Alert, Linking, Platform, Pressable, Text, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import { WebView } from 'react-native-webview';

import { Screen } from '../../shared/ui/Screen';
import type { RootStackParamList } from '../../app/navigation/RootNavigator';

type DetailsRoute = RouteProp<RootStackParamList, 'Details'>;

export function DetailsScreen() {
  const route = useRoute<DetailsRoute>();
  const url = route.params?.url;

  if (!url) {
    return (
      <Screen className="items-center justify-center px-6">
        <Text className="text-base font-semibold">Нет ссылки на статью</Text>
      </Screen>
    );
  }

  if (Platform.OS === 'web') {
    return (
      <Screen className="px-4 pt-4">
        <Text className="text-lg font-bold mb-2">Статья</Text>
        <Text className="text-gray-600 mb-4">{url}</Text>

        <Pressable
          onPress={async () => {
            const can = await Linking.canOpenURL(url);
            if (!can) {
              Alert.alert('Ошибка', 'Не могу открыть ссылку');
              return;
            }
            await Linking.openURL(url);
          }}
          className="bg-black rounded-xl py-3 items-center"
        >
          <Text className="text-white font-semibold">Открыть в браузере</Text>
        </Pressable>
      </Screen>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <WebView
        source={{ uri: url }}
        startInLoadingState
        renderLoading={() => (
          <Screen className="items-center justify-center">
            <Text>Загрузка...</Text>
          </Screen>
        )}
      />
    </View>
  );
}
