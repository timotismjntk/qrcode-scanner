import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import http from '../../../helpers/http';

const initialState = {
  absenSiswa: {},
  isLoadingAbsenSiswa: false,
};

export const mulaiAbsen_QRCODE_Siswa = createAsyncThunk(
  'absenSiswa/mulaiAbsen_QRCODE_Siswa',
  async ({jenis_absen, kategori, pengguna_id, url}) => {
    const {data} = await http().post(url, {
      jenis_absen,
      kategori,
      pengguna_id,
    });
    return data;
  },
);

const absenSiswaSlicer = createSlice({
  name: 'absenSiswa',
  initialState,
  reducers: {
    clearMulaiAbsenSiswa: (state, action) => {
      return {
        ...state,
        absenSiswa: {},
        isLoadingAbsenSiswa: false,
      };
    },
  },
  extraReducers: {
    [mulaiAbsen_QRCODE_Siswa.pending]: state => {
      return {
        ...state,
        isLoadingAbsenSiswa: true,
      };
    },
    [mulaiAbsen_QRCODE_Siswa.fulfilled]: (state, {payload}) => {
      return {
        ...state,
        isLoadingAbsenSiswa: false,
        absenSiswa: payload,
      };
    },
    [mulaiAbsen_QRCODE_Siswa.rejected]: state => {
      return {
        ...state,
        isLoadingAbsenSiswa: false,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const {clearMulaiAbsenSiswa} = absenSiswaSlicer.actions;

export default absenSiswaSlicer.reducer;
