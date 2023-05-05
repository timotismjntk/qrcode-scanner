/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback, useEffect, useMemo} from 'react';
import {StyleSheet, FlatList, Text, View} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';

import {windowWidth} from '../../utils';

import {getBlog} from '../../redux/reducer/GURU/blog';

export default function Blog({navigation, route}) {
  const dispatch = useDispatch();
  const {authSiswa = {}} = useSelector(state => state.authSiswa) || {};
  const {authGuru = {}} = useSelector(state => state.authGuru) || {};
  const {blog = {}, isLoadingblog = false} =
    useSelector(state => state.blog) || {};

  const showBlog = useCallback(() => {
    if (route.params.title === 'BLOG SISWA') {
      dispatch(
        getBlog({
          website_id: authSiswa?.data?.website_id || authGuru?.data?.website_id,
          kategori: 'Siswa',
        }),
      );
    } else {
      dispatch(
        getBlog({
          website_id: authGuru?.data?.website_id || authSiswa?.data?.website_id,
          kategori: 'Guru',
        }),
      );
    }
  }, [route, authSiswa, authGuru]);

  useEffect(() => {
    showBlog();
  }, []);

  const memoizedData = useMemo(() => {
    if (Array.isArray(blog?.result)) {
      return blog?.result;
    } else {
      return [];
    }
  }, [blog]);

  return (
    <View style={styles.wrapper}>
      <FlatList
        data={memoizedData}
        refreshing={isLoadingblog}
        onRefresh={showBlog}
        renderItem={({item, index}) => (
          <RectButton
            onPress={() =>
              navigation.navigate('DetailBlog', {
                ...route.params,
                ...item,
              })
            }
            style={styles.defaultItem}>
            <View style={styles.itemCenterContent}>
              <Text numberOfLines={1} style={styles.itemCenterContentTitle}>
                {item?.judul || 'Ini Adalah Judul Berita Diposting Sekola...'}
              </Text>
              <Text numberOfLines={2} style={styles.itemCenterContentSubTitle}>
                {item?.cuplikan ||
                  'Ini adalah contoh potongan isi berita yang diposting oleh admin sekolah tentang kegiatan yang dilaksanakan oleh...'}
              </Text>
              <Text numberOfLines={2} style={styles.itemCenterContentCreatedAt}>
                {item?.created_at?.length > 0
                  ? new Date(item?.created_at)?.toLocaleDateString?.('id', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                      weekday: 'long',
                    })
                  : ''}
              </Text>
            </View>
          </RectButton>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyData}>Blog kosong...</Text>
        }
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
    paddingTop: '35%',
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
    minHeight: windowWidth * 0.21,
    overflow: 'hidden',
    flexDirection: 'row',
    elevation: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: '2%',
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
