import React, {memo} from 'react';
import {StyleSheet, Text} from 'react-native';

import {windowWidth} from '../../../../utils';

function RenderLabel({route, focused}) {
  return (
    <Text style={focused ? styles.labelFocused : styles.label}>
      {route?.title}
    </Text>
  );
}

export default memo(RenderLabel);

const styles = StyleSheet.create({
  label: {
    color: 'grey',
    fontSize: windowWidth * 0.04,
    fontFamily: 'OpenSans-SemiBold',
  },
  labelFocused: {
    color: 'black',
    fontSize: windowWidth * 0.04,
    fontFamily: 'OpenSans-SemiBold',
  },
});
