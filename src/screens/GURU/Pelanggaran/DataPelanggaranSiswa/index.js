/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {FlatList, Image, StatusBar, StyleSheet, Text, View} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';

// import components
import Dropdown from '../../../../components/DropDown';
import Item from './components/Item';

import {windowWidth, windowHeight} from '../../../../utils';

import {getTahunAjaran} from '../../../../redux/reducer/SISWA/tahunAjaran';
import {getKelas} from '../../../../redux/reducer/SISWA/kelas';
import {getAnggotaKelas} from '../../../../redux/reducer/GURU/anggotaKelas';
import {getPelanggaranSiswa} from '../../../../redux/reducer/GURU/pelanggaranSiswa';

export default function Index({navigation}) {
  const dispatch = useDispatch();
  const [tahunAjaranSelected, setTahunAjaranSelected] = useState('');
  const [selectedKelas, setSelectedKelas] = useState('');
  const [selectedNamaSiswa, setSelectedNamaSiswa] = useState('');
  const [statusPenanganan, setStatusPenanganan] = useState('');

  const {authGuru = {}} = useSelector(state => state.authGuru) || {};
  const {tahunAjaran = {}} = useSelector(state => state.tahunAjaran) || {};
  const {kelas = {}} = useSelector(state => state.kelas) || {};
  const {anggotaKelas = {}} = useSelector(state => state.anggotaKelas) || {};
  const {pelanggaranSiswa = {}, isLoadingPelanggaranSiswa = false} =
    useSelector(state => state.pelanggaranSiswa) || {};

  useEffect(() => {
    dispatch(
      getTahunAjaran({
        website_id: authGuru?.data?.website_id || '',
      }),
    );
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

  useEffect(() => {
    if (Array.isArray(kelas?.result)) {
      if (selectedKelas) {
        const {tahunajaran_id} =
          tahunAjaran?.result?.find(
            item => item?.tahunajaran === tahunAjaranSelected,
          ) || {};
        const {kelas_id = ''} =
          kelas?.result?.find(item => item?.nama_kelas === selectedKelas) || {};
        if (kelas_id) {
          dispatch(
            getAnggotaKelas({
              tahunajaran_id: tahunajaran_id || '',
              kelas_id: kelas_id || '',
            }),
          );
        }
      }
    }
  }, [kelas, tahunAjaran, tahunAjaranSelected, selectedKelas]);

  const memoizedDataSiswa = useMemo(() => {
    if (memoizedKelas?.length > 0 && selectedKelas?.length > 0) {
      if (Array.isArray(anggotaKelas?.result?.anggotakelas)) {
        return anggotaKelas?.result?.anggotakelas?.map(item => item?.nama);
      } else {
        return [];
      }
    } else {
      return [];
    }
  }, [memoizedKelas, anggotaKelas, selectedKelas]);

  const lihatDataPelanggaranSiswa = useCallback(() => {
    if (authGuru?.status === 'berhasil') {
      const {tahunajaran_id} =
        tahunAjaran?.result?.find(
          item => item?.tahunajaran === tahunAjaranSelected,
        ) || {};
      const {kelas_id} =
        kelas?.result?.find(item => item?.nama_kelas === selectedKelas) || {};
      const {siswa_id} =
        anggotaKelas?.result?.anggotakelas?.find(
          item => item?.nama === selectedNamaSiswa,
        ) || {};
      dispatch(
        getPelanggaranSiswa({
          website_id: authGuru?.data?.website_id || '',
          tahunajaran_id: tahunajaran_id || '',
          kelas_id: kelas_id || '',
          siswa_id: siswa_id || '',
          status_penanganan: statusPenanganan || '',
        }),
      );
    }
  }, [
    tahunAjaran,
    kelas,
    authGuru,
    anggotaKelas,
    selectedNamaSiswa,
    selectedKelas,
    tahunAjaranSelected,
    statusPenanganan,
  ]);

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
        onRefresh={() => {
          if (tahunAjaranSelected && selectedKelas && selectedNamaSiswa) {
            lihatDataPelanggaranSiswa();
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
              <Text style={styles.inputTitle}>Nama Siswa</Text>
              <Dropdown
                list={memoizedDataSiswa}
                selectedValue={selectedNamaSiswa}
                setValue={setSelectedNamaSiswa}
                placeholder="- Pilih Nama Siswa -"
              />
              {/* <Text style={styles.inputTitle}>Status Penanganan</Text>
              <Dropdown
                list={['Belum Diproses', 'Sudah Diproses']}
                selectedValue={statusPenanganan}
                setValue={setStatusPenanganan}
                placeholder="- Pilih Status Penanganan -"
              /> */}
              <RectButton
                enabled={Boolean(
                  tahunAjaranSelected && selectedKelas && selectedNamaSiswa,
                )}
                onPress={lihatDataPelanggaranSiswa}
                style={styles.button}>
                <Text style={styles.buttonTitle}>Lihat</Text>
              </RectButton>
            </View>
          </View>
        }
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
