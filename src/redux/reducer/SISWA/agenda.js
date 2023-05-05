import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import http from '../../../helpers/http';

const initialState = {
  agendaSiswa: {},
  isLoadingAgendaSiswa: false,
};

export const getAgendaSiswa = createAsyncThunk(
  'agendaSiswa/getAgendaSiswa',
  async ({website_id, tahun = null, bulan = null}) => {
    const {data} = await http().post('sekolah?api=getAgenda', {
      website_id,
      tahun,
      bulan,
    });
    return data;
  },
);

const agendaSiswaSlicer = createSlice({
  name: 'agendaSiswa',
  initialState,
  reducers: {
    clearAgendaSiswa: (state, action) => {
      return {
        ...state,
        agendaSiswa: {},
        isLoadingAgendaSiswa: false,
      };
    },
  },
  extraReducers: {
    [getAgendaSiswa.pending]: state => {
      return {
        ...state,
        isLoadingAgendaSiswa: true,
      };
    },
    [getAgendaSiswa.fulfilled]: (state, {payload}) => {
      return {
        ...state,
        isLoadingAgendaSiswa: false,
        agendaSiswa: payload,
      };
    },
    [getAgendaSiswa.rejected]: state => {
      return {
        ...state,
        isLoadingAgendaSiswa: false,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const {clearAgendaSiswa} = agendaSiswaSlicer.actions;

export default agendaSiswaSlicer.reducer;
