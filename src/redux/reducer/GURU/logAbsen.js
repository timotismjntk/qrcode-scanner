import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import http from '../../../helpers/http';

const initialState = {
  logAbsenGuru: {},
  isLoadingLogAbsenGuru: false,
};

export const getLogAbsenGuru = createAsyncThunk(
  'logAbsenGuru/getLogAbsenGuru',
  async ({sdm_id, tahun, bulan}) => {
    const {data} = await http().post('getLogAbsen', {sdm_id, tahun, bulan});
    return data;
  },
);

const logAbsenGuruSlicer = createSlice({
  name: 'logAbsenGuru',
  initialState,
  reducers: {
    clearlogAbsenGuru: (state, action) => {
      return {
        ...state,
        logAbsenGuru: {},
        isLoadingLogAbsenGuru: false,
      };
    },
  },
  extraReducers: {
    [getLogAbsenGuru.pending]: state => {
      return {
        ...state,
        isLoadingLogAbsenGuru: true,
        logAbsenGuru: {},
      };
    },
    [getLogAbsenGuru.fulfilled]: (state, {payload}) => {
      return {
        ...state,
        isLoadingLogAbsenGuru: false,
        logAbsenGuru: payload,
      };
    },
    [getLogAbsenGuru.rejected]: state => {
      return {
        ...state,
        isLoadingLogAbsenGuru: false,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const {clearlogAbsenGuru} = logAbsenGuruSlicer.actions;

export default logAbsenGuruSlicer.reducer;
