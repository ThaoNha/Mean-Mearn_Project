/* eslint-disable no-empty-pattern */
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const backendURL = 'http://localhost:5000/';

export const profile = createAsyncThunk('profile', async () => {
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
    const response = await axios.get(`${backendURL}api/users/profile`, config);

    return {
      data: {
        id: response.data.id,
        username: response.data.username,
        status: response.data.status,
      },
      role: response.data.role.name,
      status: response.status,
    };
  } catch (error) {
    console.log('profile error', error);
    if (error.response) {
      return { data: error.response.data, status: error.response.status };
    }
  }
});
