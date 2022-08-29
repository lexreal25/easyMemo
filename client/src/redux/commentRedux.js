import { createSlice } from "@reduxjs/toolkit";

const commentSlice = createSlice({
  name: "comment",
  initialState: {
    comments: null,
    error: false,
    sending: false
  },
  reducers: {
    allComments: (state, action) => {
      state.comments = action.payload;
      state.error = false;
    }
  },
})
export const {allComments} = commentSlice.actions
export default commentSlice.reducer
