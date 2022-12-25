import axios from 'axios';

const backendURL = 'http://localhost:5000/';
export const changePassword = async (password) => {
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

    const response = await axios.put(
      `${backendURL}api/users/update`,
      { password },
      config,
    );
    return { data: response.data, status: response.status };
  } catch (error) {
    console.log('changePassword error', error);
    if (error.response) {
      return {
        data: error.response.data,
        status: error.response.status,
      };
    }
  }
};
