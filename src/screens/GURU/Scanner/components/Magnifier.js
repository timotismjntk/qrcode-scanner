import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import Slider from '@react-native-community/slider';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {windowWidth, windowHeight} from '../../../../utils';

function Magnifier({setZoom}) {
  return (
    <View style={styles.container}>
      <MaterialIcons name="zoom-out" size={windowWidth * 0.07} color="white" />
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={1}
        onValueChange={setZoom}
        minimumTrackTintColor="#0099e5"
        maximumTrackTintColor="rgba(0, 153, 229, 0.6)"
      />
      <MaterialIcons name="zoom-in" size={windowWidth * 0.07} color="white" />
    </View>
  );
}

export default memo(Magnifier);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: windowHeight * 0.09,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  slider: {
    width: windowWidth * 0.7,
  },
});
