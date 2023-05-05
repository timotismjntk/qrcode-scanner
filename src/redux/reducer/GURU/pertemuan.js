import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import http from '../../../helpers/http';

const initialState = {
  buatPertemuanResult: {},
  isLoadingBuatPertemuan: false,
  getPertemuanKeResult: {},
  isLoadingGetPertemuanKe: false,
  getPertemuanByIdResult: {},
  isLoadingGetPertemuanById: false,
  ubahPertemuanResult: {},
  isLoadingUbahPertemuan: false,
};

export const buatPertemuan = createAsyncThunk(
  'pertemuan/buatPertemuan',
  async ({
    website_id,
    tahunajaran_id,
    kelas_id,
    matapelajaran_id,
    sdm_id,
    tanggal,
    pertemuan_ke,
  }) => {
    const {data} = await http().post('pertemuan?api=buatPertemuan', {
      website_id,
      tahunajaran_id,
      kelas_id,
      matapelajaran_id,
      sdm_id,
      tanggal,
      pertemuan_ke,
    });
    return data;
  },
);

export const getPertemuanKe = createAsyncThunk(
  'pertemuan/getPertemuanKe',
  async ({
    website_id,
    tahunajaran_id,
    kelas_id,
    matapelajaran_id,
    sdm_id,
    tanggal,
  }) => {
    const {data} = await http().post('pertemuan?api=getPertemuans', {
      website_id,
      tahunajaran_id,
      kelas_id,
      matapelajaran_id,
      sdm_id,
      tanggal,
    });
    return data;
  },
);

export const getPertemuanById = createAsyncThunk(
  'pertemuan/getPertemuanById',
  async ({absensipertemuan_id}) => {
    const {data} = await http().post('pertemuan?api=getPertemuan', {
      absensipertemuan_id,
    });
    return data;
  },
);

export const ubahPertemuan = createAsyncThunk(
  'pertemuan/ubahPertemuan',
  async ({absensipertemuan_id, catatan, absensi, materi}) => {
    const {data} = await http().post('pertemuan?api=ubahPertemuan', {
      absensipertemuan_id,
      catatan,
      absensi,
      materi,
    });
    return data;
  },
);

const pertemuanSlicer = createSlice({
  name: 'pertemuan',
  initialState,
  reducers: {
    clearBuatPertemuan: (state, action) => {
      return {
        ...state,
        buatPertemuanResult: {},
        isLoadingBuatPertemuan: false,
      };
    },
    clearGetPertemuanKe: (state, action) => {
      return {
        ...state,
        getPertemuanKeResult: {},
        isLoadingGetPertemuanKe: false,
      };
    },
    clearGetPertemuanById: (state, action) => {
      return {
        ...state,
        getPertemuanByIdResult: {},
        isLoadingGetPertemuanById: false,
      };
    },
    clearUbahPertemuan: (state, action) => {
      return {
        ...state,
        ubahPertemuanResult: {},
        isLoadingUbahPertemuan: false,
      };
    },
  },
  extraReducers: {
    [buatPertemuan.pending]: state => {
      return {
        ...state,
        isLoadingBuatPertemuan: true,
        buatPertemuanResult: {},
      };
    },
    [buatPertemuan.fulfilled]: (state, {payload}) => {
      return {
        ...state,
        isLoadingBuatPertemuan: false,
        buatPertemuanResult: payload,
      };
    },
    [buatPertemuan.rejected]: state => {
      return {
        ...state,
        isLoadingBuatPertemuan: false,
      };
    },
    [getPertemuanKe.pending]: state => {
      return {
        ...state,
        isLoadingGetPertemuanKe: true,
        getPertemuanKeResult: {},
      };
    },
    [getPertemuanKe.fulfilled]: (state, {payload}) => {
      return {
        ...state,
        isLoadingGetPertemuanKe: false,
        getPertemuanKeResult: payload,
      };
    },
    [getPertemuanKe.rejected]: state => {
      return {
        ...state,
        isLoadingGetPertemuanKe: false,
      };
    },
    [getPertemuanById.pending]: state => {
      return {
        ...state,
        isLoadingGetPertemuanById: true,
        getPertemuanByIdResult: {},
      };
    },
    [getPertemuanById.fulfilled]: (state, {payload}) => {
      return {
        ...state,
        isLoadingGetPertemuanById: false,
        getPertemuanByIdResult: payload,
      };
    },
    [getPertemuanById.rejected]: state => {
      return {
        ...state,
        isLoadingGetPertemuanById: false,
      };
    },
    [ubahPertemuan.pending]: state => {
      return {
        ...state,
        isLoadingUbahPertemuan: true,
        ubahPertemuanResult: {},
      };
    },
    [ubahPertemuan.fulfilled]: (state, {payload}) => {
      return {
        ...state,
        isLoadingUbahPertemuan: false,
        ubahPertemuanResult: payload,
      };
    },
    [ubahPertemuan.rejected]: state => {
      return {
        ...state,
        isLoadingUbahPertemuan: false,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  clearBuatPertemuan,
  clearGetPertemuanKe,
  clearGetPertemuanById,
  clearUbahPertemuan,
} = pertemuanSlicer.actions;

export default pertemuanSlicer.reducer;
