import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/Auth/authSlice';
import profileReducer from '../features/Auth/profileSlice';
import historyReducer from '../features/admin/crud-history/historySlice';
import equipmentReducer from '../features/admin/crud-equipment/equipmentSlice';
import userReducer from '../features/admin/crud-user/userSlice';
import typeReducer from '../features/admin/crud-type/typeSlice';
import roleReducer from '../features/admin/crud-role/roleSlice';
const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    history: historyReducer,
    equipment: equipmentReducer,
    type: typeReducer,
    user: userReducer,
    role:roleReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export default store;
