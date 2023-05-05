/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback, useEffect} from 'react';
import {StatusBar, StyleSheet, Text, Image, View} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';

import {windowWidth, windowHeight} from '../../utils';

import {logoutMesin} from '../../redux/reducer/MESIN/auth';

export default function PilihJenisAbsen({navigation}) {
  const dispatch = useDispatch();

  const pilihAbsen = useCallback(value => {
    navigation.navigate('RFID', {jenis_absen: value});
  }, []);

  const {authMesin = {}} = useSelector(state => state.authMesin) || {};

  useEffect(() => {
    if (authMesin?.result?.nama_sekolah) {
      navigation.setParams({nama_sekolah: authMesin?.result?.nama_sekolah});
    }
  }, [authMesin]);

  return (
    <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.container}>
      <StatusBar animated={true} translucent backgroundColor="#3B3B3B" />
      <View style={styles.wrapper}>
        <Text style={styles.headerTitle}>Pilih Jenis Absen</Text>
        <RectButton
          onPress={() => pilihAbsen('Absen Masuk')}
          style={styles.btn}>
          <Text style={styles.btnTitle}>Absen Masuk</Text>
        </RectButton>
        <RectButton
          onPress={() => pilihAbsen('Absen Pulang')}
          style={styles.btn}>
          <Text style={styles.btnTitle}>Absen Pulang</Text>
        </RectButton>
        <RectButton
          onPress={() => dispatch(logoutMesin())}
          style={styles.btnLogout}>
          <Text style={styles.btnLogoutTitle}>Logout</Text>
        </RectButton>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(247,247,247)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapper: {
    width: '100%',
    paddingHorizontal: windowWidth * 0.08,
  },
  headerTitle: {
    fontSize: windowWidth * 0.05,
    color: 'black',
    textAlign: 'center',
    fontFamily: 'OpenSans-Bold',
  },
  linear: {
    width: '100%',
    borderRadius: windowWidth * 0.02,
    alignItems: 'center',
    marginTop: '5%',
  },
  btn: {
    padding: '4%',
    paddingHorizontal: '5%',
    width: '100%',
    borderRadius: windowWidth * 0.02,
    alignItems: 'center',
    backgroundColor: '#61A2F9',
    marginTop: '5%',
    elevation: 10,
  },
  btnTitle: {
    color: 'white',
    fontSize: windowWidth * 0.04,
    fontFamily: 'OpenSans-SemiBold',
  },
  btnLogout: {
    padding: '4%',
    paddingHorizontal: '5%',
    width: '100%',
    borderRadius: windowWidth * 0.02,
    alignItems: 'center',
    backgroundColor: '#3B3B3B',
    marginTop: '5%',
    elevation: 10,
  },
  btnLogoutTitle: {
    color: 'white',
    fontSize: windowWidth * 0.04,
    paddingRight: '2%',
    fontFamily: 'OpenSans-SemiBold',
  },
  iconLogout: {
    width: windowWidth * 0.05,
    height: windowWidth * 0.05,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
