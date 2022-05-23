import User from "@interfaces/user";

export default interface Comment {
  id: number;
  content: string;
  createdAt: string;
  score: string;
  user: User;
  replies?: Comment[];
}