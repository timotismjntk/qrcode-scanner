import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import http from '../../../helpers/http';

const initialState = {
  galeriSiswa: {},
  isLoadingGaleriSiswa: false,
};

export const getGaleriSiswa = createAsyncThunk(
  'galeriSiswa/getGaleriSiswa',
  async ({website_id}) => {
    const {data} = await http().post('sekolah?api=getGallery', {website_id});
    return data;
  },
);

const galeriSiswaSlicer = createSlice({
  name: 'galeriSiswa',
  initialState,
  reducers: {
    clearGaleriSiswa: (state, action) => {
      return {
        ...state,
        galeriSiswa: {},
        isLoadingGaleriSiswa: false,
      };
    },
  },
  extraReducers: {
    [getGaleriSiswa.pending]: state => {
      return {
        ...state,
        isLoadingGaleriSiswa: true,
      };
    },
    [getGaleriSiswa.fulfilled]: (state, {payload}) => {
      return {
        ...state,
        isLoadingGaleriSiswa: false,
        galeriSiswa: payload,
      };
    },
    [getGaleriSiswa.rejected]: state => {
      return {
        ...state,
        isLoadingGaleriSiswa: false,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const {clearGaleriSiswa} = galeriSiswaSlicer.actions;

export default galeriSiswaSlicer.reducer;
