import { createAsyncThunk } from "@reduxjs/toolkit";
import type { StoryType } from "../../types/storiesTypes";
import apiService from "../../services/apiServices";

export const fetchStoriesThunk = createAsyncThunk<StoryType[], number | undefined>(
  "stories/fetchAll",
  async (id: number | undefined) => {
    const storyIds = await apiService.getStories();
    const stories = await Promise.all(
     (id ? [id] : storyIds.slice(0, 100)).map((id) => apiService.getStoryDetails(id))
    );
    return stories.sort((a, b) => b.time - a.time);
  }
);
export const autoUpdateStoriesThunk = createAsyncThunk<StoryType[]>(
  "stories/autoUpdate",
  async () => {
    const storyIds = await apiService.getStories();
    const stories = await Promise.all(
      storyIds.slice(0, 100).map((id) => apiService.getStoryDetails(id))
    );
    return stories.sort((a, b) => b.time - a.time);
  }
);
