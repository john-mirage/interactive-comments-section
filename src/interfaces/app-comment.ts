import Comment from "@interfaces/comment";
import User from "@interfaces/user";

export default interface AppCommentInterface extends HTMLElement {
  currentUser: User;
  comment: Comment;
}