import Comment from "@interfaces/comment";
import User from "@interfaces/user";

export default interface AppCommentInterface extends HTMLDivElement {
  _user: User;
  _comment: Comment;
  user: User;
  comment: Comment;
}