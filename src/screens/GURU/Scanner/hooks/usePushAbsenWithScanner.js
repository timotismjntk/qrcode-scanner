/* eslint-disable react-hooks/exhaustive-deps */
import {useCallback, useState} from 'react';
import {Alert, ToastAndroid} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import http from '../../../../helpers/http';

export default function usePushAbsenWithScanner({
  setOutput,
  cameraRef,
  setBarcodeDetectedBounds,
}) {
  const navigation = useNavigation();
  const [isLoadingPushAbsenWithScanner, setIsloadingPushAbsenWithScanner] =
    useState(false);
  const [openModalSuccess, setOpenModalSuccess] = useState(false);
  const [statusAbsen, setStatusAbsen] = useState('');

  const pushAbsenWithScanner = useCallback(
    async ({token, jenis_absen, url}) => {
      try {
        setIsloadingPushAbsenWithScanner(true);
        const {data} = await http().post(url, {
          token,
          jenis_absen,
        });

        if (data?.status?.length > 0) {
          if (data?.status === 'gagal') {
            ToastAndroid.showWithGravity(
              data?.pesan?.concat?.(
                '\n',
                'Nama siswa: ',
                data?.result?.user_data?.nama || '-',
              ),
              ToastAndroid.LONG,
              ToastAndroid.BOTTOM,
            );
            setTimeout(() => {
              cameraRef?.current?.resumePreview?.();
              setOutput('');
              setIsloadingPushAbsenWithScanner(false);
              setBarcodeDetectedBounds?.({});
            }, 2000);
          } else {
            setStatusAbsen(
              data?.pesan?.concat?.(
                '\n',
                'Nama siswa: ',
                data?.result?.user_data?.nama || '-',
              ) || '',
            );
            setOpenModalSuccess(true);
            setTimeout(() => {
              cameraRef?.current?.resumePreview?.();
              setOutput('');
              setIsloadingPushAbsenWithScanner(false);
              setBarcodeDetectedBounds?.({});
              setOpenModalSuccess(false);
              setStatusAbsen('');
            }, 2000);
          }
        } else {
          cameraRef?.current?.resumePreview?.();
          setOutput('');
          setIsloadingPushAbsenWithScanner(false);
          setBarcodeDetectedBounds?.({});
          Alert.alert('Error', 'Terjadi kesalahan', [
            {
              text: 'Tutup',
              onPress: () => navigation.goBack(),
            },
          ]);
        }
      } catch (e) {
        setIsloadingPushAbsenWithScanner(false);
        Alert.alert('Error', e?.message || 'Terjadi kesalahan', [
          {
            text: 'Tutup',
            onPress: () => navigation.goBack(),
          },
        ]);
      }
    },
    [setOutput, cameraRef, setBarcodeDetectedBounds],
  );

  return {
    statusAbsen,
    openModalSuccess,
    isLoadingPushAbsenWithScanner,
    pushAbsenWithScanner,
  };
}
