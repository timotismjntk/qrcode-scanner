/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  FlatList,
  Alert,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {RectButton} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch} from 'react-redux';

import {clearAnggotaKelas} from '../../../redux/reducer/GURU/anggotaKelas';

import {windowWidth, windowHeight} from '../../../utils';

export default function HomeAkademikGuru({navigation}) {
  const comingSoonAlert = useCallback(() => {
    Alert.alert('Info', 'Dalam proses pengembangan.', [
      {text: 'OK', onPress: () => null},
    ]);
  }, []);

  const menu = useRef([
    {
      id: 1,
      icon: require('../../../assets/icons2/anggotaKelas.png'),
      title: 'Anggota Kelas',
      fn: () => navigation.navigate('AnggotaKelas'),
    },
    {
      id: 2,
      icon: require('../../../assets/icons2/jadwalPelajaran.png'),
      title: 'Jadwal Pelajaran',
      fn: () => {
        // comingSoonAlert();
        navigation.navigate('JadwalPelajaran');
      },
    },
    {
      id: 3,
      icon: require('../../../assets/icons2/pertemuan.png'),
      title: 'Pertemuan',
      fn: () => navigation.navigate('HomePertemuan'),
    },
    {
      id: 4,
      icon: require('../../../assets/icons2/koleksiMateri.png'),
      title: 'Koleksi Materi',
      fn: () => {
        // comingSoonAlert();
        navigation.navigate('KoleksiMateri');
      },
    },
  ]).current;
  const [numColumn] = useState(2);

  const dispatch = useDispatch();
  useFocusEffect(
    useCallback(() => {
      dispatch(clearAnggotaKelas());
    }, []),
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar animated={true} translucent backgroundColor="#3B3B3B" />
      <FlatList
        data={menu}
        numColumns={numColumn}
        contentContainerStyle={styles.menuContainer}
        columnWrapperStyle={{
          flex: 1,
          justifyContent: 'space-evenly',
          paddingHorizontal: '10%',
          marginBottom: '5%',
        }}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View style={{width: (windowWidth / numColumn) * 0.55}}>
            <View
              style={[
                styles.item,
                {
                  width: (windowWidth / numColumn) * 0.55,
                  height: (windowWidth / numColumn) * 0.45,
                },
              ]}>
              <View style={styles.iconWrapper}>
                <Image style={styles.icon} source={item.icon} />
              </View>
            </View>
            <Text style={styles.btnTitle}>{item.title}</Text>
            <RectButton onPress={item.fn} style={styles.btn} />
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  menuContainer: {
    paddingHorizontal: '5%',
    paddingTop: '25%',
  },
  item: {
    justifyContent: 'center',
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
