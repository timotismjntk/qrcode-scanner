import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

export default function LinearButton({style, children}) {
  return (
    <LinearGradient style={style} colors={['#3281ff', '#1b6cfc', '#0035ad']}>
      {children}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({});
