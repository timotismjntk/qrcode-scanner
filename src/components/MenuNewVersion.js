import React, {useMemo} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';

import {windowWidth, windowHeight} from '../utils';

const numColumn = 4;

export default function MenuNewVersion({title, data}) {
  const memoizedData = useMemo(() => {
    if (Array.isArray(data)) {
      if (data.length % Number(numColumn) === 0) {
        return data;
      } else {
        if (Number(numColumn) === 0 || Number(numColumn) === 1) {
          return data;
        } else {
          return data.concat(
            Array(Number(numColumn) - (data.length % Number(numColumn))).fill(
              '',
            ),
          );
        }
      }
    } else {
      if (data % Number(numColumn) === 0) {
        return data;
      } else {
        return Array(data + Number(numColumn) - (data % Number(numColumn)));
      }
    }
  }, [data]);

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.listMenu}>
          {memoizedData?.map((item, index) => {
            if (item) {
              return (
                <View key={index} style={styles.gridItemContainer}>
                  <View style={styles.gridItemTop}>
                    <View
                      style={{
                        width: (windowWidth / numColumn) * 0.45,
                        height: (windowWidth / numColumn) * 0.45,
                      }}>
                      <Image style={styles.icon} source={item?.icon} />
                    </View>
                  </View>
                  <View style={styles.gridItemBottom}>
                    <Text
                      numberOfLines={1}
                      style={styles.gridItemCenterContentTitle}>
                      {item?.title || ''}
                    </Text>
                  </View>
                  <RectButton
                    rippleColor="grey"
                    style={styles.button}
                    onPress={item.fn}
                  />
                </View>
              );
            } else {
              return <View key={index} style={styles.gridEmptyItemStyle} />;
            }
          })}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: '6%',
    marginTop: '4%',
    marginBottom: '4%',
  },
  wrapper: {
    width: '100%',
    padding: '3%',
    borderWidth: 1,
    borderColor: '#C9C9C9',
    borderRadius: windowWidth * 0.024,
  },
  title: {
    position: 'absolute',
    backgroundColor: '#4CC65E',
    top: -10,
    left: 20,
    paddingVertical: '2.2%',
    paddingHorizontal: '6%',
    color: 'white',
    fontSize: windowWidth * 0.032,
    borderRadius: windowWidth * 0.02,
    textAlign: 'center',
  },
  listMenu: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginTop: '8%',
  },
  gridEmptyItemStyle: {
    width: (windowWidth / 4) * 0.7,
    height: (windowWidth / 4) * 0.6,
    backgroundColor: 'transparent',
    elevation: 0,
    borderWidth: 0,
    borderColor: '#C9C9C9',
    borderRadius: windowWidth * 0.02,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '3%',
  },
  gridItemContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: (windowWidth / numColumn) * 0.7,
    marginBottom: '3%',
  },
  gridItemTop: {
    backgroundColor: 'white',
    width: (windowWidth / numColumn) * 0.7,
    height: (windowWidth / numColumn) * 0.6,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#C9C9C9',
    borderRadius: windowWidth * 0.02,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '3%',
  },
  gridItemBottom: {
    width: (windowWidth / numColumn) * 0.7,
    flex: 1,
    alignItems: 'center',
  },
  gridItemCenterContentTitle: {
    color: 'black',
    fontFamily: 'OpenSans-Regular',
    marginTop: '3%',
    fontSize: (windowWidth / numColumn) * 0.11,
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
});
