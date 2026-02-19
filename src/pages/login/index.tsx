import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../app/navigation/RootNavigator';

type Nav = NativeStackNavigationProp<RootStackParamList>;

export function LoginScreen() {
  const navigation = useNavigation<Nav>();

  return (
    <View className="flex-1 bg-green-500 items-center justify-center px-6">
      <Text className="text-3xl font-bold mb-4">News App</Text>
      <Text className="text-gray-500 text-center mb-8">
        Авторизация пользователя
      </Text>

      <Pressable
        onPress={() => navigation.replace('News')}
        className="bg-black px-6 py-3 rounded-xl"
      >
        <Text className="text-white font-semibold">Войти</Text>
      </Pressable>
    </View>
  );
}
