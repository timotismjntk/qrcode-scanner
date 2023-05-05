/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {StyleSheet, Image, Text, View} from 'react-native';
import {RectButton, FlatList} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';

import {windowWidth, windowHeight} from '../../utils';

export default function LightBoxGalery({route, navigation}) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const flatlistRef = useRef(null);
  const miniFlatlistRef = useRef(null);

  useEffect(() => {
    if (route?.params?.scrollToIndex) {
      flatlistRef?.current?.scrollToIndex({
        index: Number(route?.params?.scrollToIndex),
        animated: true,
      });
    }
  }, [route]);

  const memoizedData = useMemo(() => {
    if (Array?.isArray(route?.params?.images)) {
      return route?.params?.images;
    } else {
      return [];
    }
  }, [route]);

  const handleItemChange = useCallback(
    ({viewableItems, changes}) => {
      if (viewableItems.length >= 1) {
        if (viewableItems[0].isViewable) {
          setSelectedIndex(viewableItems[0]?.index);
          if (viewableItems[0]?.index === 0) {
            miniFlatlistRef?.current?.scrollToOffset({
              animated: true,
              offset: 0,
            });
          } else {
            miniFlatlistRef?.current?.scrollToIndex({
              index: viewableItems[0]?.index,
              animated: true,
            });
          }
        }
      }
    },
    [miniFlatlistRef],
  );

  return (
    <SafeAreaView style={styles.wrapper}>
      <FlatList
        ref={flatlistRef}
        data={memoizedData}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={handleItemChange}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 50,
        }}
        onScrollToIndexFailed={info => {
          const wait = new Promise(resolve => setTimeout(resolve, 500));
          wait.then(() => {
            flatlistRef.current?.scrollToIndex({
              index: info.index,
              animated: true,
            });
          });
        }}
        keyExtractor={(item, index) => item?.gallery_id}
        renderItem={({item, index}) => (
          <View
            style={{
              width: windowWidth,
              alignItems: 'center',
              paddingHorizontal: '3%',
            }}>
            <View style={styles.defaultItem}>
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
              <RectButton rippleColor={'white'} style={styles.button} />
            </View>
          </View>
        )}
        contentContainerStyle={styles.flatlistContainer}
      />
      {/* <RectButton style={styles.save}>
        <Text style={styles.saveLabel}>Simpan</Text>
      </RectButton> */}
      <FlatList
        ref={miniFlatlistRef}
        data={memoizedData}
        keyExtractor={(item, index) => item?.gallery_id}
        horizontal
        onScrollToIndexFailed={info => {
          const wait = new Promise(resolve => setTimeout(resolve, 500));
          wait.then(() => {
            miniFlatlistRef.current?.scrollToIndex({
              index: info.index,
              animated: true,
            });
          });
        }}
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) => (
          <View
            style={[
              styles.defaultItemMini,
              {
                marginRight:
                  index === memoizedData.length - 1 ? 0 : windowWidth * 0.03,
                borderColor: '#61A2F9',
                borderWidth: selectedIndex === index ? 3 : 0,
              },
            ]}>
            <View
              style={
                item?.url
                  ? styles.customIconMiniWrapper
                  : styles.defaultIconMiniWrapper
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
              onPress={() => {
                flatlistRef?.current?.scrollToIndex({
                  index: index,
                  animated: true,
                });
                setSelectedIndex(index);
                miniFlatlistRef?.current?.scrollToIndex({
                  index: index,
                  animated: true,
                });
              }}
              style={styles.button}
            />
          </View>
        )}
        contentContainerStyle={styles.flatlistMiniContainer}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flatlistContainer: {
    height: windowWidth,
    marginTop: '12%',
    marginBottom: '3%',
  },
  flatlistMiniContainer: {
    paddingVertical: '2%',
    marginTop: '6%',
    paddingHorizontal: '3%',
    height: windowWidth * 0.25,
  },
  defaultItem: {
    width: windowWidth * 0.95,
    height: windowWidth,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3B3B3B',
    borderRadius: windowWidth * 0.07,
  },
  defaultItemMini: {
    width: windowWidth * 0.15,
    height: windowWidth * 0.2,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3B3B3B',
    borderRadius: windowWidth * 0.02,
  },
  defaultIconWrapper: {
    width: windowWidth * 0.4,
    height: windowWidth * 0.4,
    overflow: 'hidden',
  },
  defaultIconMiniWrapper: {
    width: windowWidth * 0.1,
    height: windowWidth * 0.1,
    overflow: 'hidden',
  },
  customIconWrapper: {
    width: windowWidth * 0.95,
    height: windowWidth,
    overflow: 'hidden',
  },
  customIconMiniWrapper: {
    width: windowWidth * 0.15,
    height: windowWidth * 0.2,
    overflow: 'hidden',
  },
  icon: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  button: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  save: {
    backgroundColor: '#61A2F9',
    alignSelf: 'center',
    width: windowWidth * 0.36,
    height: windowWidth * 0.1,
    borderRadius: windowWidth * 0.02,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  saveLabel: {
    color: 'white',
    fontSize: windowWidth * 0.044,
    fontFamily: 'OpenSans-Bold',
  },
});
