import React from 'react';
import { Pressable, Text, View } from 'react-native';
import type { Article } from '../../../entities/article/model/types';

type Props = {
  item: Article;
  onPress: () => void;
};

export function NewsCard({ item, onPress }: Props) {
  return (
    <Pressable onPress={onPress} className="mb-3">
      <View className="bg-gray-50 rounded-2xl p-4 border border-gray-200">
        <Text className="text-base font-semibold">{item.title}</Text>

        {item.description ? (
          <Text className="text-gray-600 mt-2">{item.description}</Text>
        ) : null}

        <Text className="text-gray-400 mt-3 text-xs">{item.publishedAt}</Text>
      </View>
    </Pressable>
  );
}
