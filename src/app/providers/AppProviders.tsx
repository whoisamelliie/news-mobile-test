import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider, useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { RootNavigator } from '../navigation/RootNavigator';
import { store, type RootState } from '../store/store';
import { setFavorites } from '../../features/favorites/model/favoritesSlice';

function PersistFavorites() {
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.favorites.items);

  useEffect(() => {
    const load = async () => {
      try {
        const saved = await AsyncStorage.getItem('favorites');
        if (saved) {
          dispatch(setFavorites(JSON.parse(saved)));
        }
      } catch (e) {}
    };

    load();
  }, [dispatch]);

  useEffect(() => {
    const save = async () => {
      try {
        await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
      } catch (e) {}
    };

    save();
  }, [favorites]);

  return null;
}

export function AppProviders() {
  return (
    <Provider store={store}>
      <PersistFavorites />
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </Provider>
  );
}
