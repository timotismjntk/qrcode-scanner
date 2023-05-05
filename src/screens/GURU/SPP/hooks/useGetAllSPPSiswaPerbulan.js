/* eslint-disable react-hooks/exhaustive-deps */
import {useCallback, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {getAllSPPSiswaPerbulan as getAllSPPSiswaPerbulanReduxActions} from '@src/redux/reducer/GURU/spp_siswa_role_guru';

export default function useGetAllSPPSiswaPerbulan({
  tahunajaran_id,
  kelas_id,
  bulan,
}) {
  const dispatch = useDispatch();
  const {authGuru = {}} = useSelector(state => state.authGuru) || {};
  const {allSPPSiswaPerbulan = {}, isLoadingAllSPPSiswaPerbulan = false} =
    useSelector(state => state.spp_siswa_role_guru) || {};

  const getAllSPPSiswaPerbulan = useCallback(() => {
    if (tahunajaran_id && kelas_id && bulan) {
      const token = authGuru?.data?.token;
      dispatch(
        getAllSPPSiswaPerbulanReduxActions({
          token: token,
          tahunajaran_id,
          kelas_id,
          bulan: bulan?.split('-').reverse().join('-'),
        }),
      );
    }
  }, [authGuru, bulan, kelas_id, tahunajaran_id]);

  const listSPPSiswaPerbulan = useMemo(() => {
    if (Array.isArray(allSPPSiswaPerbulan?.spps)) {
      return allSPPSiswaPerbulan?.spps?.map(item => ({
        ...item,
        status:
          Number(item?.spp_dibayarkan) > 0 ? 'Sudah Bayar' : 'Belum Bayar',
      }));
    } else {
      return [];
    }
  }, [allSPPSiswaPerbulan]);

  return {
    getAllSPPSiswaPerbulan,
    listSPPSiswaPerbulan,
    isLoadingAllSPPSiswaPerbulan,
  };
}
