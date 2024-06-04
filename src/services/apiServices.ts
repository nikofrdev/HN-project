import type { AxiosInstance } from "axios";
import axios from "axios";
import { StoryType } from "../types/storiesTypes";
import { CommentType } from "../types/commentTypes";

const api = axios.create({
  baseURL: 'https://hacker-news.firebaseio.com/v0',
});

class ApiService {
    constructor(private readonly apiInstance: AxiosInstance) {}
  
    public getStories(): Promise<number[]> {
      return this.apiInstance.get<number[]>('/newstories.json').then((res) => res.data);
    }

    public getStoryDetails(id: number): Promise<StoryType> {
      return this.apiInstance.get<StoryType>(`/item/${id}.json`).then((res) => res.data);
    }
    public getStoryComments(id: number): Promise<CommentType[]> {
      return this.apiInstance.get<StoryType>(`/item/${id}.json`)
        .then((res) => res.data)
        .then((story) => this.fetchComments(story.kids || []));
    }

    private async fetchComments(commentIds: number[]): Promise<CommentType[]> {
      const commentPromises = commentIds.map((id) =>
        this.apiInstance.get<CommentType>(`/item/${id}.json`).then((res) => res.data)
      );
      return await Promise.all(commentPromises);
    }
}

export default new ApiService(api);
