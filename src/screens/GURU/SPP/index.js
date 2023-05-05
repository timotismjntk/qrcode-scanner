import React, {useState} from 'react';
import {FlatList, StatusBar, StyleSheet, Text, View} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';

// import components
import Dropdown from '@src/components/DropDown';
import Item from './components/Item';

// hooks
import useGetTahunAjaran from './hooks/useGetTahunAjaran';
import useGetKelas from './hooks/useGetKelas';
import useGetAllSPPSiswaPerbulan from './hooks/useGetAllSPPSiswaPerbulan';

// utils
import {windowWidth, windowHeight} from '@src/utils/index';

export default function Index({navigation}) {
  const [selectedBulan, setSelectedBulan] = useState('');
  const {
    tahunAjaranSelected,
    setTahunAjaranSelected,
    tahunAjaranList,
    getTahunAjaranSelectedId,
  } = useGetTahunAjaran();
  const {kelasList, kelasSelected, setKelasSelected, getKelasSelectedId} =
    useGetKelas({tahunajaran_id: getTahunAjaranSelectedId});
  const {
    getAllSPPSiswaPerbulan,
    listSPPSiswaPerbulan,
    isLoadingAllSPPSiswaPerbulan,
  } = useGetAllSPPSiswaPerbulan({
    tahunajaran_id: getTahunAjaranSelectedId,
    kelas_id: getKelasSelectedId,
    bulan: selectedBulan,
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar animated={true} translucent backgroundColor="#3B3B3B" />
      <FlatList
        data={listSPPSiswaPerbulan}
        refreshing={isLoadingAllSPPSiswaPerbulan}
        onRefresh={getAllSPPSiswaPerbulan}
        progressViewOffset={windowHeight * 0.15}
        ListHeaderComponent={
          <View style={styles.wrapper}>
            <View style={styles.form}>
              <Text style={styles.inputTitle}>Tahun Ajaran</Text>
              <Dropdown
                list={tahunAjaranList}
                selectedValue={tahunAjaranSelected}
                setValue={setTahunAjaranSelected}
                placeholder="- Pilih Tahun -"
              />
              <Text style={styles.inputTitle}>Kelas</Text>
              <Dropdown
                list={kelasList}
                selectedValue={kelasSelected}
                setValue={setKelasSelected}
                placeholder="- Pilih Kelas -"
              />
              <Text style={styles.inputTitle}>Bulan</Text>
              <Dropdown
                type="dateMonth"
                selectedDate={selectedBulan}
                controlledDate={false}
                setSelectedDate={setSelectedBulan}
                placeholder="- Pilih Bulan -"
              />
              <RectButton
                style={
                  tahunAjaranSelected && kelasSelected && selectedBulan
                    ? styles.button
                    : styles.disabledButton
                }
                enabled={Boolean(
                  tahunAjaranSelected && kelasSelected && selectedBulan,
                )}
                onPress={getAllSPPSiswaPerbulan}>
                <Text style={styles.buttonTitle}>Tampilkan</Text>
              </RectButton>
            </View>
          </View>
        }
        ListEmptyComponent={
          <Text style={styles.emptyData}>Data SPP/Iuran Komite kosong...</Text>
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
  wrapper: {
    alignItems: 'center',
    width: '100%',
    marginBottom: '6%',
  },
  form: {
    paddingHorizontal: windowWidth * 0.01,
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
  disabledButton: {
    padding: '3%',
    width: '100%',
    borderRadius: windowWidth * 0.02,
    alignItems: 'center',
    backgroundColor: 'grey',
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
    paddingHorizontal: windowWidth * 0.08,
    borderRadius: windowWidth * 0.01,
  },
  flatlist: {
    padding: '7%',
    paddingVertical: '7%',
    minHeight: windowHeight,
    paddingTop: '25%',
  },
});
