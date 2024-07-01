import axios from 'axios';
import toast from 'react-hot-toast';

export const AudioUpload = async (video:File) => {
    console.log("🚀 ~ file: audioUpload.tsx:5 ~ AudioUpload ~ video:", video)
    const preset_key = import.meta.env.VITE_REACT_APP_PRESET_KEY;
    const cloud_name = import.meta.env.VITE_REACT_APP_CLD_USER_NAME; 
    const formData = new FormData();
    formData.append('file', video);
    formData.append('upload_preset', preset_key);
 
    const transformationParams = {
        quality: 'auto', 
        resource_type: 'video', 
    };
    try {
        const res = await axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/video/upload`, formData, {
        params:transformationParams,   
        headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        console.log('Video uploaded successfully:', res);
        const { secure_url } = res.data;
        console.log(secure_url);
        return secure_url;
    } catch (error) {
        toast.error("can't upload video")
        console.error('Error uploading video:', error);
        throw error;
    }
};


