import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Platform,
  Pressable,
  Text,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as LocalAuthentication from 'expo-local-authentication';

import type { RootStackParamList } from '../../app/navigation/RootNavigator';
import { setAuthFlag } from '../../shared/lib/authStorage';

type Nav = NativeStackNavigationProp<RootStackParamList>;

export function LoginScreen() {
  const navigation = useNavigation<Nav>();
  const [loading, setLoading] = useState(false);

  const login = async () => {
    setLoading(true);
    await setAuthFlag(true);
    setLoading(false);
    navigation.replace('News');
  };

  const loginWithBiometrics = async () => {
    if (Platform.OS === 'web') {
      Alert.alert('Биометрия недоступна', 'Проверь на iOS/Android');
      return;
    }

    try {
      setLoading(true);

      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();

      if (!hasHardware) {
        Alert.alert('Биометрия недоступна', 'На устройстве нет FaceID/TouchID');
        return;
      }

      if (!isEnrolled) {
        Alert.alert(
          'Нет биометрии',
          'Добавь FaceID/TouchID в настройках устройства',
        );
        return;
      }

      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Войти в приложение',
        cancelLabel: 'Отмена',
      });

      if (result.success) {
        await setAuthFlag(true);
        navigation.replace('News');
      } else {
        Alert.alert('Не удалось', 'Биометрия не подтверждена');
      }
    } catch (e) {
      Alert.alert('Ошибка', 'Не удалось выполнить биометрическую проверку');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-white items-center justify-center px-6">
      <Text className="text-3xl font-bold mb-2">News App</Text>
      <Text className="text-gray-500 text-center mb-8">Вход в приложение</Text>

      <Pressable
        onPress={login}
        disabled={loading}
        className="bg-black px-6 py-3 rounded-xl w-full items-center"
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text className="text-white font-semibold">Войти</Text>
        )}
      </Pressable>

      <Pressable
        onPress={loginWithBiometrics}
        disabled={loading}
        className="mt-3 border border-gray-300 px-6 py-3 rounded-xl w-full items-center"
      >
        <Text className="font-semibold">Войти по биометрии</Text>
      </Pressable>
    </View>
  );
}
