import Comment from "@interfaces/comment";
import User from "@interfaces/user";

export default interface AppCommentInterface extends HTMLDivElement {
  currentUser: User;
  comment: Comment;
}