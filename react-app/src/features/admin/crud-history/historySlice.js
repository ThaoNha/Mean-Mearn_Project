import { createSlice } from '@reduxjs/toolkit';
import { getAllHistory } from '../../../api/history/getAllHistory';

const initialState = {
  data: null,
  status: null,
};

const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {},
  extraReducers: {
    [getAllHistory.fulfilled]: (state, { payload }) => {
      state.data = payload.data;
      state.status = payload.status;
    },
  },
});
export default historySlice.reducer;
