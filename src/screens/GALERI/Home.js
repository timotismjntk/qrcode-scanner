/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useMemo, useCallback, useEffect} from 'react';
import {StyleSheet, Image, FlatList, Text, View} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';

import {windowWidth, windowHeight} from '../../utils';

import {getGaleriGuru} from '../../redux/reducer/GURU/galeri';
import {getGaleriSiswa} from '../../redux/reducer/SISWA/galeri';

export default function Home({navigation}) {
  const [numColumn] = useState(2);
  const dispatch = useDispatch();
  const {authGuru = {}} = useSelector(state => state.authGuru) || {};
  const {authSiswa = {}} = useSelector(state => state.authSiswa) || {};
  const {galeriGuru = {}, isLoadingGaleriGuru = false} =
    useSelector(state => state.galeriGuru) || {};
  const {galeriSiswa = {}, isLoadingGaleriSiswa = false} =
    useSelector(state => state.galeriSiswa) || {};

  useEffect(() => {
    if (authGuru?.status === 'berhasil') {
      dispatch(getGaleriGuru({website_id: authGuru?.data?.website_id}));
    }
  }, [authGuru]);

  useEffect(() => {
    if (authSiswa?.status === 'berhasil') {
      dispatch(getGaleriSiswa({website_id: authSiswa?.data?.website_id}));
    }
  }, [authSiswa]);

  const memoizedData = useMemo(() => {
    if (authGuru?.status === 'berhasil') {
      if (numColumn > 1) {
        if (galeriGuru?.result?.length % Number(numColumn) === 0) {
          return galeriGuru?.result;
        } else {
          if (Number(numColumn) === 0 || Number(numColumn) === 1) {
            return galeriGuru?.result;
          } else {
            return galeriGuru?.result?.concat(
              Array(
                Number(numColumn) -
                  (galeriGuru?.result?.length % Number(numColumn)),
              ).fill(''),
            );
          }
        }
      }
    } else if (authSiswa?.status === 'berhasil') {
      if (numColumn > 1) {
        if (galeriSiswa?.result?.length % Number(numColumn) === 0) {
          return galeriSiswa?.result;
        } else {
          if (Number(numColumn) === 0 || Number(numColumn) === 1) {
            return galeriSiswa?.result;
          } else {
            return galeriSiswa?.result?.concat(
              Array(
                Number(numColumn) -
                  (galeriSiswa?.result?.length % Number(numColumn)),
              ).fill(''),
            );
          }
        }
      }
    } else {
      return [];
    }
  }, [numColumn, authSiswa, authGuru, galeriSiswa, galeriGuru]);

  const renderItem = useCallback(({item, index}) => {
    if (item) {
      const thumbnail = Array.isArray(item?.images) && item?.images[0]?.url;
      return (
        <View style={{width: (windowWidth / numColumn) * 0.68}}>
          <View
            style={[
              styles.defaultItem,
              {
                width: (windowWidth / numColumn) * 0.68,
                height: (windowWidth / numColumn) * 0.8,
              },
            ]}>
            <View
              style={
                thumbnail ? styles.customIconWrapper : styles.defaultIconWrapper
              }>
              <Image
                style={styles.icon}
                source={
                  thumbnail
                    ? {uri: thumbnail}
                    : require('../../assets/icons/image-gallery.png')
                }
              />
            </View>
          </View>
          <Text numberOfLines={2} style={styles.imageTitle}>
            {item.judul}
          </Text>
          <RectButton
            rippleColor={'white'}
            style={styles.button}
            onPress={() => navigation.navigate('SingleGalery', item)}
          />
        </View>
      );
    } else {
      return (
        <View
          style={{
            width: (windowWidth / numColumn) * 0.68,
            height: windowWidth * 0.4,
          }}
        />
      );
    }
  }, []);

  return (
    <SafeAreaView style={styles.wrapper}>
      <FlatList
        data={memoizedData}
        numColumns={numColumn}
        refreshing={isLoadingGaleriGuru || isLoadingGaleriSiswa}
        onRefresh={() => {
          if (authGuru?.status === 'berhasil') {
            dispatch(getGaleriGuru({website_id: authGuru?.data?.website_id}));
          }
          if (authSiswa?.status === 'berhasil') {
            dispatch(getGaleriSiswa({website_id: authSiswa?.data?.website_id}));
          }
        }}
        ListEmptyComponent={
          <Text style={styles.emptyData}>Galeri kosong...</Text>
        }
        progressViewOffset={windowHeight * 0.15}
        keyExtractor={(item, index) => item?.gallery_kategori_id}
        columnWrapperStyle={styles.columnWrapper}
        renderItem={renderItem}
        contentContainerStyle={styles.flatlistContainer}
        // ListFooterComponent={
        //   <RectButton style={styles.loadMore}>
        //     <MaterialIcons
        //       name="refresh"
        //       size={windowWidth * 0.07}
        //       color="white"
        //     />
        //     <Text style={styles.loadMoreLabel}>Load More</Text>
        //   </RectButton>
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
    paddingTop: '30%',
    justifyContent: 'center',
  },
  columnWrapper: {
    flex: 1,
    justifyContent: 'space-evenly',
    paddingHorizontal: '4%',
    marginBottom: '5%',
  },
  emptyData: {
    fontSize: windowWidth * 0.034,
    fontFamily: 'OpenSans-Regular',
    color: 'black',
    width: windowWidth * 0.85,
    alignSelf: 'center',
  },
  defaultItem: {
    marginBottom: '4%',
    borderRadius: windowWidth * 0.02,
    width: windowWidth * 0.34,
    height: windowWidth * 0.4,
    overflow: 'hidden',
    flexDirection: 'row',
    elevation: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3B3B3B',
  },
  defaultIconWrapper: {
    width: windowWidth * 0.28,
    height: windowWidth * 0.28,
    overflow: 'hidden',
  },
  imageTitle: {
    color: 'black',
    fontSize: windowWidth * 0.032,
    fontFamily: 'OpenSans-SemiBold',
    textAlign: 'center',
  },
  customIconWrapper: {
    width: windowWidth * 0.34,
    height: windowWidth * 0.4,
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
