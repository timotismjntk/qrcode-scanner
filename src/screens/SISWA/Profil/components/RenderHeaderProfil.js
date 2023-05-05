import React, {memo} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {Blurhash} from 'react-native-blurhash';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {windowWidth, windowHeight} from '../../../../utils';

// hooks
import useCreateBlurhash from '../hooks/useCreateBlurhash';

function RenderHeaderProfil({url_foto, isHeaderSticked}) {
  const {blurhasResult} = useCreateBlurhash(url_foto);

  return (
    <View style={styles.container}>
      <Blurhash
        blurhash={blurhasResult}
        decodeWidth={32}
        decodeHeight={32}
        decodePunch={1}
        style={styles.blurhash}
        decodeAsync
      />
      <View
        style={{...styles.imageContainer, opacity: isHeaderSticked ? 0 : 1}}>
        {url_foto ? (
          <Image source={{uri: url_foto}} style={styles.profilPicture} />
        ) : (
          <MaterialIcons
            name="person"
            size={windowWidth * 0.14}
            color="#BDBDBD"
          />
        )}
      </View>
    </View>
  );
}

export default memo(RenderHeaderProfil);

const styles = StyleSheet.create({
  container: {
    paddingVertical: '5%',
    marginTop: '-10%',
    paddingTop: '15%',
    overflow: 'hidden',
  },
  blurhash: {
    position: 'absolute',
    width: '100%',
    height: windowHeight * 0.3,
  },
  imageContainer: {
    width: windowWidth * 0.28,
    height: windowWidth * 0.28,
    borderRadius: (windowWidth * 0.28) / 2,
    backgroundColor: 'white',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  profilPicture: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});
