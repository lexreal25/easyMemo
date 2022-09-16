import { createSlice } from "@reduxjs/toolkit";

const memoSlice = createSlice({
  name: "memo",
  initialState: {
    Memo: null,
    isFetching: false,
    error: false,
    success: false,
  },
  reducers: {
    getMemo: (state) => {
      state.isFetching = true;
    },
    getMemoSuccess: (state, action) => {
      state.success = true
      state.Memo = action.payload;
    },
    getMemoFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const{
      getMemo,getMemoFailure,getMemoSuccess
} = memoSlice.actions;
export default memoSlice.reducer
