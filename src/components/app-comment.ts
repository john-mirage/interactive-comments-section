import AppScoreInterface from "@interfaces/app-score";
import User from "@interfaces/user";
import Comment from "@interfaces/comment";
import AppButtonInterface from "@interfaces/app-button";

class AppComment extends HTMLDivElement {
  _user: User | false;
  _comment: Comment | false;

  constructor() {
    super();
    this._user = false;
    this._comment = false;
  }

  get user() {
    if (this._user) {
      return this._user;
    } else {
      throw new Error("The user is not defined");
    }
  }

  get comment() {
    if (this._comment) {
      return this._comment;
    } else {
      throw new Error("The comment is not defined");
    }
  }

  set user(user: User) {
    this._user = user;
  }

  set comment(comment: Comment) {
    this._comment = comment;
  }

  connectedCallback() {
    const info = document.createElement("div");
    const avatar = document.createElement("img");
    const username = document.createElement("p");
    const createdAt = document.createElement("p");
    const content = document.createElement("p");
    const score = document.createElement("div");
    const actions = document.createElement("div");
    this.classList.add("comment");
    info.classList.add("comment__info");
    avatar.classList.add("comment__avatar");
    username.classList.add("comment__username");
    createdAt.classList.add("comment__created-at");
    content.classList.add("comment__content");
    score.classList.add("comment__score");
    actions.classList.add("comment__actions");
    avatar.setAttribute("src", this.comment.user.image.png);
    avatar.setAttribute("alt", `Profile picture of ${this.comment.user.username}`);
    username.textContent = this.comment.user.username;
    createdAt.textContent = this.comment.createdAt;
    content.textContent = this.comment.content;
    info.append(avatar, username, createdAt);
    const scoreButton = this.createScoreButton();
    score.append(scoreButton);
    if (this.comment.replyingTo) {
      const replyingToText = this.createReplyingToText();
      content.prepend(replyingToText);
    }
    if (this.user.username === this.comment.user.username) {
      const ownedBadge = this.createOwnedBadge();
      username.after(ownedBadge);
      const deleteButton = this.createActionButton("delete");
      const editButton = this.createActionButton("edit");
      deleteButton.addEventListener("click", () => {

      });
      actions.append(deleteButton, editButton);
    } else {
      const replyButton = this.createActionButton("reply");
      replyButton.addEventListener("click", () => {

      });
      actions.append(replyButton);
    }
    this.append(info, content, score, actions);
  }

  createScoreButton() {
    const score = <AppScoreInterface>document.createElement("div", { is: "app-score" });
    score.count = this.comment.score;
    return score;
  }

  createOwnedBadge() {
    const owned = document.createElement("p");
    owned.classList.add("comment__owned");
    owned.textContent = "you";
    return owned;
  }

  createReplyingToText() {
    const replyingTo = document.createElement("a");
    replyingTo.setAttribute("href", "#");
    replyingTo.classList.add("comment__replying-to");
    replyingTo.textContent = `@${this.comment.replyingTo} `;
    return replyingTo;
  }

  createActionButton(name: string) {
    const button = <AppButtonInterface>document.createElement("button", { is: "app-button" });
    button.icon = name;
    button.label = name;
    return button;
  }

  createReplyForm() {
    const replyForm = document.createElement("form", { is: "app-form" });
    replyForm.user = this.user;
    replyForm.buttonLabel = "reply";
    replyForm.inputId = `add-reply-form-${String(this.comment.id)}`;
    this.after(replyForm);
  }
}

export default AppComment;