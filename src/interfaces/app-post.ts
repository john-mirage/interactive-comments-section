import User from "@interfaces/user";
import Comment from "@interfaces/comment";

export default interface AppPostInterface extends HTMLDivElement {
  _user: User;
  _comment: Comment;
  user: User;
  comment: Comment;
}