import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Article } from '../../features/favorites/model/favoritesSlice';

const KEY = 'favorites:v1';

export async function loadFavorites(): Promise<Article[]> {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Article[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function saveFavorites(items: Article[]) {
  try {
    await AsyncStorage.setItem(KEY, JSON.stringify(items));
  } catch {}
}
