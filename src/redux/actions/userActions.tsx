import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { URL } from "../../Common/api";
import {config,handleError} from "../../Common/configurations"
import { IUserLogin } from "@/interface/IUserLogin";




export const googleLoginOrSignUp = createAsyncThunk('user/googleLoginOrSignUp',async (userCredentials: IUserLogin, {rejectWithValue}) => {
  try {
      console.log("reached in userLogin reducer")
      const { data } = await axios.post(`${URL}/auth/google`,userCredentials,config);
      return data;
  } catch (error: any) {
    return handleError(error, rejectWithValue);
  }
})