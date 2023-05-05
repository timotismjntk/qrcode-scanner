import React, {useState} from 'react';
import {FlatList, StatusBar, StyleSheet, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

// import components
import Item from './components/Item';
import Header from './components/Header';

// hooks
import useGetRiwayatPembayaranSPPSaya from './hooks/useGetRiwayatPembayaranSPPSaya';

// utils
import {windowWidth, windowHeight} from '@src/utils';

export default function Index({navigation, route}) {
  const [tahun, setTahun] = useState('');
  const {
    getRiwayatPembayaranSPPSaya,
    saya,
    totalSudahDibayar,
    listRiwayatPembayaranSPPSaya,
    isLoadingRiwayatPembayaranSPPSaya,
  } = useGetRiwayatPembayaranSPPSaya({
    tahun,
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar animated={true} translucent backgroundColor="#3B3B3B" />
      <FlatList
        data={listRiwayatPembayaranSPPSaya}
        refreshing={isLoadingRiwayatPembayaranSPPSaya}
        onRefresh={getRiwayatPembayaranSPPSaya}
        progressViewOffset={windowHeight * 0.15}
        ListEmptyComponent={
          <Text style={styles.emptyData}>Riwayat tidak ditemukan...</Text>
        }
        ListHeaderComponent={
          <Header
            nama_siswa={saya?.nama || route?.params?.nama}
            url_foto={saya?.url_foto}
            tahun={tahun}
            totalSudahDibayar={totalSudahDibayar}
            setTahun={setTahun}
          />
        }
        renderItem={itemProps => <Item {...itemProps} />}
        contentContainerStyle={styles.flatlist}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  emptyData: {
    fontSize: windowWidth * 0.034,
    fontFamily: 'OpenSans-Regular',
    color: 'black',
    backgroundColor: 'white',
    paddingHorizontal: '6%',
    borderRadius: windowWidth * 0.01,
    marginTop: '4%',
  },
  flatlist: {
    paddingVertical: '7%',
    paddingTop: '28%',
    minHeight: windowHeight,
  },
});
