import React, {memo} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import Dropdown from '@src/components/DropDown';

import {windowWidth} from '@src/utils';

function Header({nama_siswa, totalSudahDibayar, url_foto, tahun, setTahun}) {
  return (
    <View>
      <View style={styles.siswaSPPContainer}>
        <View style={styles.fotoProfilWrapper}>
          <Image
            style={styles.fotoProfil}
            source={
              url_foto
                ? {uri: url_foto}
                : require('@src/assets/icons2/students3.png')
            }
          />
        </View>
        <View style={styles.itemSubContainer}>
          <View style={styles.itemSubContainerHeader}>
            <Text numberOfLines={2} style={styles.namaSiswa}>
              {nama_siswa}
            </Text>
            <View style={styles.totalContainer}>
              <Text numberOfLines={1} style={styles.totalYangSudahDibayarLabel}>
                Total yang sudah dibayar
              </Text>
              <View style={styles.totalYangSudahDibayarPill}>
                <Text style={styles.totalYangSudahDibayar}>
                  {totalSudahDibayar}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      <Text style={styles.riwayatPembayaranSection}>Riwayat Pembayaran</Text>
      <View style={styles.form}>
        <Text style={styles.inputTitle}>Tahun</Text>
        <Dropdown
          type="year"
          selectedValue={tahun}
          setValue={setTahun}
          placeholder="- Pilih Tahun -"
        />
      </View>
    </View>
  );
}

export default memo(Header);

const styles = StyleSheet.create({
  siswaSPPContainer: {
    minHeight: windowWidth * 0.2,
    flexDirection: 'row',
    backgroundColor: 'white',
    marginBottom: '4%',
    elevation: 12,
    borderRadius: windowWidth * 0.02,
    width: windowWidth * 0.88,
    alignSelf: 'center',
    alignItems: 'center',
    paddingHorizontal: '2%',
    overflow: 'hidden',
  },
  fotoProfilWrapper: {
    width: windowWidth * 0.13,
    height: windowWidth * 0.13,
    overflow: 'hidden',
    borderRadius: windowWidth * 0.13,
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
    alignItems: 'center',
  },
  namaSiswa: {
    fontSize: windowWidth * 0.037,
    color: 'black',
    fontWeight: 'bold',
    flex: 1,
  },
  totalContainer: {
    flex: 0.9,
  },
  totalYangSudahDibayarLabel: {
    fontSize: windowWidth * 0.027,
    color: 'black',
  },
  totalYangSudahDibayarPill: {
    backgroundColor: '#009A0F',
    paddingVertical: '4%',
    paddingHorizontal: '7%',
    borderRadius: windowWidth * 0.02,
    marginTop: '4%',
  },
  totalYangSudahDibayar: {
    fontSize: windowWidth * 0.033,
    color: 'white',
    textAlign: 'center',
  },
  riwayatPembayaranSection: {
    fontSize: windowWidth * 0.044,
    fontFamily: 'OpenSans-Bold',
    paddingHorizontal: '6%',
    color: 'black',
    marginTop: '4%',
  },
  form: {
    paddingHorizontal: windowWidth * 0.06,
    width: '100%',
    marginTop: '4%',
  },
  inputTitle: {
    fontSize: windowWidth * 0.04,
    color: 'black',
    fontFamily: 'OpenSans-SemiBold',
  },
  input: {
    fontSize: windowWidth * 0.045,
    color: 'black',
    width: '100%',
    borderRadius: windowWidth * 0.02,
    marginTop: '3%',
    paddingHorizontal: '3%',
    paddingVertical: '2.5%',
    fontFamily: 'OpenSans-Regular',
    marginBottom: '6%',
    borderWidth: 0.8,
  },
});
