/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState, useMemo, useCallback} from 'react';
import {
  ScrollView,
  StyleSheet,
  StatusBar,
  Text,
  View,
  Alert,
} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';

import LoadingModal from '../../../../components/LoadingModal';
import Dropdown from '../../../../components/DropDown';

import {getTahunAjaran} from '../../../../redux/reducer/SISWA/tahunAjaran';
import {getKelas} from '../../../../redux/reducer/SISWA/kelas';
import {getMataPelajaran} from '../../../../redux/reducer/SISWA/mataPelajaran';
import {getDataGuru} from '../../../../redux/reducer/GURU/dataGuru';
import {
  buatPertemuan,
  clearBuatPertemuan,
} from '../../../../redux/reducer/GURU/pertemuan';

import {windowWidth, windowHeight} from '../../../../utils';
import {StackActions} from '@react-navigation/native';

export default function BuatPertemuan({navigation}) {
  const dispatch = useDispatch();
  const [tahunAjaranSelected, setTahunAjaranSelected] = useState('');
  const [selectedKelas, setSelectedKelas] = useState('');
  const [selectedMataPelajaran, setSelectedMataPelajaran] = useState('');
  const [pertemuan, setPertemuan] = useState('');
  const [pengajar, setPengajar] = useState('');
  const [openDropdownTanggal, setOpenDropdownTanggal] = useState(false);
  const [tanggal, setTanggal] = useState('');

  useEffect(() => {
    if (Number(pertemuan) === 0) {
      setPertemuan('1');
    }
  }, [pertemuan]);

  const {authGuru = {}} = useSelector(state => state.authGuru) || {};
  const {tahunAjaran = {}} = useSelector(state => state.tahunAjaran) || {};
  const {kelas = {}} = useSelector(state => state.kelas) || {};
  const {mataPelajaran = {}} = useSelector(state => state.mataPelajaran) || {};
  const {dataGuru = {}} = useSelector(state => state.dataGuru) || {};
  const {buatPertemuanResult = {}, isLoadingBuatPertemuan} =
    useSelector(state => state.pertemuan) || {};

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

  const isFilled = useCallback(() => {
    return (
      tahunAjaranSelected?.length > 0 &&
      selectedKelas?.length > 0 &&
      selectedMataPelajaran?.length > 0 &&
      tanggal?.length > 0 &&
      pertemuan?.length > 0 &&
      pengajar?.length > 0
    );
  }, [
    tahunAjaranSelected,
    selectedKelas,
    selectedMataPelajaran,
    tanggal,
    pertemuan,
    pengajar,
  ]);

  const buatPertemuanFn = useCallback(() => {
    const {tahunajaran_id = ''} =
      tahunAjaran?.result?.find(
        item => item?.tahunajaran === tahunAjaranSelected,
      ) || {};
    const {kelas_id = ''} =
      kelas?.result?.find(item => item?.nama_kelas === selectedKelas) || {};
    const {matapelajaran_id = ''} =
      mataPelajaran?.result?.find(
        item => item?.nama_matapelajaran === selectedMataPelajaran,
      ) || {};
    const {sdm_id = ''} =
      dataGuru?.result?.sdms?.find(item => item?.nama === pengajar) || {};

    dispatch(
      buatPertemuan({
        website_id: authGuru?.data?.website_id,
        tahunajaran_id: tahunajaran_id || '',
        kelas_id: kelas_id || '',
        matapelajaran_id: matapelajaran_id || '',
        sdm_id: sdm_id || '',
        tanggal: tanggal,
        pertemuan_ke: pertemuan,
      }),
    );
  }, [
    authGuru,
    tahunAjaran,
    tahunAjaranSelected,
    selectedKelas,
    mataPelajaran,
    selectedMataPelajaran,
    tanggal,
    kelas,
    pertemuan,
    pengajar,
    dataGuru,
  ]);

  useEffect(() => {
    if (buatPertemuanResult?.status?.length > 0) {
      Alert.alert(
        buatPertemuanResult?.status === 'berhasil' ? 'Sukses' : 'Gagal',
        buatPertemuanResult?.pesan || '',
        [
          {
            text: buatPertemuanResult?.status === 'berhasil' ? 'OK' : 'Tutup',
            onPress: () => {
              if (buatPertemuanResult?.status === 'berhasil') {
                navigation.dispatch(
                  StackActions.replace('ListPertemuan', {
                    absensipertemuan_id:
                      buatPertemuanResult?.data?.absensipertemuan_id,
                  }),
                );
                dispatch(clearBuatPertemuan());
              }
              dispatch(clearBuatPertemuan());
            },
          },
        ],
      );
    }
  }, [buatPertemuanResult]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar animated={true} translucent backgroundColor="#3B3B3B" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <LoadingModal open={isLoadingBuatPertemuan} close={() => null} />
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
          <Text style={styles.inputTitle}>Tanggal</Text>
          <Dropdown
            type="date"
            openDate={openDropdownTanggal}
            setOpenDate={setOpenDropdownTanggal}
            selectedDate={tanggal}
            setSelectedDate={setTanggal}
            placeholder="- Pilih Tanggal -"
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
            selectedValue={pengajar}
            setValue={setPengajar}
            placeholder="- Pilih Pengajar -"
          />
          <Text style={styles.inputTitle}>Pertemuan ke</Text>
          <Dropdown
            type="number"
            selectedValue={pertemuan}
            setValue={setPertemuan}
            placeholder="1"
            arrowUpFn={() => setPertemuan(prev => String(Number(prev) + 1))}
            arrowDownFn={() =>
              Number(pertemuan) > 1 &&
              setPertemuan(prev => String(Number(prev) - 1))
            }
          />
          <RectButton
            enabled={isFilled()}
            onPress={buatPertemuanFn}
            style={isFilled() ? styles.saveButton : styles.disabledSaveButton}>
            <Text style={styles.saveButtonTitle}>Buat</Text>
          </RectButton>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollContainer: {
    minHeight: windowHeight,
    padding: '3%',
    paddingTop: '20%',
    paddingBottom: '10%',
  },
  fotoProfilWrapper: {
    width: windowWidth * 0.28,
    height: windowWidth * 0.28,
    borderRadius: (windowWidth * 0.28) / 2,
    backgroundColor: 'white',
    borderWidth: 0.5,
    alignSelf: 'center',
  },
  form: {
    paddingHorizontal: '8%',
    marginTop: '5%',
    width: '100%',
  },
  inputTitle: {
    fontSize: windowWidth * 0.04,
    color: 'black',
    fontFamily: 'OpenSans-SemiBold',
  },
  input: {
    fontSize: windowWidth * 0.04,
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
  inputFocus: {
    fontSize: windowWidth * 0.04,
    color: 'black',
    width: '100%',
    borderRadius: windowWidth * 0.02,
    marginTop: '3%',
    paddingHorizontal: '3%',
    paddingVertical: '2.5%',
    fontFamily: 'OpenSans-Regular',
    marginBottom: '6%',
    borderWidth: 1,
    borderColor: '#0099e5',
  },
  disabledInput: {
    fontSize: windowWidth * 0.04,
    color: 'black',
    width: '100%',
    borderRadius: windowWidth * 0.02,
    marginTop: '3%',
    paddingHorizontal: '3%',
    paddingVertical: '2.5%',
    fontFamily: 'OpenSans-Regular',
    marginBottom: '6%',
    borderWidth: 0.8,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  errorInput: {
    fontSize: windowWidth * 0.04,
    color: 'red',
    width: '100%',
    borderRadius: windowWidth * 0.02,
    marginTop: '3%',
    paddingHorizontal: '3%',
    paddingVertical: '2.5%',
    fontFamily: 'OpenSans-Regular',
    marginBottom: '6%',
    borderWidth: 0.8,
    borderColor: 'red',
  },
  saveButton: {
    padding: '3%',
    width: '100%',
    borderRadius: windowWidth * 0.02,
    alignItems: 'center',
    backgroundColor: '#61A2F9',
    elevation: 10,
    marginTop: '6%',
  },
  disabledSaveButton: {
    padding: '3%',
    width: '100%',
    borderRadius: windowWidth * 0.02,
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    marginTop: '6%',
  },
  saveButtonTitle: {
    color: 'white',
    fontSize: windowWidth * 0.04,
    fontFamily: 'OpenSans-SemiBold',
  },
  info: {
    color: '#3B3B3B',
    fontSize: windowWidth * 0.034,
    fontFamily: 'OpenSans-SemiBold',
    fontStyle: 'italic',
    marginTop: '6%',
  },
  required: {
    color: 'black',
    fontStyle: 'italic',
    marginTop: '-4%',
    marginBottom: '2%',
    fontSize: windowWidth * 0.034,
  },
  error: {
    fontStyle: 'italic',
    color: 'red',
    marginTop: '-4%',
    marginBottom: '2%',
    fontSize: windowWidth * 0.034,
  },
});
