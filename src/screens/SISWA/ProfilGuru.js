/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useMemo} from 'react';
import {
  ScrollView,
  StyleSheet,
  StatusBar,
  Text,
  TextInput,
  View,
  Image,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';

import {windowWidth, windowHeight} from '../../utils';

import {getProfilGuruLain} from '../../redux/reducer/GURU/profilGuruLain';

export default function ProfilGuru({route: {params}}) {
  const dispatch = useDispatch();
  const {profilGuruLain = {}} =
    useSelector(state => state.profilGuruLain) || {};

  useEffect(() => {
    if (params?.guru_id?.length > 0) {
      dispatch(getProfilGuruLain({user_id: params?.guru_id}));
    }
  }, [params?.guru_id]);

  const memoizedData = useMemo(() => {
    if (params?.dataGuru && Object.keys(params?.dataGuru)?.length > 0) {
      return params?.dataGuru;
    } else if (
      profilGuruLain?.data &&
      Object.keys(profilGuruLain?.data)?.length > 0
    ) {
      return profilGuruLain?.data;
    } else {
      return {};
    }
  }, [profilGuruLain]);

  const {
    nama = '-',
    jenis_kelamin = '-',
    foto_profil = '',
    url_foto = '',
    guru = {},
    kelas = [],
    agama = '-',
  } = memoizedData || {};

  const memoizedKelas = useMemo(() => {
    if (Array.isArray(kelas) && kelas?.length > 0) {
      return kelas;
    } else if (
      Array.isArray(guru?.wali_kelas) &&
      guru?.wali_kelas?.length > 0
    ) {
      return guru?.wali_kelas;
    } else {
      return [];
    }
  }, [kelas, guru]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar animated={true} translucent backgroundColor="#3B3B3B" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.fotoProfilWrapper}>
          {foto_profil?.length > 0 || url_foto?.length > 0 ? (
            <Image
              source={{uri: foto_profil || url_foto}}
              style={styles.profilPicture}
            />
          ) : (
            <MaterialIcons
              name="person"
              size={windowWidth * 0.14}
              color="#BDBDBD"
            />
          )}
        </View>
        <View style={styles.form}>
          <Text style={styles.inputTitle}>Nama</Text>
          <TextInput value={nama} style={styles.input} editable={false} />
          <Text style={styles.inputTitle}>Jenis Kelamin</Text>
          <TextInput
            value={jenis_kelamin}
            style={styles.input}
            editable={false}
          />
          <Text style={styles.inputTitle}>Agama</Text>
          <TextInput value={agama} style={styles.input} editable={false} />
          <Text style={styles.inputTitle}>Status Kepegawaian</Text>
          <TextInput
            value={
              guru?.status_kepegawaian ||
              memoizedData?.status_kepegawaian ||
              '-'
            }
            style={styles.input}
            editable={false}
          />
          <Text style={styles.inputTitle}>Jenis PTK</Text>
          <TextInput
            value={guru?.jenis_ptk || memoizedData?.jenis_ptk || '-'}
            style={styles.input}
            editable={false}
          />
          <Text style={styles.inputTitle}>Wali Kelas Untuk</Text>
          <TextInput
            multiline
            value={
              memoizedKelas?.length > 0
                ? memoizedKelas
                    ?.map(item =>
                      item?.nama_kelas.concat(` (TA ${item?.tahunajaran})`),
                    )
                    .join('\n')
                : '-'
            }
            editable={false}
            style={styles.input}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollContainer: {
    minHeight: windowHeight,
    padding: '3%',
    paddingTop: '25%',
  },
  fotoProfilWrapper: {
    width: windowWidth * 0.28,
    height: windowWidth * 0.28,
    borderRadius: (windowWidth * 0.28) / 2,
    overflow: 'hidden',
    backgroundColor: 'white',
    borderWidth: 0.5,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profilPicture: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  form: {
    paddingHorizontal: '8%',
    marginTop: '5%',
    width: '100%',
  },
  inputTitle: {
    fontSize: windowWidth * 0.04,
    color: 'black',
    fontFamily: 'OpenSans-SemiBold',
  },
  input: {
    fontSize: windowWidth * 0.04,
    color: 'black',
    width: '100%',
    borderRadius: windowWidth * 0.02,
    marginTop: '3%',
    paddingHorizontal: '3%',
    paddingVertical: '2.5%',
    fontFamily: 'OpenSans-Regular',
    marginBottom: '6%',
    borderWidth: 0.8,
    backgroundColor: '#F5F5F5',
  },
});
