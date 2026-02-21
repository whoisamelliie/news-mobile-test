import React, { useState } from 'react';
import { Alert, FlatList, Pressable, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useDispatch, useSelector } from 'react-redux';

import { Screen } from '../../shared/ui/Screen';
import type { RootState } from '../../app/store/store';
import type { RootStackParamList } from '../../app/navigation/RootNavigator';
import { removeFromFavorites } from '../../features/favorites/model/favoritesSlice';

import { pickFile, downloadDemoFile, shareFile } from '../../shared/lib/files';

type Nav = NativeStackNavigationProp<RootStackParamList>;

export function FavoritesScreen() {
  const navigation = useNavigation<Nav>();
  const dispatch = useDispatch();

  const items = useSelector((state: RootState) => state.favorites.items);

  const [pickedName, setPickedName] = useState<string | null>(null);

  if (!items.length) {
    return (
      <Screen className="items-center justify-center px-6">
        <Text className="text-base font-semibold">Пока пусто</Text>
        <Text className="text-gray-500 mt-2 text-center">
          Добавь статьи в избранное на экране “Новости”
        </Text>

        <Pressable
          onPress={() => navigation.navigate('News')}
          className="mt-4 px-4 py-2 rounded-xl bg-black"
        >
          <Text className="text-white font-semibold">Перейти к новостям</Text>
        </Pressable>
      </Screen>
    );
  }

  return (
    <Screen>
      <View className="px-4 pt-4 pb-2">
        <Text className="text-2xl font-bold">Избранное</Text>
        <Text className="text-gray-500 mt-1">Сохранённые статьи</Text>
      </View>

      <View className="mt-6 px-4">
        <Text className="text-lg font-bold mb-2">Файлы</Text>

        <Pressable
          onPress={async () => {
            const file = await pickFile();
            if (!file) {
              Alert.alert('Недоступно', 'Выбор файла работает на iOS/Android');
              return;
            }
            setPickedName(file.name);
            Alert.alert('Файл выбран', file.name);
          }}
          className="bg-black rounded-xl py-3 items-center"
        >
          <Text className="text-white font-semibold">
            Загрузить файл (Upload)
          </Text>
        </Pressable>

        {pickedName ? (
          <Text className="text-gray-600 mt-2">Выбран: {pickedName}</Text>
        ) : null}

        <Pressable
          onPress={async () => {
            const uri = await downloadDemoFile();
            if (!uri) {
              Alert.alert('Недоступно', 'Скачивание работает на iOS/Android');
              return;
            }
            await shareFile(uri);
          }}
          className="mt-3 border border-gray-300 rounded-xl py-3 items-center"
        >
          <Text className="font-semibold">Скачать файл (Download)</Text>
        </Pressable>
      </View>

      <FlatList
        data={items}
        keyExtractor={(item) => `${item.id}-${item.url}`}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => navigation.navigate('Details', { url: item.url })}
            className="mb-3"
          >
            <View className="bg-gray-50 rounded-2xl p-4 border border-gray-200">
              <Text className="text-base font-semibold">{item.title}</Text>

              {item.description ? (
                <Text className="text-gray-600 mt-2">{item.description}</Text>
              ) : null}

              <Text className="text-gray-400 mt-3 text-xs">
                {item.publishedAt}
              </Text>

              <Pressable
                onPress={(e) => {
                  e.stopPropagation?.();
                  dispatch(removeFromFavorites(item.id));
                }}
                className="mt-3 bg-white border border-gray-300 rounded-xl py-2 items-center"
              >
                <Text className="text-sm font-semibold">Удалить</Text>
              </Pressable>
            </View>
          </Pressable>
        )}
      />
    </Screen>
  );
}
