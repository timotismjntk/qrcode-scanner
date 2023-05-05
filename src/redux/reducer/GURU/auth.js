import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import http from '../../../helpers/http';

import {subscribeFromTopic} from '../../../utils';

const initialState = {
  authGuru: {},
  rememberMe: {
    website_id: '',
    username: '',
    password: '',
    isRemember: false,
  },
  lupaPassword: {},
  isLoadingLupaPassword: false,
  isLoadingLoginGuru: false,
};

export const loginGuru = createAsyncThunk(
  'authGuru/loginGuru',
  async ({username, password, website_id}) => {
    const {data} = await http().post('authentication', {
      username,
      password,
      website_id,
      form: 'Guru',
    });
    return data;
  },
);

export const lupaPassword = createAsyncThunk(
  'authGuru/lupapassword',
  async ({username}) => {
    const {data} = await http().post('lupapassword', {
      username,
    });
    return data;
  },
);

const authGuruSlicer = createSlice({
  name: 'authGuru',
  initialState,
  reducers: {
    rememberMe: (
      state,
      {payload: {username, password, website_id, isRemember = false}},
    ) => {
      if (isRemember) {
        return {
          ...state,
          rememberMe: {
            ...state.rememberMe,
            username,
            password,
            website_id,
          },
        };
      } else {
        return {
          ...state,
          rememberMe: {
            ...state.rememberMe,
            username: '',
            password: '',
            website_id: '',
          },
        };
      }
    },
    clearLupaPassword: (state, action) => {
      return {
        ...state,
        lupaPassword: {},
      };
    },
    logoutGuru: (state, action) => {
      return {
        ...state,
        authGuru: {},
      };
    },
    clearStateGuru: (state, action) => {
      return {
        ...state,
        authGuru: {},
        isLoadingLoginGuru: false,
      };
    },
  },
  extraReducers: {
    [loginGuru.pending]: state => {
      return {
        ...state,
        isLoadingLoginGuru: true,
      };
    },
    [loginGuru.fulfilled]: (state, {payload}) => {
      if (payload?.status === 'berhasil') {
        const user_id = payload?.data?.user_id;
        const website_id = payload?.data?.website_id;
        if (user_id?.length > 0 && website_id?.length > 0) {
          subscribeFromTopic('userById' + user_id);
          subscribeFromTopic('userBySekolah' + website_id);
          subscribeFromTopic('guruBySekolah' + website_id);
          subscribeFromTopic('topics_global');
        }
      }
      return {
        ...state,
        isLoadingLoginGuru: false,
        authGuru: payload,
      };
    },
    [loginGuru.rejected]: state => {
      return {
        ...state,
        isLoadingLoginGuru: false,
      };
    },
    [lupaPassword.pending]: state => {
      return {
        ...state,
        isLoadingLupaPassword: true,
      };
    },
    [lupaPassword.fulfilled]: (state, {payload}) => {
      return {
        ...state,
        isLoadingLupaPassword: false,
        lupaPassword: payload,
      };
    },
    [lupaPassword.rejected]: state => {
      return {
        ...state,
        isLoadingLupaPassword: false,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const {rememberMe, clearStateGuru, clearLupaPassword, logoutGuru} =
  authGuruSlicer.actions;

export default authGuruSlicer.reducer;
