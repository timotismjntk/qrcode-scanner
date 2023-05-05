/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback, useState, useEffect, useMemo} from 'react';
import {FlatList, StatusBar, StyleSheet, Text, View} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import Dropdown from '../../components/DropDown';

import {windowWidth, windowHeight} from '../../utils';

import {getAgendaGuru} from '../../redux/reducer/GURU/agenda';

export default function Agenda() {
  const [tahun, setTahun] = useState(null);
  const [bulan, setBulan] = useState(null);
  const dispatch = useDispatch();
  const {authGuru = {}} = useSelector(state => state.authGuru) || {};
  const {agendaGuru = {}, isLoadingAgendaGuru = false} =
    useSelector(state => state.agendaGuru) || {};

  const showAgenda = useCallback(() => {
    if (authGuru?.status === 'berhasil') {
      const twoDigitMonth = {
        Januari: '01',
        Februari: '02',
        Maret: '03',
        April: '04',
        Mei: '05',
        Juni: '06',
        Juli: '07',
        Agustus: '08',
        September: '09',
        Oktober: '10',
        November: '11',
        Desember: '12',
      };
      dispatch(
        getAgendaGuru({
          website_id: authGuru?.data?.website_id,
          tahun,
          bulan: bulan ? twoDigitMonth[bulan] : '',
        }),
      );
    }
  }, [authGuru, tahun, bulan]);

  useEffect(() => {
    showAgenda();
  }, [authGuru]);

  const memoizedData = useMemo(() => {
    if (Array.isArray(agendaGuru?.data)) {
      return [...agendaGuru?.data].reverse();
    } else {
      return [];
    }
  }, [agendaGuru]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar animated={true} translucent backgroundColor="#3B3B3B" />
      <FlatList
        data={memoizedData}
        refreshing={isLoadingAgendaGuru}
        onRefresh={showAgenda}
        progressViewOffset={windowHeight * 0.15}
        nestedScrollEnabled
        ListHeaderComponent={
          <View style={styles.wrapper}>
            <View style={styles.form}>
              <Text style={styles.inputTitle}>Pilih Tahun</Text>
              <Dropdown
                type="year"
                selectedValue={tahun}
                setValue={setTahun}
                placeholder="- Pilih Tahun -"
              />
              <Text style={styles.inputTitle}>Pilih Bulan</Text>
              <Dropdown
                type="month"
                selectedValue={bulan}
                setValue={setBulan}
                placeholder="- Pilih Bulan -"
              />
              <RectButton onPress={showAgenda} style={styles.button}>
                <Text style={styles.buttonTitle}>Tampilkan Agenda</Text>
              </RectButton>
            </View>
          </View>
        }
        ListEmptyComponent={
          <Text style={styles.emptyData}>Agenda tidak ditemukan...</Text>
        }
        renderItem={({item}) => (
          <View style={styles.itemContainer}>
            <Text style={styles.tanggal}>
              {item?.tanggal || ''}, {item?.jam || ''}
            </Text>
            <Text style={styles.keterangan}>{item?.nama_acara || ''}</Text>
          </View>
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
    padding: '4%',
    borderRadius: windowWidth * 0.01,
  },
  flatlist: {
    padding: '6%',
    minHeight: windowHeight,
    paddingTop: '24%',
  },
  separator: {
    height: '0.2%',
    marginVertical: '2%',
  },
  itemContainer: {
    minHeight: windowWidth * 0.12,
    marginVertical: '2%',
    borderRadius: windowWidth * 0.02,
    width: '100%',
    backgroundColor: 'white',
    elevation: 5,
    overflow: 'hidden',
    marginBottom: '3%',
  },
  tanggal: {
    fontSize: windowWidth * 0.036,
    fontFamily: 'OpenSans-SemiBold',
    color: 'white',
    backgroundColor: 'rgba(0, 154, 15, 1)',
    paddingHorizontal: '4%',
    paddingVertical: '2%',
  },
  keterangan: {
    fontSize: windowWidth * 0.036,
    fontFamily: 'OpenSans-Regular',
    color: 'black',
    paddingHorizontal: '4%',
    paddingVertical: '3%',
  },
});
