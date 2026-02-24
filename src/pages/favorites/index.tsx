import React, { useState } from 'react';
import { Alert, FlatList, Pressable, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useDispatch, useSelector } from 'react-redux';

import type { RootState } from '../../app/store/store';
import type { RootStackParamList } from '../../app/navigation/RootNavigator';
import { removeFromFavorites } from '../../features/favorites/model/favoritesSlice';
import { pickFile, downloadDemoFile, shareFile } from '../../shared/lib/files';

import { GradientScreen } from '../../shared/ui/GradientScreen';
import { TwGradient } from '../../shared/ui/TwGradient';
import { PinkButton } from '../../shared/ui/PinkButton';
import { GlassButton } from '../../shared/ui/GlassButton';

type Nav = NativeStackNavigationProp<RootStackParamList>;

export function FavoritesScreen() {
  const navigation = useNavigation<Nav>();
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.favorites.items);

  const [pickedName, setPickedName] = useState<string | null>(null);

  return (
    <GradientScreen>
      <View className="px-4 pt-5">
        <View className="rounded-3xl p-4 border border-white/15 bg-white/5">
          <Text className="text-white text-3xl font-extrabold">
            Избранное 💖
          </Text>
          <Text className="text-white/70 mt-1">Сохранённые статьи</Text>

          <View className="flex-row gap-3 mt-4">
            <GlassButton
              title="Назад"
              onPress={() => navigation.goBack()}
              className="flex-1"
            />
            <GlassButton
              title="К новостям"
              onPress={() => navigation.navigate('News')}
              className="flex-1"
            />
          </View>
        </View>

        {/* Files card */}
        <View className="mt-4 rounded-3xl p-4 border border-white/15 bg-white/5">
          <Text className="text-white text-lg font-extrabold mb-2">
            Файлы ✨
          </Text>

          <Pressable
            onPress={async () => {
              const file = await pickFile();
              if (!file) {
                Alert.alert(
                  'Недоступно',
                  'Выбор файла работает на iOS/Android',
                );
                return;
              }
              setPickedName(file.name);
              Alert.alert('Файл выбран', file.name);
            }}
            className="rounded-2xl overflow-hidden"
          >
            <TwGradient
              colors={['#FF4FD8', '#8B5CFF']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              className="py-3 items-center"
            >
              <Text className="text-white font-extrabold">
                Загрузить файл (Upload)
              </Text>
            </TwGradient>
          </Pressable>

          {!!pickedName && (
            <Text className="text-white/70 mt-2">Выбран: {pickedName}</Text>
          )}

          <Pressable
            onPress={async () => {
              const uri = await downloadDemoFile();
              if (!uri) {
                Alert.alert('Недоступно', 'Скачивание работает на iOS/Android');
                return;
              }
              Alert.alert('Файл скачан', 'Открою меню “Поделиться”');
              await shareFile(uri);
            }}
            className="mt-3 px-4 py-3 rounded-2xl border border-white/15 bg-white/5 items-center"
          >
            <Text className="text-white font-extrabold">
              Скачать файл (Download)
            </Text>
          </Pressable>
        </View>
      </View>

      {!items.length ? (
        <View className="flex-1 items-center justify-center px-6">
          <View className="w-full rounded-3xl p-6 border border-white/15 bg-white/5 items-center">
            <Text className="text-white text-lg font-extrabold">
              Пока пусто
            </Text>
            <Text className="text-white/70 mt-2 text-center">
              Добавь статьи в избранное на экране “Новости”
            </Text>
            <View className="mt-4 w-full">
              <PinkButton
                title="Перейти к новостям ✨"
                onPress={() => navigation.navigate('News')}
              />
            </View>
          </View>
        </View>
      ) : (
        <FlatList
          data={items}
          keyExtractor={(item) => `${item.id}-${item.url}`}
          contentContainerStyle={{
            padding: 16,
            paddingTop: 14,
            paddingBottom: 24,
          }}
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
                    dispatch(removeFromFavorites(item.id));
                  }}
                  className="mt-4 rounded-2xl overflow-hidden"
                >
                  <TwGradient
                    colors={['rgba(255,79,216,0.35)', 'rgba(139,92,255,0.35)']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    className="py-3 items-center border border-white/15"
                  >
                    <Text className="text-white font-extrabold text-sm">
                      Удалить 🗑️
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
