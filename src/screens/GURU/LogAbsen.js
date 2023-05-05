/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  StatusBar,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';

import Dropdown from '../../components/DropDown';

import {windowWidth, windowHeight} from '../../utils';

import {getLogAbsenGuru} from '../../redux/reducer/GURU/logAbsen';

export default function LogAbsen() {
  const dispatch = useDispatch();
  const [tahun, setTahun] = useState('');
  const [bulan, setBulan] = useState('');
  const {authGuru = {}} = useSelector(state => state.authGuru) || {};
  const {logAbsenGuru = {}, isLoadingLogAbsenGuru = false} =
    useSelector(state => state.logAbsenGuru) || {};
  const [showOnlyOne, setShowOnlyOne] = useState(true);

  useEffect(() => {
    if (showOnlyOne && authGuru?.status === 'berhasil') {
      const formattedDate = new Date()?.toLocaleDateString?.('id', {
        month: '2-digit',
        year: 'numeric',
      });
      const [month, year] = formattedDate?.split?.('/') || [];
      dispatch(
        getLogAbsenGuru({
          sdm_id: authGuru?.data?.guru?.sdm_id,
          tahun: year,
          bulan: month,
        }),
      );
    }
  }, [authGuru, showOnlyOne]);

  const showLogAbsen = useCallback(() => {
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
        getLogAbsenGuru({
          sdm_id: authGuru?.data?.guru?.sdm_id,
          tahun: tahun,
          bulan: bulan ? twoDigitMonth[bulan] : '',
        }),
      );
      setShowOnlyOne(false);
    }
  }, [authGuru, tahun, bulan]);

  const memoizedData = useMemo(() => {
    if (Array.isArray(logAbsenGuru?.result)) {
      if (isLoadingLogAbsenGuru) {
        return [];
      } else {
        if (showOnlyOne) {
          return logAbsenGuru?.result?.filter(
            item => new Date(item?.tanggal).getDate() === new Date().getDate(),
          );
        } else {
          return logAbsenGuru?.result;
        }
      }
    } else {
      return [];
    }
  }, [logAbsenGuru?.result, isLoadingLogAbsenGuru, showOnlyOne]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar animated={true} translucent backgroundColor="#3B3B3B" />
      <FlatList
        data={memoizedData}
        refreshing={isLoadingLogAbsenGuru}
        onRefresh={showLogAbsen}
        progressViewOffset={windowHeight * 0.15}
        stickyHeaderIndices={[0]}
        ListHeaderComponentStyle={styles.headerWrapperflatlist}
        ListHeaderComponent={
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
            <RectButton
              enabled={bulan ? true : false}
              onPress={showLogAbsen}
              style={[
                styles.button,
                {backgroundColor: bulan ? '#61A2F9' : 'grey'},
              ]}>
              <Text style={styles.buttonTitle}>Lihat</Text>
            </RectButton>
          </View>
        }
        ListEmptyComponent={
          <Text style={styles.emptyData}>Log Absen tidak ditemukan...</Text>
        }
        // ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({item}) => {
          if (
            !Array.isArray(item?.izin) &&
            Object.keys(item?.izin)?.length > 0
          ) {
            return (
              <View style={styles.item}>
                <Text style={styles.itemHari}>{item.haritanggal_formated}</Text>
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
                <Text style={styles.itemHari}>{item.haritanggal_formated}</Text>
                <View style={styles.itemMasukPulangWrapper}>
                  <Text style={styles.itemMasukPulang}>
                    Masuk: {item.absen_masuk}
                  </Text>
                  <Text style={styles.itemMasukPulang}>
                    Pulang: {item.absen_pulang}
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
  headerWrapperflatlist: {
    alignItems: 'center',
    width: '100%',
    marginBottom: '4%',
    backgroundColor: 'white',
    paddingTop: '20%',
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
    minHeight: windowHeight,
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
