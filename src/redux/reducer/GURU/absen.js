import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import http from '../../../helpers/http';

const initialState = {
  absenGuru: {},
  isLoadingAbsenGuru: false,
};

export const mulaiAbsen_QRCODE_Guru = createAsyncThunk(
  'absenGuru/mulaiAbsen_QRCODE_Guru',
  async ({jenis_absen, kategori, pengguna_id, url}) => {
    const {data} = await http().post(url, {
      jenis_absen,
      kategori,
      pengguna_id,
    });
    return data;
  },
);

const absenGuruSlicer = createSlice({
  name: 'absenGuru',
  initialState,
  reducers: {
    clearMulaiAbsenGuru: (state, action) => {
      return {
        ...state,
        absenGuru: {},
      };
    },
  },
  extraReducers: {
    [mulaiAbsen_QRCODE_Guru.pending]: state => {
      return {
        ...state,
        isLoadingAbsenGuru: true,
      };
    },
    [mulaiAbsen_QRCODE_Guru.fulfilled]: (state, {payload}) => {
      return {
        ...state,
        isLoadingAbsenGuru: false,
        absenGuru: payload,
      };
    },
    [mulaiAbsen_QRCODE_Guru.rejected]: state => {
      return {
        ...state,
        isLoadingAbsenSiswaByGuru: false,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const {clearMulaiAbsenGuru} = absenGuruSlicer.actions;

export default absenGuruSlicer.reducer;
