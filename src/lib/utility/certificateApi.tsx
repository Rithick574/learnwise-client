import { URL } from '@/Common/api';
import axios from 'axios';

export const sendCertificateData = async (userId: string, courseName: string, uploadUrl: string) => {
  try {
    const response = await axios.post(`${URL}/course/certificate/${userId}`, { userId, courseName, url: uploadUrl });
    return response.data;
  } catch (error) {
    console.error('Error sending certificate data:', error);
    throw error;
  }
};