/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {FlatList, Image, StatusBar, StyleSheet, Text, View} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';

// import components
import Dropdown from '../../../components/DropDown';
import Item from './components/Item';

import {windowWidth, windowHeight} from '../../../utils';

import {getPelanggaranSiswa} from '../../../redux/reducer/GURU/pelanggaranSiswa';

export default function Index({navigation}) {
  const dispatch = useDispatch();

  const {authSiswa = {}} = useSelector(state => state.authSiswa) || {};
  const {tahunAjaran = {}} = useSelector(state => state.tahunAjaran) || {};
  const {kelas = {}} = useSelector(state => state.kelas) || {};
  const {anggotaKelas = {}} = useSelector(state => state.anggotaKelas) || {};
  const {pelanggaranSiswa = {}, isLoadingPelanggaranSiswa = false} =
    useSelector(state => state.pelanggaranSiswa) || {};

  const lihatDataPelanggaranSiswa = useCallback(() => {
    if (authSiswa?.status === 'berhasil') {
      const {siswa_id = ''} = authSiswa?.data?.siswa || {};
      dispatch(
        getPelanggaranSiswa({
          website_id: authSiswa?.data?.website_id || '',
          siswa_id: siswa_id || '',
        }),
      );
    }
  }, [tahunAjaran, kelas, authSiswa, anggotaKelas]);

  useEffect(() => {
    lihatDataPelanggaranSiswa();
  }, []);

  const memoizedData = useMemo(() => {
    if (Array.isArray(pelanggaranSiswa?.result)) {
      return pelanggaranSiswa?.result;
    } else {
      return [];
    }
  }, [pelanggaranSiswa]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar animated={true} translucent backgroundColor="#3B3B3B" />
      <FlatList
        data={memoizedData}
        refreshing={isLoadingPelanggaranSiswa}
        onRefresh={lihatDataPelanggaranSiswa}
        progressViewOffset={windowHeight * 0.15}
        ListEmptyComponent={
          <Text style={styles.emptyData}>Data Pelanggaran kosong...</Text>
        }
        renderItem={itemProps => <Item {...itemProps} />}
        contentContainerStyle={styles.flatlist}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  wrapper: {
    alignItems: 'center',
    width: '100%',
    marginBottom: '6%',
  },
  form: {
    paddingHorizontal: windowWidth * 0.06,
    width: '100%',
  },
  inputTitle: {
    fontSize: windowWidth * 0.04,
    color: 'black',
    fontFamily: 'OpenSans-SemiBold',
  },
  input: {
    fontSize: windowWidth * 0.045,
    color: 'black',
    width: '100%',
    borderRadius: windowWidth * 0.02,
    marginTop: '3%',
    paddingHorizontal: '3%',
    paddingVertical: '2.5%',
    fontFamily: 'OpenSans-Regular',
    marginBottom: '6%',
    borderWidth: 0.8,
  },
  button: {
    padding: '3%',
    width: '100%',
    borderRadius: windowWidth * 0.02,
    alignItems: 'center',
    backgroundColor: '#61A2F9',
    elevation: 10,
    marginTop: '3%',
  },
  buttonTitle: {
    color: 'white',
    fontSize: windowWidth * 0.04,
    fontFamily: 'OpenSans-SemiBold',
  },
  emptyData: {
    fontSize: windowWidth * 0.034,
    fontFamily: 'OpenSans-Regular',
    color: 'black',
    backgroundColor: 'white',
    paddingHorizontal: '4%',
    borderRadius: windowWidth * 0.01,
  },
  flatlist: {
    paddingVertical: '7%',
    paddingTop: '25%',
    minHeight: windowHeight,
  },
  separator: {
    height: '0.2%',
    marginBottom: '4%',
  },
});
