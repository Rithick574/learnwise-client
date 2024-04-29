import { createSlice } from "@reduxjs/toolkit";
import { googleLoginOrSignUp,getUserDataFirst,signUpUser,loginUser,logout } from "../actions/user/userActions";



  const initialState = {
    loading: false as boolean,
    user: null as any | null,
    error: null as any | null,
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
        state.error = payload;
      })

      // Login States
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.user = payload;
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        console.log("🚀 ~ file: userSlice.tsx:48 ~ .addCase ~ payload:", payload)
        state.loading = false;
        state.user = null;
        state.error = payload;
      })
      
       // Logout States
       .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        state.user = null;
      })
      .addCase(logout.rejected, (state, { payload }) => {
        state.loading = false;
        state.user = null;
        state.error = payload;
      })

       // Get User data when user comes back later to website after closing the browser.
       .addCase(getUserDataFirst.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserDataFirst.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.user = payload;
      })
      .addCase(getUserDataFirst.rejected, (state) => {
        state.loading = false;
        state.user = null;
        state.error = null;
      })

       // Sign-up States
       .addCase(signUpUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(signUpUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.user = payload.data;
      })
      .addCase(signUpUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.user = null;
        state.error = payload;
      })
  },
});

export const { updateError } = userSlice.actions;

export default userSlice.reducer;
