import { createSlice } from "@reduxjs/toolkit";
import type { StoryState } from "../../types/storiesTypes";
import {
  autoUpdateStoriesThunk,
  fetchStoriesThunk,
} from "../thunkActions/storyThunkAction";

const initialState: StoryState = {
  status: "fetching",
  data: [],
  currentStory: null,
};

const storySlice = createSlice({
  name: "stories",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(fetchStoriesThunk.pending, (state) => {
      state.status = "fetching";
    });

    builder.addCase(fetchStoriesThunk.fulfilled, (state, action) => {
      state.status = "idle";
      state.data = action.payload;
      const foundStory = state.data.find((story) => story.id === action.meta.arg);
      state.currentStory = foundStory || null;
    });
    builder.addCase(fetchStoriesThunk.rejected, (state) => {
      state.status = "error";
    });
    builder.addCase(autoUpdateStoriesThunk.pending, (state) => {
      state.status = "fetching";
    });

    builder.addCase(autoUpdateStoriesThunk.fulfilled, (state, action) => {
      state.status = "idle";
      state.data = action.payload;
    });
    builder.addCase(autoUpdateStoriesThunk.rejected, (state) => {
      state.status = "error";
    });
  },
});

export default storySlice.reducer;
