import User from "@interfaces/user";
import Comment from "@interfaces/comment";
import AppPostInterface from "@interfaces/app-post";
import AppFormInterface from "@interfaces/app-form";
import { nanoid } from "nanoid";

class AppRoot extends HTMLElement {
  _user?: User;
  _comments?: Comment[];

  constructor() {
    super();
  }

  get user() {
    if ("_user" in this && this._user !== undefined) {
      return this._user;
    } else {
      throw new Error("The user is not defined");
    }
  }

  get comments() {
    if ("_comments" in this && this._comments !== undefined) {
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
      this.append(post);
    });
    const sendForm = this.createSendForm();
    this.append(sendForm);
    this.addEventListener("submit-form", (event) => {
      const content = (<CustomEvent>event).detail.formData.get("comment");
      const comment: Comment = {
        id: nanoid(),
        content: content,
        createdAt: "now",
        score: 0,
        user: this.user,
        replies: [],
      }
      const post = this.createPost(comment);
      this.prepend(post);
    });
  }

  createPost(comment: Comment) {
    const post = <AppPostInterface>document.createElement("div", { is: "app-post" });
    post.user = this.user;
    post.comment = comment;
    return post;
  }

  createSendForm() {
    const sendForm = <AppFormInterface>document.createElement("form", { is: "app-form" });
    sendForm.user = this.user;
    sendForm.buttonLabel = "send";
    sendForm.inputId = "add-comment-form";
    sendForm.isReplyForm  = false;
    return sendForm;
  }
}

export default AppRoot;