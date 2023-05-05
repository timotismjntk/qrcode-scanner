/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Image, View} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';
import {StackActions} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// import Wisata screens
import HomeMesinAbsen from '../../screens/MesinAbsen/Home';
import LoginMesinAbsen from '../../screens/MesinAbsen/Login';
import RFIDMesinAbsen from '../../screens/MesinAbsen/RFID';

const Stack = createStackNavigator();
import {horizontalTransition, moderateScale, windowWidth} from '../../utils';

export default function MesinAbsenNavigator() {
  // call accesscode stored in mmkv storage
  const {authMesin = {}} = useSelector(state => state.authMesin) || {};

  const HeaderRight = () => (
    <View
      style={{
        width: windowWidth * 0.3,
        marginRight: '4%',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}>
      <Image
        style={{
          width: '100%',
          height: '100%',
          resizeMode: 'center',
        }}
        source={require('../../assets/icons2/logo.png')}
      />
    </View>
  );

  if (authMesin?.status === 'berhasil') {
    return (
      <Stack.Navigator>
        <Stack.Screen
          options={({route}) => ({
            ...horizontalTransition,
            headerTitle: route?.params?.nama_sekolah || 'Mesin Absen',
            headerRight: HeaderRight,
          })}
          name="HomeMesinAbsen"
          component={HomeMesinAbsen}
          lazy={true}
        />
        <Stack.Screen
          options={{
            ...horizontalTransition,
            headerShown: false,
            headerRight: HeaderRight,
          }}
          name="RFID"
          component={RFIDMesinAbsen}
          lazy={true}
        />
      </Stack.Navigator>
    );
  } else {
    return (
      <Stack.Navigator>
        <Stack.Screen
          options={({navigation}) => ({
            ...horizontalTransition,
            headerTitle: '',
            headerTransparent: true,
            headerTintColor: 'rgba(0,0,0,0.6)',
            headerLeft: headerLeftProp => (
              <TouchableWithoutFeedback
                onPress={() =>
                  headerLeftProp?.canGoBack
                    ? navigation?.goBack()
                    : navigation.dispatch(
                        StackActions.replace('DashboardNavigator'),
                      )
                }>
                <MaterialIcons
                  name="arrow-back"
                  size={windowWidth * 0.065}
                  style={{padding: '2%'}}
                  color="black"
                />
              </TouchableWithoutFeedback>
            ),
          })}
          name="LoginMesinAbsen"
          component={LoginMesinAbsen}
          lazy={true}
        />
      </Stack.Navigator>
    );
  }
}
