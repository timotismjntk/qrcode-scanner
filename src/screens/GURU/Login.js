/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useCallback, useEffect, useRef} from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  Alert,
  View,
  Image,
  BackHandler,
  Linking,
} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {StackActions} from '@react-navigation/native';

import LoadingModal from '../../components/LoadingModal';
import CustomTextInput from '../../components/CustomTextInput';

import {windowWidth, windowHeight} from '../../utils';

import {
  loginGuru,
  clearStateGuru,
  rememberMe,
} from '../../redux/reducer/GURU/auth';

export default function Login({route, navigation}) {
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        if (!navigation.canGoBack()) {
          navigation.dispatch(StackActions.replace('DashboardNavigator'));
          return true;
        }
        return false;
      },
    );
    return () => backHandler.remove();
  }, []);

  const dispatch = useDispatch();
  const passwordRef = useRef(null);
  const userNameRef = useRef(null);
  const {rememberMe: userData = {}} =
    useSelector(state => state.authGuru) || {};
  const [idSekolah, setIdSekolah] = useState(userData?.website_id || '');
  const [username, setUsername] = useState(userData?.username || '');
  const [password, setPassword] = useState(userData?.password || '');
  const [isChecked, setIsChecked] = useState(
    (userData?.username && userData?.password) || false,
  );

  const login = useCallback(() => {
    if (username?.trim()?.length === 0 && password?.trim()?.length === 0) {
      Alert.alert('Gagal', 'NIK & Password wajib diisi', [
        {text: 'OK', onPress: () => dispatch(clearStateGuru())},
      ]);
    } else {
      if (isChecked) {
        dispatch(loginGuru({username, password, website_id: idSekolah}));
      } else {
        dispatch(loginGuru({username, password, website_id: idSekolah}));
        dispatch(
          rememberMe({
            username: '',
            password: '',
            website_id: '',
            isRemember: false,
          }),
        );
      }
    }
  }, [username, password, isChecked, idSekolah]);

  const {authGuru = {}, isLoadingLoginGuru = false} =
    useSelector(state => state.authGuru) || {};

  useEffect(() => {
    if (authGuru?.status === 'gagal') {
      Alert.alert(
        'Gagal',
        authGuru?.pesan?.length > 0
          ? authGuru?.pesan === 'Username atau password wajib diisi'
            ? 'NIK & Password wajib diisi'
            : authGuru?.pesan
          : '',
        [{text: 'OK', onPress: () => dispatch(clearStateGuru())}],
      );
    } else if (authGuru?.status === 'berhasil' && isChecked) {
      dispatch(
        rememberMe({
          username,
          password,
          website_id: idSekolah,
          isRemember: true,
        }),
      );
    }
  }, [authGuru, username, password, isChecked, idSekolah]);

  return (
    <SafeAreaView edges={['bottom', 'right', 'left']} style={styles.container}>
      <StatusBar animated={true} translucent backgroundColor="#3B3B3B" />
      <LoadingModal
        open={isLoadingLoginGuru || false}
        close={() => dispatch(clearStateGuru())}
      />
      <View style={styles.wrapper}>
        <View
          style={{
            width: windowWidth * 0.7,
            height: windowHeight * 0.1,
          }}>
          <Image
            style={{
              width: '100%',
              height: '100%',
              resizeMode: 'center',
            }}
            source={require('../../assets/icons2/logo.png')}
          />
        </View>
        <Text style={styles.headerTitle}>Anda masuk sebagai Guru / Staf</Text>
        <View style={styles.form}>
          <Text style={styles.inputTitle}>ID Sekolah</Text>
          <CustomTextInput
            style={styles.input}
            value={idSekolah}
            keyboardType="numeric"
            maxLength={16}
            setValue={setIdSekolah}
            onSubmitEditing={() => userNameRef?.current?.focus()}
          />
          <Text style={styles.inputTitle}>NIK Guru</Text>
          <CustomTextInput
            style={styles.input}
            value={username}
            inputRef={userNameRef}
            keyboardType="numeric"
            maxLength={16}
            setValue={setUsername}
            onSubmitEditing={() => passwordRef?.current?.focus()}
          />
          <Text style={styles.inputTitle}>Password</Text>
          <CustomTextInput
            style={styles.input}
            value={password}
            inputRef={passwordRef}
            keyboardType="numeric"
            setValue={setPassword}
            onSubmitEditing={login}
          />
          <View style={styles.checkBoxForgotPasswordContainer}>
            <RectButton
              onPress={() => setIsChecked(!isChecked)}
              style={styles.checkbox}>
              <MaterialIcons
                name={isChecked ? 'check-box' : 'check-box-outline-blank'}
                size={windowWidth * 0.07}
                color="grey"
              />
              <Text style={styles.checkboxTitle}>Ingat Saya</Text>
            </RectButton>
            <Text
              onPress={() => navigation.navigate('LupaPasswordGuru')}
              style={styles.lupaPasswordTitle}>
              Lupa Password
            </Text>
          </View>
          <RectButton onPress={login} style={styles.loginButton}>
            <Text style={styles.loginButtonTitle}>Masuk</Text>
          </RectButton>
          <Text
            onPress={() => Linking.openURL('https://sekoolah.id/wa')}
            style={styles.bantuanTitle}>
            Bantuan
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapper: {
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: '3%',
  },
  headerTitle: {
    fontSize: windowWidth * 0.038,
    color: 'black',
    fontFamily: 'OpenSans-Regular',
    marginTop: '3%',
  },
  form: {
    paddingHorizontal: windowWidth * 0.08,
    marginTop: '5%',
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
  checkBoxForgotPasswordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxTitle: {
    color: 'black',
    fontSize: windowWidth * 0.038,
    fontFamily: 'OpenSans-Regular',
    marginLeft: '2%',
  },
  lupaPasswordTitle: {
    color: 'black',
    fontSize: windowWidth * 0.038,
    fontFamily: 'OpenSans-SemiBold',
    marginLeft: '2%',
  },
  loginButton: {
    padding: '3%',
    width: '100%',
    borderRadius: windowWidth * 0.02,
    alignItems: 'center',
    backgroundColor: '#61A2F9',
    elevation: 10,
    marginTop: '6%',
  },
  loginButtonTitle: {
    color: 'white',
    fontSize: windowWidth * 0.04,
    fontFamily: 'OpenSans-SemiBold',
  },
  bantuanTitle: {
    color: 'black',
    fontSize: windowWidth * 0.036,
    fontFamily: 'OpenSans-SemiBold',
    marginLeft: '2%',
    textAlign: 'center',
    marginTop: '5%',
  },
});
