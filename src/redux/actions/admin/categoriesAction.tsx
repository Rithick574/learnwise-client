import { URL } from "@/Common/api";
import { config } from "@/Common/configurations";
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
export const createCategories=createAsyncThunk('admin/addCategories',async(CategoryData:any,{rejectWithValue})=>{
    try {
        const response= await axios.post(`${URL}/course`,CategoryData,config)
        return response.data;
    } catch (error:any) {
        console.log("🚀 ~ file: categoriesAction.tsx:25 ~ createCategories ~ error:", error)
        return rejectWithValue(error.response.data)
    }
})

//edit category
// export const editCategory=createAsyncThunk('admin/editCategory',async({id:id,categoryData:categoryData},{rejectWithValue})=>{
//     try {
//         console.log(categoryData,'dddd',id,'111111111111111111111111111111111111111111111');
//         const {data}=await axios.put(`${URL}/course/category/${id}`,categoryData,config)
//     return data
//     } catch (error) {
//         console.log(error);
//         rejectWithValue(error)
//     }
// })