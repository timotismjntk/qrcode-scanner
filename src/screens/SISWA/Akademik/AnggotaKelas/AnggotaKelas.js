/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {FlatList, Image, StatusBar, StyleSheet, Text, View} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';

import Dropdown from '../../../../components/DropDown';

import {windowWidth, windowHeight} from '../../../../utils';

import {getTahunAjaran} from '../../../../redux/reducer/SISWA/tahunAjaran';
import {getKelas} from '../../../../redux/reducer/SISWA/kelas';
import {getAnggotaKelas} from '../../../../redux/reducer/GURU/anggotaKelas';

export default function AnggotaKelas({navigation}) {
  const dispatch = useDispatch();
  const [tahunAjaranSelected, setTahunAjaranSelected] = useState('');
  const [selectedKelas, setSelectedKelas] = useState('');

  const {authSiswa = {}} = useSelector(state => state.authSiswa) || {};
  const {anggotaKelas = {}, isLoadingAnggotaKelas = false} =
    useSelector(state => state.anggotaKelas) || {};
  const {tahunAjaran = {}} = useSelector(state => state.tahunAjaran) || {};
  const {kelas = {}} = useSelector(state => state.kelas) || {};

  useEffect(() => {
    dispatch(
      getTahunAjaran({
        website_id: authSiswa?.data?.website_id,
      }),
    );
  }, [authSiswa]);

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

  const memoizedData = useMemo(() => {
    if (
      anggotaKelas?.result?.anggotakelas?.length > 0 &&
      selectedKelas &&
      tahunAjaranSelected
    ) {
      return anggotaKelas?.result?.anggotakelas;
    } else {
      return [];
    }
  }, [anggotaKelas, selectedKelas, tahunAjaranSelected]);

  const lihatData = useCallback(() => {
    if (authSiswa?.status === 'berhasil') {
      const {tahunajaran_id} =
        tahunAjaran?.result?.find(
          item => item?.tahunajaran === tahunAjaranSelected,
        ) || {};
      const {kelas_id} =
        kelas?.result?.find(item => item?.nama_kelas === selectedKelas) || {};
      dispatch(
        getAnggotaKelas({
          tahunajaran_id: tahunajaran_id || '',
          kelas_id: kelas_id || '',
        }),
      );
    }
  }, [
    tahunAjaran,
    kelas,
    authSiswa?.status,
    selectedKelas,
    tahunAjaranSelected,
  ]);

  const isFilled = useCallback(() => {
    return tahunAjaranSelected?.length > 0 && selectedKelas?.length > 0;
  }, [tahunAjaranSelected, selectedKelas]);

  const WaliKelas = useCallback(() => {
    return (
      <RectButton
        style={styles.waliKelasContainer}
        onPress={() =>
          navigation.navigate('ProfilGuru', {
            guru_id: anggotaKelas?.result?.user_id_walikelas || '',
          })
        }>
        <View style={styles.profilPictureWrapper}>
          {anggotaKelas?.result?.foto_walikelas?.length > 0 && (
            <Image
              style={styles.profilPicture}
              source={{uri: anggotaKelas?.result?.foto_walikelas}}
            />
          )}
        </View>
        <View>
          <Text style={styles.waliKelas}>Wali Kelas</Text>
          <Text style={styles.namaWaliKelas}>
            {anggotaKelas?.result?.nama_walikelas || ''}
          </Text>
        </View>
      </RectButton>
    );
  }, [anggotaKelas]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar animated={true} translucent backgroundColor="#3B3B3B" />
      <FlatList
        data={memoizedData}
        refreshing={isLoadingAnggotaKelas}
        onRefresh={() => {
          if (authSiswa?.status === 'berhasil') {
            if (isFilled()) {
              const {tahunajaran_id} = tahunAjaran?.result?.find(
                item => item?.tahunajaran === tahunAjaranSelected,
              );
              const {kelas_id} = kelas?.result?.find(
                item => item?.nama_kelas === selectedKelas,
              );
              dispatch(
                getAnggotaKelas({
                  tahunajaran_id: tahunajaran_id || '',
                  kelas_id: kelas_id || '',
                }),
              );
            }
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
              <RectButton
                style={isFilled() ? styles.button : styles.disabledButton}
                enabled={isFilled()}
                onPress={lihatData}>
                <Text style={styles.buttonTitle}>Lihat</Text>
              </RectButton>
            </View>
            {anggotaKelas?.result?.nama_walikelas?.length > 0 &&
              selectedKelas?.length > 0 &&
              tahunAjaranSelected?.length > 0 && <WaliKelas />}
          </View>
        }
        ListEmptyComponent={
          <Text style={styles.emptyData}>Data Siswa kosong...</Text>
        }
        renderItem={({item}) => (
          <RectButton
            onPress={() =>
              navigation.navigate('ProfilSiswaLain', {
                ...item,
                kelas: [
                  {tahunajaran: tahunAjaranSelected, nama_kelas: selectedKelas},
                ],
              })
            }
            style={styles.item}>
            <Text style={styles.namaSiswa}>{item?.nama}</Text>
            <MaterialIcons
              name="arrow-forward"
              size={windowWidth * 0.06}
              color="black"
            />
          </RectButton>
        )}
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
    marginVertical: '2%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#D9D9D9',
    borderRadius: windowWidth * 0.02,
    width: windowWidth * 0.75,
    alignSelf: 'center',
    paddingHorizontal: '3%',
  },
  namaSiswa: {
    fontSize: windowWidth * 0.034,
    fontFamily: 'OpenSans-SemiBold',
    color: 'black',
  },
  waliKelasContainer: {
    minHeight: windowWidth * 0.16,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#009A0F',
    borderRadius: windowWidth * 0.03,
    width: windowWidth * 0.75,
    alignSelf: 'center',
    paddingHorizontal: '3%',
    marginTop: '5%',
  },
  profilPictureWrapper: {
    width: windowWidth * 0.1,
    height: windowWidth * 0.1,
    borderRadius: windowWidth * 0.1,
    backgroundColor: 'white',
    marginRight: '4%',
    overflow: 'hidden',
  },
  profilPicture: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  waliKelas: {
    fontSize: windowWidth * 0.04,
    fontFamily: 'OpenSans-Bold',
    color: 'white',
  },
  namaWaliKelas: {
    fontSize: windowWidth * 0.034,
    fontFamily: 'OpenSans-Regular',
    color: 'white',
  },
});
