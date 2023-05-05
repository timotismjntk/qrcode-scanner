/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useMemo} from 'react';
import {FlatList, Image, StatusBar, StyleSheet, Text, View} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {windowWidth, windowHeight} from '../../utils';

import {getDataGuru} from '../../redux/reducer/GURU/dataGuru';

export default function DataGuru({navigation}) {
  const dispatch = useDispatch();
  const {authGuru = false} = useSelector(state => state.authGuru) || {};
  const {dataGuru = {}, isLoadingDataGuru = false} =
    useSelector(state => state.dataGuru) || {};

  useEffect(() => {
    if (authGuru?.status === 'berhasil') {
      dispatch(getDataGuru({website_id: authGuru?.data?.website_id}));
    }
  }, [authGuru]);

  const memoizedData = useMemo(() => {
    if (dataGuru?.result?.sdms?.length > 0) {
      return dataGuru?.result?.sdms;
    } else {
      return [];
    }
  }, [dataGuru]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar animated={true} translucent backgroundColor="#3B3B3B" />
      <FlatList
        data={memoizedData}
        refreshing={isLoadingDataGuru}
        onRefresh={() => {
          if (authGuru?.status === 'berhasil') {
            dispatch(getDataGuru({website_id: authGuru?.data?.website_id}));
          }
        }}
        progressViewOffset={windowHeight * 0.15}
        ListEmptyComponent={
          <Text style={styles.emptyData}>Data Guru Kosong...</Text>
        }
        renderItem={({item}) => (
          <RectButton
            style={styles.item}
            onPress={() =>
              navigation.navigate('ProfilGuruLain', {dataGuru: item})
            }>
            <View style={styles.profilPictureWrapper}>
              {item?.url_foto?.length > 0 ? (
                <Image
                  style={styles.profilPicture}
                  source={{uri: item?.url_foto}}
                />
              ) : (
                <MaterialIcons
                  name="person"
                  size={windowWidth * 0.08}
                  color="#BDBDBD"
                />
              )}
            </View>
            <Text style={styles.namaGuru}>{item?.nama}</Text>
          </RectButton>
        )}
        contentContainerStyle={styles.flatlist}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  wrapper: {
    alignItems: 'center',
    width: '100%',
    marginBottom: '6%',
  },
  form: {
    paddingHorizontal: windowWidth * 0.08,
    width: '100%',
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
  button: {
    padding: '3%',
    width: '100%',
    borderRadius: windowWidth * 0.02,
    alignItems: 'center',
    backgroundColor: '#BB902C',
    elevation: 10,
    marginTop: '6%',
  },
  buttonTitle: {
    color: 'white',
    fontSize: windowWidth * 0.04,
    fontFamily: 'OpenSans-SemiBold',
  },
  emptyData: {
    fontSize: windowWidth * 0.034,
    fontFamily: 'OpenSans-Regular',
    color: 'black',
    backgroundColor: 'white',
    paddingHorizontal: windowWidth * 0.08,
    borderRadius: windowWidth * 0.01,
  },
  flatlist: {
    padding: '4%',
    paddingVertical: '7%',
    minHeight: windowHeight,
    paddingTop: '25%',
  },
  separator: {
    height: '0.2%',
    marginVertical: '2%',
  },
  item: {
    minHeight: windowWidth * 0.16,
    marginVertical: '2%',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#D9D9D9',
    borderRadius: windowWidth * 0.02,
    width: windowWidth * 0.75,
    alignSelf: 'center',
    paddingHorizontal: '3%',
  },
  profilPictureWrapper: {
    width: windowWidth * 0.1,
    height: windowWidth * 0.1,
    borderRadius: windowWidth * 0.1,
    backgroundColor: 'white',
    marginRight: '4%',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profilPicture: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  namaGuru: {
    fontSize: windowWidth * 0.034,
    fontFamily: 'OpenSans-SemiBold',
    color: 'black',
  },
});
