export type StoryType = {
  id: number;
  by: string;
  score: number;
  title: string;
  time: number;
  kids: number[];
};

export type StoryState = {
  status: "fetching" | "idle" | "error";
  data: StoryType[];
  currentStory: StoryType | null;
};
