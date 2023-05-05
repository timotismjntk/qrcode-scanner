import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import http from '../../../helpers/http';

const initialState = {
  beritaSiswa: {},
  isLoadingBeritaSiswa: false,
};

export const getBeritaSiswa = createAsyncThunk(
  'beritaSiswa/getBeritaSiswa',
  async ({website_id}) => {
    const {data} = await http().post('sekolah?api=getBerita', {website_id});
    return data;
  },
);

const beritaSiswaSlicer = createSlice({
  name: 'beritaSiswa',
  initialState,
  reducers: {
    clearBeritaSiswa: (state, action) => {
      return {
        ...state,
        beritaSiswa: {},
        isLoadingBeritaSiswa: false,
      };
    },
  },
  extraReducers: {
    [getBeritaSiswa.pending]: state => {
      return {
        ...state,
        isLoadingBeritaSiswa: true,
        beritaSiswa: {},
      };
    },
    [getBeritaSiswa.fulfilled]: (state, {payload}) => {
      return {
        ...state,
        isLoadingBeritaSiswa: false,
        beritaSiswa: payload,
      };
    },
    [getBeritaSiswa.rejected]: state => {
      return {
        ...state,
        isLoadingBeritaSiswa: false,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const {clearBeritaSiswa} = beritaSiswaSlicer.actions;

export default beritaSiswaSlicer.reducer;
