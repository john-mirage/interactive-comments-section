import User from "@interfaces/user";

export default interface Reply {
  id: number;
  content: string;
  createdAt: string;
  score: string;
  user: User;
}