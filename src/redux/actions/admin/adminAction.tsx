import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { appJson, config } from "@/Common/configurations";
import { URL } from "@/Common/api";

export const getInstructors = createAsyncThunk(
  "instructors/fetchInstructors",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${URL}/user/instructor`);
      console.log("🚀 ~ file: adminAction.tsx:12 ~ response:", response.data)
      return {
        instructors: response.data,
      };
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getAllApplicationsAction = createAsyncThunk(
  "application/getAllApplications",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${URL}/user/instructor/requests`,
        config
      );
      if (response.data) {
        console.log(
          "🚀 ~ file: adminAction.tsx:29 ~ response.data:",
          response.data
        );
        return response.data;
      }
      throw new Error(response.data?.message);
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const acceptApplicationAction = createAsyncThunk(
  "application/acceptApplication",
  async (data: { id: string; email: string }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${URL}/user/instructor/application/accept`,
        data,
        config
      );
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const blockOrUnBlock = createAsyncThunk(
  "admins/blockOrUnBlock",
  async ({ id, isBlocked }: { id: string, isBlocked: boolean }, { rejectWithValue }) => {
    try {      
      const response = await axios.patch(`${URL}/user/instructor/admin-block-unblock/${id}`, { isBlocked },appJson);
      console.log("🚀 ~ file: adminAction.tsx:65 ~ response:", response)
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

