import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import http from '../../../helpers/http';

const initialState = {
  mataPelajaran: {},
  isLoadingMataPelajaran: false,
};

export const getMataPelajaran = createAsyncThunk(
  'mataPelajaran/getMataPelajaran',
  async ({tahunajaran_id}) => {
    const {data} = await http().post('sekolah?api=getMatapelajaran', {
      tahunajaran_id,
    });
    return data;
  },
);

const kelasSlicer = createSlice({
  name: 'mataPelajaran',
  initialState,
  reducers: {
    clearKelas: (state, action) => {
      return {
        ...state,
        mataPelajaran: {},
        isLoadingMataPelajaran: false,
      };
    },
  },
  extraReducers: {
    [getMataPelajaran.pending]: state => {
      return {
        ...state,
        isLoadingMataPelajaran: true,
        mataPelajaran: {},
      };
    },
    [getMataPelajaran.fulfilled]: (state, {payload}) => {
      return {
        ...state,
        isLoadingMataPelajaran: false,
        mataPelajaran: payload,
      };
    },
    [getMataPelajaran.rejected]: state => {
      return {
        ...state,
        isLoadingMataPelajaran: false,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const {clearKelas} = kelasSlicer.actions;

export default kelasSlicer.reducer;
