import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userSlice";
import adminReducer from "./reducers/admin/adminSlice";
import { applicationReducer } from "./reducers/admin/application";
import { ThunkAction, Action } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    user: userReducer,
    instructors: adminReducer,
    application: applicationReducer,
  },
});

// Type for the root state
export type RootState = ReturnType<typeof store.getState>;

// Type for the dispatch function
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

export default store;
