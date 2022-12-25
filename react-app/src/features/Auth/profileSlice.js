import { createSlice } from '@reduxjs/toolkit';
import { profile } from '../../api/auth/profile';

const initialState = {
  profileData: null,
  role: null,
  status: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: {
    [profile.fulfilled]: (state, { payload }) => {
      state.profileData = payload.data;
      state.role = payload.role;
      state.status = payload.status;
    },
    [profile.rejected]: (state, { payload }) => {
      state.profileData = payload.data;
      state.status = payload.status;
    },
  },
});
export default profileSlice.reducer;
