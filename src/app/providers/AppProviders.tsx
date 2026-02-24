import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider, useDispatch, useSelector } from 'react-redux';

import { RootNavigator } from '../navigation/RootNavigator';
import { store } from '../store/store';
import type { RootState } from '../store/store';

import {
  loadFavorites,
  saveFavorites,
} from '../../shared/lib/favoritesStorage';
import { setFavorites } from '../../features/favorites/model/favoritesSlice';

function Bootstrap() {
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.favorites.items);

  useEffect(() => {
    const init = async () => {
      const items = await loadFavorites();
      dispatch(setFavorites(items));
    };
    init();
  }, [dispatch]);

  useEffect(() => {
    saveFavorites(favorites);
  }, [favorites]);

  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}

export function AppProviders() {
  return (
    <Provider store={store}>
      <Bootstrap />
    </Provider>
  );
}
