/* eslint-disable no-empty-pattern */
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const backendURL = 'http://localhost:5000/';

export const getAllEquipment = createAsyncThunk('getAllEquipment', async () => {
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

    const response = await axios.get(`${backendURL}api/equipment`, config);
    return { data: response.data, status: response.status };
  } catch (error) {
    console.log('getAllHistory error', error);
    if (error.response) {
      return {
        data: error.response.data,
        status: error.response.status,
      };
    }
  }
});
