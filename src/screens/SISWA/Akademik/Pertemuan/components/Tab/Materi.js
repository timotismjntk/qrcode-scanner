import React, {useCallback} from 'react';
import {StyleSheet, FlatList, Text, View} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';

import {windowWidth, downloadFile} from '../../../../../../utils';

export default function Materi({
  data,
  mataPelajaran,
  matapelajaran_id,
  pengajar,
  pengajar_sdm_id,
  onChange,
}) {
  const getNamaMataPelajaran = useCallback(() => {
    const {nama_matapelajaran} =
      mataPelajaran?.find(
        item => item?.matapelajaran_id === matapelajaran_id,
      ) || {};
    return nama_matapelajaran || '';
  }, [mataPelajaran, matapelajaran_id]);

  const getNamaPengajar = useCallback(() => {
    const {nama} =
      pengajar?.find(item => item?.sdm_id === pengajar_sdm_id) || {};
    return nama || '';
  }, [pengajar, pengajar_sdm_id]);

  return (
    <FlatList
      data={data}
      renderItem={({item, index}) => (
        <RectButton
          onPress={() =>
            downloadFile(item?.url || '', item?.originalName || '')
          }
          style={styles.item}>
          <View style={styles.itemWrapper}>
            <Text style={styles.nama_file}>{item?.originalName || ''}</Text>
            <Text style={styles.pelajaran}>
              Pelajaran: {getNamaMataPelajaran()}
            </Text>
            <Text style={styles.pengajar}>Pengajar: {getNamaPengajar()}</Text>
          </View>
        </RectButton>
      )}
      ListEmptyComponent={
        <Text style={styles.noMateri}>Belum ada materi.</Text>
      }
      contentContainerStyle={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: '4%',
    paddingVertical: '5%',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '3%',
    paddingHorizontal: '5%',
    backgroundColor: 'white',
    elevation: 5,
    borderRadius: windowWidth * 0.01,
    marginBottom: '5%',
  },
  itemWrapper: {
    flex: 1,
    paddingRight: '3%',
  },
  nama_file: {
    color: 'black',
    fontSize: windowWidth * 0.042,
    fontWeight: 'bold',
  },
  pelajaran: {
    color: 'black',
    fontSize: windowWidth * 0.032,
  },
  pengajar: {
    color: 'black',
    fontSize: windowWidth * 0.032,
  },
  pertemuan_ke: {
    color: 'black',
    fontSize: windowWidth * 0.032,
  },
  hari: {
    color: 'black',
    fontSize: windowWidth * 0.032,
  },
  itemIconContainer: {
    justifyContent: 'space-between',
  },
  iconDownload: {
    backgroundColor: '#009A0F',
    width: windowWidth * 0.06,
    height: windowWidth * 0.06,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: windowWidth * 0.014,
    elevation: 5,
  },
  iconDelete: {
    backgroundColor: '#C60000',
    width: windowWidth * 0.06,
    height: windowWidth * 0.06,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: windowWidth * 0.014,
    elevation: 5,
  },
  noMateri: {
    fontSize: windowWidth * 0.034,
    color: 'black',
  },
  buttonUploadLabel: {
    color: 'white',
    fontSize: windowWidth * 0.036,
    fontFamily: 'OpenSans-SemiBold',
  },
  buttonUpload: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    padding: '2%',
    width: '100%',
    alignSelf: 'center',
    borderRadius: windowWidth * 0.02,
    backgroundColor: '#E36D00',
    elevation: 10,
    marginTop: '8%',
  },
});
