import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import http from '../../../helpers/http';

const initialState = {
  pelanggaranSiswa: {},
  isLoadingPelanggaranSiswa: false,
  poinPelanggaranSiswa: {},
  isLoadingPoinPelanggaranSiswa: false,
  jenisPelanggaranSiswa: {},
  isLoadingJenisPelanggaranSiswa: false,
  tambahPelanggaranSiswa: {},
  isLoadingTambahPelanggaranSiswa: false,
  ubahPelanggaranSiswa: {},
  isLoadingUbahPelanggaranSiswa: false,
};

export const getPelanggaranSiswa = createAsyncThunk(
  'pelanggaranSiswa/getPelanggaranSiswa',
  async ({
    website_id,
    tahunajaran_id,
    kelas_id,
    siswa_id,
    status_penanganan,
  }) => {
    const {data} = await http().post('sekolah?api=getPelanggaransiswa', {
      website_id,
      tahunajaran_id,
      kelas_id,
      siswa_id,
      status_penanganan,
    });
    return data;
  },
);

export const getPoinPelanggaranSiswa = createAsyncThunk(
  'pelanggaranSiswa/getPoinPelanggaranSiswa',
  async ({kelas_id}) => {
    const {data} = await http().post('sekolah?api=getPoinPelanggaransiswa', {
      kelas_id,
    });
    return data;
  },
);

export const getJenisPelanggaranSiswa = createAsyncThunk(
  'pelanggaranSiswa/getJenisPelanggaranSiswa',
  async ({kelas_id}) => {
    const {data} = await http().post('sekolah?api=getJenispelanggaransiswa', {
      kelas_id,
    });
    return data;
  },
);

export const createPelanggaranSiswa = createAsyncThunk(
  'pelanggaranSiswa/tambahPelanggaranSiswa',
  async ({
    user_id,
    website_id,
    tahunajaran_id,
    kelas_id,
    siswa_id,
    tanggal,
    jenispelanggaran_id,
    status_penanganan,
    foto,
    ditangani_sdm_id,
  }) => {
    const {data} = await http().post('sekolah?api=buatPelanggaransiswa', {
      user_id,
      website_id,
      tahunajaran_id,
      kelas_id,
      siswa_id,
      tanggal,
      jenispelanggaran_id,
      status_penanganan,
      foto,
      ditangani_sdm_id,
    });
    return data;
  },
);

export const UBAH_PELANGGARAN_SISWA = createAsyncThunk(
  'pelanggaranSiswa/UBAH_PELANGGARAN_SISWA',
  async ({
    user_id,
    website_id,
    tahunajaran_id,
    kelas_id,
    siswa_id,
    tanggal,
    jenispelanggaran_id,
    status_penanganan,
    foto,
    ditangani_sdm_id,
    pelanggaran_id,
  }) => {
    const {data} = await http().post('sekolah?api=ubahPelanggaransiswa', {
      user_id,
      website_id,
      tahunajaran_id,
      kelas_id,
      siswa_id,
      tanggal,
      jenispelanggaran_id,
      status_penanganan,
      foto,
      ditangani_sdm_id,
      pelanggaran_id,
    });
    return data;
  },
);

const pelanggaranSiswaSlicer = createSlice({
  name: 'pelanggaranSiswa',
  initialState,
  reducers: {
    clearPelanggaranSiswa: (state, action) => {
      return {
        ...state,
        pelanggaranSiswa: {},
        isLoadingPelanggaranSiswa: false,
      };
    },
    clearBuatPelanggaranSiswa: (state, action) => {
      return {
        ...state,
        tambahPelanggaranSiswa: {},
        isLoadingTambahPelanggaranSiswa: false,
      };
    },
    CLEAR_UBAH_PELANGGARAN_SISWA: (state, action) => {
      return {
        ...state,
        ubahPelanggaranSiswa: {},
        isLoadingUbahPelanggaranSiswa: false,
      };
    },
  },
  extraReducers: {
    [getPelanggaranSiswa.pending]: state => {
      return {
        ...state,
        isLoadingPelanggaranSiswa: true,
      };
    },
    [getPelanggaranSiswa.fulfilled]: (state, {payload}) => {
      return {
        ...state,
        isLoadingPelanggaranSiswa: false,
        pelanggaranSiswa: payload,
      };
    },
    [getPelanggaranSiswa.rejected]: state => {
      return {
        ...state,
        isLoadingPelanggaranSiswa: false,
      };
    },
    [getPoinPelanggaranSiswa.pending]: state => {
      return {
        ...state,
        isLoadingPoinPelanggaranSiswa: true,
      };
    },
    [getPoinPelanggaranSiswa.fulfilled]: (state, {payload}) => {
      return {
        ...state,
        isLoadingPoinPelanggaranSiswa: false,
        poinPelanggaranSiswa: payload,
      };
    },
    [getPoinPelanggaranSiswa.rejected]: state => {
      return {
        ...state,
        isLoadingPoinPelanggaranSiswa: false,
      };
    },
    [getJenisPelanggaranSiswa.pending]: state => {
      return {
        ...state,
        isLoadingJenisPelanggaranSiswa: true,
      };
    },
    [getJenisPelanggaranSiswa.fulfilled]: (state, {payload}) => {
      return {
        ...state,
        isLoadingJenisPelanggaranSiswa: false,
        jenisPelanggaranSiswa: payload,
      };
    },
    [getJenisPelanggaranSiswa.rejected]: state => {
      return {
        ...state,
        isLoadingJenisPelanggaranSiswa: false,
      };
    },
    [createPelanggaranSiswa.pending]: state => {
      return {
        ...state,
        isLoadingTambahPelanggaranSiswa: true,
      };
    },
    [createPelanggaranSiswa.fulfilled]: (state, {payload}) => {
      return {
        ...state,
        isLoadingTambahPelanggaranSiswa: false,
        tambahPelanggaranSiswa: payload,
      };
    },
    [createPelanggaranSiswa.rejected]: state => {
      return {
        ...state,
        isLoadingTambahPelanggaranSiswa: false,
      };
    },
    [UBAH_PELANGGARAN_SISWA.pending]: state => {
      return {
        ...state,
        isLoadingUbahPelanggaranSiswa: true,
      };
    },
    [UBAH_PELANGGARAN_SISWA.fulfilled]: (state, {payload}) => {
      return {
        ...state,
        isLoadingUbahPelanggaranSiswa: false,
        ubahPelanggaranSiswa: payload,
      };
    },
    [UBAH_PELANGGARAN_SISWA.rejected]: state => {
      return {
        ...state,
        isLoadingUbahPelanggaranSiswa: false,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  clearPelanggaranSiswa,
  clearBuatPelanggaranSiswa,
  CLEAR_UBAH_PELANGGARAN_SISWA,
} = pelanggaranSiswaSlicer.actions;

export default pelanggaranSiswaSlicer.reducer;
