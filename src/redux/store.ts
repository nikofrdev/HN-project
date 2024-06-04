import { configureStore } from '@reduxjs/toolkit';
import storiesSlice from './slices/storiesSlice';
import commentsSlice from './slices/commentsSlice';



export const store = configureStore({
  reducer: {
    stories: storiesSlice,
    comments: commentsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;