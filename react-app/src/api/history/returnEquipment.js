/* eslint-disable no-empty-pattern */
import axios from 'axios';
const backendURL = 'http://localhost:5000/';

export const returnEquipment = async (historyID) => {
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
      `${backendURL}api/history/returnEquipment/${historyID}`,
      config,
    );
    return { data: response.data, status: response.status };
  } catch (error) {
    console.log('returnEquipment error', error);
    if (error.response) {
      return {
        data: error.response.data,
        status: error.response.status,
      };
    }
  }
};
