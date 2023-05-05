import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import http from '../../../helpers/http';

const initialState = {
  agendaGuru: {},
  isLoadingAgendaGuru: false,
};

export const getAgendaGuru = createAsyncThunk(
  'agendaGuru/getAgendaGuru',
  async ({website_id, tahun = null, bulan = null}) => {
    const {data} = await http().post('sekolah?api=getAgenda', {
      website_id,
      tahun,
      bulan,
    });
    return data;
  },
);

const agendaGuruSlicer = createSlice({
  name: 'agendaGuru',
  initialState,
  reducers: {
    clearAgendaGuru: (state, action) => {
      return {
        ...state,
        agendaGuru: {},
        isLoadingAgendaGuru: false,
      };
    },
  },
  extraReducers: {
    [getAgendaGuru.pending]: state => {
      return {
        ...state,
        isLoadingAgendaGuru: true,
      };
    },
    [getAgendaGuru.fulfilled]: (state, {payload}) => {
      return {
        ...state,
        isLoadingAgendaGuru: false,
        agendaGuru: payload,
      };
    },
    [getAgendaGuru.rejected]: state => {
      return {
        ...state,
        isLoadingAgendaGuru: false,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const {clearAgendaGuru} = agendaGuruSlicer.actions;

export default agendaGuruSlicer.reducer;
