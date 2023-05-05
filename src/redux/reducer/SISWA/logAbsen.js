import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import http from '../../../helpers/http';

const initialState = {
  logAbsenSiswa: {},
  logAbsenSiswaByKelas: {},
  isLoadingLogAbsenSiswaByKelas: false,
  isLoadingLogAbsenSiswa: false,
};

export const getLogAbsenSiswa = createAsyncThunk(
  'logAbsenSiswa/getLogAbsenSiswa',
  async ({siswa_id, tahun, bulan}) => {
    const {data} = await http().post('getLogAbsen', {siswa_id, tahun, bulan});
    return data;
  },
);

export const getLogAbsenSiswaByKelas = createAsyncThunk(
  'logAbsenSiswa/getLogAbsenSiswaByKelas',
  async ({kelas_id, tahunajaran_id, tanggal, website_id}) => {
    const {data} = await http().post('getLogAbsen?api=absensiHarian', {
      kelas_id,
      tanggal,
      website_id,
      tahunajaran_id,
    });
    return data;
  },
);

const logAbsenSiswaSlicer = createSlice({
  name: 'logAbsenSiswa',
  initialState,
  reducers: {
    clearlogAbsenSiswa: (state, action) => {
      return {
        ...state,
        logAbsenSiswa: {},
        isLoadingLogAbsenSiswa: false,
      };
    },
    clearlogAbsenSiswaByKelas: (state, action) => {
      return {
        ...state,
        logAbsenSiswaByKelas: {},
        isLoadingLogAbsenSiswaByKelas: false,
      };
    },
  },
  extraReducers: {
    [getLogAbsenSiswa.pending]: state => {
      return {
        ...state,
        isLoadingLogAbsenSiswa: true,
      };
    },
    [getLogAbsenSiswa.fulfilled]: (state, {payload}) => {
      return {
        ...state,
        isLoadingLogAbsenSiswa: false,
        logAbsenSiswa: payload,
      };
    },
    [getLogAbsenSiswa.rejected]: state => {
      return {
        ...state,
        isLoadingLogAbsenSiswa: false,
      };
    },
    [getLogAbsenSiswaByKelas.pending]: state => {
      return {
        ...state,
        isLoadingLogAbsenSiswaByKelas: true,
      };
    },
    [getLogAbsenSiswaByKelas.fulfilled]: (state, {payload}) => {
      return {
        ...state,
        isLoadingLogAbsenSiswaByKelas: false,
        logAbsenSiswaByKelas: payload,
      };
    },
    [getLogAbsenSiswaByKelas.rejected]: state => {
      return {
        ...state,
        isLoadingLogAbsenSiswaByKelas: false,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const {clearlogAbsenSiswa, clearlogAbsenSiswaByKelas} =
  logAbsenSiswaSlicer.actions;

export default logAbsenSiswaSlicer.reducer;
