import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const backendURL = 'http://localhost:5000';
export const getNewToken = createAsyncThunk('/getNewToken', async () => {
  try {
    const accessToken = localStorage.getItem('accessToken')
      ? localStorage.getItem('accessToken')
      : null;
    const refreshToken = localStorage.getItem('refreshToken')
      ? localStorage.getItem('refreshToken')
      : null;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
    };
    const data = await axios.post(
      `${backendURL}/api/auth/refresh`,
      { refreshToken },
      config,
    );
    return data;
  } catch (error) {
    console.log('refresh Token error', error);
    if (error.response) {
      return error.response;
    }
  }
});
