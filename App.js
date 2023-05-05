/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {Alert, Linking, LogBox, PermissionsAndroid} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {PersistGate} from 'redux-persist/integration/react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

// navigationContainer
import Navigator from './src/navigators/Navigator';

import {store, persistor} from './src/redux/store';
import {Provider} from 'react-redux';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
  'Require cycle: node_modules',
]);
LogBox.ignoreAllLogs(true);

export default function App() {
  useEffect(() => {
    const getPermission = async () => {
      const cameraPermission = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      );
      const READ_EXTERNAL_STORAGE = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      );
      const WRITE_EXTERNAL_STORAGE = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      );
      if (cameraPermission !== PermissionsAndroid.RESULTS.GRANTED) {
        const newCameraPermission = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
        );
        if (newCameraPermission !== PermissionsAndroid.RESULTS.GRANTED) {
          Alert.alert('Error', 'Akses kamera atau lokasi tidak diizinkan', [
            {
              text: 'Tutup',
              onPress: async () => {
                await PermissionsAndroid.request(
                  PermissionsAndroid.PERMISSIONS.CAMERA,
                );
                Linking.openSettings();
              },
              style: 'cancel',
            },
          ]);
        }
      }
      if (READ_EXTERNAL_STORAGE !== PermissionsAndroid.RESULTS.GRANTED) {
        const newREAD_EXTERNAL_STORAGEPermission =
          await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          );
        if (
          newREAD_EXTERNAL_STORAGEPermission !==
          PermissionsAndroid.RESULTS.GRANTED
        ) {
          Alert.alert('Error', 'Akses tidak diberi izin', [
            {
              text: 'Tutup',
              onPress: async () => {
                await PermissionsAndroid.request(
                  PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                );
                Linking.openSettings();
              },
              style: 'cancel',
            },
          ]);
        }
      }
      if (WRITE_EXTERNAL_STORAGE !== PermissionsAndroid.RESULTS.GRANTED) {
        const newWRITE_EXTERNAL_STORAGEPermission =
          await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          );
        if (
          newWRITE_EXTERNAL_STORAGEPermission !==
          PermissionsAndroid.RESULTS.GRANTED
        ) {
          Alert.alert('Error', 'Akses tidak diberi izin', [
            {
              text: 'Tutup',
              onPress: async () => {
                await PermissionsAndroid.request(
                  PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                );
                Linking.openSettings();
              },
              style: 'cancel',
            },
          ]);
        }
      }
    };
    getPermission();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GestureHandlerRootView style={{flex: 1}}>
          <SafeAreaProvider>
            <Navigator />
          </SafeAreaProvider>
        </GestureHandlerRootView>
      </PersistGate>
    </Provider>
  );
}
