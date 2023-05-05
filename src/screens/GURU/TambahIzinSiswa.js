/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useMemo, useState} from 'react';
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
import Dropdown from '../../components/DropDown';
import LoadingModal from '../../components/LoadingModal';

import {windowWidth, windowHeight} from '../../utils';

import {
  getSiswa,
  buatIzinSiswa,
  clearBuatIzinSiswa,
} from '../../redux/reducer/GURU/buatIzinSiswa';
import {getKelas} from '../../redux/reducer/SISWA/kelas';
import {getTahunAjaran} from '../../redux/reducer/SISWA/tahunAjaran';

import {useCallback} from 'react';

export default function TambahIzinSiswa({navigation}) {
  const dispatch = useDispatch();
  const [selectedTahun, setSelectedTahun] = useState('');
  const [selectedKelas, setSelectedKelas] = useState('');
  const [selectedNamaSiswa, setSelectedNamaSiswa] = useState('');
  const [jenisIzin, setJenisIzin] = useState('');
  const [openDropdownDateMulaiDari, setOpenDropdownDateMulaiDari] =
    useState(false);
  const [mulaiDari, setMulaiDari] = useState('');
  const [openDropdownDateSampaiDengan, setOpenDropdownDateSampaiDengan] =
    useState(false);
  const [sampaiDengan, setSampaiDengan] = useState('');
  const {authGuru = {}} = useSelector(state => state.authGuru) || {};
  const {
    siswa = {},
    buatIzinSiswaResult = {},
    isLoadingBuatIzin = false,
  } = useSelector(state => state.buatIzinSiswa) || {};
  const {tahunAjaran = {}} = useSelector(state => state.tahunAjaran) || {};
  const {kelas = {}} = useSelector(state => state.kelas) || {};

  useEffect(() => {
    if (authGuru?.status === 'berhasil') {
      dispatch(
        getTahunAjaran({
          website_id: authGuru?.data?.website_id,
        }),
      );
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
      if (selectedTahun) {
        const {tahunajaran_id = ''} =
          tahunAjaran?.result?.find(
            item => item?.tahunajaran === selectedTahun,
          ) || {};
        if (tahunajaran_id) {
          dispatch(getKelas({tahunajaran_id: tahunajaran_id}));
        }
      }
    }
  }, [tahunAjaran, selectedTahun]);

  const memoizedKelas = useMemo(() => {
    if (memoizedTahunAjaran?.length > 0 && selectedTahun?.length > 0) {
      if (Array.isArray(kelas?.result)) {
        return kelas?.result?.map(item => item?.nama_kelas);
      } else {
        return [];
      }
    } else {
      return [];
    }
  }, [memoizedTahunAjaran, kelas, selectedTahun]);

  useEffect(() => {
    if (Array.isArray(kelas?.result)) {
      if (selectedKelas) {
        const {kelas_id = ''} =
          kelas?.result?.find(item => item?.nama_kelas === selectedKelas) || {};
        if (kelas_id) {
          dispatch(getSiswa({kelas_id: kelas_id}));
        }
      }
    }
  }, [kelas, selectedKelas]);

  const memoizedSiswa = useMemo(() => {
    if (memoizedKelas?.length > 0 && selectedTahun?.length > 0) {
      if (Array.isArray(siswa?.result)) {
        return siswa?.result?.map(item => item?.nama);
      } else {
        return [];
      }
    } else {
      return [];
    }
  }, [memoizedKelas, siswa, selectedTahun]);

  const isAllFilled = useCallback(() => {
    return (
      selectedTahun?.length > 0 &&
      selectedKelas?.length > 0 &&
      selectedNamaSiswa?.length > 0 &&
      jenisIzin?.length > 0 &&
      mulaiDari?.length > 0 &&
      sampaiDengan?.length > 0
    );
  }, [
    selectedTahun,
    selectedKelas,
    selectedNamaSiswa,
    jenisIzin,
    mulaiDari,
    sampaiDengan,
  ]);

  const buatIzinFn = useCallback(() => {
    const {tahunajaran_id = ''} =
      tahunAjaran?.result?.find(item => item?.tahunajaran === selectedTahun) ||
      {};
    const {kelas_id = ''} =
      kelas?.result?.find(item => item?.nama_kelas === selectedKelas) || {};
    const {siswa_id = ''} =
      siswa?.result?.find(item => item?.nama === selectedNamaSiswa) || {};
    dispatch(
      buatIzinSiswa({
        website_id: authGuru?.data?.website_id,
        tahunajaran_id: tahunajaran_id,
        kelas_id: kelas_id,
        siswa_id: siswa_id,
        mulai: mulaiDari,
        sampai: sampaiDengan,
        jenis_izin: jenisIzin,
        keterangan: '-',
      }),
    );
  }, [
    authGuru,
    tahunAjaran,
    kelas,
    siswa,
    mulaiDari,
    sampaiDengan,
    jenisIzin,
    selectedNamaSiswa,
    selectedKelas,
    selectedTahun,
  ]);

  useEffect(() => {
    if (buatIzinSiswaResult?.status?.length > 0) {
      Alert.alert(
        buatIzinSiswaResult?.status === 'berhasil' ? 'Sukses' : 'Gagal',
        buatIzinSiswaResult?.pesan || '',
        [
          {
            text: 'OK',
            onPress: () => {
              navigation.goBack();
              dispatch(clearBuatIzinSiswa());
            },
          },
        ],
      );
    }
  }, [buatIzinSiswaResult]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar animated={true} translucent backgroundColor="#3B3B3B" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <LoadingModal open={isLoadingBuatIzin} close={() => null} />
        <View style={styles.form}>
          <Text style={styles.inputTitle}>Tahun Ajaran</Text>
          <Dropdown
            list={memoizedTahunAjaran}
            selectedValue={selectedTahun}
            setValue={setSelectedTahun}
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
            list={memoizedSiswa}
            selectedValue={selectedNamaSiswa}
            setValue={setSelectedNamaSiswa}
            placeholder="- Pilih Nama Siswa -"
          />
          <Text style={styles.inputTitle}>Jenis Izin</Text>
          <Dropdown
            list={['Izin', 'Sakit', 'Lainnya']}
            selectedValue={jenisIzin}
            setValue={setJenisIzin}
            placeholder="- Pilih Jenis Izin -"
          />
          <Text style={styles.inputTitle}>Mulai Dari</Text>
          <Dropdown
            type="date"
            openDate={openDropdownDateMulaiDari}
            setOpenDate={setOpenDropdownDateMulaiDari}
            selectedDate={mulaiDari}
            setSelectedDate={setMulaiDari}
            placeholder="- Pilih Tahun -"
          />
          <Text style={styles.inputTitle}>Sampai Dengan</Text>
          <Dropdown
            type="date"
            openDate={openDropdownDateSampaiDengan}
            setOpenDate={setOpenDropdownDateSampaiDengan}
            selectedDate={sampaiDengan}
            setSelectedDate={setSampaiDengan}
            placeholder="- Pilih Tahun -"
          />
          <RectButton
            onPress={buatIzinFn}
            enabled={isAllFilled()}
            style={[
              styles.saveButton,
              !isAllFilled() && {backgroundColor: 'grey'},
            ]}>
            <Text style={styles.saveButtonTitle}>Simpan</Text>
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
