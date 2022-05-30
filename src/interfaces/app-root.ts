import User from "@interfaces/user";
import Comment from "@interfaces/comment";

export default interface AppRootInterface extends HTMLElement {
  _user: User;
  _comments: Comment[];
  user: User;
  comments: Comment[];
}