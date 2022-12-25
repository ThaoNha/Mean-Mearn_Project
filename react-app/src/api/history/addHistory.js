/* eslint-disable no-empty-pattern */
import axios from 'axios';
const backendURL = 'http://localhost:5000/';

export const addHistory = async (history) => {
  try {
    console.log(history)
    const accessToken = localStorage.getItem('accessToken')
      ? localStorage.getItem('accessToken')
      : null;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const response = await axios.post(
      `${backendURL}api/history/create`,
      history,
      config,
    );
    return { data: response.data, status: response.status };
  } catch (error) {
    console.log('add history error', error);
    if (error.response) {
      return {
        data: error.response.data,
        status: error.response.status,
      };
    }
  }
};
