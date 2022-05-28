import User from "@interfaces/user";
import Comment from "@interfaces/comment";
import AppCommentInterface from "@interfaces/app-comment";

class AppRoot extends HTMLElement {
  currentUser: User | false;
  comments: Comment[] | false;

  constructor() {
    super();
    this.currentUser = false;
    this.comments = false;
  }

  connectedCallback() {
    if (this.currentUser && this.comments) {
      const form = document.createElement("app-form");
      this.comments.forEach((comment) => {
        const commentElement = <AppCommentInterface>document.createElement("app-comment");
        commentElement.currentUser = <User>this.currentUser;
        commentElement.comment = comment;
        this.appendChild(commentElement);
      });
      this.appendChild(form);
    }
  }
}

export default AppRoot;