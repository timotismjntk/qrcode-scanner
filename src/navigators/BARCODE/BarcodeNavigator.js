/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Image} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();

// import User screens
import ScanBarcode from '../../screens/BARCODE/QrReader';

import {windowWidth, windowHeight} from '../../utils';

export default function BarcodeNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerTitleAlign: 'center',
          headerTitle: 'SCAN BARCODE',
          headerTitleStyle: {
            fontFamily: 'OpenSans-Bold',
            top: -windowHeight * 0.003,
            fontSize: windowWidth * 0.042,
          },
          headerLeftContainerStyle: {
            top: -windowHeight * 0.003,
          },
          headerShadowVisible: false,
          headerTintColor: 'black',
          headerBackground: () => (
            <Image
              style={{width: '100%', height: '100%', resizeMode: 'cover'}}
              source={require('../../assets/icons2/headerBackground.png')}
            />
          ),
          headerBackgroundContainerStyle: {
            overflow: 'hidden',
            backgroundColor: '#3B3B3B',
            borderBottomLeftRadius: windowWidth * 0.1,
            borderBottomRightRadius: windowWidth * 0.1,
            height: windowHeight * 0.1,
            top: windowHeight * 0.03,
            borderWidth: 1,
            borderColor: '#BDBDBD',
          },
          headerTransparent: true,
          headerStatusBarHeight: windowHeight * 0.05,
        }}
        name="ScanBarcode"
        component={ScanBarcode}
      />
    </Stack.Navigator>
  );
}
