/* eslint-disable react-hooks/exhaustive-deps */
import {useCallback, useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {getTahunAjaran as getTahunAjaranReduxActions} from '@src/redux/reducer/SISWA/tahunAjaran';

export default function useGetTahunAjaran() {
  const dispatch = useDispatch();
  const {authGuru = {}} = useSelector(state => state.authGuru) || {};
  const {tahunAjaran = {}} = useSelector(state => state.tahunAjaran) || {};
  const [tahunAjaranSelected, setTahunAjaranSelected] = useState('');

  const getTahunAjaran = useCallback(() => {
    dispatch(
      getTahunAjaranReduxActions({
        website_id: authGuru?.data?.website_id,
      }),
    );
  }, [authGuru]);

  useEffect(() => {
    getTahunAjaran();
  }, []);

  const tahunAjaranList = useMemo(() => {
    if (Array?.isArray(tahunAjaran?.result)) {
      return tahunAjaran?.result?.map(item => item?.tahunajaran);
    } else {
      return [];
    }
  }, [tahunAjaran]);

  const getTahunAjaranSelectedId = useMemo(() => {
    if (Array.isArray(tahunAjaran?.result)) {
      if (tahunAjaranSelected) {
        const {tahunajaran_id = ''} =
          tahunAjaran?.result?.find(
            item => item?.tahunajaran === tahunAjaranSelected,
          ) || {};
        return tahunajaran_id;
      }
    } else {
      return null;
    }
  }, [tahunAjaran, tahunAjaranSelected]);

  return {
    tahunAjaranList,
    tahunAjaranSelected,
    setTahunAjaranSelected,
    getTahunAjaranSelectedId,
  };
}
