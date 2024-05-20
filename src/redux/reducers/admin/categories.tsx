import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createCategories, getAllCategories } from '../../actions/admin/categoriesAction';

interface Category {
    id: string;
    title: string;
    thumbnail?:string;
    createdAt?: string;
}

interface CategoryState {
    loading: boolean;
    categories: Category[];
    error: string | null;
}

const initialState: CategoryState = {
    loading: false,
    categories: [],
    error: null
};

const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createCategories.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createCategories.fulfilled, (state, action: PayloadAction<Category>) => {
                state.loading = false;
                state.categories.push(action.payload);
                state.error = null;
            })
            .addCase(createCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Something went wrong';
            })
            .addCase(getAllCategories.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllCategories.fulfilled, (state, action: PayloadAction<Category[]>) => {
                state.loading = false;
                state.categories = action.payload;
                state.error = null;
            })
            .addCase(getAllCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Something went wrong';
            });
    }
});

export const categoryReducer = categorySlice.reducer;
