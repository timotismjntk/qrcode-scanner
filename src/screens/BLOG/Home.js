import React from 'react';
import {StyleSheet, Text, View, StatusBar, Image} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';

import {windowWidth, windowHeight} from '../../utils';

export default function Home({navigation}) {
  return (
    <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.container}>
      <StatusBar animated={true} translucent backgroundColor="#3B3B3B" />
      <View style={styles.menuContainer}>
        <RectButton
          onPress={() => navigation.navigate('Blog', {title: 'BLOG SISWA'})}
          style={styles.btn}>
          <View style={styles.iconWrapper}>
            <Image
              style={styles.icon}
              source={require('../../assets/icons/newspaper.png')}
            />
          </View>
          <Text style={styles.btnTitle}>Blog Siswa</Text>
        </RectButton>
        <RectButton
          onPress={() => navigation.navigate('Blog', {title: 'BLOG GURU'})}
          style={styles.btn}>
          <View style={styles.iconWrapper}>
            <Image
              style={styles.icon}
              source={require('../../assets/guru.png')}
            />
          </View>
          <Text style={styles.btnTitle}>Blog Guru</Text>
        </RectButton>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  menuContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingHorizontal: '14%',
    marginTop: '10%',
  },
  btn: {
    justifyContent: 'center',
    width: windowWidth * 0.3,
    height: windowWidth * 0.26,
    borderRadius: windowWidth * 0.03,
    alignItems: 'center',
    backgroundColor: '#3B3B3B',
  },
  btnTitle: {
    color: 'white',
    fontSize: windowWidth * 0.034,
    paddingHorizontal: '3%',
    textAlign: 'center',
    marginTop: '4%',
    fontFamily: 'OpenSans-Regular',
  },
  iconWrapper: {
    width: windowWidth * 0.12,
    height: windowWidth * 0.12,
    marginBottom: '2%',
    elevation: 10,
  },
  icon: {
    width: '100%',
    height: '100%',
  },
});
