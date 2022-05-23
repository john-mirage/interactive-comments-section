import User from "@interfaces/user";
import Comment from "@interfaces/comment";

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

    }
  }
}

export default AppRoot;