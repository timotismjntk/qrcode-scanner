import React from 'react';
import {StyleSheet, Text, View, StatusBar, Image} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';

import {windowWidth, windowHeight} from '../../utils';

export default function AbsenGuru({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar animated={true} translucent backgroundColor="#3B3B3B" />
      <Text style={styles.headerTitle}>
        Pilih jenis absen yang ingin{'\n'}Anda lakukan
      </Text>
      <View style={styles.menuContainer}>
        <View>
          <View style={styles.item}>
            <View style={styles.iconWrapper}>
              <Image
                style={styles.icon}
                source={require('../../assets/icons2/absenMasuk.png')}
              />
            </View>
          </View>
          <Text style={styles.btnTitle}>Masuk</Text>
          <RectButton
            onPress={() =>
              navigation.navigate('BarcodeNavigator', {
                screen: 'ScanBarcode',
                params: {
                  jenis: 'Absen Masuk',
                },
              })
            }
            style={styles.btn}
          />
        </View>
        <View>
          <View style={styles.item}>
            <View style={styles.iconWrapper}>
              <Image
                style={styles.icon}
                source={require('../../assets/icons2/absenPulang.png')}
              />
            </View>
          </View>
          <Text style={styles.btnTitle}>Pulang</Text>
          <RectButton
            onPress={() =>
              navigation.navigate('BarcodeNavigator', {
                screen: 'ScanBarcode',
                params: {
                  jenis: 'Absen Pulang',
                },
              })
            }
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
  headerTitle: {
    color: 'black',
    textAlign: 'center',
    fontSize: windowWidth * 0.038,
    marginTop: '10%',
    paddingTop: '25%',
  },
  menuContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingHorizontal: '14%',
    marginTop: '10%',
  },
  item: {
    justifyContent: 'center',
    width: windowWidth * 0.3,
    height: windowWidth * 0.26,
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
    fontSize: windowWidth * 0.036,
    paddingHorizontal: '3%',
    textAlign: 'center',
    marginTop: '4%',
    fontFamily: 'OpenSans-SemiBold',
  },
  iconWrapper: {
    width: windowWidth * 0.2,
    height: windowWidth * 0.2,
    marginBottom: '2%',
    elevation: 10,
  },
  icon: {
    width: '100%',
    height: '100%',
  },
});
