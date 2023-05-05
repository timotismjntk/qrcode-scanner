/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback, useState, useEffect, useMemo} from 'react';
import {FlatList, StatusBar, StyleSheet, Text, View} from 'react-native';
import {
  RectButton,
  FlatList as GestureFlatlist,
} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';

import {windowWidth, windowHeight} from '../../utils';

import {getAgendaSiswa} from '../../redux/reducer/SISWA/agenda';

export default function Agenda({navigation}) {
  const dispatch = useDispatch();
  const {authSiswa = {}} = useSelector(state => state.authSiswa) || {};
  // const [urutkanBerdasarkan, setUrutkanBerdasarkan] = useState('');
  const {agendaSiswa = {}, isLoadingAgendaSiswa = false} =
    useSelector(state => state.agendaSiswa) || {};

  useEffect(() => {
    if (authSiswa?.status === 'berhasil') {
      dispatch(getAgendaSiswa({website_id: authSiswa?.data?.website_id}));
    }
  }, [authSiswa]);

  const memoizedData = useMemo(() => {
    if (Array.isArray(agendaSiswa?.data)) {
      const sortedAgenda = [...agendaSiswa?.data]?.reverse?.();
      return sortedAgenda?.reduce((acc, curr) => {
        const findSame = acc.find(item => item?.tanggal === curr?.tanggal);
        if (findSame) {
          findSame?.subData?.push(curr);
        } else {
          acc.push({
            tanggal: curr?.tanggal,
            subData: [curr],
          });
        }
        return acc;
      }, []);
    } else {
      return [];
    }
  }, [agendaSiswa]);

  const SubItem = useCallback(({data}) => {
    return (
      <GestureFlatlist
        data={data}
        nestedScrollEnabled
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <RectButton style={styles.subItem}>
            <Text style={styles.subItemTitle}>{item.nama_acara}</Text>
            <Text style={styles.subItemContent}>{item.keterangan}</Text>
            <Text style={styles.subItemJam}>{item.jam}</Text>
          </RectButton>
        )}
        contentContainerStyle={styles.subItemContainer}
      />
    );
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar animated={true} translucent backgroundColor="#3B3B3B" />
      <FlatList
        data={memoizedData}
        refreshing={isLoadingAgendaSiswa}
        onRefresh={() => {
          if (authSiswa?.status === 'berhasil') {
            dispatch(getAgendaSiswa({website_id: authSiswa?.data?.website_id}));
          }
        }}
        progressViewOffset={windowHeight * 0.15}
        nestedScrollEnabled
        // ListHeaderComponent={
        //   <View style={styles.wrapper}>
        //     <View style={styles.form}>
        //       <Text style={styles.inputTitle}>Urutkan</Text>
        //       <Dropdown
        //         list={['Baru ke lama', 'Lama ke baru']}
        //         selectedValue={urutkanBerdasarkan}
        //         setValue={setUrutkanBerdasarkan}
        //         placeholder="- Urut Berdasarkan -"
        //       />
        //       <RectButton style={styles.button}>
        //         <Text style={styles.buttonTitle}>Lihat</Text>
        //       </RectButton>
        //     </View>
        //   </View>
        // }
        ListEmptyComponent={
          <Text style={styles.emptyData}>Agenda tidak ditemukan...</Text>
        }
        renderItem={({item}) => (
          <View style={styles.itemContainer}>
            <Text style={styles.tanggal}>{item.tanggal}</Text>
            <SubItem data={item.subData} />
          </View>
        )}
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
  wrapper: {
    alignItems: 'center',
    width: '100%',
    marginBottom: '6%',
  },
  form: {
    width: '100%',
  },
  inputTitle: {
    fontSize: windowWidth * 0.04,
    color: 'black',
    fontFamily: 'OpenSans-SemiBold',
  },
  input: {
    fontSize: windowWidth * 0.045,
    color: 'black',
    width: '100%',
    borderRadius: windowWidth * 0.02,
    marginTop: '3%',
    paddingHorizontal: '3%',
    paddingVertical: '2.5%',
    fontFamily: 'OpenSans-Regular',
    marginBottom: '6%',
    borderWidth: 0.8,
  },
  button: {
    padding: '3%',
    width: '100%',
    borderRadius: windowWidth * 0.02,
    alignItems: 'center',
    backgroundColor: '#61A2F9',
    elevation: 10,
    marginTop: '3%',
  },
  buttonTitle: {
    color: 'white',
    fontSize: windowWidth * 0.04,
    fontFamily: 'OpenSans-SemiBold',
  },
  emptyData: {
    fontSize: windowWidth * 0.034,
    fontFamily: 'OpenSans-Regular',
    color: 'black',
    backgroundColor: 'white',
    padding: '4%',
    borderRadius: windowWidth * 0.01,
  },
  flatlist: {
    padding: '6%',
    minHeight: windowHeight,
    paddingTop: '24%',
  },
  separator: {
    height: '0.2%',
    marginVertical: '2%',
  },
  itemContainer: {
    minHeight: windowWidth * 0.12,
    marginVertical: '2%',
    backgroundColor: '#EAEAEA',
    borderRadius: windowWidth * 0.02,
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'center',
    paddingVertical: '6%',
    paddingBottom: 0,
    elevation: 10,
  },
  tanggal: {
    fontSize: windowWidth * 0.038,
    fontFamily: 'OpenSans-Bold',
    color: 'black',
    paddingHorizontal: '6%',
  },
  subItemContainer: {
    paddingBottom: '6%',
  },
  subItemTitle: {
    fontSize: windowWidth * 0.034,
    fontFamily: 'OpenSans-Bold',
    color: 'black',
    marginBottom: '5%',
  },
  subItem: {
    backgroundColor: 'white',
    padding: '4%',
    paddingTop: '2%',
    borderRadius: windowWidth * 0.02,
    elevation: 10,
    marginTop: '4%',
    width: '88%',
    alignSelf: 'center',
  },
  subItemContent: {
    fontSize: windowWidth * 0.03,
    fontFamily: 'OpenSans-Regular',
    color: 'black',
  },
  subItemJam: {
    fontSize: windowWidth * 0.028,
    fontFamily: 'OpenSans-Regular',
    fontStyle: 'italic',
    marginTop: '3%',
    color: 'black',
  },
});
