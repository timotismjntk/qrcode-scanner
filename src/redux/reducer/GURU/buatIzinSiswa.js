import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import http from '../../../helpers/http';

const initialState = {
  siswa: {},
  isLoadingSiswa: {},
  buatIzinSiswaResult: {},
  isLoadingBuatIzin: false,
};

export const getSiswa = createAsyncThunk(
  'siswa/getSiswa',
  async ({kelas_id}) => {
    const {data} = await http().post('sekolah?api=getSiswa', {
      kelas_id,
    });
    return data;
  },
);

export const buatIzinSiswa = createAsyncThunk(
  'izin/buatIzin',
  async ({
    website_id,
    tahunajaran_id,
    kelas_id,
    siswa_id,
    mulai,
    sampai,
    jenis_izin,
    keterangan,
  }) => {
    const {data} = await http().post('sekolah?api=buatIzinsiswa', {
      website_id,
      tahunajaran_id,
      kelas_id,
      siswa_id,
      mulai,
      sampai,
      jenis_izin,
      keterangan,
    });
    return data;
  },
);

const buatIzinSlicer = createSlice({
  name: 'buatIzinSiswa',
  initialState,
  reducers: {
    clearSiswa: (state, action) => {
      return {
        ...state,
        siswa: {},
        isLoadingSiswa: false,
      };
    },
    clearBuatIzinSiswa: (state, action) => {
      return {
        ...state,
        buatIzinSiswaResult: {},
        isLoadingBuatIzin: false,
      };
    },
  },
  extraReducers: {
    [getSiswa.pending]: state => {
      return {
        ...state,
        isLoadingSiswa: true,
        siswa: {},
      };
    },
    [getSiswa.fulfilled]: (state, {payload}) => {
      return {
        ...state,
        isLoadingSiswa: false,
        siswa: payload,
      };
    },
    [getSiswa.rejected]: state => {
      return {
        ...state,
        isLoadingSiswa: false,
      };
    },
    [buatIzinSiswa.pending]: state => {
      return {
        ...state,
        isLoadingBuatIzin: true,
        buatIzinSiswaResult: {},
      };
    },
    [buatIzinSiswa.fulfilled]: (state, {payload}) => {
      return {
        ...state,
        isLoadingBuatIzin: false,
        buatIzinSiswaResult: payload,
      };
    },
    [buatIzinSiswa.rejected]: state => {
      return {
        ...state,
        isLoadingBuatIzin: false,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const {clearSiswa, clearBuatIzinSiswa} = buatIzinSlicer.actions;

export default buatIzinSlicer.reducer;
