/* eslint-disable no-empty-pattern */
import axios from 'axios';
const backendURL = 'http://localhost:5000/';

export const getRoleUser = async () => {
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

    const response = await axios.get(
      `${backendURL}api/users/user-role`,
      config,
    );
    return { data: response.data, status: response.status };
  } catch (error) {
    console.log('get role user error', error);
    if (error.response) {
      return {
        data: error.response.data,
        status: error.response.status,
      };
    }
  }
};
