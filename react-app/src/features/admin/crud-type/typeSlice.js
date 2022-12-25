import { createSlice } from '@reduxjs/toolkit';
import { getAllType } from '../../../api/type/getAllType';

const initialState = {
  typeData: null,
  status: null,
};

const typeSlice = createSlice({
  name: 'type',
  initialState,
  reducers: {},
  extraReducers: {
    [getAllType.fulfilled]: (state, { payload }) => {
      state.typeData = payload.data;
      state.status = payload.status;
    },
  },
});
export default typeSlice.reducer;
