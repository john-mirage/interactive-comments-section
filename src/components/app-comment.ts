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
    this.classList.add("comment");
    const template = <HTMLTemplateElement>document.getElementById("template-comment");
    const fragment = <DocumentFragment>template.content.cloneNode(true);
    const commentScore = <HTMLDivElement>fragment.querySelector(".comment__score");
    this.setAvatar(fragment.querySelector(".avatar"));
    this.setUsername(fragment.querySelector(".comment__username"));
    this.setCreatedAt(fragment.querySelector(".comment__created-at"));
    this.setContent(fragment.querySelector(".comment__content"));
    const score = this.createScore();
    commentScore.appendChild(score);
    this.appendChild(fragment);
  }

  setAvatar(element: HTMLImageElement | null) {
    if (element) {
      element.setAttribute("src", this.user.image.png);
    }
  }

  setUsername(element: HTMLParagraphElement | null) {
    if (element) {
      element.textContent = this.user.username;
    }
  }

  setCreatedAt(element: HTMLParagraphElement | null) {
    if (element) {
      element.textContent = this.comment.createdAt;
    }
  }

  setContent(element: HTMLParagraphElement | null) {
    if (element) {
      element.textContent = this.comment.content;
    }
  }

  createScore() {
    const score = <AppScoreInterface>document.createElement("div", { is: "app-score" });
    score.count = this.comment.score;
    return score;
  }

  createReplyingTo(username: string) {
    const contentElement = <HTMLParagraphElement>this.querySelector(".comment__content");
    const replyingToElement = document.createElement("a");
    replyingToElement.setAttribute("href", "#");
    replyingToElement.classList.add("comment__replying-to");
    replyingToElement.textContent = `@${username} `;
    contentElement.prepend(replyingToElement);
  }

  createAction(name: string) {
    const actions = <HTMLDivElement>this.querySelector(".comment__actions");
    const buttonElement = <AppButtonInterface>document.createElement("button", { is: "app-button" });
    buttonElement.icon = name;
    buttonElement.label = name;
    actions.appendChild(buttonElement);
  }
}

export default AppComment;