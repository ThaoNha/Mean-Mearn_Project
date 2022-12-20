import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const backendURL = 'http://localhost:5000';
export const getProfile = createAsyncThunk('/profile', async () => {
  try {
    const accessToken = localStorage.getItem('accessToken')
      ? localStorage.getItem('accessToken')
      : null;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    };
    const data = await axios.get(`${backendURL}/api/users/profile`, config);
    return data;
  } catch (error) {
    console.log('login error', error);
    if (error.response) {
      return error.response;
    }
  }
});
