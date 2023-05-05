/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useCallback, useRef, useEffect} from 'react';
import {StatusBar, StyleSheet, Text, TextInput, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';

import LoadingModal from '../../components/LoadingModal';

import {windowWidth, windowHeight} from '../../utils';

import {
  clearAbsenMesin,
  mulaiAbsen_RFID,
} from '../../redux/reducer/MESIN/absen';

export default function RFID({route}) {
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const [rfidCode, setRfidCode] = useState('');
  const [clock, setClock] = useState('');
  const {authMesin = {}} = useSelector(state => state.authMesin) || {};
  const {absenMesin = {}, isLoadingAbsenMesin = false} =
    useSelector(state => state.absenMesin) || {};

  const sendRfidCode = useCallback(() => {
    dispatch(
      mulaiAbsen_RFID({
        kode_akses: authMesin?.result?.kode_akses,
        jenis_absen: route?.params?.jenis_absen || '',
        rfid: rfidCode,
      }),
    );
    setRfidCode('');
  }, [authMesin, route?.params, rfidCode, inputRef]);

  const customJam = useCallback(() => {
    const detik = new Date().getSeconds();
    const menit = new Date().getMinutes();
    const jam = new Date().getHours();
    setClock(
      `${jam < 10 ? '0' + jam : jam}:${menit < 10 ? '0' + menit : menit}:${
        detik < 10 ? '0' + detik : detik
      }`,
    );
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      customJam();
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (!isLoadingAbsenMesin) {
      inputRef?.current?.focus();
    }
  }, [isLoadingAbsenMesin, inputRef]);

  useEffect(() => {
    if (absenMesin?.pesan?.length > 0) {
      dispatch(clearAbsenMesin());
    }
  }, [absenMesin]);

  return (
    <SafeAreaView edges={['bottom', 'right', 'left']} style={styles.container}>
      <View style={styles.wrapper}>
        <LoadingModal
          open={isLoadingAbsenMesin || false}
          close={() => dispatch(clearAbsenMesin())}
        />
        <StatusBar animated={true} translucent backgroundColor="#3B3B3B" />
        <Text style={styles.jam}>{clock || '00:00:00'}</Text>
        <Text style={styles.inputTitle}>{route.params?.jenis_absen}</Text>
        <TextInput
          ref={inputRef}
          autoFocus
          editable={!isLoadingAbsenMesin}
          showSoftInputOnFocus={false}
          style={styles.input}
          textAlign="center"
          secureTextEntry
          value={rfidCode}
          onChangeText={setRfidCode}
          onSubmitEditing={sendRfidCode}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(247,247,247)',
  },
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(247,247,247)',
    minHeight: windowHeight,
    paddingHorizontal: windowWidth * 0.08,
  },
  jam: {
    fontSize: windowWidth * 0.1,
    color: 'black',
    fontFamily: 'OpenSans-SemiBold',
  },
  inputTitle: {
    fontSize: windowWidth * 0.055,
    color: 'black',
    fontFamily: 'OpenSans-SemiBold',
  },
  input: {
    fontSize: windowWidth * 0.045,
    color: 'black',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.3)',
    width: '100%',
    borderRadius: windowWidth * 0.02,
    marginTop: '7%',
    fontFamily: 'OpenSans-Regular',
    elevation: 10,
  },
});
