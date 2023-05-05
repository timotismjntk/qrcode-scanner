import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import http from '../../../helpers/http';

const initialState = {
  profilSaya: {},
  isLoadingProfilSaya: false,
  updateProfilSaya: {},
  isLoadingUpdateProfilSaya: false,
};

export const getProfilSaya = createAsyncThunk(
  'profilSaya/getProfilSaya',
  async ({token}) => {
    const {data} = await http().post('sekolah?api=getDataSDM', {token});
    return data;
  },
);

export const updateProfilSayaAction = createAsyncThunk(
  'profilSaya/updateProfilSaya',
  async inputData => {
    const {data} = await http().post('sekolah?api=updateDataSDM', inputData);
    return data;
  },
);

const profilSayaSlicer = createSlice({
  name: 'profilSaya',
  initialState,
  reducers: {
    clearProfilSaya: (state, action) => {
      return {
        ...state,
        profilSaya: {},
        isLoadingProfilSaya: false,
      };
    },
    clearUpdateProfilSaya: (state, action) => {
      return {
        ...state,
        updateProfilSaya: {},
        isLoadingUpdateProfilSaya: false,
      };
    },
  },
  extraReducers: {
    [getProfilSaya.pending]: state => {
      return {
        ...state,
        isLoadingProfilSaya: true,
      };
    },
    [getProfilSaya.fulfilled]: (state, {payload}) => {
      return {
        ...state,
        isLoadingProfilSaya: false,
        profilSaya: payload,
      };
    },
    [getProfilSaya.rejected]: state => {
      return {
        ...state,
        isLoadingProfilSaya: false,
      };
    },
    [updateProfilSayaAction.pending]: state => {
      return {
        ...state,
        isLoadingUpdateProfilSaya: true,
      };
    },
    [updateProfilSayaAction.fulfilled]: (state, {payload}) => {
      return {
        ...state,
        isLoadingUpdateProfilSaya: false,
        updateProfilSaya: payload,
      };
    },
    [updateProfilSayaAction.rejected]: state => {
      return {
        ...state,
        isLoadingUpdateProfilSaya: false,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const {clearProfilSaya, clearUpdateProfilSaya} =
  profilSayaSlicer.actions;

export default profilSayaSlicer.reducer;
