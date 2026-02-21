import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { LoginScreen } from '../../pages/login';
import { NewsScreen } from '../../pages/news';
import { DetailsScreen } from '../../pages/details';
import { FavoritesScreen } from '../../pages/favorites';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { getAuthFlag } from '../../shared/lib/authStorage';

export type RootStackParamList = {
  Login: undefined;
  News: undefined;
  Details: { url: string };
  Favorites: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  const [ready, setReady] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const init = async () => {
      const flag = await getAuthFlag();
      setIsLoggedIn(flag);
      setReady(true);
    };
    init();
  }, []);

  if (!ready) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <Stack.Navigator initialRouteName={isLoggedIn ? 'News' : 'Login'}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="News" component={NewsScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
      <Stack.Screen name="Favorites" component={FavoritesScreen} />
    </Stack.Navigator>
  );
}
