import React, {memo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {RectButton} from 'react-native-gesture-handler';

import {downloadFile, windowWidth} from '../../../../../utils';

function Item({item}) {
  return (
    <View style={styles.item}>
      <View style={styles.itemWrapper}>
        <Text numberOfLines={1} style={styles.nama_file}>
          {item.nama_matapelajaran}
        </Text>
        <Text style={styles.pengajar}>Pengajar: {item.nama_guru}</Text>
        <Text style={styles.pertemuan_ke}>
          Pertemuan ke: {item.pertemuan_ke}
        </Text>
        <Text style={styles.hari}>Hari: {item.tanggal}</Text>
      </View>
      <View style={styles.itemIconContainer}>
        <RectButton
          onPress={() =>
            downloadFile(item?.url || '', item?.originalName || '')
          }
          style={styles.iconDownload}>
          <MaterialIcons
            name="cloud-download"
            size={windowWidth * 0.06}
            color="white"
          />
        </RectButton>
      </View>
    </View>
  );
}

export default memo(Item);

const styles = StyleSheet.create({
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
    justifyContent: 'space-around',
  },
  iconDownload: {
    backgroundColor: '#009A0F',
    width: windowWidth * 0.09,
    height: windowWidth * 0.09,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: windowWidth * 0.014,
    elevation: 5,
  },
});
