import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import http from '../../../helpers/http';

const initialState = {
  informasiGuru: {},
  isLoadingInformasiGuru: false,
};

export const getInformasiGuru = createAsyncThunk(
  'informasiGuru/getInformasiGuru',
  async ({website_id}) => {
    const {data} = await http().post('sekolah?api=getInformasi', {website_id});
    return data;
  },
);

const informasiGuruSlicer = createSlice({
  name: 'informasiGuru',
  initialState,
  reducers: {
    clearinformasiGuru: (state, action) => {
      return {
        ...state,
        informasiGuru: {},
        isLoadingInformasiGuru: false,
      };
    },
  },
  extraReducers: {
    [getInformasiGuru.pending]: state => {
      return {
        ...state,
        isLoadingInformasiGuru: true,
      };
    },
    [getInformasiGuru.fulfilled]: (state, {payload}) => {
      return {
        ...state,
        isLoadingInformasiGuru: false,
        informasiGuru: payload,
      };
    },
    [getInformasiGuru.rejected]: state => {
      return {
        ...state,
        isLoadingInformasiGuru: false,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const {clearinformasiGuru} = informasiGuruSlicer.actions;

export default informasiGuruSlicer.reducer;
