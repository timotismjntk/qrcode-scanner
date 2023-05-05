/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  StatusBar,
  Text,
  View,
  Image,
  Alert,
} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';

// import components
import UploadFoto from './components/UploadFoto';
import Dropdown from '../../../../components/DropDown';
import LoadingModal from '../../../../components/LoadingModal';

import {windowWidth, windowHeight} from '../../../../utils';

import {getTahunAjaran} from '../../../../redux/reducer/SISWA/tahunAjaran';
import {getKelas} from '../../../../redux/reducer/SISWA/kelas';
import {getAnggotaKelas} from '../../../../redux/reducer/GURU/anggotaKelas';
import {
  getJenisPelanggaranSiswa,
  UBAH_PELANGGARAN_SISWA,
  CLEAR_UBAH_PELANGGARAN_SISWA,
} from '../../../../redux/reducer/GURU/pelanggaranSiswa';
import {getDataGuru} from '../../../../redux/reducer/GURU/dataGuru';

export default function Index({route: {params}, navigation}) {
  const dispatch = useDispatch();
  const [tahunAjaranSelected, setTahunAjaranSelected] = useState(
    params?.tahunajaran || '',
  );
  const [selectedKelas, setSelectedKelas] = useState(params?.nama_kelas || '');
  const [selectedNamaSiswa, setSelectedNamaSiswa] = useState(
    params?.nama_siswa || '',
  );
  const [jenisPelanggaran, setJenisPelanggaran] = useState(
    params?.nama_pelanggaran?.concat?.(` (${params?.poin || ''} Poin)`) || '',
  );
  const [statusPenanganan, setStatusPenanganan] = useState(
    params?.status_penanganan || '',
  );
  const [ditanganiOleh, setDitanganiOleh] = useState(
    params?.ditangani_nama || '',
  );
  const [
    openDropdownDateTanggalPelanggaran,
    setOpenDropdownDateTanggalPelanggaran,
  ] = useState(false);
  const [tanggalPelanggaran, setTanggalPelanggaran] = useState(
    params?.tanggal || '',
  );

  const [fotoPelanggaran, setFotoPelanggaran] = useState(params?.foto || '');

  const {authGuru = {}} = useSelector(state => state.authGuru) || {};
  const {tahunAjaran = {}} = useSelector(state => state.tahunAjaran) || {};
  const {kelas = {}} = useSelector(state => state.kelas) || {};
  const {anggotaKelas = {}} = useSelector(state => state.anggotaKelas) || {};
  const {
    jenisPelanggaranSiswa = {},
    ubahPelanggaranSiswa = {},
    isLoadingUbahPelanggaranSiswa = false,
  } = useSelector(state => state.pelanggaranSiswa) || {};
  const {dataGuru = {}} = useSelector(state => state.dataGuru) || {};

  useEffect(() => {
    dispatch(
      getTahunAjaran({
        website_id: authGuru?.data?.website_id || '',
      }),
    );
    dispatch(getDataGuru({website_id: authGuru?.data?.website_id}));
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
          dispatch(
            getJenisPelanggaranSiswa({
              kelas_id: kelas_id || '',
            }),
          );
        }
      }
    }
  }, [kelas, tahunAjaran, selectedKelas, tahunAjaranSelected]);

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

  const memoizedJenisPelanggaran = useMemo(() => {
    if (memoizedKelas?.length > 0 && selectedKelas?.length > 0) {
      if (Array.isArray(jenisPelanggaranSiswa?.result)) {
        return jenisPelanggaranSiswa?.result?.map(item =>
          item?.nama_pelanggaran.concat(` (${item?.poin} Poin)`),
        );
      } else {
        return [];
      }
    } else {
      return [];
    }
  }, [memoizedKelas, jenisPelanggaranSiswa, selectedKelas]);

  const memoizedDataGuru = useMemo(() => {
    if (Array.isArray(dataGuru?.result?.sdms)) {
      return dataGuru?.result?.sdms?.map(item => item?.nama);
    } else {
      return [];
    }
  }, [dataGuru]);

  const isFilled = useCallback(() => {
    return Boolean(
      tahunAjaranSelected &&
        selectedKelas &&
        selectedNamaSiswa &&
        tanggalPelanggaran &&
        jenisPelanggaran &&
        fotoPelanggaran &&
        statusPenanganan &&
        ditanganiOleh,
    );
  }, [
    tahunAjaranSelected,
    selectedKelas,
    selectedNamaSiswa,
    tanggalPelanggaran,
    jenisPelanggaran,
    fotoPelanggaran,
    statusPenanganan,
    ditanganiOleh,
  ]);

  const editPelanggaran = useCallback(() => {
    if (authGuru?.status === 'berhasil') {
      const {user_id, website_id, ditangani_sdm_id} = params;
      const {tahunajaran_id} =
        tahunAjaran?.result?.find(
          item => item?.tahunajaran === tahunAjaranSelected,
        ) || {};
      const {kelas_id = ''} =
        kelas?.result?.find(item => item?.nama_kelas === selectedKelas) || {};
      const {siswa_id = ''} =
        anggotaKelas?.result?.anggotakelas?.find(
          item => item?.nama === selectedNamaSiswa,
        ) || {};
      const {jenispelanggaran_id = ''} =
        jenisPelanggaranSiswa?.result?.find(item =>
          jenisPelanggaran?.includes?.(item?.nama_pelanggaran),
        ) || {};
      if (
        user_id &&
        website_id &&
        tahunajaran_id &&
        kelas_id &&
        siswa_id &&
        jenispelanggaran_id &&
        ditangani_sdm_id
      ) {
        dispatch(
          UBAH_PELANGGARAN_SISWA({
            user_id,
            website_id,
            tahunajaran_id,
            kelas_id,
            siswa_id,
            tanggal: tanggalPelanggaran,
            jenispelanggaran_id,
            status_penanganan: statusPenanganan,
            foto: fotoPelanggaran,
            ditangani_sdm_id,
            pelanggaran_id: params?.pelanggaran_id || '',
          }),
        );
      }
    }
  }, [
    authGuru,
    tahunAjaran,
    tahunAjaranSelected,
    kelas,
    selectedKelas,
    anggotaKelas,
    selectedNamaSiswa,
    jenisPelanggaranSiswa,
    jenisPelanggaran,
    dataGuru,
    ditanganiOleh,
    fotoPelanggaran,
    statusPenanganan,
    tanggalPelanggaran,
    params,
  ]);

  useEffect(() => {
    if (ubahPelanggaranSiswa?.status?.length > 0) {
      Alert.alert(
        ubahPelanggaranSiswa?.status === 'berhasil' ? 'Sukses' : 'Gagal',
        ubahPelanggaranSiswa?.pesan || '',
        [
          {
            text: ubahPelanggaranSiswa?.status === 'berhasil' ? 'OK' : 'Tutup',
            onPress: () => {
              if (ubahPelanggaranSiswa?.status === 'berhasil') {
                navigation.goBack();
                dispatch(CLEAR_UBAH_PELANGGARAN_SISWA());
              } else {
                dispatch(CLEAR_UBAH_PELANGGARAN_SISWA());
              }
            },
          },
        ],
      );
    }
  }, [ubahPelanggaranSiswa]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar animated={true} translucent backgroundColor="#3B3B3B" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
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
          <Text style={styles.inputTitle}>Tanggal Pelanggaran</Text>
          <Dropdown
            type="date"
            openDate={openDropdownDateTanggalPelanggaran}
            setOpenDate={setOpenDropdownDateTanggalPelanggaran}
            selectedDate={tanggalPelanggaran}
            setSelectedDate={setTanggalPelanggaran}
            placeholder="- Pilih Tanggal Pelanggaran -"
          />
          <Text style={styles.inputTitle}>Jenis Pelanggaran</Text>
          <Dropdown
            list={memoizedJenisPelanggaran}
            selectedValue={jenisPelanggaran}
            setValue={setJenisPelanggaran}
            placeholder="- Pilih Jenis Pelanggaran -"
          />
          <Text style={styles.inputTitle}>Foto Pelanggaran</Text>
          <UploadFoto
            fotoPelanggaran={fotoPelanggaran}
            authGuru={authGuru}
            onResultImage={setFotoPelanggaran}
          />
          <Text style={styles.inputTitle}>Status Penanganan</Text>
          <Dropdown
            list={['Belum Diproses', 'Sudah Diproses']}
            selectedValue={statusPenanganan}
            setValue={setStatusPenanganan}
            placeholder="- Pilih Status Penanganan -"
          />
          <Text style={styles.inputTitle}>Ditangani Oleh</Text>
          <Dropdown
            list={memoizedDataGuru}
            selectedValue={ditanganiOleh}
            setValue={setDitanganiOleh}
            placeholder="- Pilih Guru -"
          />
          <RectButton
            enabled={isFilled()}
            onPress={editPelanggaran}
            style={isFilled() ? styles.saveButton : styles.disabledSaveButton}>
            <Text style={styles.saveButtonTitle}>Simpan</Text>
          </RectButton>
        </View>
      </ScrollView>
      <LoadingModal open={isLoadingUbahPelanggaranSiswa} close={() => null} />
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
  ambilFotoButton: {
    width: '100%',
    borderRadius: windowWidth * 0.02,
    marginTop: '3%',
    paddingHorizontal: '3%',
    paddingVertical: '2.5%',
    marginBottom: '6%',
    backgroundColor: '#E36D00',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  ambilFotoLabel: {
    fontSize: windowWidth * 0.038,
    color: 'white',
    fontFamily: 'OpenSans-Bold',
  },
  iconWrapper: {
    width: windowWidth * 0.06,
    height: windowWidth * 0.06,
    marginRight: '3%',
  },
  icon: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
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
    marginTop: '2%',
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
