import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Pressable,
  Text,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { Screen } from '../../shared/ui/Screen';
import { TextField } from '../../shared/ui/TextField';
import { useGetArticlesQuery } from '../../entities/article/api/articlesApi';
import type { RootStackParamList } from '../../app/navigation/RootNavigator';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorites } from '../../features/favorites/model/favoritesSlice';
import type { RootState } from '../../app/store/store';
import { setAuthFlag } from '../../shared/lib/authStorage';
import {
  scheduleDemoNotification,
  getExpoPushToken,
} from '../../shared/lib/notifications';

type Nav = NativeStackNavigationProp<RootStackParamList>;

export function NewsScreen() {
  const navigation = useNavigation<Nav>();
  const dispatch = useDispatch();
  const favoritesCount = useSelector(
    (state: RootState) => state.favorites.items.length,
  );
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  const [page, setPage] = useState(1);
  const [articles, setArticles] = useState<any[]>([]);

  useEffect(() => {
    const init = async () => {
      const token = await getExpoPushToken();
      if (token) {
        console.log('Expo Push Token:', token);
      } else {
        console.log(
          'Push token not available (web/simulator or no permissions)',
        );
      }
    };

    init();
  }, []);

  const { data, isLoading, isError, refetch, isFetching } = useGetArticlesQuery(
    {
      page,
      pageSize: 10,
      query: debouncedSearch,
    },
  );

  useEffect(() => {
    if (!data) return;

    setArticles((prev) => {
      if (page === 1) return data;

      const existing = new Set(prev.map((x) => `${x.id}-${x.url}`));
      const next = data.filter((x) => !existing.has(`${x.id}-${x.url}`));

      return [...prev, ...next];
    });
  }, [data, page]);

  useEffect(() => {
    setPage(1);
    setArticles([]);
  }, [debouncedSearch]);

  if (isLoading && page === 1) {
    return (
      <Screen className="items-center justify-center">
        <ActivityIndicator />
      </Screen>
    );
  }

  // Error
  if (isError && page === 1) {
    return (
      <Screen className="items-center justify-center px-6">
        <Text className="text-base mb-3">Ошибка загрузки</Text>
        <Pressable
          onPress={() => refetch()}
          className="px-4 py-2 rounded-xl bg-black"
        >
          <Text className="text-white font-semibold">Повторить</Text>
        </Pressable>
      </Screen>
    );
  }

  return (
    <Screen>
      <View className="px-4 pt-4 pb-2">
        <Text className="text-2xl font-bold">Новости</Text>
        <Text className="text-gray-500 mt-1">Лента статей</Text>
        <Text className="text-gray-500 mt-1">
          В избранном: {favoritesCount}
        </Text>
      </View>
      <Pressable
        onPress={async () => {
          await setAuthFlag(false);
          navigation.replace('Login');
        }}
        className="mt-2 px-4 py-2 rounded-xl bg-black self-start"
      >
        <Text className="text-white text-sm font-semibold">Выйти</Text>
      </Pressable>
      <Pressable
        onPress={async () => {
          const ok = await scheduleDemoNotification();
          if (!ok) {
            Alert.alert(
              'Недоступно на Web',
              'Уведомления работают на iOS/Android',
            );
          }
        }}
        className="mt-2 px-4 py-2 rounded-xl border border-gray-300 self-start"
      >
        <Text className="text-sm font-semibold">Тест уведомления</Text>
      </Pressable>

      <Pressable
        onPress={() => navigation.navigate('Favorites')}
        className="mx-4 mb-3 bg-black rounded-xl py-2 items-center"
      >
        <Text className="text-white text-sm">Открыть избранное</Text>
      </Pressable>

      <View className="px-4 pb-3">
        <TextField
          value={search}
          onChangeText={setSearch}
          placeholder="Поиск..."
        />
      </View>

      <FlatList
        data={articles}
        keyExtractor={(item) => `${item.id}-${item.publishedAt}`}
        contentContainerStyle={{ padding: 16 }}
        onEndReached={() => setPage((prev) => prev + 1)}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          isFetching ? (
            <View style={{ paddingVertical: 16 }}>
              <ActivityIndicator />
            </View>
          ) : null
        }
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
                  dispatch(
                    addToFavorites({
                      ...item,
                      id: item.id ?? item.url,
                    }),
                  );
                }}
                className="mt-3 bg-black rounded-xl py-2 items-center"
              >
                <Text className="text-white text-sm">В избранное</Text>
              </Pressable>
            </View>
          </Pressable>
        )}
      />
    </Screen>
  );
}
