import React, {memo, useEffect} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// import hooks
import useUploadFoto from '../hooks/useUploadFoto';

import {windowWidth} from '../../../../../utils';

function UploadFoto({authGuru, onResultImage}) {
  const {urlFile, ambilGambar, pilihBerkas, deleteFoto} = useUploadFoto();

  useEffect(() => {
    if (urlFile?.length > 0) {
      onResultImage(urlFile);
    }
  }, [onResultImage, urlFile]);

  return (
    <View style={styles.container}>
      {urlFile?.length === 0 ? (
        <View style={styles.buttonWrapper}>
          <RectButton
            onPress={() => ambilGambar(authGuru)}
            style={styles.ambilFotoButton}>
            <View style={styles.iconWrapper}>
              <Image
                style={styles.icon}
                source={require('../../../../../assets/icons2/camera.png')}
              />
            </View>
            <Text style={styles.ambilFotoLabel}>Ambil Foto</Text>
          </RectButton>
          <RectButton
            onPress={() => pilihBerkas(authGuru)}
            style={styles.pilihBerkasButton}>
            <MaterialIcons
              name="attach-file"
              size={windowWidth * 0.065}
              color="white"
            />
            <Text style={styles.ambilFotoLabel}>Pilih Berkas</Text>
          </RectButton>
        </View>
      ) : (
        <View style={styles.imageContainer}>
          <View style={styles.imageResultWrapper}>
            <Image style={styles.imageResult} source={{uri: urlFile}} />
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
  buttonWrapper: {
    flexDirection: 'row',
  },
  ambilFotoButton: {
    borderRadius: windowWidth * 0.02,
    marginTop: '3%',
    marginRight: '2%',
    paddingHorizontal: '3%',
    paddingVertical: '2.5%',
    marginBottom: '2%',
    backgroundColor: '#E36D00',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  pilihBerkasButton: {
    borderRadius: windowWidth * 0.02,
    marginTop: '3%',
    marginRight: '2%',
    paddingHorizontal: '3%',
    paddingVertical: '2.5%',
    marginBottom: '2%',
    backgroundColor: '#0099e5',
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
