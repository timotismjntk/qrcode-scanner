/* eslint-disable react-hooks/exhaustive-deps */
import {useCallback, useEffect, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';

// redux actions
import {getRiwayatPembayaranSPPSiswa as getRiwayatPembayaranSPPSiswaReduxActions} from '@src/redux/reducer/GURU/spp_siswa_role_guru';

// hooks
import useDateFormatter from '@src/hooks/useDateFormatter';
import useCurrency from '@src/hooks/useCurrency';

export default function useGetRiwayatPembayaranSPPSiswa({tahun, siswa_id}) {
  const {dateFormatter} = useDateFormatter();
  const {currency} = useCurrency();
  const dispatch = useDispatch();
  const {authGuru = {}} = useSelector(state => state.authGuru) || {};
  const {
    riwayatPembayaranSPPSiswa = {},
    isLoadingRiwayatPembayaranSPPSiswa = false,
  } = useSelector(state => state.spp_siswa_role_guru) || {};

  const getRiwayatPembayaranSPPSiswa = useCallback(() => {
    if (siswa_id) {
      const token = authGuru?.data?.token;
      dispatch(
        getRiwayatPembayaranSPPSiswaReduxActions({
          token: token,
          tahun: tahun || new Date().getFullYear(),
          siswa_id,
        }),
      );
    }
  }, [authGuru, tahun, siswa_id]);

  useEffect(() => {
    getRiwayatPembayaranSPPSiswa();
  }, [tahun]);

  const listRiwayatPembayaranSPPSiswa = useMemo(() => {
    if (Array.isArray(riwayatPembayaranSPPSiswa?.spps)) {
      return riwayatPembayaranSPPSiswa?.spps?.map(item => ({
        ...item,
        status:
          Number(item?.spp_dibayarkan) > 0 ? 'Sudah Dibayar' : 'Belum Dibayar',
        tanggal_pembayaran: dateFormatter({
          currentDate: item?.tanggal_pembayaran,
          formatOptions: {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
          },
        }),
        spp_dibayarkan: currency(item.spp_dibayarkan),
        bulan: dateFormatter({
          currentDate: item?.bulan?.concat('-01'),
          formatOptions: {
            month: 'long',
            year: 'numeric',
          },
        }),
      }));
    } else {
      return [];
    }
  }, [riwayatPembayaranSPPSiswa]);

  const siswa = useMemo(() => {
    return riwayatPembayaranSPPSiswa?.siswa || {};
  }, [riwayatPembayaranSPPSiswa]);

  const totalSudahDibayar = useMemo(() => {
    if (Array.isArray(riwayatPembayaranSPPSiswa?.spps)) {
      const total = riwayatPembayaranSPPSiswa?.spps?.reduce((acc, curr) => {
        acc += Number(curr.spp_dibayarkan);
        return acc;
      }, 0);
      return currency(total);
    } else {
      return currency(0);
    }
  }, [riwayatPembayaranSPPSiswa]);

  return {
    getRiwayatPembayaranSPPSiswa,
    siswa,
    totalSudahDibayar,
    listRiwayatPembayaranSPPSiswa,
    isLoadingRiwayatPembayaranSPPSiswa,
  };
}
