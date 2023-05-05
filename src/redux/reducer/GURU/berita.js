import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import http from '../../../helpers/http';

const initialState = {
  beritaGuru: {},
  isLoadingBeritaGuru: false,
};

export const getBeritaGuru = createAsyncThunk(
  'beritaGuru/getBeritaGuru',
  async ({website_id}) => {
    const {data} = await http().post('sekolah?api=getBerita', {website_id});
    return data;
  },
);

const beritaGuruSlicer = createSlice({
  name: 'beritaGuru',
  initialState,
  reducers: {
    clearBeritaGuru: (state, action) => {
      return {
        ...state,
        beritaGuru: {},
        isLoadingBeritaGuru: false,
      };
    },
  },
  extraReducers: {
    [getBeritaGuru.pending]: state => {
      return {
        ...state,
        isLoadingBeritaGuru: true,
        beritaGuru: {},
      };
    },
    [getBeritaGuru.fulfilled]: (state, {payload}) => {
      return {
        ...state,
        isLoadingBeritaGuru: false,
        beritaGuru: payload,
      };
    },
    [getBeritaGuru.rejected]: state => {
      return {
        ...state,
        isLoadingBeritaGuru: false,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const {clearBeritaGuru} = beritaGuruSlicer.actions;

export default beritaGuruSlicer.reducer;
