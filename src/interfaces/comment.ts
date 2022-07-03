import User from "@interfaces/user";

export default interface Comment {
  id: string;
  content: string;
  createdAt: string;
  score: number;
  user: User;
  replyingTo?: string;
  replies?: Comment[];
}