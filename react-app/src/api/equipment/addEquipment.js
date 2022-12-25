import axios from 'axios';

const backendURL = 'http://localhost:5000/';
export const addEquipment = async (equipment) => {
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

    const response = await axios.post(
      `${backendURL}api/equipment/create`,
      equipment,
      config,
    );
    console.log(response)
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
