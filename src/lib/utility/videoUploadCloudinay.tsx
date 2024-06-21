import axios, { AxiosProgressEvent } from 'axios';

const videoUpload = async (video: File, onUploadProgress: (progress: number) => void) => {
    const presetKey = import.meta.env.VITE_REACT_APP_PRESET_KEY;
    const cloudName = import.meta.env.VITE_REACT_APP_CLD_USER_NAME;
    const formData = new FormData();
    formData.append('file', video);
    formData.append('upload_preset', presetKey);
    try {
        const res = await axios.post(
            `https://api.cloudinary.com/v1_1/${cloudName}/upload`, 
            formData, 
            { 
                onUploadProgress: (progressEvent: AxiosProgressEvent) => {
                    if (progressEvent.total) {
                        const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                        onUploadProgress(progress);
                    }
                }
            }
        );
        const { format, secure_url } = res.data;

        const validFormats = ['mp4', 'avi', 'mov'];
        if (validFormats.includes(format)) {
            return secure_url;
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error uploading video:', error);
        throw error;
    }
};

export default videoUpload;
