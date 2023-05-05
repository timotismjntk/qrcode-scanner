import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import http from '../../../helpers/http';

const initialState = {
  authMesin: {},
  isLoadingLoginMesin: false,
};

export const loginMesin = createAsyncThunk(
  'authMesin/loginMesin',
  async kode_akses => {
    const {data} = await http().post('cekKodeAkses', {kode_akses});
    return data;
  },
);

const authMesinSlicer = createSlice({
  name: 'authMesin',
  initialState,
  reducers: {
    logoutMesin: (state, action) => {
      return {
        ...state,
        authMesin: {},
        isLoadingLoginMesin: false,
      };
    },
    clearStateMesin: (state, action) => {
      return {
        ...state,
        authMesin: {},
        isLoadingLoginMesin: false,
      };
    },
  },
  extraReducers: {
    [loginMesin.pending]: state => {
      return {
        ...state,
        isLoadingLoginMesin: true,
        isLoginMesinModalSuccessOpen: true,
      };
    },
    [loginMesin.fulfilled]: (state, {payload}) => {
      return {
        ...state,
        isLoadingLoginMesin: false,
        authMesin: payload,
      };
    },
    [loginMesin.rejected]: state => {
      return {
        ...state,
        isLoadingLoginMesin: false,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const {logoutMesin, clearStateMesin} = authMesinSlicer.actions;

export default authMesinSlicer.reducer;
