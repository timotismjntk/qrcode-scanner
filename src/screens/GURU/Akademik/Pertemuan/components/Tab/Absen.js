/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useMemo} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';

import Checkbox from '../Checkbox';

import {windowWidth, windowHeight} from '../../../../../../utils';

export default function Absen({data, onChange}) {
  const handleCheckBox = useCallback(
    (kehadiran, namaSiswa) => {
      onChange(prev =>
        prev.map((prevItem, index) => {
          if (index === 0) {
            return {
              ...prevItem,
              absenSiswa: prevItem.absenSiswa.map(item => {
                if (item?.nama === namaSiswa) {
                  if (kehadiran === 'H') {
                    return {
                      ...item,
                      kehadiran: {
                        ...item.kehadiran,
                        H: true,
                        S: false,
                        I: false,
                        A: false,
                      },
                    };
                  } else if (kehadiran === 'S') {
                    return {
                      ...item,
                      kehadiran: {
                        ...item.kehadiran,
                        H: false,
                        S: true,
                        I: false,
                        A: false,
                      },
                    };
                  } else if (kehadiran === 'I') {
                    return {
                      ...item,
                      kehadiran: {
                        ...item.kehadiran,
                        H: false,
                        S: false,
                        I: true,
                        A: false,
                      },
                    };
                  } else if (kehadiran === 'A') {
                    return {
                      ...item,
                      kehadiran: {
                        ...item.kehadiran,
                        H: false,
                        S: false,
                        I: false,
                        A: true,
                      },
                    };
                  }
                } else {
                  return item;
                }
              }),
            };
          } else {
            return prevItem;
          }
        }),
      );
    },
    [onChange],
  );

  const memoizedDataAbsen = useMemo(() => {
    if (Array.isArray(data)) {
      return data;
    } else {
      return [];
    }
  }, [data]);

  return (
    <View style={styles.container}>
      {data?.length > 0 && (
        <View style={styles.checkboxHeaderContainer}>
          <View style={styles.leftCheckboxHeader} />
          <View style={styles.rigthCheckboxheader}>
            <Text style={styles.checkBoxLabel}>H</Text>
            <Text style={styles.checkBoxLabel}>S</Text>
            <Text style={styles.checkBoxLabel}>I</Text>
            <Text style={styles.checkBoxLabel}>A</Text>
          </View>
        </View>
      )}
      <FlatList
        data={memoizedDataAbsen}
        nestedScrollEnabled
        // stickyHeaderIndices={[0]}
        keyExtractor={item => item?.siswa_id}
        style={{maxHeight: windowHeight * 0.6}}
        renderItem={({item: {nama, kehadiran, nisn}}) => (
          <View style={styles.absenItem}>
            <Text style={styles.absenNamaSiswa}>
              {nama || ''}
              {'\n'}
              <Text style={[styles.absenNamaSiswa, styles.nisn]}>
                {nisn || ''}
              </Text>
            </Text>
            <View style={styles.checkboxContainer}>
              <View style={styles.checkBox}>
                <Checkbox
                  onChange={() => handleCheckBox('H', nama)}
                  checked={kehadiran?.H}
                />
              </View>
              <View style={styles.checkBox}>
                <Checkbox
                  onChange={() => handleCheckBox('S', nama)}
                  checked={kehadiran?.S}
                />
              </View>
              <View style={styles.checkBox}>
                <Checkbox
                  onChange={() => handleCheckBox('I', nama)}
                  checked={kehadiran?.I}
                />
              </View>
              <View style={styles.checkBox}>
                <Checkbox
                  onChange={() => handleCheckBox('A', nama)}
                  checked={kehadiran?.A}
                />
              </View>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.nodata}>Tidak ada daftar Siswa tersedia...</Text>
        }
        contentContainerStyle={styles.absenContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingTop: '2%',
  },
  absenContainer: {
    paddingBottom: '4%',
  },
  absenItem: {
    padding: '4%',
    width: '92%',
    alignSelf: 'center',
    paddingHorizontal: '3%',
    backgroundColor: 'white',
    elevation: 5,
    borderRadius: windowWidth * 0.02,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '3%',
    marginTop: '2%',
  },
  absenNamaSiswa: {
    flex: 1,
    color: 'black',
    fontSize: windowWidth * 0.032,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nisn: {
    fontSize: windowWidth * 0.03,
    fontStyle: 'italic',
  },
  checkboxContainer: {
    flexDirection: 'row',
    flex: 1 / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '3%',
  },
  leftCheckboxHeader: {
    flex: 1,
  },
  rigthCheckboxheader: {
    flex: 1 / 2,
    flexDirection: 'row',
  },
  checkBoxLabel: {
    flex: 1,
    color: 'black',
    fontSize: windowWidth * 0.03,
    fontWeight: 'bold',
  },
  checkBox: {
    flex: 1,
  },
  nodata: {
    fontSize: windowWidth * 0.034,
    color: 'black',
  },
});
