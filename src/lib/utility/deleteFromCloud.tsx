import axios from "axios";
import sha1 from 'crypto-js/sha1';

export const deleteFromCloud = async (publicId: string) => {
  const cloud_name = import.meta.env.VITE_REACT_APP_CLD_USER_NAME as string;
  const api_key = import.meta.env.VITE_REACT_APP_API_KEY as string;
  const api_secret = import.meta.env.VITE_REACT_APP_API_SECRET as string;
  try {
    const url = `https://api.cloudinary.com/v1_1/${cloud_name}/image/destroy`;
    const timestamp = Math.floor(Date.now() / 1000);

    const signature = sha1(`public_id=${publicId}&timestamp=${timestamp}${api_secret}`).toString();

    const formData = new FormData();
    formData.append("public_id", publicId);
    formData.append("timestamp", timestamp.toString());
    formData.append("api_key", api_key);
    formData.append("signature", signature);

    const res = await axios.post(url, formData);
    return res.data;
  } catch (error) {
    console.error("Error deleting image:", error as Error);
    throw error;
  }
};
