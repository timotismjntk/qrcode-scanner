/* eslint-disable react-hooks/exhaustive-deps */
import {useCallback, useEffect, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';

// redux actions
import {getRiwayatPembayaranSPPSaya as getRiwayatPembayaranSPPSayaReduxActions} from '@src/redux/reducer/SISWA/spp_siswa_role_siswa';

// hooks
import useDateFormatter from '@src/hooks/useDateFormatter';
import useCurrency from '@src/hooks/useCurrency';

export default function useGetRiwayatPembayaranSPPSaya({tahun}) {
  const {dateFormatter} = useDateFormatter();
  const {currency} = useCurrency();
  const dispatch = useDispatch();
  const {authSiswa = {}} = useSelector(state => state.authSiswa) || {};
  const {
    riwayatPembayaranSPPSaya = {},
    isLoadingRiwayatPembayaranSPPSaya = false,
  } = useSelector(state => state.spp_siswa_role_siswa) || {};

  const getRiwayatPembayaranSPPSaya = useCallback(() => {
    const token = authSiswa?.data?.token;
    dispatch(
      getRiwayatPembayaranSPPSayaReduxActions({
        token: token,
        tahun: tahun || new Date().getFullYear(),
      }),
    );
  }, [authSiswa, tahun]);

  useEffect(() => {
    getRiwayatPembayaranSPPSaya();
  }, [tahun]);

  const listRiwayatPembayaranSPPSaya = useMemo(() => {
    if (Array.isArray(riwayatPembayaranSPPSaya?.spps)) {
      return riwayatPembayaranSPPSaya?.spps?.map(item => ({
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
  }, [riwayatPembayaranSPPSaya]);

  const saya = useMemo(() => {
    return riwayatPembayaranSPPSaya?.siswa || {};
  }, [riwayatPembayaranSPPSaya]);

  const totalSudahDibayar = useMemo(() => {
    if (Array.isArray(riwayatPembayaranSPPSaya?.spps)) {
      const total = riwayatPembayaranSPPSaya?.spps?.reduce((acc, curr) => {
        acc += Number(curr.spp_dibayarkan);
        return acc;
      }, 0);
      return currency(total);
    } else {
      return currency(0);
    }
  }, [riwayatPembayaranSPPSaya]);

  return {
    getRiwayatPembayaranSPPSaya,
    saya,
    totalSudahDibayar,
    listRiwayatPembayaranSPPSaya,
    isLoadingRiwayatPembayaranSPPSaya,
  };
}
