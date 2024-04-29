import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { URL } from "@/Common/api";
import { config, handleError,appJson } from "@/Common/configurations";
import { IUserLogin } from "@/types/IUserLogin";

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
console.log("here in login",data);

      return data;
    } catch (error:any) {
      return handleError(error, rejectWithValue);
    }
  }
);