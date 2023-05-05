/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useMemo, useCallback, useRef} from 'react';
import {StatusBar, StyleSheet, Text, View} from 'react-native';
import {RectButton, ScrollView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';

import Dropdown from '../../../../components/DropDown';
import Tab from './components/Tab/Tab';
import LoadingModal from '../../../../components/LoadingModal';

import {getTahunAjaran} from '../../../../redux/reducer/SISWA/tahunAjaran';
import {getKelas} from '../../../../redux/reducer/SISWA/kelas';
import {getMataPelajaran} from '../../../../redux/reducer/SISWA/mataPelajaran';
import {getDataGuru} from '../../../../redux/reducer/GURU/dataGuru';
import {
  getPertemuanById,
  getPertemuanKe,
} from '../../../../redux/reducer/GURU/pertemuan';

import {windowWidth, windowHeight} from '../../../../utils';

export default function Pertemuan({navigation, route: {params}}) {
  const dispatch = useDispatch();
  const scrollRef = useRef(null);
  const [tahunAjaranSelected, setTahunAjaranSelected] = useState('');
  const [selectedKelas, setSelectedKelas] = useState('');
  const [openDropdownTanggal, setOpenDropdownTanggal] = useState(false);
  const [tanggal, setTanggal] = useState('');
  const [selectedMataPelajaran, setSelectedMataPelajaran] = useState('');
  const [selectedPengajar, setSelectedPengajar] = useState('');
  const [selectedPertemuanKe, setSelectedPertemuanKe] = useState('');

  const {authGuru = {}} = useSelector(state => state.authGuru) || {};
  const {tahunAjaran = {}} = useSelector(state => state.tahunAjaran) || {};
  const {kelas = {}} = useSelector(state => state.kelas) || {};
  const {mataPelajaran = {}} = useSelector(state => state.mataPelajaran) || {};
  const {dataGuru = {}} = useSelector(state => state.dataGuru) || {};
  const {
    getPertemuanKeResult = {},
    getPertemuanByIdResult = {},
    isLoadingGetPertemuanById = false,
    isLoadingUbahPertemuan = false,
  } = useSelector(state => state.pertemuan) || {};

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

  useEffect(() => {
    if (
      tahunAjaranSelected?.length > 0 &&
      selectedKelas?.length &&
      tanggal?.length > 0 &&
      selectedMataPelajaran?.length > 0 &&
      selectedPengajar?.length > 0
    ) {
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
        dataGuru?.result?.sdms?.find(item => item?.nama === selectedPengajar) ||
        {};
      if (
        authGuru?.data?.website_id &&
        tahunajaran_id &&
        kelas_id &&
        matapelajaran_id &&
        sdm_id &&
        tanggal?.length > 0
      ) {
        dispatch(
          getPertemuanKe({
            website_id: authGuru?.data?.website_id,
            tahunajaran_id: tahunajaran_id || '',
            kelas_id: kelas_id || '',
            matapelajaran_id: matapelajaran_id || '',
            sdm_id: sdm_id || '',
            tanggal: tanggal,
          }),
        );
      }
    }
  }, [
    authGuru,
    tahunAjaran,
    tahunAjaranSelected,
    selectedKelas,
    mataPelajaran,
    selectedMataPelajaran,
    tanggal,
    kelas,
    selectedPengajar,
    dataGuru,
  ]);

  const memoizedPertemuanKe = useMemo(() => {
    if (
      tahunAjaranSelected?.length > 0 &&
      selectedKelas?.length &&
      tanggal?.length > 0 &&
      selectedMataPelajaran?.length > 0 &&
      selectedPengajar?.length > 0
    ) {
      if (Array?.isArray(getPertemuanKeResult?.pertemuan)) {
        return getPertemuanKeResult?.pertemuan?.map(item => item?.pertemuan_ke);
      } else {
        return [];
      }
    }
  }, [
    getPertemuanKeResult,
    tahunAjaranSelected,
    selectedKelas,
    selectedMataPelajaran,
    tanggal,
    selectedPengajar,
  ]);

  const isFilled = useCallback(() => {
    return (
      tahunAjaranSelected?.length > 0 &&
      selectedKelas?.length > 0 &&
      tanggal?.length > 0 &&
      selectedMataPelajaran?.length > 0 &&
      selectedPengajar?.length > 0 &&
      selectedPertemuanKe?.length > 0
    );
  }, [
    selectedKelas,
    selectedMataPelajaran,
    selectedPengajar,
    selectedPertemuanKe,
    tahunAjaranSelected,
    tanggal,
  ]);

  const getPertemuanByIdFn = useCallback(() => {
    const {absensipertemuan_id = ''} =
      getPertemuanKeResult?.pertemuan?.find(
        item => item?.pertemuan_ke === selectedPertemuanKe,
      ) || {};
    if (absensipertemuan_id) {
      dispatch(getPertemuanById({absensipertemuan_id: absensipertemuan_id}));
    }
  }, [getPertemuanKeResult, selectedPertemuanKe]);

  useEffect(() => {
    if (
      getPertemuanByIdResult?.status === 'berhasil' &&
      getPertemuanByIdResult?.pertemuan &&
      Object.entries(getPertemuanByIdResult?.pertemuan)?.length > 0
    ) {
      scrollRef?.current?.scrollTo({
        x: 0,
        y: windowHeight * 0.9,
        animated: true,
      });
    }
  }, [getPertemuanByIdResult]);

  useEffect(() => {
    if (params?.absensipertemuan_id?.length > 0) {
      dispatch(
        getPertemuanById({absensipertemuan_id: params?.absensipertemuan_id}),
      );
    }
  }, [params?.absensipertemuan_id]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar animated={true} translucent backgroundColor="#3B3B3B" />
      <ScrollView
        ref={scrollRef}
        nestedScrollEnabled
        contentContainerStyle={styles.scrollContainer}>
        <LoadingModal
          open={isLoadingGetPertemuanById || isLoadingUbahPertemuan}
          close={() => null}
        />
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
              selectedValue={selectedPengajar}
              setValue={setSelectedPengajar}
              placeholder="- Pilih Pengajar -"
            />
            <Text style={styles.inputTitle}>Pertemuan ke</Text>
            <Dropdown
              list={memoizedPertemuanKe}
              selectedValue={selectedPertemuanKe}
              setValue={setSelectedPertemuanKe}
              placeholder="- Pilih Pertemuan -"
            />
            <RectButton
              enabled={isFilled()}
              onPress={getPertemuanByIdFn}
              style={[
                styles.filterButton,
                {backgroundColor: isFilled() ? '#009A0F' : 'grey'},
              ]}>
              <Text style={styles.buttonTitle}>Filter</Text>
            </RectButton>
          </View>
        </View>
        {getPertemuanByIdResult?.status === 'berhasil' &&
          getPertemuanByIdResult?.pertemuan &&
          Object.entries(getPertemuanByIdResult?.pertemuan)?.length > 0 && (
            <Tab
              data={getPertemuanByIdResult}
              mataPelajaran={mataPelajaran?.result}
              pengajar={dataGuru?.result?.sdms}
            />
          )}
      </ScrollView>
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
    paddingHorizontal: '7%',
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
  button: {
    padding: '3%',
    width: '100%',
    borderRadius: windowWidth * 0.02,
    alignItems: 'center',
    backgroundColor: '#61A2F9',
    elevation: 10,
    marginTop: '3%',
    marginBottom: '5%',
  },
  disabledButton: {
    padding: '3%',
    width: '100%',
    borderRadius: windowWidth * 0.02,
    alignItems: 'center',
    backgroundColor: 'grey',
    elevation: 10,
    marginTop: '3%',
    marginBottom: '5%',
  },
  buttonTitle: {
    color: 'white',
    fontSize: windowWidth * 0.04,
    fontFamily: 'OpenSans-SemiBold',
  },
  filterButton: {
    padding: '3%',
    width: '100%',
    marginTop: '5%',
    alignSelf: 'center',
    borderRadius: windowWidth * 0.02,
    alignItems: 'center',
    backgroundColor: '#009A0F',
    elevation: 10,
  },
  emptyData: {
    fontSize: windowWidth * 0.034,
    fontFamily: 'OpenSans-Regular',
    color: 'black',
    backgroundColor: 'white',
    paddingHorizontal: windowWidth * 0.08,
    borderRadius: windowWidth * 0.01,
  },
  scrollContainer: {
    paddingVertical: '7%',
    minHeight: windowHeight,
    paddingTop: '25%',
  },
  separator: {
    height: '0.2%',
    marginVertical: '2%',
  },
  item: {
    minHeight: windowWidth * 0.18,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'white',
    elevation: 10,
    borderRadius: windowWidth * 0.02,
    width: '100%',
    alignSelf: 'center',
    overflow: 'hidden',
  },
  hariWrapper: {
    backgroundColor: '#009A0F',
    width: '23%',
    minHeight: windowWidth * 0.18,
    borderRadius: windowWidth * 0.02,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: '4%',
  },
  hari: {
    color: 'white',
    textAlign: 'center',
    fontSize: windowWidth * 0.034,
    fontFamily: 'OpenSans-Bold',
  },
  mapelWrapper: {
    padding: '2%',
    flex: 1,
  },
  mapel: {
    fontSize: windowWidth * 0.042,
    fontFamily: 'OpenSans-Bold',
    color: 'black',
  },
  kelas: {
    fontSize: windowWidth * 0.03,
    fontFamily: 'OpenSans-Regular',
    color: 'black',
  },
  pengajar: {
    fontSize: windowWidth * 0.03,
    fontFamily: 'OpenSans-Regular',
    color: 'black',
  },
});
