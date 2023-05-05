import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';

import {windowWidth} from './../../../../../utils';

export default function Checkbox({checked = false, onChange}) {
  return (
    <Pressable onPress={onChange} style={styles.outter}>
      <View style={checked ? styles.innerChecked : styles.innerUnChecked} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  outter: {
    width: windowWidth * 0.05,
    height: windowWidth * 0.05,
    borderColor: '#AAAAAA',
    borderWidth: 1,
    borderRadius: windowWidth * 0.05,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerChecked: {
    borderRadius: windowWidth * 0.05 * 2,
    width: windowWidth * 0.038,
    height: windowWidth * 0.038,
    backgroundColor: '#009A0F',
  },
  innerUnChecked: {
    borderRadius: windowWidth * 0.05,
    width: windowWidth * 0.038,
    height: windowWidth * 0.038,
  },
});
