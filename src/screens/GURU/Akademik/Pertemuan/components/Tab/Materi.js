import React, {useCallback, useState} from 'react';
import {StyleSheet, FlatList, Text, View, Linking, Alert} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DocumentPicker from 'react-native-document-picker';
import {useSelector} from 'react-redux';

import {windowWidth, downloadFile} from '../../../../../../utils';
import {hapusMateriUrl, uploadUrl} from '../../../../../../helpers/http';

export default function Materi({
  data,
  mataPelajaran,
  matapelajaran_id,
  pengajar,
  pengajar_sdm_id,
  onChange,
}) {
  const {authGuru = {}} = useSelector(state => state.authGuru) || {};

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

  const openFolder = useCallback(async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      if (res) {
        const formData = new FormData();
        const src = `${authGuru?.data?.website_id}-${
          authGuru?.data?.nama_website || ''
        }/materi-pertemuan/${authGuru?.data?.user_id || ''}-${
          authGuru?.data?.nama || ''
        }`;
        if (res?.length > 0) {
          formData.append('berkas', res[0]);
        } else {
          formData.append('berkas', {
            name: res.name,
            uri: res.uri,
            size: res.size,
            type: res.type,
          });
        }
        formData.append('src', src);
        formData.append('token', authGuru?.data?.token || '');
        const xhr = new XMLHttpRequest();
        xhr.addEventListener('loadend', () => {
          const response = xhr.response ? JSON.parse(xhr.response) : {};
          if (
            response?.status === 'berhasil' &&
            response?.pesan === 'Upload Berhasil'
          ) {
            Alert.alert(
              response?.status === 'berhasil' ? 'Sukses' : 'Gagal',
              response?.pesan || '',
              [
                {
                  text: response?.status === 'berhasil' ? 'OK' : 'Tutup',
                  onPress: () => null,
                },
              ],
            );
            onChange(prev =>
              prev.map((item, index) => {
                if (index === 1) {
                  return {
                    ...item,
                    materi: item.materi.concat(response?.url),
                  };
                } else {
                  return item;
                }
              }),
            );
          }
        });
        xhr.open('POST', uploadUrl);
        xhr.send(formData);
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
      } else {
        throw err;
      }
    }
  }, [authGuru?.data, onChange]);

  const hapusMateriById = useCallback(
    async (absensipertemuan_materi_id, index) => {
      try {
        if (absensipertemuan_materi_id?.length > 0) {
          // jika materi sudah disimpan bersama dengan pertemuan
          const xhr = new XMLHttpRequest();
          xhr.open('POST', hapusMateriUrl);
          xhr.setRequestHeader('Content-Type', 'application/json');
          xhr.send(JSON.stringify({absensipertemuan_materi_id}));
          xhr.addEventListener('loadend', () => {
            const response = xhr.response ? JSON.parse(xhr.response) : {};
            if (
              response?.status === 'berhasil' &&
              response?.pesan === 'Materi berhasil dihapus'
            ) {
              Alert.alert(
                response?.status === 'berhasil' ? 'Sukses' : 'Gagal',
                response?.pesan || '',
                [
                  {
                    text: response?.status === 'berhasil' ? 'OK' : 'Tutup',
                    onPress: () => null,
                  },
                ],
              );
              onChange(prev =>
                prev.map((item, idx) => {
                  if (idx === 1) {
                    return {
                      ...item,
                      materi: item?.materi.filter(
                        materiItem =>
                          materiItem?.absensipertemuan_materi_id !==
                          absensipertemuan_materi_id,
                      ),
                    };
                  } else {
                    return item;
                  }
                }),
              );
            }
          });
        } else {
          // jika materi belum disimpan bersama dengan pertemuan
          Alert.alert('Sukses', 'Materi berhasil dihapus', [
            {
              text: 'OK',
              onPress: () => null,
            },
          ]);
          onChange(prev =>
            prev.map((item, idx) => {
              if (idx === 1) {
                return {
                  ...item,
                  materi: item?.materi.filter(
                    (materiItem, _idx) => _idx !== index,
                  ),
                };
              } else {
                return item;
              }
            }),
          );
        }
      } catch (e) {}
    },
    [onChange],
  );

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
          <View style={styles.itemIconContainer}>
            <RectButton
              style={styles.iconDelete}
              onPress={() =>
                hapusMateriById(item?.absensipertemuan_materi_id, index)
              }>
              <MaterialIcons
                name="delete"
                size={windowWidth * 0.04}
                color="white"
              />
            </RectButton>
          </View>
        </RectButton>
      )}
      ListEmptyComponent={
        <Text style={styles.noMateri}>Belum ada materi.</Text>
      }
      ListFooterComponent={
        <RectButton onPress={openFolder} style={styles.buttonUpload}>
          <MaterialIcons
            name="file-upload"
            size={windowWidth * 0.07}
            color="white"
          />
          <Text style={styles.buttonUploadLabel}>Upload File Materi</Text>
        </RectButton>
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
