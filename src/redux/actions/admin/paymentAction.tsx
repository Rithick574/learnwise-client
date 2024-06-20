import { createAsyncThunk } from "@reduxjs/toolkit";
import { appJson } from "@/Common/configurations";
import axios from "axios";
import { URL } from "@/Common/api";

type QueriesType = URLSearchParams;

export const getPayments = createAsyncThunk(
    "payments/getPayments",
    async (queries:QueriesType, { rejectWithValue }) => {
    try {
        const {data} = await axios.get(`${URL}/course/payments/?${queries}`,appJson);
        return data.data;
    } catch (error:any) {
        return rejectWithValue((error).response.data);
    }
    }
  );
 