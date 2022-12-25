import { createSlice } from '@reduxjs/toolkit';
import { getAllUser } from '../../../api/user/getAllUser';

const initialState = {
  user: null,
  status: null,
};

const userSlice = createSlice({
  name: 'type',
  initialState,
  reducers: {},
  extraReducers: {
    [getAllUser.fulfilled]: (state, { payload }) => {
      state.user = payload.data;
      state.status = payload.status;
    },
  },
});
export default userSlice.reducer;
