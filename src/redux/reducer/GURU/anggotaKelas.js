import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import http from '../../../helpers/http';

const initialState = {
  anggotaKelas: {},
  isLoadingAnggotaKelas: false,
};

export const getAnggotaKelas = createAsyncThunk(
  'anggotaKelas/getAnggotaKelas',
  async ({tahunajaran_id, kelas_id}) => {
    const {data} = await http().post('sekolah?api=getAnggotaKelas', {
      tahunajaran_id,
      kelas_id,
    });
    return data;
  },
);

const anggotaKelasSlicer = createSlice({
  name: 'anggotaKelas',
  initialState,
  reducers: {
    clearAnggotaKelas: (state, action) => {
      return {
        ...state,
        anggotaKelas: {},
        isLoadingAnggotaKelas: false,
      };
    },
  },
  extraReducers: {
    [getAnggotaKelas.pending]: state => {
      return {
        ...state,
        isLoadingAnggotaKelas: true,
        anggotaKelas: {},
      };
    },
    [getAnggotaKelas.fulfilled]: (state, {payload}) => {
      return {
        ...state,
        isLoadingAnggotaKelas: false,
        anggotaKelas: payload,
      };
    },
    [getAnggotaKelas.rejected]: state => {
      return {
        ...state,
        isLoadingAnggotaKelas: false,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const {clearAnggotaKelas} = anggotaKelasSlicer.actions;

export default anggotaKelasSlicer.reducer;
