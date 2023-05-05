import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import http from '../../../helpers/http';

const initialState = {
  galeriGuru: {},
  isLoadingGaleriGuru: false,
};

export const getGaleriGuru = createAsyncThunk(
  'galeriGuru/getGaleriGuru',
  async ({website_id}) => {
    const {data} = await http().post('sekolah?api=getGallery', {website_id});
    return data;
  },
);

const galeriGuruSlicer = createSlice({
  name: 'galeriGuru',
  initialState,
  reducers: {
    clearGaleriGuru: (state, action) => {
      return {
        ...state,
        galeriGuru: {},
        isLoadingGaleriGuru: false,
      };
    },
  },
  extraReducers: {
    [getGaleriGuru.pending]: state => {
      return {
        ...state,
        isLoadingGaleriGuru: true,
      };
    },
    [getGaleriGuru.fulfilled]: (state, {payload}) => {
      return {
        ...state,
        isLoadingGaleriGuru: false,
        galeriGuru: payload,
      };
    },
    [getGaleriGuru.rejected]: state => {
      return {
        ...state,
        isLoadingGaleriGuru: false,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const {clearGaleriGuru} = galeriGuruSlicer.actions;

export default galeriGuruSlicer.reducer;
