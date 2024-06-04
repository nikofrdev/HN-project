import { createSlice } from "@reduxjs/toolkit";
import type { CommentType } from "../../types/commentTypes";
import {
  getComments,
  updateComments,
} from "../thunkActions/commentThunkActions";

const initialState: {
  comments: CommentType[];
  status: "fetching" | "idle" | "error";
} = {
  comments: [],
  status: "idle",
};

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getComments.pending, (state) => {
      state.status = "fetching";
    });
    builder.addCase(getComments.fulfilled, (state, action) => {
      state.status = "idle";
      state.comments = action.payload;
    });
    builder.addCase(getComments.rejected, (state) => {
      state.status = "error";
    });
    builder.addCase(updateComments.pending, (state) => {
      state.status = "fetching";
    });
    builder.addCase(updateComments.fulfilled, (state, action) => {
      state.status = "idle";
      state.comments = action.payload;
    });
    builder.addCase(updateComments.rejected, (state) => {
      state.status = "error";
    });
  },
});

export default commentsSlice.reducer;
