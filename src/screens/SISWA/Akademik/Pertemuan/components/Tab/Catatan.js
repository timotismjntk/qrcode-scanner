import React from 'react';
import {StyleSheet, View} from 'react-native';
import CustomTextInput from '../../../../../../components/CustomTextInput';

import {windowWidth} from '../../../../../../utils';

export default function Catatan({value}) {
  return (
    <View style={styles.container}>
      <CustomTextInput
        style={styles.input}
        value={value}
        editable={false}
        multiline
        autoFocus
        placeholder=""
        placeholderTextColor="grey"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: '4%',
  },
  input: {
    borderWidth: 1,
    borderColor: '#BABABA',
    backgroundColor: 'white',
    borderRadius: windowWidth * 0.015,
    paddingHorizontal: '4%',
    paddingVertical: '2%',
    color: 'black',
    fontSize: windowWidth * 0.034,
  },
});
