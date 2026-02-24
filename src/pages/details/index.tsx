import React from 'react';
import { Alert, Linking, Platform, Pressable, Text, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import { WebView } from 'react-native-webview';

import type { RootStackParamList } from '../../app/navigation/RootNavigator';
import { GradientScreen } from '../../shared/ui/GradientScreen';
import { PinkButton } from '../../shared/ui/PinkButton';
import { GlassButton } from '../../shared/ui/GlassButton';

type DetailsRoute = RouteProp<RootStackParamList, 'Details'>;

export function DetailsScreen() {
  const route = useRoute<DetailsRoute>();
  const url = route.params?.url;

  if (!url) {
    return (
      <GradientScreen>
        <View className="flex-1 items-center justify-center px-6">
          <View className="w-full rounded-3xl p-6 border border-white/15 bg-white/5 items-center">
            <Text className="text-white text-lg font-extrabold">
              Нет ссылки на статью
            </Text>
            <Text className="text-white/70 mt-2 text-center">
              Вернись назад и выбери статью
            </Text>
          </View>
        </View>
      </GradientScreen>
    );
  }

  if (Platform.OS === 'web') {
    return (
      <GradientScreen>
        <View className="flex-1 px-4 pt-5">
          <View className="rounded-3xl p-4 border border-white/15 bg-white/5">
            <Text className="text-white text-2xl font-extrabold">
              Статья ✨
            </Text>
            <Text className="text-white/70 mt-2" numberOfLines={2}>
              {url}
            </Text>

            <View className="mt-4">
              <PinkButton
                title="Открыть в браузере 🌐"
                onPress={async () => {
                  const can = await Linking.canOpenURL(url);
                  if (!can) {
                    Alert.alert('Ошибка', 'Не могу открыть ссылку');
                    return;
                  }
                  await Linking.openURL(url);
                }}
              />
            </View>

            <View className="mt-3">
              <GlassButton title="Назад" onPress={() => history.back()} />
            </View>
          </View>
        </View>
      </GradientScreen>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <WebView
        source={{ uri: url }}
        startInLoadingState
        renderLoading={() => (
          <GradientScreen>
            <View className="flex-1 items-center justify-center">
              <Text className="text-white font-extrabold">Загрузка…</Text>
              <Text className="text-white/70 mt-2">Открываю статью</Text>
            </View>
          </GradientScreen>
        )}
      />
    </View>
  );
}
