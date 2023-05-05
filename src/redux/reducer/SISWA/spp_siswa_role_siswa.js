import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import http from '@src/helpers/http';

const initialState = {
  riwayatPembayaranSPPSaya: {},
  isLoadingRiwayatPembayaranSPPSaya: false,
};

export const getRiwayatPembayaranSPPSaya = createAsyncThunk(
  'spp_siswa_role_siswa/getRiwayatPembayaranSPPSaya',
  async ({token, tahun}) => {
    const {data} = await http().post('sekolah?api=getSppSiswa', {
      token,
      tahun,
    });
    return data;
  },
);

const sppSiswaRoleSiswaSlicer = createSlice({
  name: 'spp_siswa_role_siswa',
  initialState,
  reducers: {},
  extraReducers: {
    [getRiwayatPembayaranSPPSaya.pending]: state => {
      return {
        ...state,
        isLoadingRiwayatPembayaranSPPSaya: true,
      };
    },
    [getRiwayatPembayaranSPPSaya.fulfilled]: (state, {payload}) => {
      return {
        ...state,
        riwayatPembayaranSPPSaya: payload,
        isLoadingRiwayatPembayaranSPPSaya: false,
      };
    },
    [getRiwayatPembayaranSPPSaya.rejected]: state => {
      return {
        ...state,
        isLoadingRiwayatPembayaranSPPSaya: false,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const {} = sppSiswaRoleSiswaSlicer.actions;

export default sppSiswaRoleSiswaSlicer.reducer;
