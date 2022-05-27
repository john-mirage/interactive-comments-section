import User from "@interfaces/user";
import Comment from "@interfaces/comment";

export default interface AppSectionInterface extends HTMLElement {
  currentUser: User;
  comments: Comment[];
}