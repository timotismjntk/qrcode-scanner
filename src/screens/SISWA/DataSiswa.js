/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {FlatList, StatusBar, StyleSheet, Text, View} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';

import Dropdown from '../../components/DropDown';

import {windowWidth, windowHeight} from '../../utils';

import {getDataSiswa} from '../../redux/reducer/GURU/dataSiswa';

export default function DataSiswa({navigation}) {
  const dispatch = useDispatch();
  const [tahunMasuk, setTahunMasuk] = useState(new Date().getFullYear());

  const {authSiswa = {}} = useSelector(state => state.authSiswa) || {};
  const {dataSiswa = {}, isLoadingDataSiswa = false} =
    useSelector(state => state.dataSiswa) || {};

  const lihatData = useCallback(() => {
    if (authSiswa?.status === 'berhasil') {
      dispatch(
        getDataSiswa({
          tahun_masuk: tahunMasuk,
          website_id: authSiswa?.data?.website_id,
        }),
      );
    }
  }, [authSiswa?.data?.website_id, authSiswa?.status, tahunMasuk]);

  const memoizedData = useMemo(() => {
    if (dataSiswa?.result?.siswas?.length > 0) {
      return dataSiswa?.result?.siswas;
    } else {
      return [];
    }
  }, [dataSiswa]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar animated={true} translucent backgroundColor="#3B3B3B" />
      <FlatList
        data={memoizedData}
        refreshing={isLoadingDataSiswa}
        onRefresh={() => {
          if (authSiswa?.status === 'berhasil') {
            dispatch(
              getDataSiswa({
                tahun_masuk: tahunMasuk || new Date().getFullYear(),
                website_id: authSiswa?.data?.website_id,
              }),
            );
          }
        }}
        progressViewOffset={windowHeight * 0.15}
        ListHeaderComponent={
          <View style={styles.wrapper}>
            <View style={styles.form}>
              <Text style={styles.inputTitle}>Tahun Masuk</Text>
              <Dropdown
                type="year"
                selectedValue={tahunMasuk}
                setValue={setTahunMasuk}
                placeholder="- Pilih Tahun -"
              />
              <RectButton
                style={tahunMasuk ? styles.button : styles.disabledButton}
                enabled={tahunMasuk ? true : false}
                onPress={lihatData}>
                <Text style={styles.buttonTitle}>Lihat</Text>
              </RectButton>
            </View>
          </View>
        }
        ListEmptyComponent={
          <Text style={styles.emptyData}>Data Siswa kosong...</Text>
        }
        renderItem={({item}) => (
          <RectButton
            onPress={() => navigation.navigate('ProfilSiswaLain', item)}
            style={styles.item}>
            <Text numberOfLines={1} style={styles.namaSiswa}>
              {item?.nama}
            </Text>
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
    paddingBottom: '15%',
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
    width: '88%',
  },
});
