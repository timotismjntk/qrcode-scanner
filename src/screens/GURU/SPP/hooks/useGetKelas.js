/* eslint-disable react-hooks/exhaustive-deps */
import {useCallback, useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {getKelas as getKelasReduxActions} from '@src/redux/reducer/SISWA/kelas';

export default function useGetKelas({tahunajaran_id}) {
  const dispatch = useDispatch();
  const {authGuru = {}} = useSelector(state => state.authGuru) || {};
  const {kelas = {}} = useSelector(state => state.kelas) || {};
  const [kelasSelected, setKelasSelected] = useState('');

  const getKelas = useCallback(() => {
    dispatch(getKelasReduxActions({tahunajaran_id: tahunajaran_id}));
  }, [authGuru, tahunajaran_id]);

  useEffect(() => {
    if (tahunajaran_id) {
      getKelas();
    }
  }, [tahunajaran_id]);

  const kelasList = useMemo(() => {
    if (Array?.isArray(kelas?.result)) {
      return kelas?.result?.map(item => item?.nama_kelas);
    } else {
      return [];
    }
  }, [kelas]);

  const getKelasSelectedId = useMemo(() => {
    if (authGuru?.status === 'berhasil') {
      const {kelas_id} =
        kelas?.result?.find(item => item?.nama_kelas === kelasSelected) || {};
      return kelas_id;
    } else {
      return null;
    }
  }, [kelas, kelasSelected]);

  return {
    kelasList,
    kelasSelected,
    setKelasSelected,
    getKelasSelectedId,
  };
}
