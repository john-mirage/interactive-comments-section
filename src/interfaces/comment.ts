import User from "@interfaces/user";

export default interface Comment {
  id: number;
  content: string;
  createdAt: string;
  score: number;
  user: User;
  replyingTo?: string;
  replies?: Comment[];
}