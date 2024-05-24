import { URL } from "@/Common/api";
import { config, handleError } from "@/Common/configurations";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//getAll Categories
export const getAllCategories = createAsyncThunk(
  "admin/getAllCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${URL}/course`, config);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

//create Categories
export const createCategories = createAsyncThunk(
  "admin/addCategories",
  async (CategoryData: any, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${URL}/course`, CategoryData, config);
      console.log("🚀 ~ file: categoriesAction.tsx:26 ~ response:", response)
      return response.data.data;
    } catch (error: any) {
      console.log("🚀 ~ file: categoriesAction.tsx:28 ~ error:", error)
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
      console.log("🚀 ~ file: categoriesAction.tsx:39 ~ response:", response)
      return response.data.data;
    } catch (error:any) {
      return handleError(error, rejectWithValue);
    }
  }
);

//get available categories
export const getAllAvailableCatgories=createAsyncThunk(
"admin/getAllAvailableCatgories",
async( _ , { rejectWithValue})=>{
  try {
    const response = await axios.get(`${URL}/course/category/available`, config);
    console.log("🚀 ~ file: categoriesAction.tsx:54 ~ async ~ response:", response)
    return response.data.data;
  } catch (error:any) {
    return rejectWithValue(error.response.data);
  }
}
);