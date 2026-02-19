import React from 'react';
import { Text, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import type { RootStackParamList } from '../../app/navigation/RootNavigator';

type DetailsRoute = RouteProp<RootStackParamList, 'Details'>;

export function DetailsScreen() {
  const route = useRoute<DetailsRoute>();
  const { url } = route.params;

  return (
    <View className="flex-1 bg-white">
      <View className="px-4 py-3 border-b border-gray-200">
        <Text className="text-base font-semibold">Статья</Text>
        <Text className="text-xs text-gray-500 mt-1" numberOfLines={1}>
          {url}
        </Text>
      </View>

      <WebView source={{ uri: url }} />
    </View>
  );
}
