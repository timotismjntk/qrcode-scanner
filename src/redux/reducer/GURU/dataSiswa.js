import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import http from '../../../helpers/http';

const initialState = {
  dataSiswa: {},
  isLoadingDataSiswa: false,
  dataSiswaByKelas: {},
  isLoadingDataSiswaByKelas: false,
};

export const getDataSiswa = createAsyncThunk(
  'dataSiswa/getDataSiswa',
  async ({tahun_masuk, website_id}) => {
    const {data} = await http().post('getDataSiswa', {tahun_masuk, website_id});
    return data;
  },
);

export const getDataSiswaByKelas = createAsyncThunk(
  'dataSiswa/getDataSiswaByKelas',
  async ({kelas_id}) => {
    const {data} = await http().post('sekolah?api=getSiswa', {kelas_id});
    return data;
  },
);

const dataSiswaSlicer = createSlice({
  name: 'dataSiswa',
  initialState,
  reducers: {
    clearDataSiswa: (state, action) => {
      return {
        ...state,
        dataSiswa: {},
        isLoadingDataSiswa: false,
      };
    },
    clearDataSiswaByKelas: (state, action) => {
      return {
        ...state,
        dataSiswaByKelas: {},
        isLoadingDataSiswaByKelas: false,
      };
    },
  },
  extraReducers: {
    [getDataSiswa.pending]: state => {
      return {
        ...state,
        isLoadingDataSiswa: true,
        dataSiswa: {},
      };
    },
    [getDataSiswa.fulfilled]: (state, {payload}) => {
      return {
        ...state,
        isLoadingDataSiswa: false,
        dataSiswa: payload,
      };
    },
    [getDataSiswa.rejected]: state => {
      return {
        ...state,
        isLoadingDataSiswa: false,
      };
    },
    [getDataSiswaByKelas.pending]: state => {
      return {
        ...state,
        isLoadingDataSiswaByKelas: true,
        dataSiswaByKelas: {},
      };
    },
    [getDataSiswaByKelas.fulfilled]: (state, {payload}) => {
      return {
        ...state,
        isLoadingDataSiswaByKelas: false,
        dataSiswaByKelas: payload,
      };
    },
    [getDataSiswaByKelas.rejected]: state => {
      return {
        ...state,
        isLoadingDataSiswaByKelas: false,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const {clearDataSiswa} = dataSiswaSlicer.actions;

export default dataSiswaSlicer.reducer;
