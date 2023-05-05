/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Image} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

// import User screens
import Informasi from '../../screens/INFORMASI/Informasi';

const Stack = createStackNavigator();
import {horizontalTransition, windowWidth, windowHeight} from '../../utils';

export default function InformasiNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          ...horizontalTransition,
          headerTitleAlign: 'center',
          headerTitle: 'INFORMASI',
          headerTintColor: 'black',
          headerLeftContainerStyle: {
            top: -windowHeight * 0.008,
          },
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
          headerTitleStyle: {
            fontFamily: 'OpenSans-SemiBold',
            top: -windowHeight * 0.003,
            fontSize: windowWidth * 0.042,
          },
          headerStatusBarHeight: windowHeight * 0.05,
        }}
        name="Informasi"
        component={Informasi}
      />
    </Stack.Navigator>
  );
}
