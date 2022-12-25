import { createSlice } from '@reduxjs/toolkit';
import { getAllRole } from '../../../api/role/getAllRole';

const initialState = {
  roleData: null,
  status: null,
};

const roleSlice = createSlice({
  name: 'role',
  initialState,
  reducers: {},
  extraReducers: {
    [getAllRole.fulfilled]: (state, { payload }) => {
      state.roleData = payload.data;
      state.status = payload.status;
    },
  },
});
export default roleSlice.reducer;
