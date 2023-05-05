import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import http from '@src/helpers/http';

const initialState = {
  allSPPSiswaPerbulan: {},
  isLoadingAllSPPSiswaPerbulan: false,
  riwayatPembayaranSPPSiswa: {},
  isLoadingRiwayatPembayaranSPPSiswa: false,
};

export const getAllSPPSiswaPerbulan = createAsyncThunk(
  'spp_siswa_role_guru/getAllSPPSiswaPerbulan',
  async ({token, tahunajaran_id, kelas_id, bulan}) => {
    const {data} = await http().post('sekolah?api=getSppSiswaPerbulan', {
      token,
      tahunajaran_id,
      kelas_id,
      bulan,
    });
    return data;
  },
);

export const getRiwayatPembayaranSPPSiswa = createAsyncThunk(
  'spp_siswa_role_guru/getRiwayatPembayaranSPPSiswa',
  async ({token, siswa_id, tahun}) => {
    const {data} = await http().post('sekolah?api=guruGetSppSiswa', {
      token,
      siswa_id,
      tahun,
    });
    return data;
  },
);

const sppSiswaRoleGuruSlicer = createSlice({
  name: 'spp_siswa_role_guru',
  initialState,
  reducers: {},
  extraReducers: {
    [getAllSPPSiswaPerbulan.pending]: state => {
      return {
        ...state,
        isLoadingAllSPPSiswaPerbulan: true,
      };
    },
    [getAllSPPSiswaPerbulan.fulfilled]: (state, {payload}) => {
      return {
        ...state,
        isLoadingAllSPPSiswaPerbulan: false,
        allSPPSiswaPerbulan: payload,
      };
    },
    [getAllSPPSiswaPerbulan.rejected]: state => {
      return {
        ...state,
        isLoadingAllSPPSiswaPerbulan: false,
      };
    },
    [getRiwayatPembayaranSPPSiswa.pending]: state => {
      return {
        ...state,
        isLoadingRiwayatPembayaranSPPSiswa: true,
      };
    },
    [getRiwayatPembayaranSPPSiswa.fulfilled]: (state, {payload}) => {
      return {
        ...state,
        riwayatPembayaranSPPSiswa: payload,
        isLoadingRiwayatPembayaranSPPSiswa: false,
      };
    },
    [getRiwayatPembayaranSPPSiswa.rejected]: state => {
      return {
        ...state,
        isLoadingRiwayatPembayaranSPPSiswa: false,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const {} = sppSiswaRoleGuruSlicer.actions;

export default sppSiswaRoleGuruSlicer.reducer;
