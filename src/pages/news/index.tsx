import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  Text,
  View,
} from 'react-native';
import { useGetArticlesQuery } from '../../entities/article/api/articlesApi';

export function NewsScreen() {
  const { data, isLoading, isError, refetch } = useGetArticlesQuery({
    page: 1,
    pageSize: 10,
    query: '',
  });

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator />
      </View>
    );
  }

  if (isError) {
    return (
      <View className="flex-1 items-center justify-center px-6">
        <Text className="text-base mb-3">Ошибка загрузки</Text>
        <Pressable
          onPress={() => refetch()}
          className="px-4 py-2 rounded-xl bg-black"
        >
          <Text className="text-white font-semibold">Повторить</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      <View className="px-4 pt-4 pb-2">
        <Text className="text-2xl font-bold">Новости</Text>
        <Text className="text-gray-500 mt-1">Лента статей</Text>
      </View>

      <FlatList
        data={data ?? []}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <View className="bg-gray-50 rounded-2xl p-4 mb-3 border border-gray-200">
            <Text className="text-base font-semibold">{item.title}</Text>
            {item.description ? (
              <Text className="text-gray-600 mt-2">{item.description}</Text>
            ) : null}
            <Text className="text-gray-400 mt-3 text-xs">
              {item.publishedAt}
            </Text>
          </View>
        )}
      />
    </View>
  );
}
