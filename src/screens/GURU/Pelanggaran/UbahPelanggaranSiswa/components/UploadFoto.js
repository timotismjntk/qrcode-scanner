import React, {memo, useEffect} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';

// import hooks
import useUploadFoto from '../hooks/useUploadFoto';

import {windowWidth} from '../../../../../utils';

function UploadFoto({fotoPelanggaran, authGuru, onResultImage}) {
  const {urlFile, uploader, deleteFoto} = useUploadFoto();

  useEffect(() => {
    if (urlFile?.length > 0) {
      onResultImage(urlFile);
    }
  }, [onResultImage, urlFile]);

  return (
    <View style={styles.container}>
      {urlFile?.length === 0 && fotoPelanggaran?.length === 0 ? (
        <RectButton
          onPress={() => uploader(authGuru)}
          style={styles.ambilFotoButton}>
          <View style={styles.iconWrapper}>
            <Image
              style={styles.icon}
              source={require('../../../../../assets/icons2/camera.png')}
            />
          </View>
          <Text style={styles.ambilFotoLabel}>Ambil Foto</Text>
        </RectButton>
      ) : (
        <View style={styles.imageContainer}>
          <View style={styles.imageResultWrapper}>
            <Image
              style={styles.imageResult}
              source={{uri: urlFile || fotoPelanggaran}}
            />
          </View>
          <RectButton onPress={deleteFoto} style={styles.hapusButton}>
            <Text style={styles.hapusButtonLabel}>Hapus</Text>
          </RectButton>
        </View>
      )}
    </View>
  );
}

export default memo(UploadFoto);

const styles = StyleSheet.create({
  ambilFotoButton: {
    width: '100%',
    borderRadius: windowWidth * 0.02,
    marginTop: '3%',
    paddingHorizontal: '3%',
    paddingVertical: '2.5%',
    marginBottom: '6%',
    backgroundColor: '#E36D00',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  ambilFotoLabel: {
    fontSize: windowWidth * 0.038,
    color: 'white',
    fontFamily: 'OpenSans-Bold',
  },
  iconWrapper: {
    width: windowWidth * 0.06,
    height: windowWidth * 0.06,
    marginRight: '3%',
  },
  icon: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageResultWrapper: {
    width: windowWidth * 0.2,
    height: windowWidth * 0.2,
    marginTop: '2%',
    marginLeft: '3%',
    marginBottom: '4%',
  },
  imageResult: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  hapusButton: {
    paddingHorizontal: '2%',
    paddingVertical: '2%',
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginLeft: '3%',
  },
  hapusButtonLabel: {
    fontSize: windowWidth * 0.032,
    color: 'white',
  },
});
