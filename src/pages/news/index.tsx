import React, { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
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

type Nav = NativeStackNavigationProp<RootStackParamList>;

export function NewsScreen() {
  const navigation = useNavigation<Nav>();

  const [search, setSearch] = useState('');

  const [debouncedSearch, setDebouncedSearch] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  const { data, isLoading, isError, refetch } = useGetArticlesQuery({
    page: 1,
    pageSize: 10,
    query: debouncedSearch,
  });

  const items = useMemo(() => data ?? [], [data]);

  // Loading
  if (isLoading) {
    return (
      <Screen className="items-center justify-center">
        <ActivityIndicator />
      </Screen>
    );
  }

  // Error
  if (isError) {
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
      </View>

      <View className="px-4 pb-3">
        <TextField
          value={search}
          onChangeText={setSearch}
          placeholder="Поиск..."
        />
      </View>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
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
            </View>
          </Pressable>
        )}
      />
    </Screen>
  );
}
