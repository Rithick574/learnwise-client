import { AxiosRequestConfig } from 'axios';


interface ApiResponseError extends Error {
  response?: {
    data?: {
      message?: string;
    };
  };
}

export const GOOGLE_ID = "763509306096-o56pcujee7m125or6q0iabofq139v5a0.apps.googleusercontent.com";
export const GOOGLE_SECRET = "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"

export const config = {
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
};

export const appJson: AxiosRequestConfig = {
  headers: {
      "Content-Type": "application/json"
  }
};

export const configMultiPart = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
  withCredentials: true,
};

export const handleError = (error: ApiResponseError, rejectWithValue: (value: string | unknown) => void) => {
  console.error('Error occurred:', error);

  if (error.response && error.response.data && error.response.data.message) {
    console.log('Server error:', error.response.data.message);
    return rejectWithValue(error.response.data.message);
  } 
  else if (error.message) {
    console.log('Error message:', error.message);
    return rejectWithValue(error.message);
  } 
  else {
    console.log(error.response,"%%%%%%%%%%%%%%%%%%");
    console.log('Generic error handler triggered.');
    return rejectWithValue("An unknown error occurred");
  }
};