/* eslint-disable react-native/no-inline-styles */
import React, {useState, useMemo} from 'react';
import {StyleSheet, Image, FlatList, Text, View} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {windowWidth, windowHeight} from '../../utils';

export default function SingleGalery({route, navigation}) {
  const [numColumn] = useState(2);

  const memoizedData = useMemo(() => {
    if (Array?.isArray(route?.params?.images)) {
      if (Number(numColumn) === 0 || Number(numColumn) === 1) {
        return route?.params?.images;
      } else {
        return route?.params?.images?.concat(
          Array(
            Number(numColumn) -
              (route?.params?.images?.length % Number(numColumn)),
          ).fill(''),
        );
      }
    } else {
      return [];
    }
  }, [route, numColumn]);

  return (
    <View style={styles.wrapper}>
      <FlatList
        data={memoizedData}
        numColumns={numColumn}
        columnWrapperStyle={styles.columnWrapper}
        ListHeaderComponent={
          <Text style={styles.imageTitle}>{route?.params?.judul || ''}</Text>
        }
        keyExtractor={(item, index) => item?.gallery_id}
        renderItem={({item, index}) => {
          if (item) {
            return (
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
                    item?.url
                      ? styles.customIconWrapper
                      : styles.defaultIconWrapper
                  }>
                  <Image
                    style={styles.icon}
                    source={
                      item?.url
                        ? {uri: item?.url}
                        : require('../../assets/icons/image-gallery.png')
                    }
                  />
                </View>
                <RectButton
                  rippleColor={'white'}
                  style={styles.button}
                  onPress={() =>
                    navigation.navigate('LightBoxGalery', {
                      ...route.params,
                      scrollToIndex: index,
                    })
                  }
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
        }}
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
  columnWrapper: {
    flex: 1,
    justifyContent: 'space-evenly',
    paddingHorizontal: '4%',
    marginBottom: '5%',
  },
  defaultItem: {
    marginBottom: '4%',
    borderRadius: windowWidth * 0.02,
    width: windowWidth * 0.36,
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
    fontSize: windowWidth * 0.038,
    fontFamily: 'OpenSans-Bold',
    alignSelf: 'center',
    marginBottom: '6%',
    paddingHorizontal: '15%',
    textAlign: 'center',
  },
  customIconWrapper: {
    width: windowWidth * 0.36,
    height: windowWidth * 0.4,
    overflow: 'hidden',
  },
  icon: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
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
