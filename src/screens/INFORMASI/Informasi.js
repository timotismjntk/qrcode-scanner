/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useMemo} from 'react';
import {StyleSheet, FlatList, Text, View} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {SafeAreaView} from 'react-native-safe-area-context';

import {windowWidth, windowHeight} from '../../utils';

import {getInformasiGuru} from '../../redux/reducer/GURU/informasi';
import {getInformasiSiswa} from '../../redux/reducer/SISWA/informasi';

export default function Informasi({route, navigation}) {
  const dispatch = useDispatch();
  const {authGuru = {}} = useSelector(state => state.authGuru) || {};
  const {authSiswa = {}} = useSelector(state => state.authSiswa) || {};
  const {informasiGuru = {}, isLoadingInformasiGuru = false} =
    useSelector(state => state.informasiGuru) || {};
  const {informasiSiswa = {}, isLoadingInformasiSiswa = false} =
    useSelector(state => state.informasiSiswa) || {};

  useEffect(() => {
    if (authGuru?.status === 'berhasil') {
      dispatch(getInformasiGuru({website_id: authGuru?.data?.website_id}));
    }
  }, [authGuru]);

  useEffect(() => {
    if (authSiswa?.status === 'berhasil') {
      dispatch(getInformasiSiswa({website_id: authSiswa?.data?.website_id}));
    }
  }, [authSiswa]);

  const memoizedData = useMemo(() => {
    if (authGuru?.status === 'berhasil') {
      return informasiGuru?.result || [];
    } else if (authSiswa?.status === 'berhasil') {
      return informasiSiswa?.result || [];
    } else {
      return [];
    }
  }, [authGuru, authSiswa, informasiGuru, informasiSiswa]);

  return (
    <SafeAreaView style={styles.wrapper}>
      <FlatList
        data={memoizedData}
        refreshing={isLoadingInformasiGuru || isLoadingInformasiSiswa}
        onRefresh={() => {
          if (authGuru?.status === 'berhasil') {
            dispatch(
              getInformasiGuru({website_id: authGuru?.data?.website_id}),
            );
          }
          if (authSiswa?.status === 'berhasil') {
            dispatch(
              getInformasiSiswa({website_id: authSiswa?.data?.website_id}),
            );
          }
        }}
        progressViewOffset={windowHeight * 0.15}
        ListEmptyComponent={
          <Text style={styles.emptyData}>Informasi kosong...</Text>
        }
        renderItem={({item, index}) => (
          <View style={[styles.defaultItem, {backgroundColor: 'white'}]}>
            <View style={styles.itemCenterContent}>
              <Text numberOfLines={2} style={styles.itemCenterContentCreatedAt}>
                {item?.haritanggal_formated}
              </Text>
              <Text numberOfLines={2} style={styles.itemCenterContentTitle}>
                {item?.judul}
              </Text>
              <Text numberOfLines={6} style={styles.itemCenterContentSubTitle}>
                {item?.informasi}
              </Text>
            </View>
            <RectButton rippleColor={'white'} style={styles.button} />
          </View>
        )}
        contentContainerStyle={styles.flatlistContainer}
        // ListFooterComponent={
        //   memoizedData?.length > 0 && (
        //     <RectButton style={styles.loadMore}>
        //       <MaterialIcons
        //         name="refresh"
        //         size={windowWidth * 0.07}
        //         color="white"
        //       />
        //       <Text style={styles.loadMoreLabel}>Load More</Text>
        //     </RectButton>
        //   )
        // }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  headerContainer: {
    backgroundColor: 'white',
    paddingHorizontal: '4%',
    paddingVertical: '2%',
    marginBottom: '3%',
  },
  headerTitle: {
    color: 'black',
    fontSize: windowWidth * 0.045,
    fontFamily: 'OpenSans-Bold',
    paddingBottom: '1%',
  },
  headerSubTitle: {
    color: 'grey',
    fontSize: windowWidth * 0.032,
    fontFamily: 'OpenSans-Regular',
    paddingBottom: '2%',
  },
  flatlistContainer: {
    paddingVertical: '6%',
    paddingTop: '25%',
  },
  emptyData: {
    fontSize: windowWidth * 0.034,
    fontFamily: 'OpenSans-Regular',
    color: 'black',
    backgroundColor: 'white',
    padding: '4%',
    borderRadius: windowWidth * 0.01,
    width: windowWidth * 0.85,
    alignSelf: 'center',
  },
  defaultItem: {
    alignSelf: 'center',
    marginBottom: '4%',
    borderRadius: windowWidth * 0.02,
    width: windowWidth * 0.85,
    minHeight: windowWidth * 0.21,
    overflow: 'hidden',
    flexDirection: 'row',
    elevation: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: '3%',
    paddingHorizontal: '2%',
  },
  defaultIconWrapper: {
    width: windowWidth * 0.2,
    height: windowWidth * 0.21,
    overflow: 'hidden',
  },
  customIconWrapper: {
    width: windowWidth * 0.1,
    height: windowWidth * 0.1,
    overflow: 'hidden',
  },
  icon: {
    width: '100%',
    height: '100%',
    resizeMode: 'stretch',
  },
  itemCenterContent: {
    flex: 1,
    padding: '2%',
  },
  itemCenterContentTitle: {
    color: 'black',
    fontSize: windowWidth * 0.034,
    fontFamily: 'OpenSans-Bold',
  },
  itemCenterContentSubTitle: {
    color: 'black',
    fontSize: windowWidth * 0.03,
    fontFamily: 'OpenSans-Regular',
    marginTop: '2%',
  },
  itemCenterContentCreatedAt: {
    color: 'black',
    fontSize: windowWidth * 0.028,
    marginTop: '2%',
    fontFamily: 'OpenSans-Regular',
  },
  button: {
    position: 'absolute',
    borderRadius: windowWidth * 0.02,
    width: '100%',
    height: '100%',
  },
  loadMore: {
    backgroundColor: '#61A2F9',
    alignSelf: 'center',
    width: windowWidth * 0.38,
    height: windowWidth * 0.11,
    borderRadius: windowWidth * 0.02,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: '4%',
  },
  loadMoreLabel: {
    color: 'white',
    fontSize: windowWidth * 0.044,
    fontFamily: 'OpenSans-Bold',
  },
});
