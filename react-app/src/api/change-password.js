import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const backendURL = 'http://localhost:5000';
export const changePassword = createAsyncThunk(
  '/change-password',
  async ({ password }, { rejectWithValue }) => {
    try {
      const accessToken = localStorage.getItem('accessToken')
        ? localStorage.getItem('accessToken')
        : null;
      const config = {
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${accessToken}`,
        },
      };
      const data = await axios.put(
        `${backendURL}/api/users/update`,
        { password },
        config,
      );
      return data;
    } catch (error) {
      console.log('update error', error);
      if (error.response) {
        return rejectWithValue(error.response);
      }
    }
  },
);
