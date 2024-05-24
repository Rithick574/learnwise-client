import axios from "axios";
import { appJson } from "@/Common/configurations";
import { URL } from "@/Common/api";


export const getUploadUrl  = async () => {
      try {
        const response = await axios.post(`${URL}/course/create-upload-url`,appJson);
        console.log("🚀 ~ file: addCourse.tsx:13 ~ response:", response)
        return response;
      } catch (error: any) {
        console.error('Error in getUploadUrl:', error);
        throw error;
      }
    }
  
  export const getPlaybackId =async(uploadId:string)=>{
      try {
        const responce = await axios.get(`${URL}/course/get-playback-id/${uploadId}`,appJson)
        return responce;
      } catch (error:any) {
        console.error('Error in retrieve playbackId:', error);
        throw error;
      }
    }

    