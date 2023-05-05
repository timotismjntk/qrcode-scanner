import React, {memo} from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';

import {windowWidth} from '../../../../utils';
import useCurrency from '@src/hooks/useCurrency';

function Item({item}) {
  const navigation = useNavigation();
  const {currency} = useCurrency();

  return (
    <Pressable
      onPress={() => navigation.navigate('SPPDetail', item)}
      style={styles.item}>
      <ScrollView
        disallowInterruption
        horizontal
        removeClippedSubviews
        showsHorizontalScrollIndicator={false}>
        <View style={styles.itemWrapper}>
          <View
            style={
              item?.status === 'Sudah Bayar'
                ? styles.statusSPPWrapperSudahBayar
                : styles.statusSPPWrapperBelumBayar
            }>
            <Text numberOfLines={2} style={styles.statusSPP}>
              {item.status}
            </Text>
          </View>
          <View style={styles.infoWrapper}>
            <Text numberOfLines={1} style={styles.namaSiswa}>
              {item?.nama}
            </Text>
            <TouchableOpacity
              activeOpacity={1}
              style={styles.infoPembayaranWrapper}>
              <Text style={styles.terbayar}>
                Bayar {currency(item?.spp_dibayarkan)}
              </Text>
              <Text style={styles.terhutang}>
                Terhutang{' '}
                {currency(Number(item?.besaran) - Number(item?.spp_dibayarkan))}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </Pressable>
  );
}

export default memo(Item);

const styles = StyleSheet.create({
  item: {
    padding: '3%',
    paddingRight: '1%',
    minHeight: windowWidth * 0.18,
    marginVertical: '2%',
    backgroundColor: 'white',
    elevation: 10,
    borderRadius: windowWidth * 0.02,
    width: '100%',
    alignSelf: 'center',
    overflow: 'hidden',
  },
  itemWrapper: {
    width: windowWidth * 0.9,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  statusSPP: {
    color: 'white',
    textAlign: 'center',
    fontSize: windowWidth * 0.037,
    fontFamily: 'OpenSans-Bold',
  },
  statusSPPWrapperSudahBayar: {
    backgroundColor: '#009A0F',
    width: '20%',
    paddingHorizontal: '3%',
    minHeight: windowWidth * 0.16,
    borderRadius: windowWidth * 0.02,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusSPPWrapperBelumBayar: {
    backgroundColor: '#E36D00',
    width: '20%',
    paddingHorizontal: '3%',
    minHeight: windowWidth * 0.16,
    borderRadius: windowWidth * 0.02,
    alignItems: 'center',
    justifyContent: 'center',
  },
  namaSiswa: {
    color: 'black',
    fontSize: windowWidth * 0.04,
    fontFamily: 'OpenSans-Bold',
  },
  infoWrapper: {
    padding: '2%',
    flex: 1,
    paddingHorizontal: '3%',
  },
  infoPembayaranWrapper: {
    flexDirection: 'row',
    marginTop: '4%',
  },
  terbayar: {
    color: 'white',
    textAlign: 'center',
    fontSize: windowWidth * 0.027,
    backgroundColor: '#61A2F9',
    paddingVertical: '3%',
    paddingHorizontal: '6%',
    borderRadius: windowWidth * 0.025,
  },
  terhutang: {
    color: 'white',
    textAlign: 'center',
    fontSize: windowWidth * 0.027,
    backgroundColor: '#A6A6A6',
    paddingVertical: '3%',
    paddingHorizontal: '6%',
    borderRadius: windowWidth * 0.025,
    marginLeft: '4%',
  },
});
