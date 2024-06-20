import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createCourse, editCourse, getAllCourse, publishCourse, publishedCourses } from "@/redux/actions/instructor/courseAction";
import { Course } from "@/types/common";

interface PublishedCoursesPayload {
    courses: Course[]; 
    totalAvailableCourses: number;
  }

interface CourseState {
    loading: boolean;
    courses: any[]; 
    error: any | null;
    totalAvailableCourses:number
}

// Initial state
const initialState: CourseState = {
    loading: false,
    courses: [],
    error: null,
    totalAvailableCourses:0
};

const courseSlice = createSlice({
    name: "courses",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // create course
            .addCase(createCourse.pending, (state) => {
                state.loading = true;
            })
            .addCase(createCourse.fulfilled, (state, action: PayloadAction<any[]>) => {
                state.loading = false;
                state.error = null;
                state.courses = action.payload;
            })
            .addCase(createCourse.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // get all courses
            .addCase(getAllCourse.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllCourse.fulfilled, (state, action: PayloadAction<any[]>) => {
                state.loading = false;
                state.error = null;
                state.courses = action.payload;
            })
            .addCase(getAllCourse.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // published courses
            .addCase(publishedCourses.pending, (state) => {
                state.loading = true;
            })
            .addCase(publishedCourses.fulfilled, (state, action: PayloadAction<PublishedCoursesPayload>) => {
                state.loading = false;
                state.error = null;
                state.courses = action.payload.courses;
                state.totalAvailableCourses=action.payload.totalAvailableCourses;
            })
            .addCase(publishedCourses.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // publish course
            .addCase(publishCourse.pending, (state) => {
                state.loading = true;
            })
            .addCase(publishCourse.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = null;
                state.courses = state.courses.map(course => 
                    course.id === action.payload.id ? action.payload : course
                );
            })
            .addCase(publishCourse.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // edit course
            .addCase(editCourse.pending, (state) => {
                state.loading = true;
            })
            .addCase(editCourse.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = null;
                state.courses = state.courses.map(course => 
                    course.id === action.payload.id ? action.payload : course
                );
            })
            .addCase(editCourse.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default courseSlice.reducer;
