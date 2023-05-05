import {useCallback, useState} from 'react';
import DocumentPicker from 'react-native-document-picker';
import {launchCamera} from 'react-native-image-picker';

// url
import {uploadUrl} from '../../../../../helpers/http';

export default function useUploadFoto() {
  const [urlFile, setUrlFile] = useState('');

  const ambilGambar = useCallback(async authGuru => {
    try {
      const res = await launchCamera({
        mediaType: 'photo',
        includeBase64: true,
        quality: 0.2,
        cameraType: 'back',
      });
      if (res.assets) {
        const formData = new FormData();
        const src = `${authGuru?.data?.website_id}-${
          authGuru?.data?.nama_website || ''
        }/file-pelanggaran-siswa/${authGuru?.data?.user_id || ''}-${
          authGuru?.data?.nama || ''
        }`;
        if (res?.assets?.length > 0) {
          formData.append('berkas', {
            name: res?.assets[0].fileName,
            uri: res?.assets[0].uri,
            size: res?.assets[0].fileSize,
            type: res?.assets[0].type,
          });
          formData.append('src', src);
          formData.append('token', authGuru?.data?.token || '');
          const xhr = new XMLHttpRequest();
          xhr.open('POST', uploadUrl);
          xhr.send(formData);
          xhr.addEventListener('loadend', () => {
            const response = xhr.response ? JSON.parse(xhr.response) : {};
            if (
              response?.status === 'berhasil' &&
              response?.pesan === 'Upload Berhasil'
            ) {
              setUrlFile(response?.url?.url || '');
            }
          });
        }
      }
    } catch (e) {}
  }, []);

  const pilihBerkas = useCallback(async authGuru => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      if (res) {
        const formData = new FormData();
        const src = `${authGuru?.data?.website_id}-${
          authGuru?.data?.nama_website || ''
        }/file-pelanggaran-siswa/${authGuru?.data?.user_id || ''}-${
          authGuru?.data?.nama || ''
        }`;
        if (res?.length > 0) {
          formData.append('berkas', res[0]);
        } else {
          formData.append('berkas', {
            name: res.name,
            uri: res.uri,
            size: res.size,
            type: res.type,
          });
        }
        formData.append('src', src);
        formData.append('token', authGuru?.data?.token || '');
        const xhr = new XMLHttpRequest();
        xhr.open('POST', uploadUrl);
        xhr.send(formData);
        xhr.addEventListener('loadend', () => {
          const response = xhr.response ? JSON.parse(xhr.response) : {};
          if (
            response?.status === 'berhasil' &&
            response?.pesan === 'Upload Berhasil'
          ) {
            setUrlFile(response?.url?.url || '');
          }
        });
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
      } else {
        throw err;
      }
    }
  }, []);

  const deleteFoto = useCallback(() => {
    setUrlFile('');
  }, []);

  return {urlFile, ambilGambar, pilihBerkas, deleteFoto};
}
