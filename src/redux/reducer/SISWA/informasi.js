import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import http from '../../../helpers/http';

const initialState = {
  informasiSiswa: {},
  isLoadingInformasiSiswa: false,
};

export const getInformasiSiswa = createAsyncThunk(
  'informasiSiswa/getInformasiSiswa',
  async ({website_id}) => {
    const {data} = await http().post('sekolah?api=getInformasi', {website_id});
    return data;
  },
);

const informasiSiswaSlicer = createSlice({
  name: 'informasiSiswa',
  initialState,
  reducers: {
    clearinformasiSiswa: (state, action) => {
      return {
        ...state,
        informasiSiswa: {},
        isLoadingInformasiSiswa: false,
      };
    },
  },
  extraReducers: {
    [getInformasiSiswa.pending]: state => {
      return {
        ...state,
        isLoadingInformasiSiswa: true,
      };
    },
    [getInformasiSiswa.fulfilled]: (state, {payload}) => {
      return {
        ...state,
        isLoadingInformasiSiswa: false,
        informasiSiswa: payload,
      };
    },
    [getInformasiSiswa.rejected]: state => {
      return {
        ...state,
        isLoadingInformasiSiswa: false,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const {clearinformasiSiswa} = informasiSiswaSlicer.actions;

export default informasiSiswaSlicer.reducer;
