import React, {memo} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';

import {windowWidth} from '../../../../utils';

function SamakanDataWaliDenganAyahAtauIbu({samakanDenganAyahAtauIbu}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Samakan data dengan</Text>
      <View style={styles.buttonContainer}>
        <Pressable
          onPress={() => samakanDenganAyahAtauIbu('Ayah Kandung')}
          android_ripple={{color: '#03a9f3'}}
          style={styles.button}>
          <Text style={styles.buttonLabel}>Sama Dengan Ayah</Text>
        </Pressable>
        <Pressable
          onPress={() => samakanDenganAyahAtauIbu('Ibu Kandung')}
          android_ripple={{color: '#03a9f3'}}
          style={styles.button}>
          <Text style={styles.buttonLabel}>Sama Dengan Ibu</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default memo(SamakanDataWaliDenganAyahAtauIbu);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: '6%',
  },
  title: {
    color: 'black',
    fontSize: windowWidth * 0.04,
    fontFamily: 'OpenSans-SemiBold',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: '3%',
  },
  button: {
    paddingHorizontal: '2%',
    paddingVertical: '1.5%',
    borderWidth: 1.2,
    borderRadius: windowWidth * 0.01,
    borderColor: '#03a9f3',
    marginRight: '2%',
  },
  buttonLabel: {
    color: '#03a9f3',
    fontSize: windowWidth * 0.034,
    fontFamily: 'OpenSans-Regular',
  },
});
