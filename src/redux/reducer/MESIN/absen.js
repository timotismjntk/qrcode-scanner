import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import http from '../../../helpers/http';

const initialState = {
  absenMesin: {},
  isLoadingAbsenMesin: false,
};

export const mulaiAbsen_RFID = createAsyncThunk(
  'absenMesin/mulaiAbsen_RFID',
  async ({jenis_absen, kode_akses, rfid}) => {
    const {data} = await http().post('doAbsen', {
      jenis_absen,
      kode_akses,
      rfid,
    });
    return data;
  },
);

const absenMesinSlicer = createSlice({
  name: 'absenMesin',
  initialState,
  reducers: {
    clearAbsenMesin: (state, action) => {
      return {
        ...state,
        absenMesin: {},
      };
    },
  },
  extraReducers: {
    [mulaiAbsen_RFID.pending]: state => {
      return {
        ...state,
        isLoadingAbsenMesin: true,
      };
    },
    [mulaiAbsen_RFID.fulfilled]: (state, {payload}) => {
      return {
        ...state,
        isLoadingAbsenMesin: false,
        absenMesin: payload,
      };
    },
    [mulaiAbsen_RFID.rejected]: state => {
      return {
        ...state,
        isLoadingAbsenMesin: false,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const {clearAbsenMesin} = absenMesinSlicer.actions;

export default absenMesinSlicer.reducer;
