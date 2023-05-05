/* eslint-disable prettier/prettier */
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Animated, StyleSheet, Text, TextInput} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

// components
import Dropdown from '../../../../components/DropDown';

// utils
import {windowWidth} from '../../../../utils';

// reducers
import {getProfilSaya} from '../../../../redux/reducer/GURU/profilSaya';

// schema
import {jenisKelaminEnum, agamaEnum} from '../validationSchema/profilSchema';

export default function useProfilSayaGuru({flatlistRef}) {
  const dispatch = useDispatch();
  const {authGuru = {}} = useSelector(state => state.authGuru) || {};

  useEffect(() => {
    if (authGuru?.data?.token?.length > 0) {
      dispatch(getProfilSaya({token: authGuru?.data?.token}));
    }
  }, [authGuru]);

  const {profilSaya = {}, isLoadingUpdateProfilSaya = false} = useSelector(state => state.profilSayaGuru) || {};
  const {
    url_foto,
    nama,
    jenis_kelamin,
    pendidikan_terakhir,
    nuptk,
    tempat_lahir,
    tanggal_lahir,
    nip,
    nik,
    status_kepegawaian,
    jenis_ptk,
    agama,
    alamat,
    email,
    sk_pengangkatan,
    tmt_pengangkatan,
    lembaga_pengangkatan,
    sumber_gaji,
    nomor_wa,
    jabatan,
    wali_kelas,
  } = profilSaya?.sdm || {};

  const renderItem = useCallback(
    ({item, index}) => (
      <>
        <Text style={styles.inputTitle}>
          {item?.title}
          {item?.required && <Text style={styles.required}>{' '}*</Text>}
        </Text>
        {item?.inputType === 'textinput' ? (
          <TextInput
          placeholder={item?.placeholder}
          placeholderTextColor="grey"
          value={item.value}
          onChangeText={text => {
            item.onChangeText(
              {
                text: item?.keyboardType === 'numeric' ?
                      text.replace(/[^0-9]/g, '')
                      : text, keys: item?.keys,
              }
            );
          }}
          keyboardType={item?.keyboardType}
          style={[
            styles.input,
            item?.error?.length > 0 && styles.inputError,
          ]}
          editable={item?.editable}
          multiline={item?.multiline}
        />
        ) : (
          <Dropdown
            list={item?.list}
            type={item?.inputType || ''}
            selectedValue={item?.value}
            setValue={text => {
              item.onChangeText(
                {
                  text: item?.keyboardType === 'numeric' ?
                        text.replace(/[^0-9]/g, '')
                        : text, keys: item?.keys,
                }
              );
            }}
            controlledDate={false}
            selectedDate={item?.value}
            setSelectedDate={text => item.onChangeText({text, keys: item?.keys})}
            placeholder={item?.placeholder}
          />
        )}
        {item?.error?.length > 0 && (
          <Text style={styles.errorLabel}>* {item?.error}</Text>
        )}
      </>
    ),
    [],
  );

  const onChangeText = useCallback(({text, keys}) => {
    setTabSlides(prev => {
      return prev?.map(item => ({
        ...item,
        WrapperProps: {
          ...item?.WrapperProps,
          data: item?.WrapperProps?.data?.map?.(v =>
            v?.keys === keys
              ? {...v, value: text, error: ''}
              : v,
          ),
        },
      }));
    });
  }, []);

  const [tabSlides, setTabSlides] = useState(
    [
      {
        key: 'Data Guru',
        title: 'Data Guru',
        Wrapper: Animated.FlatList,
        WrapperProps: {
          ref: ref => {
            flatlistRef['Data Guru'] = ref;
          },
          decelerationRate: 0.85,
          data: [
            {
              title: 'Nama Lengkap',
              value: nama,
              keys: 'nama',
              onChangeText,
              placeholder: 'Belum diisi',
              editable: true,
              required: true,
              multiline: false,
              error: '',
              belongTo: 'Data Guru',
              keyboardType: 'default',
              inputType: 'textinput',
            },
            {
              title: 'NIK',
              value: nik,
              keys: 'nik',
              onChangeText,
              placeholder: 'Belum diisi',
              editable: false,
              required: true,
              multiline: false,
              error: '',
              belongTo: 'Data Guru',
              keyboardType: 'numeric',
              inputType: 'textinput',
            },
            {
              title: 'Password',
              value: '',
              keys: 'password',
              onChangeText,
              placeholder: '******',
              editable: true,
              required: false,
              multiline: false,
              error: '',
              belongTo: 'Data Guru',
              keyboardType: 'numeric',
              inputType: 'textinput',
            },
            {
              title: 'Jenis Kelamin',
              value: jenis_kelamin,
              keys: 'jenis_kelamin',
              onChangeText,
              placeholder: '- Jenis Kelamin -',
              editable: true,
              required: true,
              multiline: false,
              error: '',
              belongTo: 'Data Guru',
              keyboardType: 'default',
              inputType: 'dropdown',
              list: jenisKelaminEnum,
            },
            {
              title: 'Tempat Lahir',
              value: tempat_lahir,
              keys: 'tempat_lahir',
              onChangeText,
              placeholder: 'Belum diisi',
              editable: true,
              required: true,
              multiline: false,
              error: '',
              belongTo: 'Data Guru',
              keyboardType: 'default',
              inputType: 'textinput',
            },
            {
              title: 'Tanggal Lahir',
              value: tanggal_lahir,
              keys: 'tanggal_lahir',
              onChangeText,
              placeholder: '- Pilih tanggal -',
              editable: true,
              required: true,
              multiline: false,
              error: '',
              belongTo: 'Data Guru',
              keyboardType: 'default',
              inputType: 'date',
            },
            {
              title: 'Agama',
              value: agama,
              keys: 'agama',
              onChangeText,
              placeholder: '- Pilih Agama -',
              editable: true,
              required: true,
              multiline: false,
              error: '',
              belongTo: 'Data Guru',
              keyboardType: 'default',
              inputType: 'dropdown',
              list: agamaEnum,
            },
            {
              title: 'Pendidikan Terakhir',
              value: pendidikan_terakhir,
              keys: 'pendidikan_terakhir',
              onChangeText,
              placeholder: 'Belum diisi',
              editable: true,
              required: false,
              multiline: false,
              error: '',
              belongTo: 'Data Guru',
              keyboardType: 'default',
              inputType: 'textinput',
            },
            {
              title: 'Alamat',
              value: alamat,
              keys: 'alamat',
              onChangeText,
              placeholder: 'Belum diisi',
              editable: true,
              required: false,
              multiline: true,
              error: '',
              belongTo: 'Data Guru',
              keyboardType: 'default',
              inputType: 'textinput',
            },
          ],
          renderItem,
          style: {paddingHorizontal: '6%'},
          keyExtractor: (_item, index) => index,
          removeClippedSubviews: false,
        },
      },
      {
        key: 'Kepegawaian',
        title: 'Kepegawaian',
        Wrapper: Animated.FlatList,
        WrapperProps: {
          ref: ref => {
            flatlistRef.Kepegawaian = ref;
          },
          decelerationRate: 0.85,
          data: [
            {
              title: 'Jabatan',
              value: jabatan,
              keys: 'jabatan',
              onChangeText,
              placeholder: 'Belum diisi',
              editable: true,
              required: false,
              multiline: false,
              error: '',
              belongTo: 'Kepegawaian',
              keyboardType: 'default',
              inputType: 'textinput',
            },
            {
              title: 'NUPTK',
              value: nuptk,
              keys: 'nuptk',
              onChangeText,
              placeholder: 'Belum diisi',
              editable: true,
              required: false,
              multiline: false,
              error: '',
              belongTo: 'Kepegawaian',
              keyboardType: 'numeric',
              inputType: 'textinput',
            },
            {
              title: 'NIP',
              value: nip,
              keys: 'nip',
              onChangeText,
              placeholder: 'Belum diisi',
              editable: true,
              required: false,
              multiline: false,
              error: '',
              belongTo: 'Kepegawaian',
              keyboardType: 'numeric',
              inputType: 'textinput',
            },
            {
              title: 'Status Kepegawaian',
              value: status_kepegawaian,
              keys: 'status_kepegawaian',
              onChangeText,
              placeholder: 'Belum diisi',
              editable: false,
              required: false,
              multiline: false,
              error: '',
              belongTo: 'Kepegawaian',
              keyboardType: 'default',
              inputType: 'textinput',
            },
            // {
            //   title: 'Wali Kelas untuk',
            //   value:
            //     wali_kelas?.length > 0
            //       ? wali_kelas
            //           ?.map(item =>
            //             item.nama_kelas.concat(` (TA ${item.tahunajaran})`),
            //           )
            //           .join('\n')
            //       : '',
            //   keys: 'wali_kelas',
            //             onChangeText,
            //   placeholder: 'Belum diset',
            //   editable: false,
            //   required: false,
            //   multiline: true,
            //   error: '',
            //   belongTo: 'Kepegawaian',
            //   keyboardType: 'default',
            //   inputType: 'textinput',
            // },
            {
              title: 'Jabatan',
              value: jabatan,
              keys: 'jabatan',
              onChangeText,
              placeholder: 'Belum diisi',
              editable: true,
              required: false,
              multiline: true,
              error: '',
              belongTo: 'Kepegawaian',
              keyboardType: 'default',
              inputType: 'textinput',
            },
            {
              title: 'Jenis PTK',
              value: jenis_ptk,
              keys: 'jenis_ptk',
              onChangeText,
              placeholder: 'Belum diisi',
              editable: true,
              required: false,
              multiline: false,
              error: '',
              belongTo: 'Kepegawaian',
              keyboardType: 'default',
              inputType: 'textinput',
            },
            {
              title: 'SK Pengangkatan',
              value: sk_pengangkatan,
              keys: 'sk_pengangkatan',
              onChangeText,
              placeholder: 'Belum diisi',
              editable: true,
              required: false,
              multiline: false,
              error: '',
              belongTo: 'Kepegawaian',
              keyboardType: 'default',
              inputType: 'textinput',
            },
            {
              title: 'TMT Pengangkatan',
              value: tmt_pengangkatan,
              keys: 'tmt_pengangkatan',
              onChangeText,
              placeholder: 'Belum diisi',
              editable: true,
              required: false,
              multiline: false,
              error: '',
              belongTo: 'Kepegawaian',
              keyboardType: 'default',
              inputType: 'textinput',
            },
            {
              title: 'Lembaga Pengangkatan',
              value: lembaga_pengangkatan,
              keys: 'lembaga_pengangkatan',
              onChangeText,
              placeholder: 'Belum diisi',
              editable: true,
              required: false,
              multiline: true,
              error: '',
              belongTo: 'Kepegawaian',
              keyboardType: 'default',
              inputType: 'textinput',
            },
            {
              title: 'Sumber Gaji',
              value: sumber_gaji,
              keys: 'sumber_gaji',
              onChangeText,
              placeholder: 'Belum diisi',
              editable: true,
              required: false,
              multiline: true,
              error: '',
              belongTo: 'Kepegawaian',
              keyboardType: 'default',
              inputType: 'textinput',
            },
          ],
          renderItem,
          style: {paddingHorizontal: '6%'},
          keyExtractor: (_item, index) => index,
          removeClippedSubviews: false,
        },
      },
      {
        key: 'Informasi Lainnya',
        title: 'Informasi Lainnya',
        Wrapper: Animated.FlatList,
        WrapperProps: {
          ref: ref => {
            flatlistRef['Informasi Lainnya'] = ref;
          },
          decelerationRate: 0.85,
          data: [
            {
              title: 'Nomor WA',
              value: nomor_wa,
              keys: 'nomor_wa',
              onChangeText,
              placeholder: 'Belum diisi',
              editable: true,
              required: false,
              multiline: false,
              error: '',
              belongTo: 'Informasi Lainnya',
              keyboardType: 'numeric',
              inputType: 'textinput',
            },
            {
              title: 'E-Mail',
              value: email,
              keys: 'email',
              onChangeText,
              placeholder: 'Belum diisi',
              editable: true,
              required: false,
              multiline: false,
              error: '',
              belongTo: 'Informasi Lainnya',
              keyboardType: 'default',
              inputType: 'textinput',
            },
          ],
          renderItem,
          style: {paddingHorizontal: '6%'},
          keyExtractor: (_item, index) => index,
          removeClippedSubviews: false,
        },
      },
    ]);

  return {isLoadingUpdateProfilSaya, tabSlides, setTabSlides, onChangeText, url_foto};
}

const styles = StyleSheet.create({
  inputTitle: {
    fontSize: windowWidth * 0.04,
    color: 'black',
    fontFamily: 'OpenSans-SemiBold',
  },
  required: {
    color: 'red',
    fontFamily: 'OpenSans-Regular',
    fontSize: windowWidth * 0.036,
  },
  errorLabel: {
    color: 'red',
    fontFamily: 'OpenSans-Italic',
    fontSize: windowWidth * 0.034,
    marginTop: '-4%',
    marginBottom: '2%',
    marginLeft: '2%',
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
  },
  inputFocus: {
    borderWidth: 1,
    borderColor: '#0099e5',
  },
  inputError: {
    borderWidth: 1,
    borderColor: 'red',
  },
});
