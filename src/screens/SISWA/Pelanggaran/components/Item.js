import React, {memo} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';

import {windowWidth} from '../../../../utils';

function Item({item}) {
  return (
    <RectButton style={styles.itemContainer}>
      <View style={styles.fotoProfilWrapper}>
        <Image
          style={styles.fotoProfil}
          source={
            item?.foto_siswa
              ? {uri: item.foto_siswa}
              : require('../../../../assets/icons2/students3.png')
          }
        />
      </View>
      <View style={styles.itemSubContainer}>
        <View style={styles.itemSubContainerHeader}>
          <Text numberOfLines={1} style={styles.namaSiswa}>
            {item?.nama_siswa}
          </Text>
          <View
            style={
              item?.status_penanganan === 'Sudah Diproses'
                ? styles.statusPenangananSudahDiprosesPill
                : styles.statusPenangananBelumDiprosesPill
            }>
            <Text style={styles.statusPenangananLabel}>
              {item?.status_penanganan || 'Belum Diproses'}
            </Text>
          </View>
        </View>
        <Text style={styles.tanggalPelanggaran}>
          {item?.tanggal?.length > 0 &&
            new Date(item?.tanggal)?.toLocaleDateString('id', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
        </Text>
        <Text style={styles.jenisPelanggaran}>
          {item?.nama_pelanggaran} ({item?.poin})
        </Text>
        <Text numberOfLines={1} style={styles.diinputOleh}>
          Diinput oleh: {item?.penginput_nama}
        </Text>
        {item?.status_penanganan === 'Sudah Diproses' && (
          <View>
            <Text style={styles.penanganan}>Penanganan:</Text>
            <Text style={styles.ditanganiOleh}>
              Oleh: {item?.ditangani_nama}
            </Text>
            {item?.penyelesaian?.length > 0 &&
              item?.penyelesaian?.map?.(({penyelesaian}, index) => (
                <Text style={styles.listPenanganan} key={index}>
                  &bull; {penyelesaian || ''}
                </Text>
              ))}
          </View>
        )}
      </View>
    </RectButton>
  );
}

export default memo(Item);

const styles = StyleSheet.create({
  itemContainer: {
    minHeight: windowWidth * 0.2,
    flexDirection: 'row',
    backgroundColor: 'white',
    marginBottom: '4%',
    elevation: 12,
    borderRadius: windowWidth * 0.02,
    width: windowWidth * 0.88,
    alignSelf: 'center',
    paddingHorizontal: '3%',
    paddingVertical: '4%',
    overflow: 'hidden',
  },
  item: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  fotoProfilWrapper: {
    width: windowWidth * 0.13,
    height: windowWidth * 0.13,
    overflow: 'hidden',
    borderRadius: windowWidth * 0.13,
    marginTop: '4%',
  },
  fotoProfil: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  itemSubContainer: {
    paddingLeft: '3%',
    flex: 1,
  },
  itemSubContainerHeader: {
    flexDirection: 'row',
  },
  namaSiswa: {
    fontSize: windowWidth * 0.04,
    color: 'black',
    fontWeight: 'bold',
    flex: 1,
    paddingRight: '2%',
  },
  statusPenangananBelumDiprosesPill: {
    color: 'white',
    fontSize: windowWidth * 0.03,
    backgroundColor: '#E36D00',
    flex: 1 / 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: windowWidth * 0.015,
    elevation: 5,
    paddingHorizontal: '1%',
    paddingVertical: '1.5%',
  },
  statusPenangananSudahDiprosesPill: {
    color: 'white',
    fontSize: windowWidth * 0.03,
    backgroundColor: '#009A0F',
    flex: 1 / 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: windowWidth * 0.015,
    elevation: 5,
    paddingHorizontal: '1%',
    paddingVertical: '1.5%',
  },
  statusPenangananLabel: {
    color: 'white',
    fontSize: windowWidth * 0.028,
    fontWeight: 'bold',
  },
  tanggalPelanggaran: {
    color: 'black',
    fontSize: windowWidth * 0.032,
  },
  jenisPelanggaran: {
    color: 'black',
    fontSize: windowWidth * 0.032,
  },
  diinputOleh: {
    color: 'black',
    fontSize: windowWidth * 0.032,
    fontStyle: 'italic',
  },
  penanganan: {
    color: 'black',
    fontSize: windowWidth * 0.032,
    fontFamily: 'OpenSans-Bold',
  },
  ditanganiOleh: {
    color: 'black',
    fontSize: windowWidth * 0.032,
  },
  listPenanganan: {
    color: 'black',
    fontSize: windowWidth * 0.032,
    paddingLeft: '2%',
  },
});
