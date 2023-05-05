/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {FlatList, StatusBar, StyleSheet, Text, View} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';

// import components
import Dropdown from '../../../../components/DropDown';
import Item from './components/Item';

import {windowWidth, windowHeight} from '../../../../utils';

import {getJadwalPelajaran} from '../../../../redux/reducer/GURU/jadwalPelajaran';
import {getTahunAjaran} from '../../../../redux/reducer/SISWA/tahunAjaran';
import {getKelas} from '../../../../redux/reducer/SISWA/kelas';

export default function AnggotaKelas({navigation}) {
  const dispatch = useDispatch();
  const [tahunAjaranSelected, setTahunAjaranSelected] = useState('');
  const [selectedKelas, setSelectedKelas] = useState('');
  const [selectedHari, setSelectedHari] = useState('');

  const {authGuru = {}} = useSelector(state => state.authGuru) || {};
  const {tahunAjaran = {}} = useSelector(state => state.tahunAjaran) || {};
  const {kelas = {}} = useSelector(state => state.kelas) || {};
  const {jadwalPelajaran = {}, isLoadingJadwalPelajaran = false} =
    useSelector(state => state.jadwalPelajaran) || {};

  useEffect(() => {
    dispatch(
      getTahunAjaran({
        website_id: authGuru?.data?.website_id,
      }),
    );
  }, [authGuru]);

  useEffect(() => {
    if (Array.isArray(tahunAjaran?.result)) {
      if (tahunAjaranSelected) {
        const {tahunajaran_id = ''} =
          tahunAjaran?.result?.find(
            item => item?.tahunajaran === tahunAjaranSelected,
          ) || {};
        if (tahunajaran_id) {
          dispatch(getKelas({tahunajaran_id: tahunajaran_id}));
        }
      }
    }
  }, [tahunAjaran, tahunAjaranSelected]);

  const memoizedTahunAjaran = useMemo(() => {
    if (Array?.isArray(tahunAjaran?.result)) {
      return tahunAjaran?.result?.map(item => item?.tahunajaran);
    } else {
      return [];
    }
  }, [tahunAjaran]);

  useEffect(() => {
    if (Array.isArray(tahunAjaran?.result)) {
      if (tahunAjaranSelected) {
        const {tahunajaran_id = ''} =
          tahunAjaran?.result?.find(
            item => item?.tahunajaran === tahunAjaranSelected,
          ) || {};
        if (tahunajaran_id) {
          dispatch(getKelas({tahunajaran_id: tahunajaran_id}));
        }
      }
    }
  }, [tahunAjaran, tahunAjaranSelected]);

  const memoizedKelas = useMemo(() => {
    if (memoizedTahunAjaran?.length > 0 && tahunAjaranSelected?.length > 0) {
      if (Array.isArray(kelas?.result)) {
        return kelas?.result?.map(item => item?.nama_kelas);
      } else {
        return [];
      }
    } else {
      return [];
    }
  }, [memoizedTahunAjaran, kelas, tahunAjaranSelected]);

  const lihatJadwalPelajaran = useCallback(() => {
    if (authGuru?.status === 'berhasil') {
      const {kelas_id} =
        kelas?.result?.find(item => item?.nama_kelas === selectedKelas) || {};
      if (kelas_id) {
        dispatch(
          getJadwalPelajaran({
            kelas_id: kelas_id,
            hari: selectedHari,
          }),
        );
      }
    }
  }, [authGuru, kelas, selectedKelas, selectedHari]);

  const memoizedData = useMemo(() => {
    if (Array.isArray(jadwalPelajaran?.result)) {
      return jadwalPelajaran?.result;
    } else {
      return [];
    }
  }, [jadwalPelajaran]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar animated={true} translucent backgroundColor="#3B3B3B" />
      <FlatList
        data={memoizedData}
        refreshing={isLoadingJadwalPelajaran}
        onRefresh={() => {
          if (tahunAjaranSelected && selectedKelas && selectedHari) {
            lihatJadwalPelajaran();
          }
        }}
        progressViewOffset={windowHeight * 0.15}
        ListHeaderComponent={
          <View style={styles.wrapper}>
            <View style={styles.form}>
              <Text style={styles.inputTitle}>Tahun Ajaran</Text>
              <Dropdown
                list={memoizedTahunAjaran}
                selectedValue={tahunAjaranSelected}
                setValue={setTahunAjaranSelected}
                placeholder="- Pilih Tahun -"
              />
              <Text style={styles.inputTitle}>Kelas</Text>
              <Dropdown
                list={memoizedKelas}
                selectedValue={selectedKelas}
                setValue={setSelectedKelas}
                placeholder="- Pilih Kelas -"
              />
              <Text style={styles.inputTitle}>Hari</Text>
              <Dropdown
                type="day"
                selectedValue={selectedHari}
                setValue={setSelectedHari}
                placeholder="- Pilih Hari -"
              />
              <RectButton
                style={
                  tahunAjaranSelected && selectedKelas && selectedHari
                    ? styles.button
                    : styles.disabledButton
                }
                enabled={Boolean(
                  tahunAjaranSelected && selectedKelas && selectedHari,
                )}
                onPress={lihatJadwalPelajaran}>
                <Text style={styles.buttonTitle}>Lihat</Text>
              </RectButton>
            </View>
          </View>
        }
        ListEmptyComponent={
          <Text style={styles.emptyData}>jadwal Pelajaran Siswa kosong...</Text>
        }
        keyExtractor={item => item?.jadwalpelajaran_id}
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
    paddingHorizontal: windowWidth * 0.01,
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
  disabledButton: {
    padding: '3%',
    width: '100%',
    borderRadius: windowWidth * 0.02,
    alignItems: 'center',
    backgroundColor: 'grey',
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
    paddingHorizontal: windowWidth * 0.08,
    borderRadius: windowWidth * 0.01,
  },
  flatlist: {
    padding: '7%',
    paddingVertical: '7%',
    minHeight: windowHeight,
    paddingTop: '25%',
  },
});
