import React, { useState } from 'react';
import { Alert, Platform, Pressable, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as LocalAuthentication from 'expo-local-authentication';

import type { RootStackParamList } from '../../app/navigation/RootNavigator';
import { setAuthFlag } from '../../shared/lib/authStorage';
import { GradientScreen } from '../../shared/ui/GradientScreen';
import { PinkButton } from '../../shared/ui/PinkButton';

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
    } catch {
      Alert.alert('Ошибка', 'Не удалось выполнить биометрическую проверку');
    } finally {
      setLoading(false);
    }
  };

  return (
    <GradientScreen>
      <View className="flex-1 items-center justify-center px-6">
        <Text className="text-white text-4xl font-extrabold mb-2">
          News App ✨
        </Text>
        <Text className="text-white/70 text-center mb-8">
          Вход в приложение
        </Text>

        <View className="w-full p-5 rounded-3xl border border-white/15 bg-white/5">
          <PinkButton title="Войти" onPress={login} loading={loading} />

          <Pressable
            onPress={loginWithBiometrics}
            disabled={loading}
            className="mt-3 w-full items-center py-3.5 rounded-2xl border border-white/20 bg-white/5"
          >
            <Text className="font-extrabold text-violet-200">
              Войти по биометрии 💅
            </Text>
          </Pressable>

          <Text className="text-white/50 text-xs text-center mt-4">
            pink • purple • glossy • pick-me
          </Text>
        </View>
      </View>
    </GradientScreen>
  );
}
