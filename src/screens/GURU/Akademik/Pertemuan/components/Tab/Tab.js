/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {StyleSheet, TouchableOpacity, Text, View, Alert} from 'react-native';
import {
  FlatList as GestureFlatlist,
  RectButton,
} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';

import Absen from './Absen';
import Catatan from './Catatan';
import Materi from './Materi';

import {getDataSiswaByKelas} from '../../../../../../redux/reducer/GURU/dataSiswa';
import {
  clearUbahPertemuan,
  ubahPertemuan,
} from '../../../../../../redux/reducer/GURU/pertemuan';

import {windowWidth, windowHeight} from '../../../../../../utils';

export default function Tab({data, mataPelajaran, pengajar}) {
  const dispatch = useDispatch();
  const tabRef = useRef(null);
  const [activeTab, setActiveTab] = useState(0);
  const [tabBars, setTabBars] = useState([
    {
      id: 1,
      tabLabel: 'Absen',
      fn: () => {
        tabRef?.current?.scrollToIndex({index: 0, animated: false});
        setActiveTab(0);
      },
      absenSiswa: [],
      materi: null,
      catatan: null,
    },
    {
      id: 2,
      tabLabel: 'Materi',
      fn: () => {
        tabRef?.current?.scrollToIndex({index: 1, animated: false});
        setActiveTab(1);
      },
      absenSiswa: null,
      materi: [],
      catatan: null,
    },
    {
      id: 3,
      tabLabel: 'Catatan',
      fn: () => {
        tabRef?.current?.scrollToIndex({index: 2, animated: false});
        setActiveTab(2);
      },
      absenSiswa: null,
      materi: null,
      catatan: '',
    },
  ]);

  const {dataSiswaByKelas = {}} = useSelector(state => state.dataSiswa) || {};
  const {ubahPertemuanResult = {}} =
    useSelector(state => state.pertemuan) || {};

  // cari data siswa by kelas
  useEffect(() => {
    if (data?.status === 'berhasil' && data?.pertemuan?.kelas_id?.length > 0) {
      dispatch(
        getDataSiswaByKelas({kelas_id: data?.pertemuan?.kelas_id || ''}),
      );
      // push materi ke state tabbars index 0, field materi
      setTabBars(prev => {
        return prev.map(item => {
          if (item?.tabLabel === 'Materi') {
            return {
              ...item,
              materi: data?.pertemuan?.materi || [],
            };
          }
          return item;
        });
      });
      // push catatan ke state tabbars index 0, field catatan
      setTabBars(prev => {
        return prev.map(item => {
          if (item?.tabLabel === 'Catatan') {
            return {
              ...item,
              catatan: data?.pertemuan?.catatan || '',
            };
          }
          return item;
        });
      });
    }
  }, [data?.pertemuan]);

  // apabila data siswa by kelas sudah ada maka push ke state tabbars index 0, field absensiswa
  useEffect(() => {
    if (dataSiswaByKelas?.result?.length > 0) {
      setTabBars(prev => {
        return prev.map(item => {
          if (item?.tabLabel === 'Absen') {
            return {
              ...item,
              absenSiswa:
                data?.pertemuan?.absensi?.length > 0
                  ? data?.pertemuan?.absensi
                  : dataSiswaByKelas?.result?.map(
                      ({siswa_id, nama, nisn, kehadiran}) => ({
                        siswa_id,
                        nama,
                        nisn,
                        kehadiran: {H: true, S: false, I: false, A: false}, // secara default hadir === true
                      }),
                    ),
            };
          }
          return item;
        });
      });
    }
  }, [dataSiswaByKelas, data?.pertemuan]);

  const simpanPertemuan = useCallback(() => {
    dispatch(
      ubahPertemuan({
        absensipertemuan_id: data?.pertemuan?.absensipertemuan_id || '',
        catatan: tabBars[2].catatan || '',
        absensi: tabBars[0].absenSiswa || [],
        materi: tabBars[1].materi || [],
      }),
    );
  }, [data, tabBars]);

  useEffect(() => {
    if (ubahPertemuanResult?.status?.length > 0) {
      Alert.alert(
        ubahPertemuanResult?.status === 'berhasil' ? 'Sukses' : 'Gagal',
        ubahPertemuanResult?.pesan || '',
        [
          {
            text: ubahPertemuanResult?.status === 'berhasil' ? 'OK' : 'Tutup',
            onPress: () => {
              ubahPertemuanResult?.status === 'berhasil';
              dispatch(clearUbahPertemuan());
            },
          },
        ],
      );
    }
  }, [ubahPertemuanResult]);

  return (
    <View style={styles.container}>
      <View style={styles.tabBarsContainer}>
        {tabBars?.map((tabBar, index) => (
          <TouchableOpacity
            key={tabBar.id}
            activeOpacity={0.9}
            onPress={tabBar?.fn}
            disabled={activeTab === index}
            style={activeTab === index ? styles.activeTabBars : styles.tabBars}>
            <Text style={styles.tabBarsLabel}>{tabBar.tabLabel}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <GestureFlatlist
        data={tabBars}
        ref={tabRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false}
        nestedScrollEnabled
        keyExtractor={item => item?.id}
        renderItem={({item, index}) => (
          <View key={index} style={styles.tabItemContainer}>
            <View style={styles.tabItem}>
              {index === 0 && activeTab === index && (
                <Absen data={item?.absenSiswa || []} onChange={setTabBars} />
              )}
              {index === 1 && activeTab === index && (
                <Materi
                  data={item?.materi || []}
                  mataPelajaran={mataPelajaran}
                  matapelajaran_id={data?.pertemuan?.matapelajaran_id}
                  pengajar={pengajar}
                  pengajar_sdm_id={data?.pertemuan?.sdm_id}
                  onChange={setTabBars}
                />
              )}
              {index === 2 && activeTab === index && (
                <Catatan value={item.catatan} onChangeText={setTabBars} />
              )}
            </View>
          </View>
        )}
        contentContainerStyle={styles.flatlistContainer}
      />
      <RectButton onPress={simpanPertemuan} style={styles.saveButton}>
        <Text style={styles.buttonTitle}>Simpan</Text>
      </RectButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: '3%',
  },
  tabBarsContainer: {
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    paddingHorizontal: '7%',
  },
  tabBars: {
    padding: '2%',
    width: '30%',
    alignItems: 'center',
    backgroundColor: '#61A2F9',
    borderTopRightRadius: windowWidth * 0.02,
    borderTopLeftRadius: windowWidth * 0.02,
  },
  activeTabBars: {
    padding: '2%',
    width: '30%',
    alignItems: 'center',
    backgroundColor: '#009A0F',
    borderTopRightRadius: windowWidth * 0.02,
    borderTopLeftRadius: windowWidth * 0.02,
  },
  tabBarsLabel: {
    color: 'white',
    fontSize: windowWidth * 0.034,
    fontWeight: '700',
  },
  tabItemContainer: {
    width: windowWidth,
  },
  tabItem: {
    width: windowWidth * 0.86,
    alignSelf: 'center',
    justifyContent: 'center',
    minHeight: windowHeight * 0.1,
    backgroundColor: 'white',
    borderRadius: windowWidth * 0.02,
    elevation: 5,
  },
  flatlistContainer: {
    paddingBottom: '5%',
  },
  buttonTitle: {
    color: 'white',
    fontSize: windowWidth * 0.04,
    fontFamily: 'OpenSans-SemiBold',
  },
  saveButton: {
    padding: '3%',
    width: '88%',
    alignSelf: 'center',
    borderRadius: windowWidth * 0.02,
    alignItems: 'center',
    backgroundColor: '#009A0F',
    elevation: 10,
  },
});
