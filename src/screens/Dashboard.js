/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StatusBar, Image, StyleSheet, View, FlatList, Text} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import Slider from '../components/Slider';

import {windowWidth, windowHeight} from '../utils';

export default function Dashboard({route, navigation}) {
  return (
    <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.container}>
      <StatusBar animated={true} translucent backgroundColor="#3B3B3B" />
      <FlatList
        ListHeaderComponent={
          <View>
            <View
              style={{
                width: windowWidth * 0.75,
                height: windowWidth * 0.3,
                alignItems: 'center',
                justifyContent: 'center',
                // height: windowHeight * 0.1,
                overflow: 'hidden',
              }}>
              <Image
                style={{
                  width: '100%',
                  height: '100%',
                  resizeMode: 'center',
                }}
                source={require('../assets/icons2/logo.png')}
              />
            </View>
            <Text style={styles.headerTitle}>Anda akan masuk sebagai</Text>
            {/* <Slider data={[{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}]} loop /> */}
          </View>
        }
        ListHeaderComponentStyle={{alignItems: 'center'}}
        data={[
          {
            fn: () => navigation.navigate('GuruNavigator'),
            icon: require('../assets/icons2/teacher.png'),
            title: 'Guru',
          },
          {
            fn: () => navigation.navigate('SiswaNavigator'),
            icon: require('../assets/icons2/students.png'),
            title: 'Siswa / Wali',
          },
          {
            fn: () => navigation.navigate('MesinAbsenNavigator'),
            icon: require('../assets/icons2/rfid.png'),
            title: 'Mesin RFID',
          },
        ]}
        numColumns={3}
        contentContainerStyle={styles.flatlistContainer}
        columnWrapperStyle={{
          flex: 1,
          width: '100%',
          justifyContent: 'space-evenly',
          paddingHorizontal: '10%',
          marginBottom: '3%',
        }}
        renderItem={({item, index}) => (
          <View>
            <View style={styles.defaultItem}>
              <View style={styles.defaultIconWrapper}>
                <Image style={styles.defaultIcon} source={item.icon} />
              </View>
            </View>
            <Text style={styles.defaultBtnTitle}>{item.title}</Text>
            <RectButton style={styles.defaultBtn} onPress={() => item.fn()} />
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
  headerTitle: {
    color: 'black',
    fontSize: windowWidth * 0.038,
    alignSelf: 'center',
    marginBottom: '6%',
    fontFamily: 'OpenSans-Regular',
  },
  flatlistContainer: {
    width: '100%',
    minHeight: windowHeight,
    justifyContent: 'center',
  },
  defaultItem: {
    justifyContent: 'center',
    width: (windowWidth / 3) * 0.7,
    height: (windowWidth / 3) * 0.55,
    borderRadius: windowWidth * 0.02,
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#C9C9C9',
    overflow: 'hidden',
  },
  defaultBtn: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  defaultBtnTitle: {
    color: 'black',
    fontSize: windowWidth * 0.034,
    paddingHorizontal: '3%',
    textAlign: 'center',
    marginTop: '4%',
    fontFamily: 'OpenSans-Regular',
  },
  defaultIconWrapper: {
    width: windowWidth * 0.15,
    height: windowWidth * 0.15,
    marginBottom: '2%',
    elevation: 10,
  },
  defaultIcon: {
    width: '100%',
    height: '100%',
  },
});
