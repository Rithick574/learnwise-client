import { URL } from "@/Common/api";
import { config, handleError } from "@/Common/configurations";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

type QueriesType = URLSearchParams;

//getAll Categories
export const getAllCategories = createAsyncThunk<any, QueriesType, { rejectValue: any }>(
  "admin/getAllCategories",
  async (queries: QueriesType, { rejectWithValue }) => {
    try {
      const {data} = await axios.get(`${URL}/course?${queries}`, config);
      return data;
    } catch (error: any) {
      return handleError(error, rejectWithValue);
    }
  }
);

//create Categories
export const createCategories = createAsyncThunk(
  "admin/addCategories",
  async (CategoryData: any, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${URL}/course`, CategoryData, config);
      console.log("🚀 ~ file: categoriesAction.tsx:26 ~ response:", response);
      return response.data.data;
    } catch (error: any) {
      return handleError(error, rejectWithValue);
    }
  }
);

// edit category
export const editCategory = createAsyncThunk(
  "admin/editCategory",
  async ({ categoryData }: { categoryData: any }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${URL}/course`, categoryData, config);
      console.log("🚀 ~ file: categoriesAction.tsx:39 ~ response:", response);
      return response.data.data;
    } catch (error: any) {
      return handleError(error, rejectWithValue);
    }
  }
);

//get available categories
export const getAllAvailableCatgories = createAsyncThunk(
  "admin/getAllAvailableCatgories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${URL}/course/category/available`,
        config
      );
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
