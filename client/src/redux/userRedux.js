import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "users",
  initialState: {
    currentUser: null,
    isFetching: false,
    error: false,
    success: false,
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
      state.error = false;
      state.success = true;
    },
    loginFailure: (state) => {
      state.error = true;
      state.isFetching = false;
    },
  },
});
export const {loginStart,loginSuccess,loginFailure} = userSlice.actions;
export default userSlice.reducer
