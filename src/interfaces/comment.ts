import User from "@interfaces/user";
import Reply from "@interfaces/reply";

export default interface Comment {
  id: number;
  content: string;
  createdAt: string;
  score: number;
  user: User;
  replies: Reply[];
}