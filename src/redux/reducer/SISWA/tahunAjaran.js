import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import http from '../../../helpers/http';

const initialState = {
  tahunAjaran: {},
  isLoadingTahunAjaran: false,
};

export const getTahunAjaran = createAsyncThunk(
  'tahunAjaran/getTahunAjaran',
  async ({website_id}) => {
    const {data} = await http().post('sekolah?api=getTahunajaran', {
      website_id,
    });
    return data;
  },
);

const tahunAjaranSlicer = createSlice({
  name: 'tahunAjaran',
  initialState,
  reducers: {
    clearTahunAjaran: (state, action) => {
      return {
        ...state,
        tahunAjaran: {},
        isLoadingTahunAjaran: false,
      };
    },
  },
  extraReducers: {
    [getTahunAjaran.pending]: state => {
      return {
        ...state,
        isLoadingTahunAjaran: true,
        tahunAjaran: {},
      };
    },
    [getTahunAjaran.fulfilled]: (state, {payload}) => {
      return {
        ...state,
        isLoadingTahunAjaran: false,
        tahunAjaran: payload,
      };
    },
    [getTahunAjaran.rejected]: state => {
      return {
        ...state,
        isLoadingTahunAjaran: false,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const {clearTahunAjaran} = tahunAjaranSlicer.actions;

export default tahunAjaranSlicer.reducer;
