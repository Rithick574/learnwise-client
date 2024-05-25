import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { appJson, config, handleError } from "@/Common/configurations";
import { URL } from "@/Common/api";

type QueriesType = URLSearchParams;

export const getInstructors = createAsyncThunk<any, QueriesType, { rejectValue: any }>(
  "admin/fetchInstructors",
  async ( queries:QueriesType , { rejectWithValue }) => {
    try {
      const {data} = await axios.get(`${URL}/user/instructor?${queries}`);
     return data;
    } catch (error: any) {
      return handleError(error, rejectWithValue);
    }
  }
);

export const getAllApplicationsAction = createAsyncThunk(
  "admin/getAllApplications",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${URL}/user/instructor/requests`,
        config
      );
      if (response.data) {
        return response.data;
      }
      throw new Error(response.data?.message);
    } catch (error: any) {
      return handleError(error, rejectWithValue);
    }
  }
);

export const acceptApplicationAction = createAsyncThunk(
  "admin/acceptApplication",
  async (data: { id: string; email: string }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${URL}/user/instructor/application/accept`,
        data,
        config
      );
      return response;
    } catch (error: any) {
      return handleError(error, rejectWithValue);
    }
  }
);

export const blockOrUnBlock = createAsyncThunk(
  "admins/blockOrUnBlock",
  async ({ id, isBlocked }: { id: string, isBlocked: boolean }, { rejectWithValue }) => {
    try {      
      const response = await axios.patch(`${URL}/user/instructor/admin-block-unblock/${id}`, { isBlocked },appJson);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

