import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { URL } from "@/Common/api";
import { config, handleError,appJson } from "@/Common/configurations";
import { IUserLogin } from "@/types/IUserLogin";
import { ApplyToTeachFormData } from "@/types/forms";

//getuserData
export const getUserDataFirst = createAsyncThunk(
  "user/getUserDataFirst",
  async ( _ , { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${URL}/auth/`, config);
      console.log(data,"here in data of getUserDataFirst");
      return data;
    } catch (error:any) {
      return handleError(error, rejectWithValue);
    }
  }
);

//logout
export const logout = createAsyncThunk(
  "user/logout",
  async ( _ , { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`${URL}/auth/logout`, config);

      return data;
    } catch (error:any) {
      return handleError(error, rejectWithValue);
    }
  }
);


//google Auth
export const googleLoginOrSignUp = createAsyncThunk(
  "user/googleLoginOrSignUp",
  async (userCredentials: IUserLogin, { rejectWithValue }) => {
    try {
      console.log("reached in userLogin reducer");
      const { data } = await axios.post(
        `${URL}/auth/google`,
        userCredentials,
        config
      );
      return data;
    } catch (error: any) {
      return handleError(error, rejectWithValue);
    }
  }
);

//signup
export const signUpUser = createAsyncThunk(
  "user/signUpUser",
  async (userCredentials:any, { rejectWithValue }) => {
    try {
      console.log("calling signup");
      
      const { data } = await axios.post(
        `${URL}/auth/signup`,
        userCredentials,
        appJson
      );
      console.log(data,"here in data");
      
      return data;
    } catch (error:any) {
      return handleError(error, rejectWithValue);
    }
  }
);

//login
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (userCredentials:any, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${URL}/auth/login`,
        userCredentials,
        config
      );
      return data;
    } catch (error:any) {
      return handleError(error, rejectWithValue);
    }
  }
);

//forgot password
export const forgotPassword = createAsyncThunk(
  "forgot/password",
  async(email:string,{rejectWithValue})=>{
    try {
      const {data} = await axios.post(`${URL}/auth/forgotpassword`,{email},config)
      console.log("🚀 ~ file: userActions.tsx:99 ~ async ~ data:", data)
      return data;
    } catch (error:any) {
      return handleError(error, rejectWithValue);
    }
  }
)

//apply to teach
export const applyToTeachAction = createAsyncThunk(
  "user/applyToTeach",
  async (data: ApplyToTeachFormData,{rejectWithValue}) => {
try {
  const response = await axios.post(`${URL}/user/instructor/apply`,data,config)
  return response;
} catch (error:any) {  
  return handleError(error, rejectWithValue);
}
  }
)

//get instructors data
export const getInstructorsAction = createAsyncThunk(
  "user/getInstructors",
  async ( _ , { rejectWithValue }) => {
    try {
      const {data} = await axios.get(`${URL}/user/instructor`,config)
      console.log("🚀 ~ file: userActions.tsx:129 ~ data:", data)
      return data;
    } catch (error:any) {
      return handleError(error, rejectWithValue);
    }
  }
)