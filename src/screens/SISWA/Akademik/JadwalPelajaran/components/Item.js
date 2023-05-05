import React, {memo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';

import {windowWidth} from '../../../../../utils';

function Item({item}) {
  return (
    <RectButton style={styles.item}>
      <View style={styles.hariWrapper}>
        <Text style={styles.hari}>{item.hari}</Text>
        <Text style={styles.hari}>{item.jam_mulai}</Text>
      </View>
      <View style={styles.mapelWrapper}>
        <Text numberOfLines={1} style={styles.mapel}>
          {item?.nama_matapelajaran}
        </Text>
        <Text numberOfLines={1} style={styles.kelas}>
          Kelas: {item?.nama_kelas}
        </Text>
        <Text numberOfLines={1} style={styles.pengajar}>
          Pengajar: {item?.pengajar_nama}
        </Text>
      </View>
    </RectButton>
  );
}

export default memo(Item);

const styles = StyleSheet.create({
  item: {
    minHeight: windowWidth * 0.18,
    marginVertical: '2%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'white',
    elevation: 10,
    borderRadius: windowWidth * 0.02,
    width: '100%',
    alignSelf: 'center',
    overflow: 'hidden',
  },
  hariWrapper: {
    backgroundColor: '#009A0F',
    width: '23%',
    minHeight: windowWidth * 0.18,
    borderRadius: windowWidth * 0.02,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: '4%',
  },
  hari: {
    color: 'white',
    textAlign: 'center',
    fontSize: windowWidth * 0.034,
    fontFamily: 'OpenSans-Bold',
  },
  mapelWrapper: {
    padding: '2%',
    flex: 1,
  },
  mapel: {
    fontSize: windowWidth * 0.042,
    fontFamily: 'OpenSans-Bold',
    color: 'black',
  },
  kelas: {
    fontSize: windowWidth * 0.03,
    fontFamily: 'OpenSans-Regular',
    color: 'black',
  },
  pengajar: {
    fontSize: windowWidth * 0.03,
    fontFamily: 'OpenSans-Regular',
    color: 'black',
  },
});
