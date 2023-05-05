import React from 'react';
import {
  StyleSheet,
  StatusBar,
  Modal as ReactModal,
  View,
  Text,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';
import Lottie from 'lottie-react-native';

import {windowWidth} from '../utils';

export default function LoadingModal({open, close}) {
  return (
    <ReactModal
      animationType="fade"
      transparent={true}
      visible={open}
      onRequestClose={close}>
      <StatusBar animated={true} backgroundColor="transparent" translucent />
      <TouchableWithoutFeedback onPress={close}>
        <View style={styles.container}>
          <View style={styles.modal}>
            {/* <ActivityIndicator
              animating
              size={windowWidth * 0.15}
              color="white"
            /> */}
            <Lottie
              style={{height: windowWidth * 0.6, width: windowWidth * 0.6}}
              source={require('../assets/loader.json')}
              autoPlay
              loop
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
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
    width: '40%',
    height: '20%',
    backgroundColor: '#002663',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
  },
});
