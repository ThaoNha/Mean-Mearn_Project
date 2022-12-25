import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const backendURL = 'http://localhost:5000/';

export const login = createAsyncThunk(
  'login',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: { 'Content-Type': 'application/json' },
      };

      const response = await axios.post(
        `${backendURL}api/auth/login`,
        { username, password },
        config,
      );
      if (response.data) {
        localStorage.setItem('accessToken', response.data.accessToken);
        localStorage.setItem('refreshToken', response.data.refreshToken);
        localStorage.setItem('tokenTime', new Date().getTime());
      }
      return {'data': response.data,'status':response.status};
    } catch (error) {
      console.log('login error',error);
      if (error.response) {
        return rejectWithValue({'data':error.response.data,'status':error.response.status});
      }
    }
  },
);
