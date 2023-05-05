/**
 * @format
 */

import 'react-native-gesture-handler';
import {AppRegistry, Linking} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import PushNotification, {Importance} from 'react-native-push-notification';

PushNotification.createChannel({
  channelId: 'sekoolahid-default-4-10000',
  channelName: 'Sekoolah.id Notification',
  channelDescription: 'Sekoolah.id',
  soundName: 'default',
  importance: Importance.HIGH,
  allowWhileIdle: true,
  vibrate: true,
  playSound: true,
});

PushNotification.configure({
  onRegister: () => {},
  onNotification: data => {
    PushNotification.localNotification({
      id: String(data?.id || ''),
      autoCancel: true,
      channelId: 'sekoolahid-default-4-10000',
      title: data?.title,
      message:
        data?.message?.length > 240
          ? data?.message?.substring(0, 240)
          : data?.message,
      data: data?.data,
      smallIcon: 'ic_notification',
      bigPictureUrl: data?.bigPictureUrl,
      largeIconUrl: data?.largeIconUrl,
      vibrate: true,
      vibration: 1000,
      playSound: true,
      invokeApp: true,
      when: new Date().getTime(),
      color: '#0099e5',
      allowWhileIdle: true,
      priority: 'max',
      visibility: 'public',
      importance: 'max',
    });
    const clicked = data?.userInteraction;
    if (clicked) {
      data?.data?.url && Linking.openURL(data?.data?.url);
      PushNotification.cancelLocalNotification({id: data?.id});
    }
  },
  popInitialNotification: true,
  requestPermissions: true,
});

AppRegistry.registerComponent(appName, () => App);
