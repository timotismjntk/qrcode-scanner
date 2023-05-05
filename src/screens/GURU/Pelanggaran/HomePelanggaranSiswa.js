import React from 'react';
import {StyleSheet, Text, View, StatusBar, Image} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';

import {windowWidth} from '../../../utils';

export default function HomePelanggaranSiswa({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar animated={true} translucent backgroundColor="#3B3B3B" />
      <View style={styles.menuContainer}>
        <View style={{width: (windowWidth / 3) * 0.72}}>
          <View style={styles.item}>
            <View style={styles.iconWrapper}>
              <Image
                style={styles.icon}
                source={require('../../../assets/icons2/pelanggaran.png')}
              />
            </View>
          </View>
          <Text style={styles.btnTitle}>Data Pelanggaran</Text>
          <RectButton
            onPress={() => navigation.navigate('DataPelanggaranSiswa')}
            style={styles.btn}
          />
        </View>
        <View style={{width: (windowWidth / 3) * 0.72}}>
          <View style={styles.item}>
            <View style={styles.iconWrapper}>
              <Image
                style={styles.icon}
                source={require('../../../assets/icons2/flag.png')}
              />
            </View>
          </View>
          <Text style={styles.btnTitle}>Poin Pelanggaran</Text>
          <RectButton
            onPress={() => navigation.navigate('PoinPelanggaranSiswa')}
            style={styles.btn}
          />
        </View>
        <View style={{width: (windowWidth / 3) * 0.72}}>
          <View style={styles.item}>
            <View style={styles.iconWrapper}>
              <Image
                style={styles.icon}
                source={require('../../../assets/icons2/add.png')}
              />
            </View>
          </View>
          <Text style={styles.btnTitle}>Tambah Pelanggaran</Text>
          <RectButton
            onPress={() => navigation.navigate('TambahPelanggaranSiswa')}
            style={styles.btn}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  menuContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingHorizontal: '5%',
    paddingTop: '25%',
  },
  item: {
    justifyContent: 'center',
    width: (windowWidth / 3) * 0.72,
    height: windowWidth * 0.18,
    borderRadius: windowWidth * 0.03,
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#C9C9C9',
  },
  btn: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  btnTitle: {
    color: 'black',
    fontSize: windowWidth * 0.034,
    paddingHorizontal: '3%',
    textAlign: 'center',
    marginTop: '4%',
    fontFamily: 'OpenSans-SemiBold',
  },
  iconWrapper: {
    width: windowWidth * 0.14,
    height: windowWidth * 0.14,
    marginBottom: '2%',
    elevation: 10,
  },
  icon: {
    width: '100%',
    height: '100%',
  },
});
