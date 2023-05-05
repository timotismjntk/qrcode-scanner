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
} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {StackActions} from '@react-navigation/native';

import LoadingModal from '../../components/LoadingModal';
import CustomTextInput from '../../components/CustomTextInput';

import {windowWidth, windowHeight} from '../../utils';

import {lupaPassword, clearLupaPassword} from '../../redux/reducer/GURU/auth';

export default function LupaPassword({route, navigation}) {
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
  const [username, setUsername] = useState('');

  const resetPassword = useCallback(() => {
    dispatch(lupaPassword({username}));
  }, [username]);

  const {lupaPassword: lupaPasswordData = {}, isLoadingLupaPassword = false} =
    useSelector(state => state.authGuru) || {};

  useEffect(() => {
    if (lupaPasswordData?.status === 'gagal') {
      Alert.alert('Gagal', lupaPasswordData.pesan || '', [
        {text: 'OK', onPress: () => dispatch(clearLupaPassword())},
      ]);
    } else if (lupaPasswordData?.status === 'berhasil') {
      Alert.alert('Sukses', lupaPasswordData.pesan || '', [
        {text: 'OK', onPress: () => dispatch(clearLupaPassword())},
      ]);
    }
  }, [lupaPasswordData, username]);

  return (
    <SafeAreaView edges={['bottom', 'right', 'left']} style={styles.container}>
      <StatusBar animated={true} translucent backgroundColor="#3B3B3B" />
      <LoadingModal
        open={isLoadingLupaPassword || false}
        close={() => dispatch(clearLupaPassword())}
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
            source={require('../../assets/logo.png')}
          />
        </View>
        <Text style={styles.headerTitle}>Reset Password</Text>
        <View style={styles.form}>
          <Text style={styles.inputTitle}>NIK Guru</Text>
          <CustomTextInput
            style={styles.input}
            value={username}
            keyboardType="numeric"
            maxLength={17}
            autoFocus
            setValue={setUsername}
            onSubmitEditing={() => passwordRef?.current?.focus()}
          />
          <RectButton onPress={resetPassword} style={styles.loginButton}>
            <Text style={styles.loginButtonTitle}>Submit</Text>
          </RectButton>
          <Text style={styles.bantuanTitle}>Bantuan</Text>
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
