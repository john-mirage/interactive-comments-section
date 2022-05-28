import User from "@interfaces/user";
import Comment from "@interfaces/comment";
import Reply from "@interfaces/reply";

export default interface AppPostInterface extends HTMLElement {
  loadComment: (user: User, comment: Comment) => void;
  loadReplies: (user: User, replies: Reply[]) => void;
}