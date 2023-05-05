import React, {memo} from 'react';
import {
  StyleSheet,
  StatusBar,
  Modal as ReactModal,
  View,
  Text,
} from 'react-native';
import Lottie from 'lottie-react-native';

import {windowWidth} from '../utils';

function SuccessModal({open, text = ''}) {
  return (
    <ReactModal animationType="fade" transparent={true} visible={open}>
      <StatusBar animated={true} backgroundColor="white" translucent />
      <View style={styles.container}>
        <Lottie
          style={{height: windowWidth * 0.9, width: windowWidth * 0.9}}
          source={require('../assets/success.json')}
          autoPlay
          loop={false}
          speed={1}
        />
        {text?.length > 0 && <Text style={styles.text}>{text}</Text>}
      </View>
    </ReactModal>
  );
}

export default memo(SuccessModal);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: 'white',
  },
  modal: {
    width: '40%',
    height: '20%',
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
  },
  text: {
    color: 'black',
    fontSize: windowWidth * 0.045,
    fontFamily: 'OpenSans-Regular',
    marginTop: '2%',
  },
});
