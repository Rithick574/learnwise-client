import { createSlice } from "@reduxjs/toolkit";
import { googleLoginOrSignUp } from "../actions/userActions";
import {UserState} from "@/interface/IUserLogin"


  const initialState: UserState = {
    loading: false,
    user: null,
    error: null,
  };

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateError: (state, { payload }) => {
        state.error = payload;
      },
  },
  extraReducers: (builder) => {
    builder
    //Google login states
    .addCase(googleLoginOrSignUp.pending, (state) => {
        state.loading = true;
      })
      .addCase(googleLoginOrSignUp.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.user = payload;
      })
      .addCase(googleLoginOrSignUp.rejected, (state, { payload }) => {
        state.loading = false;
        state.user = null;
        // state.error = payload;
      })
  },
});

export const { updateError } = userSlice.actions;

export default userSlice.reducer;
