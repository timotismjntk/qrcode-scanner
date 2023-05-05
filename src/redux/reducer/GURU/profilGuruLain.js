import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import http from '../../../helpers/http';

const initialState = {
  profilGuruLain: {},
  isLoadingProfilGuruLain: false,
};

export const getProfilGuruLain = createAsyncThunk(
  'profilGuruLain/getProfilGuruLain',
  async ({user_id}) => {
    const {data} = await http().post('getProfile', {user_id});
    return data;
  },
);

const profilGuruLainSlicer = createSlice({
  name: 'profilGuruLain',
  initialState,
  reducers: {
    clearProfilGuruLain: (state, action) => {
      return {
        ...state,
        profilGuruLain: {},
        isLoadingProfilGuruLain: false,
      };
    },
  },
  extraReducers: {
    [getProfilGuruLain.pending]: state => {
      return {
        ...state,
        isLoadingProfilGuruLain: true,
      };
    },
    [getProfilGuruLain.fulfilled]: (state, {payload}) => {
      return {
        ...state,
        isLoadingProfilGuruLain: false,
        profilGuruLain: payload,
      };
    },
    [getProfilGuruLain.rejected]: state => {
      return {
        ...state,
        isLoadingProfilGuruLain: false,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const {clearProfilGuruLain} = profilGuruLainSlicer.actions;

export default profilGuruLainSlicer.reducer;
