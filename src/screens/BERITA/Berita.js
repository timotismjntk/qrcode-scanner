/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useEffect, useMemo} from 'react';
import {StyleSheet, Image, FlatList, Text, View} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';

import {windowWidth, windowHeight} from '../../utils';

import {getBeritaGuru} from '../../redux/reducer/GURU/berita';
import {getBeritaSiswa} from '../../redux/reducer/SISWA/berita';

export default function Berita({route, navigation}) {
  const dispatch = useDispatch();
  const {authGuru = {}} = useSelector(state => state.authGuru) || {};
  const {authSiswa = {}} = useSelector(state => state.authSiswa) || {};
  const {beritaGuru = {}, isLoadingBeritaGuru = false} =
    useSelector(state => state.beritaGuru) || {};
  const {beritaSiswa = {}, isLoadingBeritaSiswa = false} =
    useSelector(state => state.beritaSiswa) || {};

  useEffect(() => {
    if (authGuru?.status === 'berhasil') {
      dispatch(getBeritaGuru({website_id: authGuru?.data?.website_id}));
    }
  }, [authGuru]);

  useEffect(() => {
    if (authSiswa?.status === 'berhasil') {
      dispatch(getBeritaSiswa({website_id: authSiswa?.data?.website_id}));
    }
  }, [authSiswa]);

  const sortToNewest = useCallback(data => {
    return data.sort(
      (a, b) => new Date(b?.tanggal).getTime() - new Date(a?.tanggal).getTime(),
    );
  }, []);

  const memoizedData = useMemo(() => {
    if (authGuru?.status === 'berhasil') {
      if (Array.isArray(beritaGuru?.result)) {
        return sortToNewest([...beritaGuru?.result]);
      } else {
        return [];
      }
    } else if (authSiswa?.status === 'berhasil') {
      if (Array.isArray(beritaSiswa?.result)) {
        return sortToNewest([...beritaSiswa?.result]);
      } else {
        return [];
      }
    } else {
      return [];
    }
  }, [authGuru, authSiswa, beritaGuru, beritaSiswa]);

  return (
    <View style={styles.wrapper}>
      <FlatList
        data={memoizedData}
        refreshing={isLoadingBeritaGuru || isLoadingBeritaSiswa}
        onRefresh={() => {
          if (authGuru?.status === 'berhasil') {
            dispatch(getBeritaGuru({website_id: authGuru?.data?.website_id}));
          }
          if (authSiswa?.status === 'berhasil') {
            dispatch(getBeritaSiswa({website_id: authSiswa?.data?.website_id}));
          }
        }}
        progressViewOffset={windowHeight * 0.15}
        ListEmptyComponent={
          <Text style={styles.emptyData}>Berita kosong...</Text>
        }
        renderItem={({item, index}) => (
          <View style={[styles.defaultItem, {backgroundColor: 'white'}]}>
            <View
              style={
                item?.icon
                  ? styles.customIconWrapper
                  : styles.defaultIconWrapper
              }>
              <Image
                style={styles.icon}
                source={
                  item.thumbnail
                    ? {uri: item.thumbnail}
                    : require('../../assets/icons2/exampleBerita.png')
                }
              />
            </View>
            <View style={styles.itemCenterContent}>
              <Text numberOfLines={1} style={styles.itemCenterContentTitle}>
                {item?.judul || 'Ini Adalah Judul Berita Diposting Sekola...'}
              </Text>
              <Text numberOfLines={2} style={styles.itemCenterContentSubTitle}>
                {item?.cuplikan ||
                  'Ini adalah contoh potongan isi berita yang diposting oleh admin sekolah tentang kegiatan yang dilaksanakan oleh...'}
              </Text>
              <Text numberOfLines={2} style={styles.itemCenterContentCreatedAt}>
                {item?.haritanggal_formated}
              </Text>
            </View>
            <RectButton
              rippleColor={'white'}
              style={styles.button}
              onPress={() => navigation.navigate('DetailBerita', item)}
            />
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
    </View>
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
    paddingTop: '30%',
  },
  emptyData: {
    fontSize: windowWidth * 0.034,
    fontFamily: 'OpenSans-Regular',
    color: 'black',
    width: windowWidth * 0.85,
    alignSelf: 'center',
  },
  defaultItem: {
    alignSelf: 'center',
    marginBottom: '4%',
    borderRadius: windowWidth * 0.02,
    width: windowWidth * 0.85,
    height: windowWidth * 0.21,
    overflow: 'hidden',
    flexDirection: 'row',
    elevation: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
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
    resizeMode: 'cover',
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
    lineHeight: 13,
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
