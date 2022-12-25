import { createSlice } from '@reduxjs/toolkit';
import { getAllEquipment } from '../../../api/equipment/getAllEquipment';
const initialState = {
  equipment: null,
  status: null,
};

const equipmentSlice = createSlice({
  name: 'equipment',
  initialState,
  reducers: {},
  extraReducers: {
    [getAllEquipment.fulfilled]: (state, { payload }) => {
      state.equipment = payload.data;
      state.status = payload.status;
    },
  },
});
export default equipmentSlice.reducer;
