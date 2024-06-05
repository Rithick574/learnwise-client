import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { appJson, config, handleError } from "@/Common/configurations";
import { URL } from "@/Common/api";

interface CourseData {
    title: string;
    description: string;
}

type QueriesType = URLSearchParams;

interface EditCourseArgs {
  courseId: string;
  courseData: CourseData;
}

interface PublishCourseArgs {
  id: string;
  action: string;
}

interface updateCourseArgs{
  id:string;
  status:string;
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

export const getAllCourse = createAsyncThunk<any, QueriesType, { rejectValue: any }>(
  "course/getcourse",
  async(queries:QueriesType,{rejectWithValue})=>{
    try {
      const {data} = await axios.get(`${URL}/course/course?${queries}`,appJson);
      return data.data;
    } catch (error:any) {
      return handleError(error, rejectWithValue);
    }
  }
);

export const publishedCourses=createAsyncThunk(
  "course/publishedCourses",
  async(_,{rejectWithValue})=>{
    try {
      const {data} = await axios.get(`${URL}/course/publishedcourses`,appJson);
      return data.data;
    } catch (error:any) {
      return handleError(error, rejectWithValue);
    }
  }
);

export const publishCourse = createAsyncThunk(
  "course/publishcourse",
  async({ id, action }: PublishCourseArgs,{rejectWithValue})=>{
    try {
      const {data}=await axios.patch(`${URL}/course/course`,{id,action},appJson)
      return data
    } catch (error:any) {
      return handleError(error, rejectWithValue);
    }
  }
);

export const editCourse = createAsyncThunk("course/editCourse",
  async({ courseId, courseData }: EditCourseArgs,{rejectWithValue})=>{
    try {
      const {data}=await axios.put(`${URL}/course/course/${courseId}`,courseData,appJson)
      return data;
    } catch (error:any) {
      return handleError(error, rejectWithValue);
    }
  }
)

export const updateCourseStatus = createAsyncThunk(
  "course/blockCourse",
  async ({id,status}:updateCourseArgs,{ rejectWithValue }) => {
    try {
      const { data } = await axios.patch(`${URL}/course/course/${id}`,{status}, config);
      return data;
    } catch (error: any) {
      return handleError(error, rejectWithValue);
    }
  }
);