import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export async function requestPushPermissions(): Promise<boolean> {
  if (Platform.OS === 'web') return false;

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  if (existingStatus === 'granted') return true;

  const { status } = await Notifications.requestPermissionsAsync();
  return status === 'granted';
}

export async function getExpoPushToken(): Promise<string | null> {
  if (Platform.OS === 'web') return null;

  const granted = await requestPushPermissions();
  if (!granted) return null;

  try {
    const token = await Notifications.getExpoPushTokenAsync();
    return token.data;
  } catch {
    return null;
  }
}

export async function scheduleDemoNotification(): Promise<boolean> {
  if (Platform.OS === 'web') return false;

  const trigger: Notifications.TimeIntervalTriggerInput = {
    type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
    seconds: 2,
    repeats: false,
  };

  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'News App',
      body: 'Это тестовое уведомление 👍',
    },
    trigger,
  });

  return true;
}
