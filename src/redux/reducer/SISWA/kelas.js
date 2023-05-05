import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import http from '../../../helpers/http';

const initialState = {
  kelas: {},
  isLoadingKelas: false,
};

export const getKelas = createAsyncThunk(
  'kelas/getKelas',
  async ({tahunajaran_id}) => {
    const {data} = await http().post('sekolah?api=getKelas', {
      tahunajaran_id,
    });
    return data;
  },
);

const kelasSlicer = createSlice({
  name: 'kelas',
  initialState,
  reducers: {
    clearKelas: (state, action) => {
      return {
        ...state,
        kelas: {},
        isLoadingKelas: false,
      };
    },
  },
  extraReducers: {
    [getKelas.pending]: state => {
      return {
        ...state,
        isLoadingKelas: true,
        kelas: {},
      };
    },
    [getKelas.fulfilled]: (state, {payload}) => {
      return {
        ...state,
        isLoadingKelas: false,
        kelas: payload,
      };
    },
    [getKelas.rejected]: state => {
      return {
        ...state,
        isLoadingKelas: false,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const {clearKelas} = kelasSlicer.actions;

export default kelasSlicer.reducer;
