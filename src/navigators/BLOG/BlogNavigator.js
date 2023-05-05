/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Image} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();

// import User screens
import HomeBlog from '../../screens/BLOG/Home';
import Blog from '../../screens/BLOG/Blog';
import DetailBlog from '../../screens/BLOG/DetailBlog';

import {horizontalTransition, windowWidth, windowHeight} from '../../utils';

export default function BlogNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          ...horizontalTransition,
          headerTitleAlign: 'center',
          headerTitle: 'BLOG',
          headerTitleStyle: {
            fontFamily: 'OpenSans-Bold',
            top: -windowHeight * 0.003,
            fontSize: windowWidth * 0.042,
          },
          headerLeftContainerStyle: {
            top: -windowHeight * 0.003,
          },
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
        name="HomeBlog"
        component={HomeBlog}
      />
      <Stack.Screen
        options={({route}) => ({
          ...horizontalTransition,
          headerTitleAlign: 'center',
          headerTitle: route?.params?.title || 'BLOG',
          headerTitleStyle: {
            fontFamily: 'OpenSans-Bold',
            top: -windowHeight * 0.003,
            fontSize: windowWidth * 0.042,
          },
          headerLeftContainerStyle: {
            top: -windowHeight * 0.003,
          },
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
        })}
        name="Blog"
        component={Blog}
      />
      <Stack.Screen
        options={({route}) => ({
          ...horizontalTransition,
          headerTitleAlign: 'center',
          headerTitle: route?.params?.title || 'DETAIL BLOG',
          headerTitleStyle: {
            fontFamily: 'OpenSans-Bold',
            top: -windowHeight * 0.003,
            fontSize: windowWidth * 0.042,
          },
          headerLeftContainerStyle: {
            top: -windowHeight * 0.003,
          },
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
        })}
        name="DetailBlog"
        component={DetailBlog}
      />
    </Stack.Navigator>
  );
}
