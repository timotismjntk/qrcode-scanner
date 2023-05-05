import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import http from '../../../helpers/http';

const initialState = {
  koleksiMateri: {},
  isLoadingKoleksiMateri: false,
};

export const getKoleksiMateri = createAsyncThunk(
  'koleksiMateri/getKoleksiMateri',
  async ({website_id, tahunajaran_id, kelas_id, matapelajaran_id, sdm_id}) => {
    const {data} = await http().post('pertemuan?api=getMateriPertemuans', {
      website_id,
      tahunajaran_id,
      kelas_id,
      matapelajaran_id,
      sdm_id,
    });
    return data;
  },
);

const koleksiMateriSlicer = createSlice({
  name: 'koleksiMateri',
  initialState,
  reducers: {
    clearkoleksiMateri: (state, action) => {
      return {
        ...state,
        koleksiMateri: {},
        isLoadingKoleksiMateri: false,
      };
    },
  },
  extraReducers: {
    [getKoleksiMateri.pending]: state => {
      return {
        ...state,
        isLoadingKoleksiMateri: true,
      };
    },
    [getKoleksiMateri.fulfilled]: (state, {payload}) => {
      return {
        ...state,
        isLoadingKoleksiMateri: false,
        koleksiMateri: payload,
      };
    },
    [getKoleksiMateri.rejected]: state => {
      return {
        ...state,
        isLoadingKoleksiMateri: false,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const {clearKoleksiMateri} = koleksiMateriSlicer.actions;

export default koleksiMateriSlicer.reducer;
