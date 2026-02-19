import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { LoginScreen } from '../../pages/login';
import { NewsScreen } from '../../pages/news';
import { DetailsScreen } from '../../pages/details';
import { FavoritesScreen } from '../../pages/favorites';

export type RootStackParamList = {
  Login: undefined;
  News: undefined;
  Details: undefined;
  Favorites: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="News" component={NewsScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
      <Stack.Screen name="Favorites" component={FavoritesScreen} />
    </Stack.Navigator>
  );
}
