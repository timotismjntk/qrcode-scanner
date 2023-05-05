import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {windowWidth, windowHeight} from '../utils';

export default function NotFound() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.logoWrapper}>
        <Image
          style={styles.logo}
          source={require('../assets/icons2/logo.png')}
        />
      </View>
      <Text style={styles.label}>
        Maaf halaman tujuan anda tidak ditemukan!
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoWrapper: {
    width: windowWidth * 0.7,
    height: windowHeight * 0.1,
  },
  logo: {
    width: '100%',
    height: '100%',
    resizeMode: 'center',
  },
  label: {
    fontSize: windowWidth * 0.045,
    color: 'black',
    marginTop: '3%',
    textAlign: 'center',
  },
});
