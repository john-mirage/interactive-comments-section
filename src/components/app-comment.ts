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
    if (this.comment.replyingTo) {
      const commentContent = <HTMLParagraphElement>fragment.querySelector(".comment__content");
      const replyingTo = this.createReplyingTo();
      commentContent.prepend(replyingTo);
    }
    const commentActions = <HTMLDivElement>fragment.querySelector(".comment__actions");
    if (this.user.username === this.comment.user.username) {
      const deleteButton = this.createActionButton("delete");
      const editButton = this.createActionButton("edit");
      commentActions.append(deleteButton, editButton);
    } else {
      const replyButton = this.createActionButton("reply");
      commentActions.append(replyButton);
    }
    const score = this.createScore();
    commentScore.appendChild(score);
    this.appendChild(fragment);
  }

  setAvatar(element: HTMLImageElement | null) {
    if (element) {
      element.setAttribute("src", this.comment.user.image.png);
    }
  }

  setUsername(element: HTMLParagraphElement | null) {
    if (element) {
      element.textContent = this.comment.user.username;
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

  createReplyingTo() {
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
}

export default AppComment;