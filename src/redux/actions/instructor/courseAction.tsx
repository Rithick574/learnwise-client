import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { config, handleError } from "@/Common/configurations";
import { URL } from "@/Common/api";

interface CourseData {
    title: string;
    description: string;
}

export const createCourse = createAsyncThunk(
  "instructor/createCourse",
  async (courseData: CourseData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${URL}/course/create-course`,
        courseData,
        config
      );
      return data;
    } catch (error: any) {
      return handleError(error, rejectWithValue);
    }
  }
);
