import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import http from '../../../helpers/http';

const initialState = {
  blog: {},
  isLoadingBlog: false,
};

export const getBlog = createAsyncThunk(
  'getBlog/getBlog',
  async ({website_id, kategori}) => {
    const {data} = await http().post('sekolah?api=getBlog', {
      website_id,
      kategori,
    });
    return data;
  },
);

const blogSlicer = createSlice({
  name: 'getBlog',
  initialState,
  reducers: {
    clearBlog: (state, action) => {
      return {
        ...state,
        getBlog: {},
        isLoadingBlog: false,
      };
    },
  },
  extraReducers: {
    [getBlog.pending]: state => {
      return {
        ...state,
        isLoadingBlog: true,
      };
    },
    [getBlog.fulfilled]: (state, {payload}) => {
      return {
        ...state,
        isLoadingBlog: false,
        blog: payload,
      };
    },
    [getBlog.rejected]: state => {
      return {
        ...state,
        isLoadingBlog: false,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const {clearBlog} = blogSlicer.actions;

export default blogSlicer.reducer;
