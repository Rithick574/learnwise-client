import axios, { AxiosError, AxiosRequestConfig, Method } from "axios";
import { handleError } from "./configurations";

// Constants for API endpoints
export const URL = "http://localhost:4000/api";
// export const URL = "https://learnwise.today/api";

const apiInstance = axios.create({
  baseURL: URL,
  withCredentials: true,
});

// Response interceptor
apiInstance.interceptors.response.use((response) => {
  return response.data;
}, (error: AxiosError) => {
  console.log(error.message);
  throw error; 
});

// Function to handle common requests
export const commonRequest = async (
  method: Method,
  route: string,
  body?: any,
  config: AxiosRequestConfig = {}
): Promise<any> => {
  const requestConfig: AxiosRequestConfig = {
    method,
    url: route,
    data: body,
    headers: config.headers,
    withCredentials: true,
  };

  try {
    return await apiInstance(requestConfig);
  } catch (error) {
    console.error("Error in commonRequest:", error);
    return error; 
  }
};

export const commonReduxRequest = async (
  method: Method,
  route: string,
  rejectWithValue?: (error: AxiosError) => void, // Now optional
  body?: any,
  config: AxiosRequestConfig = {}
): Promise<any> => {
  let requestConfig: AxiosRequestConfig = {
    method,
    url: route,
    data: body,
    headers: config.headers || {},
    withCredentials: true,
  };

  try {
    const response = await apiInstance(requestConfig);
    return response;
  } catch (error:any) {
    console.error("Request failed with error:", error);
    if (rejectWithValue) {
      return rejectWithValue(error);  
    } else {
      throw error;  
    }
  }
};