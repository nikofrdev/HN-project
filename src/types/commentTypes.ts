export type CommentType = {
  id: number;
  by: string;
  time: number;
  text: string;
  type: string;
  parent?: number;
  kids?: number[];
};
