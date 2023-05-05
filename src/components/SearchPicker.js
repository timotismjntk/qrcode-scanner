/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
  StyleSheet,
  View,
  Modal,
  Text,
  SectionList,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {windowWidth} from '../utils';

export default function SearchPicker({
  data,
  selectedValue,
  setSelectedValue,
  placeholder,
}) {
  const [openModal, setOpenModal] = useState(false);
  const [search, setSearch] = useState('');
  const listAlphabet = useRef(
    'abcdefghijklmnopqrstuvwxyz'.toLocaleUpperCase().split(''),
  ).current;

  const memoizedData = useMemo(() => {
    if (Array.isArray(data) && data?.length > 0) {
      if (search?.length > 0) {
        const filterData = data?.filter(item =>
          item?.toLowerCase().includes(search?.toLowerCase()),
        );
        if (filterData?.length > 0) {
          return filterData?.reduce((acc, curr) => {
            const findAlphabet = listAlphabet?.find(item =>
              curr.toLocaleUpperCase().startsWith(item),
            );
            const grouping = acc.find(item =>
              curr.toLocaleUpperCase().startsWith(item.alphabet),
            );
            if (grouping) {
              grouping?.data?.push(curr);
            } else {
              if (findAlphabet) {
                acc.push({alphabet: findAlphabet, data: [curr]});
              } else {
                acc.push({
                  alphabet:
                    curr.charAt(0)?.toLocaleUpperCase() || curr.charAt(0),
                  data: [curr],
                });
              }
            }
            return acc;
          }, []);
        } else {
          return [];
        }
      } else {
        const dataGroupped = data?.reduce((acc, curr) => {
          const findAlphabet = listAlphabet?.find(item =>
            curr.toLocaleUpperCase().startsWith(item),
          );
          const grouping = acc.find(item =>
            curr.toLocaleUpperCase().startsWith(item.alphabet),
          );
          if (grouping) {
            grouping?.data?.push(curr);
          } else {
            if (findAlphabet) {
              acc.push({alphabet: findAlphabet, data: [curr]});
            } else {
              acc.push({
                alphabet: curr.charAt(0)?.toLocaleUpperCase() || curr.charAt(0),
                data: [curr],
              });
            }
          }
          return acc;
        }, []);
        return dataGroupped;
      }
    } else {
      return [];
    }
  }, [data, listAlphabet, search]);

  return (
    <View style={styles.container}>
      <Text onPress={() => setOpenModal(true)} style={styles.input}>
        {selectedValue || placeholder}
      </Text>
      <Modal
        animationType="fade"
        statusBarTranslucent
        transparent={true}
        onRequestClose={() => setOpenModal(false)}
        visible={openModal}>
        <View style={styles.centeredView}>
          <View
            style={[
              styles.modalView,
              {height: memoizedData?.length > 5 ? '60%' : '40%'},
            ]}>
            <View style={styles.searchbarContainer}>
              <MaterialIcons
                name="search"
                size={windowWidth * 0.07}
                color="grey"
              />
              <TextInput
                value={search}
                onChangeText={setSearch}
                style={styles.searchbar}
                placeholder="Cari Siswa"
              />
            </View>
            <SectionList
              sections={memoizedData}
              renderItem={({item, index, section}) => (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    setSelectedValue(item);
                    setOpenModal(false);
                  }}
                  style={styles.itemContainer}>
                  <Text
                    style={
                      selectedValue === item ? styles.selectedItem : styles.item
                    }>
                    {item}
                  </Text>
                  {selectedValue === item && (
                    <MaterialIcons
                      name="check-circle"
                      size={windowWidth * 0.04}
                      color="#27AE60"
                    />
                  )}
                </TouchableOpacity>
              )}
              ListEmptyComponent={
                search?.length > 0 ? (
                  <View>
                    <Text style={styles.notfound}>
                      {search?.length > 0
                        ? `${search?.substring(0, 30)} tidak ditemukan.`
                        : ''}
                    </Text>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => {
                        setSearch('');
                        setOpenModal(false);
                      }}
                      style={styles.closeModal}>
                      <Text style={styles.closeModalLabel}>Tutup</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View>
                    <Text style={styles.notfound}>
                      Data siswa tidak tersedia
                    </Text>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => {
                        setSearch('');
                        setOpenModal(false);
                      }}
                      style={styles.closeModal}>
                      <Text style={styles.closeModalLabel}>Tutup</Text>
                    </TouchableOpacity>
                  </View>
                )
              }
              stickySectionHeadersEnabled
              renderSectionHeader={({section: {alphabet}}) => (
                <View style={styles.sectionHeaderContainer}>
                  <Text style={styles.sectionHeader}>{alphabet}</Text>
                </View>
              )}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: windowWidth * 0.12,
    marginTop: '3%',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: windowWidth * 0.02,
    marginBottom: '3%',
    borderWidth: 0.8,
    flexDirection: 'row',
  },
  input: {
    color: 'black',
    fontSize: windowWidth * 0.045,
    fontFamily: 'OpenSans-Regular',
    paddingHorizontal: '4%',
    flex: 1,
  },
  centeredView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalView: {
    backgroundColor: 'white',
    minHeight: '25%',
    elevation: 10,
    width: '80%',
    borderRadius: windowWidth * 0.01,
    overflow: 'hidden',
  },
  searchbarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E5E5E5',
    paddingHorizontal: '3%',
    height: windowWidth * 0.12,
  },
  searchbar: {
    fontSize: windowWidth * 0.036,
    color: 'black',
    fontFamily: 'OpenSans-Regular',
    flex: 1,
    paddingLeft: '5%',
  },
  sectionHeaderContainer: {
    paddingVertical: '6%',
    paddingHorizontal: '4%',
    width: '100%',
    backgroundColor: '#E5E5E5',
    flex: 1,
    borderTopWidth: 3,
    borderColor: 'white',
  },
  sectionHeader: {
    color: 'grey',
    fontSize: windowWidth * 0.035,
    fontFamily: 'DMSans-Bold',
  },
  itemContainer: {
    paddingVertical: '6%',
    paddingHorizontal: '8%',
    width: '100%',
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  item: {
    color: 'black',
    fontSize: windowWidth * 0.035,
    fontFamily: 'DMSans-Regular',
  },
  selectedItem: {
    color: '#27AE60',
    fontSize: windowWidth * 0.035,
    fontFamily: 'OpenSans-SemiBold',
  },
  notfound: {
    color: 'black',
    fontSize: windowWidth * 0.04,
    fontFamily: 'OpenSans-Regular',
    textAlign: 'center',
    marginTop: '4%',
  },
  closeModal: {
    padding: '2%',
    backgroundColor: 'brown',
    width: '30%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: windowWidth * 0.02,
    marginTop: '10%',
  },
  closeModalLabel: {
    color: 'white',
    fontSize: windowWidth * 0.034,
  },
});
