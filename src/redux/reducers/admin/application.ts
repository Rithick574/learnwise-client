import { createSlice } from '@reduxjs/toolkit';
import { getAllApplicationsAction } from '../../actions/admin/adminAction';

interface Application {
    _id: string;
    email: string;
    profession: string;
    accepted: boolean;
    createdAt?: string;
}

interface ApplicationState {
    loading: boolean;
    data: Application[]; 
    error: string | null; 
}

const initialState: ApplicationState = {
    loading: false,
    data: [],
    error: null
};

const applicationSlice = createSlice({
    name: 'application',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllApplicationsAction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllApplicationsAction.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload; 
                state.error = null;
            })
            .addCase(getAllApplicationsAction.rejected, (state, action) => {
                state.loading = false;
                state.data = [];
                state.error = action.error.message || 'Something went wrong';
            });
    }
});

export const applicationReducer = applicationSlice.reducer;
