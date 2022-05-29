import User from "@interfaces/user";
import Comment from "@interfaces/comment";

export default interface AppRootInterface extends HTMLElement {
  loadPosts: (user: User, comments: Comment[]) => void;
  createForm: (user: User) => void;
}