import React from 'react';
import { Linking, Platform, Pressable, Text, View } from 'react-native';
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
      <Screen className="items-center justify-center px-6">
        <Text className="text-base font-semibold text-center">
          Просмотр статьи через WebView недоступен в Web-версии
        </Text>

        <Pressable
          onPress={() => Linking.openURL(url)}
          className="mt-4 px-4 py-2 rounded-xl bg-black"
        >
          <Text className="text-white font-semibold">Открыть статью</Text>
        </Pressable>

        <Text className="text-gray-500 mt-3 text-center text-xs">{url}</Text>
      </Screen>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <WebView source={{ uri: url }} startInLoadingState />
    </View>
  );
}
