import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import http from '../../../helpers/http';

const initialState = {
  dataGuru: {},
  isLoadingDataGuru: false,
};

export const getDataGuru = createAsyncThunk(
  'dataGuru/getDataGuru',
  async ({website_id}) => {
    const {data} = await http().post('getDataGuru', {website_id});
    return data;
  },
);

const dataGuruSlicer = createSlice({
  name: 'dataGuru',
  initialState,
  reducers: {
    clearDataGuru: (state, action) => {
      return {
        ...state,
        dataGuru: {},
        isLoadingDataGuru: false,
      };
    },
  },
  extraReducers: {
    [getDataGuru.pending]: state => {
      return {
        ...state,
        isLoadingDataGuru: true,
        dataGuru: {},
      };
    },
    [getDataGuru.fulfilled]: (state, {payload}) => {
      return {
        ...state,
        isLoadingDataGuru: false,
        dataGuru: payload,
      };
    },
    [getDataGuru.rejected]: state => {
      return {
        ...state,
        isLoadingDataGuru: false,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const {clearDataGuru} = dataGuruSlicer.actions;

export default dataGuruSlicer.reducer;
