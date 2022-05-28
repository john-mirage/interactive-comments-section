import Comment from "@interfaces/comment";
import User from "@interfaces/user";

export default interface AppCommentInterface extends HTMLDivElement {
  loadComment: (user: User, comment: Comment) => void;
  loadScore: (score: number) => void;
}