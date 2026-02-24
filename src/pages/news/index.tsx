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
import { useDispatch, useSelector } from 'react-redux';

import type { RootStackParamList } from '../../app/navigation/RootNavigator';
import type { RootState } from '../../app/store/store';
import { addToFavorites } from '../../features/favorites/model/favoritesSlice';
import { setAuthFlag } from '../../shared/lib/authStorage';
import {
  scheduleDemoNotification,
  getExpoPushToken,
} from '../../shared/lib/notifications';
import { useGetArticlesQuery } from '../../entities/article/api/articlesApi';

import { GradientScreen } from '../../shared/ui/GradientScreen';
import { TwGradient } from '../../shared/ui/TwGradient';
import { PinkButton } from '../../shared/ui/PinkButton';
import { GlassButton } from '../../shared/ui/GlassButton';
import { TextField } from '../../shared/ui/TextField';

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
    const t = setTimeout(() => setDebouncedSearch(search.trim()), 350);
    return () => clearTimeout(t);
  }, [search]);

  useEffect(() => {
    const init = async () => {
      const token = await getExpoPushToken();
      if (token) console.log('Expo Push Token:', token);
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

  return (
    <GradientScreen>
      <View className="px-4 pt-5">
        <View className="rounded-3xl p-4 border border-white/15 bg-white/5">
          <View className="flex-row items-start justify-between">
            <View className="flex-1 pr-3">
              <Text className="text-white text-3xl font-extrabold">
                Новости ✨
              </Text>
              <Text className="text-white/70 mt-1">Лента статей</Text>
              <Text className="text-white/60 mt-1">
                В избранном: {favoritesCount}
              </Text>
            </View>

            <View className="px-3 py-1 rounded-full bg-fuchsia-400/15 border border-fuchsia-300/30">
              <Text className="text-fuchsia-200 text-xs font-extrabold">
                pick-me
              </Text>
            </View>
          </View>

          <View className="flex-row gap-3 mt-4">
            <GlassButton
              title="Выйти"
              onPress={async () => {
                await setAuthFlag(false);
                navigation.replace('Login');
              }}
              className="flex-1"
            />
            <GlassButton
              title="Тест уведомл."
              onPress={async () => {
                const ok = await scheduleDemoNotification();
                if (!ok)
                  Alert.alert(
                    'Недоступно на Web',
                    'Уведомления работают на iOS/Android',
                  );
              }}
              className="flex-1"
            />
          </View>

          <View className="mt-3">
            <PinkButton
              title="Открыть избранное 💖"
              onPress={() => navigation.navigate('Favorites')}
            />
          </View>

          <View className="mt-3">
            <TextField
              value={search}
              onChangeText={setSearch}
              placeholder="Поиск..."
            />
          </View>
        </View>
      </View>

      {isLoading && page === 1 ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator />
          <Text className="text-white/70 mt-3 font-semibold">
            Загружаю ленту…
          </Text>
        </View>
      ) : isError && page === 1 ? (
        <View className="flex-1 items-center justify-center px-6">
          <View className="w-full rounded-3xl p-5 border border-white/15 bg-white/5 items-center">
            <Text className="text-white text-base font-extrabold">
              Ошибка загрузки
            </Text>
            <Text className="text-white/70 mt-2 text-center">
              Проверь интернет и попробуй ещё раз
            </Text>
            <View className="mt-4 w-full">
              <PinkButton title="Повторить" onPress={() => refetch()} />
            </View>
          </View>
        </View>
      ) : (
        <FlatList
          data={articles}
          keyExtractor={(item) => `${item.id}-${item.publishedAt}`}
          contentContainerStyle={{
            padding: 16,
            paddingTop: 14,
            paddingBottom: 24,
          }}
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
              className="mb-4"
            >
              <View className="rounded-3xl p-4 border border-white/15 bg-white/5">
                <Text className="text-white font-extrabold text-base leading-5">
                  {item.title}
                </Text>

                {!!item.description && (
                  <Text className="text-white/70 mt-2 leading-5">
                    {item.description}
                  </Text>
                )}

                <Text className="text-white/50 mt-3 text-xs">
                  {item.publishedAt}
                </Text>

                <Pressable
                  onPress={(e) => {
                    e.stopPropagation?.();
                    dispatch(
                      addToFavorites({ ...item, id: item.id ?? item.url }),
                    );
                  }}
                  className="mt-4 rounded-2xl overflow-hidden"
                >
                  <TwGradient
                    colors={['#FF4FD8', '#8B5CFF']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    className="py-3 items-center"
                  >
                    <Text className="text-white font-extrabold text-sm">
                      В избранное 💖
                    </Text>
                  </TwGradient>
                </Pressable>
              </View>
            </Pressable>
          )}
        />
      )}
    </GradientScreen>
  );
}
