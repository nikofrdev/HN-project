import { createAsyncThunk } from "@reduxjs/toolkit";
import { CommentType } from "../../types/commentTypes";
import apiService from "../../services/apiServices";

export const getComments = createAsyncThunk<CommentType[], number>(
  "stories/getComments",
  async (id) => {
    const comments = await apiService.getStoryComments(id);

    return comments;
  }
);

export const updateComments = createAsyncThunk<CommentType[], number>(
  "stories/updateComments",
  async (id) => {
    const comments = await apiService.getStoryComments(id);

    return comments;
  }
);
