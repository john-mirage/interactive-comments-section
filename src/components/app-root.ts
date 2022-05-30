import User from "@interfaces/user";
import Comment from "@interfaces/comment";
import AppPostInterface from "@interfaces/app-post";

class AppRoot extends HTMLElement {
  _user: User | false;
  _comments: Comment[] | false;

  constructor() {
    super();
    this._user = false;
    this._comments = false;
  }

  get user() {
    if (this._user) {
      return this._user;
    } else {
      throw new Error("The user is not defined");
    }
  }

  get comments() {
    if (this._comments) {
      return this._comments;
    } else {
      throw new Error("The comments are not defined");
    }
  }

  set user(user: User) {
    this._user = user;
  }

  set comments(comments: Comment[]) {
    this._comments = comments;
  }

  connectedCallback() {
    this.classList.add("app");
    this.comments.forEach((comment) => {
      const post = this.createPost(comment);
      this.appendChild(post);
    });
    const form = this.createForm();
    this.appendChild(form);
  }

  createPost(comment: Comment) {
    const post = <AppPostInterface>document.createElement("div", { is: "app-post" });
    post.user = this.user;
    post.comment = comment;
    return post;
  }

  createForm() {
    const form = document.createElement("form", { is: "app-form" });
    form.user = this.user;
    form.buttonLabel = "send";
    return form;
  }
}

export default AppRoot;