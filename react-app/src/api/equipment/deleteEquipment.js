import axios from 'axios';

const backendURL = 'http://localhost:5000/';
export const deleteEquipment = async (equipmentID) => {
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

    const response = await axios.delete(
      `${backendURL}api/equipment/${equipmentID}`,
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
