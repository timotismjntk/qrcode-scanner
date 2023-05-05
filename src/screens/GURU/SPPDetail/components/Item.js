import React, {memo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';

import {windowWidth} from '@src/utils';

function Item({item}) {
  return (
    <RectButton style={styles.itemContainer}>
      <View>
        <Text numberOfLines={1} style={styles.bulan}>
          {item?.bulan}
        </Text>
        <Text style={styles.jumlahPembayaran}>{item?.spp_dibayarkan}</Text>
      </View>
      <View
        style={
          item?.status === 'Sudah Dibayar'
            ? styles.statusSPPSudahDibayarPill
            : styles.statusSPPBelumDibayarPill
        }>
        <Text style={styles.statusSPPLabel}>
          {item?.status || 'Belum Dibayar'}
        </Text>
        {item?.tanggal_pembayaran && (
          <Text style={styles.dibayarPada}>
            Pada {item?.tanggal_pembayaran}
          </Text>
        )}
      </View>
    </RectButton>
  );
}

export default memo(Item);

const styles = StyleSheet.create({
  itemContainer: {
    minHeight: windowWidth * 0.13,
    backgroundColor: 'white',
    marginBottom: '4%',
    flexDirection: 'row',
    elevation: 12,
    justifyContent: 'space-between',
    borderRadius: windowWidth * 0.02,
    width: windowWidth * 0.88,
    alignSelf: 'center',
    paddingHorizontal: '3%',
    paddingVertical: '3%',
    overflow: 'hidden',
  },
  itemSubContainer: {
    paddingLeft: '3%',
    flex: 1,
  },
  bulan: {
    fontSize: windowWidth * 0.046,
    color: 'black',
    fontWeight: 'bold',
    flex: 1,
    paddingRight: '2%',
  },
  statusSPPBelumDibayarPill: {
    color: 'white',
    fontSize: windowWidth * 0.03,
    backgroundColor: '#E36D00',
    flex: 0.7,
    alignItem: 'center',
    justifyContent: 'center',
    borderRadius: windowWidth * 0.015,
    elevation: 5,
    paddingHorizontal: '1%',
    paddingVertical: '1.5%',
  },
  statusSPPSudahDibayarPill: {
    color: 'white',
    fontSize: windowWidth * 0.03,
    backgroundColor: '#009A0F',
    flex: 0.7,
    alignItem: 'center',
    justifyContent: 'center',
    borderRadius: windowWidth * 0.015,
    elevation: 5,
    paddingHorizontal: '1%',
    paddingVertical: '1.5%',
  },
  jumlahPembayaran: {
    color: 'black',
    fontSize: windowWidth * 0.032,
    marginTop: '2%',
  },
  statusSPPLabel: {
    color: 'white',
    fontSize: windowWidth * 0.035,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  dibayarPada: {
    color: 'white',
    fontSize: windowWidth * 0.03,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
