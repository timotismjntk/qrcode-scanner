import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import http from '../../../helpers/http';

const initialState = {
  jadwalPelajaran: {},
  isLoadingJadwalPelajaran: false,
};

export const getJadwalPelajaran = createAsyncThunk(
  'jadwalPelajaran/getJadwalPelajaran',
  async ({kelas_id, hari}) => {
    const {data} = await http().post('sekolah?api=getJadwalPelajaran', {
      kelas_id,
      hari,
    });
    return data;
  },
);

const jadwalPelajaranSlicer = createSlice({
  name: 'jadwalPelajaran',
  initialState,
  reducers: {
    clearJadwalPelajaran: (state, action) => {
      return {
        ...state,
        jadwalPelajaran: {},
        isLoadingJadwalPelajaran: false,
      };
    },
  },
  extraReducers: {
    [getJadwalPelajaran.pending]: state => {
      return {
        ...state,
        isLoadingJadwalPelajaran: true,
      };
    },
    [getJadwalPelajaran.fulfilled]: (state, {payload}) => {
      return {
        ...state,
        isLoadingJadwalPelajaran: false,
        jadwalPelajaran: payload,
      };
    },
    [getJadwalPelajaran.rejected]: state => {
      return {
        ...state,
        isLoadingJadwalPelajaran: false,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const {clearJadwalPelajaran} = jadwalPelajaranSlicer.actions;

export default jadwalPelajaranSlicer.reducer;
