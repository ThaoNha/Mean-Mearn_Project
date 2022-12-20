import { createSlice } from '@reduxjs/toolkit';
import { changePassword } from '../../api/change-password';
import { login } from '../../api/login';

const accessToken = localStorage.getItem('accessToken')
  ? localStorage.getItem('accessToken')
  : null;

const initialState = {
  loading: false,
  userInfo: null,
  accessToken,
  error: null,
  success: false,
  changePasswordStatus: null,
};
const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('tokenTime');
      state.loading = false;
      state.userInfo = null;
      state.accessToken = null;
      state.error = null;
    },
    setCredentials: (state, { payload }) => {
      state.userInfo = payload.data;
    },
  },
  extraReducers: {
    [login.spending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [login.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.userInfo = payload.data;
      state.accessToken = payload.data.accessToken;
      state.status = payload.status;
    },
    [login.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload.data;
    },
    [changePassword.fulfilled]: (state, { payload }) => {
      state.changePasswordStatus = payload.status;
    },
    [changePassword.rejected]: (state, { payload }) => {
      state.changePasswordStatus = payload.status;
    },
  },
});

export const { logout, setCredentials } = authSlice.actions;

export default authSlice.reducer;
