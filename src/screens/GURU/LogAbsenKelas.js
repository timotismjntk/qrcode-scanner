/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {FlatList, StatusBar, StyleSheet, Text, View} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';

// import components
import Dropdown from '../../components/DropDown';

import {windowWidth, windowHeight} from '../../utils';

import {getLogAbsenSiswaByKelas} from '../../redux/reducer/SISWA/logAbsen';
import {getTahunAjaran} from '../../redux/reducer/SISWA/tahunAjaran';
import {getKelas} from '../../redux/reducer/SISWA/kelas';

export default function LogAbsenKelas() {
  const dispatch = useDispatch();
  const [tahunAjaranSelected, setTahunAjaranSelected] = useState('');
  const [selectedKelas, setSelectedKelas] = useState('');
  const [tanggal, setTanggal] = useState('');
  const [openDate, setOpenDate] = useState(false);
  const {authGuru = {}} = useSelector(state => state.authGuru) || {};
  const {logAbsenSiswaByKelas = {}, isLoadingLogAbsenSiswaByKelas = false} =
    useSelector(state => state.logAbsenSiswa) || {};
  const {tahunAjaran = {}} = useSelector(state => state.tahunAjaran) || {};
  const {kelas = {}} = useSelector(state => state.kelas) || {};
  const [isShowingResult, setIsShowingResult] = useState(false);

  useEffect(() => {
    dispatch(
      getTahunAjaran({
        website_id: authGuru?.data?.website_id,
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
        const {tahunajaran_id = ''} = tahunAjaran?.result?.find(
          item => item?.tahunajaran === tahunAjaranSelected,
        );
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

  const lihatAbsenSiswa = useCallback(() => {
    const {kelas_id} =
      kelas?.result?.find(item => item?.nama_kelas === selectedKelas) || {};
    if (kelas_id) {
      const {tahunajaran_id = ''} = tahunAjaran?.result?.find(
        item => item?.tahunajaran === tahunAjaranSelected,
      );
      dispatch(
        getLogAbsenSiswaByKelas({
          kelas_id: kelas_id,
          tahunajaran_id: tahunajaran_id,
          tanggal: tanggal || '',
          website_id: authGuru?.data?.website_id,
        }),
      );
      setIsShowingResult(true);
    }
  }, [
    selectedKelas,
    kelas,
    tahunAjaranSelected,
    tanggal,
    authGuru,
    tahunAjaran,
  ]);

  const memoizedData = useMemo(() => {
    if (isShowingResult) {
      if (Array.isArray(logAbsenSiswaByKelas?.result)) {
        return logAbsenSiswaByKelas?.result;
      } else {
        return [];
      }
    } else {
      return [];
    }
  }, [logAbsenSiswaByKelas?.result, isShowingResult]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar animated={true} translucent backgroundColor="#3B3B3B" />
      <FlatList
        data={memoizedData}
        refreshing={isLoadingLogAbsenSiswaByKelas}
        onRefresh={lihatAbsenSiswa}
        progressViewOffset={windowHeight * 0.15}
        ListHeaderComponent={
          <View style={styles.wrapper}>
            <View style={styles.form}>
              <Text style={styles.inputTitle}>Pilih Tahun Ajaran</Text>
              <Dropdown
                list={memoizedTahunAjaran}
                selectedValue={tahunAjaranSelected}
                setValue={setTahunAjaranSelected}
                placeholder="- Pilih Tahun -"
              />
              <Text style={styles.inputTitle}>Pilih Kelas</Text>
              <Dropdown
                list={memoizedKelas}
                selectedValue={selectedKelas}
                setValue={setSelectedKelas}
                placeholder="- Pilih Kelas -"
              />
              <Text style={styles.inputTitle}>Pilih Tanggal</Text>
              <Dropdown
                type="date"
                selectedValue={tanggal}
                openDate={openDate}
                setOpenDate={setOpenDate}
                setSelectedDate={setTanggal}
                selectedDate={tanggal}
                placeholder="- Pilih Tanggal -"
              />
              <RectButton
                enabled={
                  tahunAjaranSelected?.length > 0 &&
                  selectedKelas?.length > 0 &&
                  tanggal?.length > 0
                    ? true
                    : false
                }
                onPress={lihatAbsenSiswa}
                style={[
                  styles.button,
                  {
                    backgroundColor:
                      tahunAjaranSelected?.length > 0 &&
                      selectedKelas?.length > 0 &&
                      tanggal?.length > 0
                        ? '#61A2F9'
                        : 'grey',
                  },
                ]}>
                <Text style={styles.buttonTitle}>Lihat</Text>
              </RectButton>
            </View>
          </View>
        }
        ListEmptyComponent={
          isShowingResult ? (
            <Text style={styles.emptyData}>Log Absen tidak ditemukan...</Text>
          ) : null
        }
        renderItem={({item}) => {
          if (
            !Array.isArray(item?.izin) &&
            Object.keys(item?.izin)?.length > 0
          ) {
            return (
              <View style={styles.item}>
                <Text style={styles.itemHari}>{item.nama}</Text>
                <View style={styles.itemIzinWrapper}>
                  <Text style={styles.itemIzin}>
                    Keterangan izin: {item?.izin?.jenis_izin || ''}
                  </Text>
                  <Text style={styles.itemIzin}>
                    Mulai:{' '}
                    {new Date(item?.izin?.mulai).toLocaleDateString('id', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    }) || ''}
                  </Text>
                  <Text style={styles.itemIzin}>
                    Sampai:{' '}
                    {new Date(item?.izin?.sampai).toLocaleDateString('id', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    }) || ''}
                  </Text>
                </View>
              </View>
            );
          } else {
            return (
              <View style={styles.item}>
                <Text style={styles.itemHari}>{item.nama}</Text>
                <View style={styles.itemMasukPulangWrapper}>
                  <Text style={styles.itemMasukPulang}>
                    Masuk: {item.absensi_masuk}
                  </Text>
                  <Text style={styles.itemMasukPulang}>
                    Pulang: {item.absensi_pulang}
                  </Text>
                </View>
              </View>
            );
          }
        }}
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
    paddingHorizontal: windowWidth * 0.08,
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
    elevation: 10,
    marginTop: '6%',
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
    padding: '4%',
    borderRadius: windowWidth * 0.01,
  },
  flatlist: {
    padding: '4%',
    paddingVertical: '7%',
    minHeight: windowHeight,
    paddingTop: '25%',
  },
  separator: {
    height: '0.2%',
    marginVertical: '2%',
  },
  item: {
    minHeight: windowWidth * 0.12,
    justifyContent: 'center',
    backgroundColor: '#D9D9D9',
    borderRadius: windowWidth * 0.02,
    width: windowWidth * 0.75,
    alignSelf: 'center',
    padding: '3%',
    marginVertical: '2%',
  },
  itemHari: {
    fontSize: windowWidth * 0.034,
    fontFamily: 'OpenSans-Bold',
    color: 'black',
  },
  itemMasukPulangWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemMasukPulang: {
    fontSize: windowWidth * 0.034,
    fontFamily: 'OpenSans-Regular',
    color: 'black',
  },
  itemIzinWrapper: {},
  itemIzin: {
    fontSize: windowWidth * 0.034,
    fontFamily: 'OpenSans-Regular',
    color: 'black',
  },
});
