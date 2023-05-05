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

import {getTahunAjaran} from '../../../../redux/reducer/SISWA/tahunAjaran';
import {getKelas} from '../../../../redux/reducer/SISWA/kelas';
import {getMataPelajaran} from '../../../../redux/reducer/SISWA/mataPelajaran';
import {getDataGuru} from '../../../../redux/reducer/GURU/dataGuru';
import {getKoleksiMateri} from '../../../../redux/reducer/GURU/koleksiMateri';

export default function KoleksiMateri({navigation}) {
  const dispatch = useDispatch();
  const [tahunAjaranSelected, setTahunAjaranSelected] = useState('');
  const [selectedKelas, setSelectedKelas] = useState('');
  const [selectedMataPelajaran, setSelectedMataPelajaran] = useState('');
  const [selectedPengajar, setSelectedPengajar] = useState('');

  const {authGuru = {}} = useSelector(state => state.authGuru) || {};
  const {tahunAjaran = {}} = useSelector(state => state.tahunAjaran) || {};
  const {kelas = {}} = useSelector(state => state.kelas) || {};
  const {mataPelajaran = {}} = useSelector(state => state.mataPelajaran) || {};
  const {dataGuru = {}} = useSelector(state => state.dataGuru) || {};
  const {koleksiMateri = {}} = useSelector(state => state.koleksiMateri) || {};

  useEffect(() => {
    if (authGuru?.status === 'berhasil') {
      dispatch(
        getTahunAjaran({
          website_id: authGuru?.data?.website_id,
        }),
      );
      dispatch(getDataGuru({website_id: authGuru?.data?.website_id}));
    }
  }, [authGuru]);

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

  useEffect(() => {
    if (Array.isArray(tahunAjaran?.result)) {
      if (tahunAjaranSelected) {
        const {tahunajaran_id = ''} =
          tahunAjaran?.result?.find(
            item => item?.tahunajaran === tahunAjaranSelected,
          ) || {};
        if (tahunajaran_id) {
          dispatch(getKelas({tahunajaran_id: tahunajaran_id}));
          dispatch(getMataPelajaran({tahunajaran_id: tahunajaran_id}));
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

  const memoizedMataPelajaran = useMemo(() => {
    if (memoizedTahunAjaran?.length > 0 && tahunAjaranSelected?.length > 0) {
      if (Array.isArray(mataPelajaran?.result)) {
        return mataPelajaran?.result?.map(item => item?.nama_matapelajaran);
      } else {
        return [];
      }
    } else {
      return [];
    }
  }, [memoizedTahunAjaran, mataPelajaran, tahunAjaranSelected]);

  const memoizedPengajar = useMemo(() => {
    if (Array?.isArray(dataGuru?.result?.sdms)) {
      return dataGuru?.result?.sdms?.map(item => item?.nama);
    } else {
      return [];
    }
  }, [dataGuru]);

  const lihatKoleksiMateri = useCallback(() => {
    if (authGuru?.status === 'berhasil') {
      const {tahunajaran_id} =
        tahunAjaran?.result?.find(
          item => item?.tahunajaran === tahunAjaranSelected,
        ) || {};
      const {kelas_id} =
        kelas?.result?.find(item => item?.nama_kelas === selectedKelas) || {};
      const {sdm_id = ''} =
        dataGuru?.result?.sdms?.find(item => item?.nama === selectedPengajar) ||
        {};
      const {matapelajaran_id = ''} =
        mataPelajaran?.result?.find(
          item => item?.nama_matapelajaran === selectedMataPelajaran,
        ) || {};
      dispatch(
        getKoleksiMateri({
          website_id: authGuru?.data?.website_id,
          tahunajaran_id,
          kelas_id,
          matapelajaran_id,
          sdm_id,
        }),
      );
    }
  }, [
    authGuru,
    dataGuru,
    kelas,
    mataPelajaran,
    tahunAjaran,
    tahunAjaranSelected,
    selectedKelas,
    selectedPengajar,
    selectedMataPelajaran,
  ]);

  const memoizedData = useMemo(() => {
    if (Array.isArray(koleksiMateri?.materi)) {
      return koleksiMateri?.materi;
    } else {
      return [];
    }
  }, [koleksiMateri]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar animated={true} translucent backgroundColor="#3B3B3B" />
      <FlatList
        data={memoizedData}
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
              <Text style={styles.inputTitle}>Mata Pelajaran</Text>
              <Dropdown
                list={memoizedMataPelajaran}
                selectedValue={selectedMataPelajaran}
                setValue={setSelectedMataPelajaran}
                placeholder="- Pilih Mata Pelajaran -"
              />
              <Text style={styles.inputTitle}>Pengajar</Text>
              <Dropdown
                list={memoizedPengajar}
                selectedValue={selectedPengajar}
                setValue={setSelectedPengajar}
                placeholder="- Pilih Pengajar -"
              />
              <RectButton
                style={
                  tahunAjaran && kelas ? styles.button : styles.disabledButton
                }
                enabled={tahunAjaran && kelas ? true : false}
                onPress={lihatKoleksiMateri}>
                <Text style={styles.buttonTitle}>Filter</Text>
              </RectButton>
            </View>
          </View>
        }
        ListEmptyComponent={
          <Text style={styles.emptyData}>Koleksi Materi kosong...</Text>
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
