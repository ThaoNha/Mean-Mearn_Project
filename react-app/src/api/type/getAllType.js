import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const backendURL = 'http://localhost:5000/';

export const getAllType = createAsyncThunk('getAllType', async () => {
  const accessToken = localStorage.getItem('accessToken')
    ? localStorage.getItem('accessToken')
    : null;
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    };
    const response = await axios.get(`${backendURL}api/type`, config);
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    console.log('profile error', error);
    if (error.response) {
      return {
        data: error.response.data,
        status: error.response.status,
      };
    }
  }
});
