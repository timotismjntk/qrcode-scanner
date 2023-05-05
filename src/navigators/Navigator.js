/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import PushNotification from 'react-native-push-notification';
import {Image, Linking, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useSelector} from 'react-redux';

const Stack = createStackNavigator();
import {horizontalTransition, windowWidth} from '../utils';

// import Home screens
import DashboardNavigator from '../screens/Dashboard';

// import navigators
import MesinAbsenNavigator from './MESIN/MesinAbsenNavigator';
import SiswaNavigator from './SISWA/SiswaNavigator';
import GuruNavigator from './GURU/GuruNavigator';
import BeritaNavigator from './BERITA/BeritaNavigator';
import InformasiNavigator from './INFORMASI/InformasiNavigator';
import BlogNavigator from './BLOG/BlogNavigator';
import GaleriNavigator from './GALERI/GaleriNavigator';
import BarcodeNavigator from './BARCODE/BarcodeNavigator';

// import not found linking
import NotFound from './../screens/NotFound';

export default function RootNavigator() {
  const {authMesin = {}} = useSelector(state => state.authMesin) || {};
  const {authGuru = {}} = useSelector(state => state.authGuru) || {};
  const {authSiswa = {}} = useSelector(state => state.authSiswa) || {};

  const configSiswa = {
    screens: {
      SiswaNavigator: {
        screens: {
          LogAbsen: {
            path: 'logAbsenSiswa',
          },
          Agenda: {
            path: 'agenda',
          },
        },
      },
      InformasiNavigator: 'informasi',
      BeritaNavigator: 'berita',
      GaleriNavigator: 'galeri',
      BlogNavigator: 'blog',
      NotFound: '*',
    },
  };
  const configGuru = {
    screens: {
      GuruNavigator: {
        screens: {
          LogAbsen: {
            path: 'logAbsenGuru',
          },
          Agenda: {
            path: 'agenda',
          },
        },
      },
      InformasiNavigator: 'informasi',
      BeritaNavigator: 'berita',
      GaleriNavigator: 'galeri',
      BlogNavigator: 'blog',
      NotFound: '*',
    },
  };

  const linkingGuru = {
    prefixes: ['sekoolah://'],
    config: configGuru,
    getInitialURL: async () => {
      // check for notification deep linking
      PushNotification.popInitialNotification(notification => {
        // <---- 1
        if (!notification) {
          return;
        }
        const url = notification?.data?.url || null;
        url && Linking.openURL(url);
      });
      // this is the default return
      // return await Linking.getInitialURL();
    },
  };

  const linkingSiswa = {
    prefixes: ['sekoolah://'],
    config: configSiswa,
    getInitialURL: async () => {
      // check for notification deep linking
      PushNotification.popInitialNotification(notification => {
        // <---- 1
        if (!notification) {
          return;
        }
        const url = notification?.data?.url || null;
        url && Linking.openURL(url);
      });
      // this is the default return
      // return await Linking.getInitialURL();
    },
  };

  if (authMesin?.status === 'berhasil') {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            options={{...horizontalTransition, headerShown: false}}
            name="MesinAbsenNavigator"
            component={MesinAbsenNavigator}
            lazy={true}
          />
          <Stack.Screen
            options={{...horizontalTransition, headerShown: false}}
            name="BeritaNavigator"
            component={BeritaNavigator}
            lazy={true}
          />
          <Stack.Screen
            options={{...horizontalTransition, headerShown: false}}
            name="InformasiNavigator"
            component={InformasiNavigator}
            lazy={true}
          />
          <Stack.Screen
            options={{...horizontalTransition, headerShown: false}}
            name="BlogNavigator"
            component={BlogNavigator}
            lazy={true}
          />
          <Stack.Screen
            options={{...horizontalTransition, headerShown: false}}
            name="GaleriNavigator"
            component={GaleriNavigator}
            lazy={true}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="BarcodeNavigator"
            component={BarcodeNavigator}
            lazy={true}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else if (authGuru?.status === 'berhasil') {
    return (
      <NavigationContainer linking={linkingGuru}>
        <Stack.Navigator>
          <Stack.Screen
            options={{...horizontalTransition, headerShown: false}}
            name="GuruNavigator"
            component={GuruNavigator}
            lazy={true}
          />
          <Stack.Screen
            options={{...horizontalTransition, headerShown: false}}
            name="BeritaNavigator"
            component={BeritaNavigator}
            lazy={true}
          />
          <Stack.Screen
            options={{...horizontalTransition, headerShown: false}}
            name="InformasiNavigator"
            component={InformasiNavigator}
            lazy={true}
          />
          <Stack.Screen
            options={{...horizontalTransition, headerShown: false}}
            name="BlogNavigator"
            component={BlogNavigator}
            lazy={true}
          />
          <Stack.Screen
            options={{...horizontalTransition, headerShown: false}}
            name="GaleriNavigator"
            component={GaleriNavigator}
            lazy={true}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="BarcodeNavigator"
            component={BarcodeNavigator}
            lazy={true}
          />
          <Stack.Screen
            options={{
              ...horizontalTransition,
              headerTransparent: true,
              headerTitle: '',
            }}
            name="NotFound"
            component={NotFound}
            lazy={true}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else if (authSiswa?.status === 'berhasil') {
    return (
      <NavigationContainer linking={linkingSiswa}>
        <Stack.Navigator>
          <Stack.Screen
            options={{...horizontalTransition, headerShown: false}}
            name="SiswaNavigator"
            component={SiswaNavigator}
            lazy={true}
          />
          <Stack.Screen
            options={{...horizontalTransition, headerShown: false}}
            name="BeritaNavigator"
            component={BeritaNavigator}
            lazy={true}
          />
          <Stack.Screen
            options={{...horizontalTransition, headerShown: false}}
            name="InformasiNavigator"
            component={InformasiNavigator}
            lazy={true}
          />
          <Stack.Screen
            options={{...horizontalTransition, headerShown: false}}
            name="BlogNavigator"
            component={BlogNavigator}
            lazy={true}
          />
          <Stack.Screen
            options={{...horizontalTransition, headerShown: false}}
            name="GaleriNavigator"
            component={GaleriNavigator}
            lazy={true}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="BarcodeNavigator"
            component={BarcodeNavigator}
            lazy={true}
          />
          <Stack.Screen
            options={{
              ...horizontalTransition,
              headerTransparent: true,
              headerTitle: '',
            }}
            name="NotFound"
            component={NotFound}
            lazy={true}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            options={{
              ...horizontalTransition,
              headerStyle: {
                backgroundColor: '#3281ff',
                elevation: 0,
              },
              headerShown: false,
              headerTitle: () => (
                <View
                  style={{
                    width: windowWidth * 0.5,
                    alignItems: 'center',
                    justifyContent: 'center',
                    // height: windowHeight * 0.1,
                    overflow: 'hidden',
                  }}>
                  <Image
                    style={{
                      width: '100%',
                      height: '100%',
                      resizeMode: 'center',
                    }}
                    source={require('../assets/logo.png')}
                  />
                </View>
              ),
            }}
            name="DashboardNavigator"
            component={DashboardNavigator}
            lazy={true}
          />
          <Stack.Screen
            options={{...horizontalTransition, headerShown: false}}
            name="SiswaNavigator"
            component={SiswaNavigator}
            lazy={true}
          />
          <Stack.Screen
            options={{...horizontalTransition, headerShown: false}}
            name="MesinAbsenNavigator"
            component={MesinAbsenNavigator}
            lazy={true}
          />
          <Stack.Screen
            options={{...horizontalTransition, headerShown: false}}
            name="GuruNavigator"
            component={GuruNavigator}
            lazy={true}
          />
          <Stack.Screen
            options={{...horizontalTransition, headerShown: false}}
            name="BeritaNavigator"
            component={BeritaNavigator}
            lazy={true}
          />
          <Stack.Screen
            options={{...horizontalTransition, headerShown: false}}
            name="InformasiNavigator"
            component={InformasiNavigator}
            lazy={true}
          />
          <Stack.Screen
            options={{...horizontalTransition, headerShown: false}}
            name="BlogNavigator"
            component={BlogNavigator}
            lazy={true}
          />
          <Stack.Screen
            options={{...horizontalTransition, headerShown: false}}
            name="GaleriNavigator"
            component={GaleriNavigator}
            lazy={true}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="BarcodeNavigator"
            component={BarcodeNavigator}
            lazy={true}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
