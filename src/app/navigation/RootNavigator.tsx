import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { LoginScreen } from '../../pages/login';
import { NewsScreen } from '../../pages/news';
import { DetailsScreen } from '../../pages/details';
import { FavoritesScreen } from '../../pages/favorites';
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
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0B0014',
        }}
      >
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <Stack.Navigator
      initialRouteName={isLoggedIn ? 'News' : 'Login'}
      screenOptions={{
        headerStyle: { backgroundColor: '#0B0014' },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: { fontWeight: '800' },
        headerShadowVisible: false,
        contentStyle: { backgroundColor: '#0B0014' },
      }}
    >
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="News"
        component={NewsScreen}
        options={{ title: 'News ✨' }}
      />

      <Stack.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{ title: 'Favorites 💖' }}
      />

      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        options={{ title: 'Details ✨' }}
      />
    </Stack.Navigator>
  );
}
