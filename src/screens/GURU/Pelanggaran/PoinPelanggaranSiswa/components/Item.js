import React, {memo} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';

import {windowWidth} from '../../../../../utils';

function Item({item}) {
  return (
    <RectButton style={styles.itemContainer}>
      <View style={styles.fotoProfilWrapper}>
        <Image
          style={styles.fotoProfil}
          source={
            item?.foto_siswa
              ? {uri: item.foto_siswa}
              : require('../../../../../assets/icons2/students3.png')
          }
        />
      </View>
      <Text numberOfLines={1} style={styles.namaSiswa}>
        {item?.nama}
      </Text>
      <View style={styles.poinWrapper}>
        <Text style={styles.poinLabel}>{Number(item?.poin)} Poin</Text>
      </View>
    </RectButton>
  );
}

export default memo(Item);

const styles = StyleSheet.create({
  itemContainer: {
    minHeight: windowWidth * 0.1,
    flexDirection: 'row',
    backgroundColor: 'white',
    elevation: 12,
    borderRadius: windowWidth * 0.01,
    width: windowWidth * 0.88,
    alignSelf: 'center',
    paddingHorizontal: '3%',
    paddingVertical: '2%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  item: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  fotoProfilWrapper: {
    width: windowWidth * 0.13,
    height: windowWidth * 0.13,
    overflow: 'hidden',
    borderRadius: windowWidth * 0.13,
  },
  fotoProfil: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  namaSiswa: {
    fontSize: windowWidth * 0.04,
    color: 'black',
    fontWeight: 'bold',
    flex: 1,
    paddingLeft: '4%',
    paddingRight: '2%',
  },
  statusPenangananBelumDiprosesPill: {
    color: 'white',
    fontSize: windowWidth * 0.03,
    backgroundColor: '#E36D00',
    flex: 1 / 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: windowWidth * 0.015,
    elevation: 5,
    paddingHorizontal: '1%',
    paddingVertical: '1.5%',
  },
  poinWrapper: {
    backgroundColor: '#E36D00',
    flex: 1 / 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: windowWidth * 0.015,
    elevation: 5,
    paddingHorizontal: '1%',
    paddingVertical: '1.5%',
  },
  poinLabel: {
    color: 'white',
    fontSize: windowWidth * 0.028,
    fontWeight: 'bold',
  },
});
