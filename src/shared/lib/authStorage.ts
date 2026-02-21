import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'auth_is_logged_in';

export async function getAuthFlag(): Promise<boolean> {
  const value = await AsyncStorage.getItem(KEY);
  return value === '1';
}

export async function setAuthFlag(value: boolean): Promise<void> {
  await AsyncStorage.setItem(KEY, value ? '1' : '0');
}
