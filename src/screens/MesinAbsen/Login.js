/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useCallback, useEffect} from 'react';
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

import {windowWidth, windowHeight} from '../../utils';

import {loginMesin, clearStateMesin} from '../../redux/reducer/MESIN/auth';
import CustomTextInput from '../../components/CustomTextInput';

export default function Login({navigation}) {
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
  const [accessCode, setAccesCode] = useState('');

  const login = useCallback(() => {
    dispatch(loginMesin(accessCode));
  }, [accessCode]);

  const {authMesin = {}, isLoadingLoginMesin = false} =
    useSelector(state => state.authMesin) || {};

  useEffect(() => {
    if (authMesin?.status === 'gagal') {
      Alert.alert('Gagal', authMesin.pesan || '', [
        {text: 'OK', onPress: () => dispatch(clearStateMesin())},
      ]);
    }
  }, [authMesin]);

  return (
    <SafeAreaView edges={['bottom', 'right', 'left']} style={styles.container}>
      <StatusBar
        animated={true}
        translucent
        backgroundColor="rgb(247,247,247)"
      />
      <LoadingModal
        open={isLoadingLoginMesin || false}
        close={() => dispatch(clearStateMesin())}
      />
      <View style={styles.wrapper}>
        <View
          style={{
            width: windowWidth * 0.8,
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
        <View style={styles.form}>
          <Text style={styles.inputTitle}>Kode Akses</Text>
          <CustomTextInput
            autoFocus
            keyboardType="numeric"
            style={styles.input}
            // placeholder="Masukkan Kode Akses"
            value={accessCode}
            setValue={setAccesCode}
            onSubmitEditing={login}
          />
          <RectButton onPress={login} style={styles.loginButton}>
            <Text style={styles.loginButtonTitle}>Masuk</Text>
          </RectButton>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(247,247,247)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapper: {
    alignItems: 'center',
    width: '100%',
  },
  form: {
    paddingHorizontal: windowWidth * 0.08,
    alignItems: 'center',
    marginTop: '5%',
    width: '100%',
  },
  inputTitle: {
    fontSize: windowWidth * 0.04,
    color: 'rgba(0,0,0,0.5)',
    fontFamily: 'OpenSans-Bold',
  },
  input: {
    fontSize: windowWidth * 0.045,
    color: 'black',
    backgroundColor: 'rgba(0,0,0,0.1)',
    width: '100%',
    borderRadius: windowWidth * 0.02,
    textAlign: 'center',
    marginTop: '3%',
    fontFamily: 'OpenSans-Regular',
    marginBottom: '6%',
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
});
