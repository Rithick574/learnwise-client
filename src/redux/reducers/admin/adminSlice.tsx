import { createSlice, PayloadAction, SerializedError } from "@reduxjs/toolkit";
import { getInstructors } from "@/redux/actions/admin/adminAction";

interface InstructorData {
  instructors: any[]; 
  totalAvailableInstructors: number;
}

interface InstructorState {
  loading: boolean;
  instructors: any[];
  error: string | SerializedError | null;
  totalAvailableInstructors: number;
}

const initialState: InstructorState = {
  loading: false,
  instructors: [],
  error: null,
  totalAvailableInstructors: 0,
};

const instructorSlice = createSlice({
  name: "instructors",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getInstructors.pending, (state) => {
        state.loading = true;
      })
      .addCase(getInstructors.fulfilled, (state, action: PayloadAction<InstructorData>) => {
        state.loading = false;
        state.error = null;
        state.instructors = action.payload.instructors;
        state.totalAvailableInstructors = action.payload.totalAvailableInstructors;
      })
      .addCase(getInstructors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  }
});

export default instructorSlice.reducer;
