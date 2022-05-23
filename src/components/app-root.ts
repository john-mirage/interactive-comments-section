import User from "@interfaces/user";
import Comment from "@interfaces/comment";

interface AppCommentProps {
  comment: Comment;
}

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
        const commentElement = document.createElement("app-comment") as HTMLElement & AppCommentProps;
        commentElement.comment = comment;
        this.appendChild(commentElement);
      });
      this.appendChild(form);
    }
  }
}

export default AppRoot;