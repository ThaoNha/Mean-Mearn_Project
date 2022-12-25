import { createSlice } from '@reduxjs/toolkit';
import { login } from '../../api/auth/login';

const initialState = {
  userInfo: null,
  status: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('tokenTime');
      state.userInfo = null;
      state.status = null;
    },
  },
  extraReducers: {
    [login.fulfilled]: (state, { payload }) => {
      state.userInfo = payload.data.data;
      state.status = payload.status;
    },
    [login.rejected]: (state, { payload }) => {
      state.userInfo = payload.data;
      state.status = payload.status;
    },
  },
});
export const { logout } = authSlice.actions;
export default authSlice.reducer;
