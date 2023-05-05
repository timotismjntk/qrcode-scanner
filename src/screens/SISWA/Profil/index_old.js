/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect, useCallback} from 'react';
import {
  ScrollView,
  StyleSheet,
  StatusBar,
  Text,
  View,
  Image,
  Alert,
} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import CustomTextInput from '../../components/CustomTextInput';
import LoadingModal from '../../components/LoadingModal';

import {windowWidth, windowHeight} from '../../utils';

import {
  updateProfilSayaRedux,
  clearUpdateProfilSaya,
} from '../../redux/reducer/SISWA/profilSaya';

export default function Profil() {
  const dispatch = useDispatch();
  const {
    profilSaya = {},
    updateProfilSaya = {},
    isLoadingUpdateProfilSaya = false,
  } = useSelector(state => state.profilSayaSiswa) || {};
  const {
    nama = '',
    username = '',
    siswa = {},
    jenis_kelamin = '',
    alamat = '-',
    nomor_wa = '-',
    foto_profil = '',
    agama = '-',
    user_id = '',
  } = profilSaya?.data || {};
  const {nisn = '', nama_ayah = '', nama_ibu = ''} = siswa || {};

  const [whatsappNumber, setWhatsappNumber] = useState(nomor_wa);
  const [whatsappNumberOnFocus, setWhatsappNumberOnFocus] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordOnFocus, setPasswordOnFocus] = useState(false);

  const updateProfilFn = useCallback(() => {
    dispatch(
      updateProfilSayaRedux({user_id, nomor_wa: whatsappNumber, password}),
    );
  }, [password, user_id, whatsappNumber]);

  const isFilled = useCallback(() => {
    return (
      password.length > 5 && password !== '123456' && whatsappNumber?.length > 9
    );
  }, [password, whatsappNumber]);

  useEffect(() => {
    if (updateProfilSaya?.status?.length > 0) {
      Alert.alert(
        updateProfilSaya?.status === 'berhasil' ? 'Sukses' : 'Gagal',
        updateProfilSaya?.pesan || '',
        [
          {
            text: 'OK',
            onPress: () => {
              dispatch(clearUpdateProfilSaya());
            },
          },
        ],
      );
    }
  }, [updateProfilSaya]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar animated={true} translucent backgroundColor="#3B3B3B" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <LoadingModal open={isLoadingUpdateProfilSaya} close={() => null} />
        <View style={styles.fotoProfilWrapper}>
          {foto_profil ? (
            <Image source={{uri: foto_profil}} style={styles.profilPicture} />
          ) : (
            <MaterialIcons
              name="person"
              size={windowWidth * 0.14}
              color="#BDBDBD"
            />
          )}
        </View>
        <View style={styles.form}>
          <Text style={styles.inputTitle}>Nama Siswa</Text>
          <CustomTextInput
            value={nama}
            style={styles.disabledInput}
            editable={false}
          />
          <Text style={styles.inputTitle}>NIK</Text>
          <CustomTextInput
            value={username}
            style={styles.disabledInput}
            editable={false}
          />
          <Text style={styles.inputTitle}>NISN</Text>
          <CustomTextInput
            value={nisn}
            style={styles.disabledInput}
            editable={false}
          />
          <Text style={styles.inputTitle}>Jenis Kelamin</Text>
          <CustomTextInput
            value={jenis_kelamin}
            style={styles.disabledInput}
            editable={false}
          />
          <Text style={styles.inputTitle}>Nama Ayah</Text>
          <CustomTextInput
            value={nama_ayah}
            style={styles.disabledInput}
            editable={false}
          />
          <Text style={styles.inputTitle}>Nama Ibu</Text>
          <CustomTextInput
            value={nama_ibu}
            style={styles.disabledInput}
            editable={false}
          />
          <Text style={styles.inputTitle}>Agama</Text>
          <CustomTextInput
            value={agama}
            style={styles.disabledInput}
            editable={false}
          />
          <Text style={styles.inputTitle}>Alamat</Text>
          <CustomTextInput
            multiline
            value={alamat}
            editable={false}
            style={styles.disabledInput}
          />
          <Text style={styles.inputTitle}>Nomor Whatsapp</Text>
          <CustomTextInput
            value={whatsappNumber}
            keyboardType="numeric"
            setValue={setWhatsappNumber}
            onFocus={() => {
              setWhatsappNumberOnFocus(true);
            }}
            onBlur={() => {
              setWhatsappNumberOnFocus(false);
            }}
            style={
              whatsappNumber?.length < 10
                ? styles.errorInput
                : whatsappNumberOnFocus
                ? styles.inputFocus
                : styles.input
            }
          />
          {whatsappNumber?.length < 10 && (
            <Text style={styles.error}>* Minimal 11 digit angka</Text>
          )}
          <Text style={styles.inputTitle}>Ubah Password</Text>
          <CustomTextInput
            value={password}
            keyboardType="numeric"
            setValue={setPassword}
            onFocus={() => {
              setPasswordOnFocus(true);
            }}
            onBlur={() => {
              setPasswordOnFocus(false);
            }}
            style={
              password === '123456' || password.length < 6
                ? styles.errorInput
                : passwordOnFocus
                ? styles.inputFocus
                : styles.input
            }
          />
          {password === '123456' && (
            <Text style={styles.error}>* Password terlalu mudah ditebak</Text>
          )}
          {password.length < 6 && (
            <Text style={styles.error}>Minimal 6 digit angka</Text>
          )}
          <RectButton
            enabled={isFilled()}
            onPress={updateProfilFn}
            style={!isFilled() ? styles.disabledSaveButton : styles.saveButton}>
            <Text style={styles.saveButtonTitle}>Simpan</Text>
          </RectButton>
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
  scrollContainer: {
    minHeight: windowHeight,
    paddingHorizontal: '3%',
    paddingTop: '25%',
    paddingBottom: '15%',
  },
  fotoProfilWrapper: {
    width: windowWidth * 0.28,
    height: windowWidth * 0.28,
    borderRadius: (windowWidth * 0.28) / 2,
    backgroundColor: 'white',
    borderWidth: 0.5,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  profilPicture: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  form: {
    paddingHorizontal: '8%',
    marginTop: '5%',
    width: '100%',
  },
  inputTitle: {
    fontSize: windowWidth * 0.04,
    color: 'black',
    fontFamily: 'OpenSans-SemiBold',
  },
  input: {
    fontSize: windowWidth * 0.04,
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
  inputFocus: {
    fontSize: windowWidth * 0.04,
    color: 'black',
    width: '100%',
    borderRadius: windowWidth * 0.02,
    marginTop: '3%',
    paddingHorizontal: '3%',
    paddingVertical: '2.5%',
    fontFamily: 'OpenSans-Regular',
    marginBottom: '6%',
    borderWidth: 1,
    borderColor: '#0099e5',
  },
  disabledInput: {
    fontSize: windowWidth * 0.04,
    color: 'black',
    width: '100%',
    borderRadius: windowWidth * 0.02,
    marginTop: '3%',
    paddingHorizontal: '3%',
    paddingVertical: '2.5%',
    fontFamily: 'OpenSans-Regular',
    marginBottom: '6%',
    borderWidth: 0.8,
    backgroundColor: '#F5F5F5',
  },
  errorInput: {
    fontSize: windowWidth * 0.04,
    color: 'red',
    width: '100%',
    borderRadius: windowWidth * 0.02,
    marginTop: '3%',
    paddingHorizontal: '3%',
    paddingVertical: '2.5%',
    fontFamily: 'OpenSans-Regular',
    marginBottom: '6%',
    borderWidth: 0.8,
    borderColor: 'red',
  },
  saveButton: {
    padding: '3%',
    width: '100%',
    borderRadius: windowWidth * 0.02,
    alignItems: 'center',
    backgroundColor: '#61A2F9',
    elevation: 10,
    marginTop: '6%',
  },
  disabledSaveButton: {
    padding: '3%',
    width: '100%',
    borderRadius: windowWidth * 0.02,
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    marginTop: '6%',
  },
  saveButtonTitle: {
    color: 'white',
    fontSize: windowWidth * 0.04,
    fontFamily: 'OpenSans-SemiBold',
  },
  required: {
    color: 'black',
    fontStyle: 'italic',
    marginTop: '-4%',
    marginBottom: '2%',
    fontSize: windowWidth * 0.034,
  },
  error: {
    fontStyle: 'italic',
    color: 'red',
    marginTop: '-4%',
    marginBottom: '2%',
    fontSize: windowWidth * 0.034,
  },
});
