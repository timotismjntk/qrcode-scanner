/* eslint-disable react-hooks/exhaustive-deps */
import {useCallback, useEffect} from 'react';
import {Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

// validation schema
import profilSchema from '../validationSchema/profilSchema';

// actions reducers
import {
  getProfilSaya,
  updateProfilSayaAction,
  clearUpdateProfilSaya,
} from '../../../../redux/reducer/GURU/profilSaya';

export default function useChangeProfilData({
  data,
  setError,
  setCurrentSlideIndex,
  flatlistRef,
}) {
  const dispatch = useDispatch();

  const {authGuru = {}} = useSelector(state => state.authGuru) || {};
  const {updateProfilSaya = {}} =
    useSelector(state => state.profilSayaGuru) || {};

  const changeProfilData = useCallback(async () => {
    try {
      const toObject = data
        ?.map(item => item?.WrapperProps?.data?.map(v => ({...v, error: ''})))
        ?.reduce((acc, curr) => {
          curr?.forEach(v => {
            if (v?.keys) {
              acc[v?.keys] = v?.value;
            }
          });
          return acc;
        }, {});
      const profilSchemaResult = await profilSchema.validate(
        {...toObject, token: authGuru?.data?.token},
        {
          abortEarly: false,
        },
      );
      dispatch(updateProfilSayaAction(profilSchemaResult));
    } catch (e) {
      if (e?.inner) {
        e?.inner?.forEach(errorYup => {
          setError(prev => {
            return prev?.map(item => ({
              ...item,
              WrapperProps: {
                ...item?.WrapperProps,
                data: item?.WrapperProps?.data?.map?.(v =>
                  v?.keys === errorYup.path
                    ? {...v, error: errorYup?.message}
                    : v,
                ),
              },
            }));
          });
        });
        const slideTabToIndex = data?.findIndex(item =>
          item?.WrapperProps?.data?.some(v => v?.keys === e?.inner[0].path),
        );
        if (slideTabToIndex > -1) {
          setCurrentSlideIndex(slideTabToIndex);
        }
        setTimeout(() => {
          const slideToField = data?.[0];
          if (slideToField?.key) {
            const fieldIndex = slideToField?.WrapperProps?.data?.findIndex(
              item => item?.keys === e?.inner[0].path,
            );
            if (fieldIndex > -1) {
              flatlistRef?.[slideToField?.key]?.scrollToIndex?.({
                index: fieldIndex,
                animated: true,
              });
            }
          }
        }, 1000);
      }
    }
  }, [authGuru, data, setError, setCurrentSlideIndex, flatlistRef]);

  useEffect(() => {
    if (updateProfilSaya?.status?.length > 0) {
      Alert.alert(
        updateProfilSaya?.status === 'berhasil' ? 'Sukses' : 'Gagal',
        updateProfilSaya?.pesan || '',
        [
          {
            text: 'OK',
            onPress: () => {
              dispatch(clearUpdateProfilSaya());
              if (updateProfilSaya?.status === 'berhasil') {
                dispatch(getProfilSaya({token: authGuru?.data?.token}));
              }
            },
          },
        ],
      );
    }
  }, [updateProfilSaya, authGuru]);

  return {changeProfilData};
}
