import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const backendURL = 'http://localhost:5000';
export const login = createAsyncThunk(
  '/login',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const data = await axios.post(
        `${backendURL}/api/auth/login`,
        { username, password },
        config,
      );
      if (data.data) {
        localStorage.setItem('accessToken', data.data.accessToken);
        localStorage.setItem('refreshToken', data.data.refreshToken);
        localStorage.setItem('tokenTime', new Date().getTime());
      }
      return data;
    } catch (error) {
      console.log('login error', error);
      if (error.response) {
        return rejectWithValue(error.response);
      }
    }
  },
);
