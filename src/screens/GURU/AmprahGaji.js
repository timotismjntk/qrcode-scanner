/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  TextInput,
  Text,
  View,
} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import Dropdown from '../../components/DropDown';

import {windowWidth, windowHeight} from '../../utils';

export default function AmprahGaji() {
  const [tahun, setTahun] = useState('');
  const [bulan, setBulan] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar animated={true} translucent backgroundColor="#3B3B3B" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.wrapper}>
          <View style={styles.form}>
            <Text style={styles.inputTitle}>Pilih Tahun</Text>
            <Dropdown
              type="year"
              selectedValue={tahun}
              setValue={setTahun}
              placeholder="- Pilih Tahun -"
            />
            <Text style={styles.inputTitle}>Pilih Bulan</Text>
            <Dropdown
              type="month"
              selectedValue={bulan}
              setValue={setBulan}
              placeholder="- Pilih Bulan -"
            />
            <RectButton style={styles.button}>
              <Text style={styles.buttonTitle}>Lihat</Text>
            </RectButton>
          </View>

          <View style={[styles.form, {marginTop: '8%'}]}>
            <Text style={styles.inputTitle}>Nama</Text>
            <TextInput
              style={styles.input}
              editable={false}
              value="Adam Kurniawan Margolang, S.Pd"
            />
            <Text style={styles.inputTitle}>Jabatan</Text>
            <TextInput
              style={styles.input}
              editable={false}
              value="Kepala Sekolah"
            />
            <Text style={styles.inputTitle}>Honor Per Jam (Rp)</Text>
            <TextInput style={styles.input} editable={false} value="45.000" />
            <Text style={styles.inputTitle}>Jumlah Jam</Text>
            <TextInput style={styles.input} editable={false} value="12" />
            <Text style={styles.inputTitle}>Honor Mengajar (Rp)</Text>
            <TextInput style={styles.input} editable={false} value="540.000" />
            <Text style={styles.inputTitle}>Tambahan Penghasilan</Text>
            <TextInput
              style={styles.input}
              editable={false}
              multiline
              value={'750.000\n• 700000 (Kepala Sekolah)\n• 50000 (Beras)'}
            />
            <Text style={styles.inputTitle}>Pajak (5%)</Text>
            <TextInput style={styles.input} editable={false} value="64.500" />
            <Text style={styles.inputTitle}>Total Gaji Bersih</Text>
            <TextInput
              style={styles.input}
              editable={false}
              value="1.225.500"
            />
          </View>
        </View>
      </ScrollView>
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
    paddingHorizontal: windowWidth * 0.08,
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
    marginTop: '6%',
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
  scrollContainer: {
    padding: '4%',
    paddingVertical: '7%',
    minHeight: windowHeight,
    paddingTop: '25%',
  },
});
