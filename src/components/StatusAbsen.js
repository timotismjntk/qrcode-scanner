import React from 'react';
import {
  StyleSheet,
  StatusBar,
  Modal as ReactModal,
  View,
  Text,
  Image,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {windowWidth} from '../utils';

export default function StatusAbsen({
  open = false,
  close = () => {},
  jenis = '',
  status = '',
  qrRef,
  isLoading = false,
}) {
  return (
    <ReactModal
      animationType="fade"
      transparent={true}
      visible={open}
      onRequestClose={close}>
      <StatusBar animated={true} backgroundColor="transparent" translucent />
      <View style={styles.container}>
        <View style={styles.modal}>
          {!isLoading ? (
            <>
              <Text style={styles.modalHeader}>
                {jenis} {status}
              </Text>
              <View style={styles.imageContainer}>
                {status?.length === 0 && (
                  <ActivityIndicator size={windowWidth * 0.16} color="black" />
                )}
                {status === 'berhasil' && (
                  <Image
                    source={require('../assets/icons/berhasil.png')}
                    style={styles.image}
                  />
                )}
                {status === 'gagal' && (
                  <MaterialIcons
                    name="close"
                    size={windowWidth * 0.28}
                    color="black"
                  />
                )}
              </View>
              <Pressable
                style={styles.buttonBack}
                onPress={() => {
                  if (status === 'berhasil') {
                    close();
                  } else {
                    qrRef?.current?.resumePreview();
                    close();
                  }
                }}>
                <Text style={styles.buttonBackLabel}>
                  {status === 'berhasil' ? 'OK' : 'Ulangi'}
                </Text>
              </Pressable>
            </>
          ) : (
            <ActivityIndicator size={windowWidth * 0.16} color="black" />
          )}
        </View>
      </View>
    </ReactModal>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  modal: {
    width: windowWidth * 0.7,
    height: windowWidth * 0.9,
    backgroundColor: '#EAEAEA',
    borderRadius: windowWidth * 0.06,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
  },
  modalHeader: {
    textTransform: 'capitalize',
    color: 'black',
    fontSize: windowWidth * 0.045,
    fontFamily: 'OpenSans-SemiBold',
    marginBottom: '4%',
  },
  imageContainer: {
    width: windowWidth * 0.28,
    height: windowWidth * 0.28,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  buttonBack: {
    paddingVertical: '3%',
    width: '40%',
    alignItems: 'center',
    backgroundColor: '#61A2F9',
    borderRadius: windowWidth * 0.01,
    marginTop: '6%',
  },
  buttonBackLabel: {
    color: 'white',
    fontSize: windowWidth * 0.034,
    fontFamily: 'OpenSans-SemiBold',
  },
});
