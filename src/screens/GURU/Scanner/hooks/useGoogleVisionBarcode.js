/* eslint-disable react-hooks/exhaustive-deps */
import {useCallback} from 'react';
import {Alert} from 'react-native';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

export default function useGoogleVisionBarcode({
  compareBounds,
  viewFinderBounds,
  output,
  setOutput,
  cameraRef,
  pushAbsenWithScanner,
  route,
  setBarcodeDetectedBounds,
}) {
  const {authGuru = {}} = useSelector(state => state.authGuru) || {};
  const navigation = useNavigation();

  const onGoogleVisionBarcodesDetected = useCallback(
    async barcodeData => {
      try {
        if (
          Array.isArray(barcodeData?.barcodes) &&
          barcodeData?.barcodes?.length > 0
        ) {
          if (output?.length === 0) {
            const collidingBarcodes =
              barcodeData?.barcodes?.filter(barcode =>
                compareBounds(viewFinderBounds, {
                  height: barcode.bounds.size.height,
                  width: barcode.bounds.size.width,
                  x: barcode.bounds.origin.x,
                  y: barcode.bounds.origin.y,
                }),
              ) || [];
            if (collidingBarcodes?.length > 0) {
              if (collidingBarcodes?.[0]?.data) {
                await cameraRef?.current?.pausePreview?.();
                setTimeout(() => {
                  try {
                    setBarcodeDetectedBounds?.(
                      collidingBarcodes?.[0]?.bounds || {},
                    );
                    setOutput(collidingBarcodes?.[0]?.data);
                    if (collidingBarcodes?.[0]?.data?.length > 0) {
                      pushAbsenWithScanner({
                        token: authGuru?.data?.token,
                        jenis_absen: route?.params?.jenis || '',
                        url: 'https://asia-southeast2-absen-rfid.cloudfunctions.net/doAbsensiQrcodeSiswa?unic_key='.concat(
                          collidingBarcodes?.[0]?.data || '',
                        ),
                      });
                    } else {
                      Alert.alert('Error', 'QR Code tidak valid!', [
                        {
                          text: 'Tutup',
                          onPress: () => {
                            setOutput('');
                            setBarcodeDetectedBounds({});
                            cameraRef?.current?.resumePreview?.();
                          },
                        },
                      ]);
                    }
                  } catch (e) {
                    setOutput('');
                    setBarcodeDetectedBounds({});
                    Alert.alert('Error', e?.message || 'Terjadi kesalahan', [
                      {
                        text: 'Tutup',
                        onPress: () => navigation.goBack(),
                      },
                    ]);
                  }
                }, 200);
              }
            }
          }
        }
      } catch (e) {
        setOutput('');
        setBarcodeDetectedBounds({});
        Alert.alert('Error', e?.message || 'Terjadi kesalahan', [
          {
            text: 'Tutup',
            onPress: () => navigation.goBack(),
          },
        ]);
      }
    },
    [
      route,
      setOutput,
      output,
      authGuru,
      cameraRef,
      pushAbsenWithScanner,
      setBarcodeDetectedBounds,
    ],
  );

  return {
    onGoogleVisionBarcodesDetected,
  };
}
