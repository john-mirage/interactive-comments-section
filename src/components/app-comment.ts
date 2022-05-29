import Comment from "@interfaces/comment";
import AppScoreInterface from "@interfaces/app-score";
import User from "@interfaces/user";

class AppComment extends HTMLDivElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const template = <HTMLTemplateElement>document.getElementById("template-comment");
    const fragment = <DocumentFragment>template.content.cloneNode(true);
    this.classList.add("comment");
    this.appendChild(fragment);
  }

  loadComment(user: User, comment: Comment) {
    const avatar = <HTMLImageElement>this.querySelector(".avatar");
    const username = <HTMLParagraphElement>this.querySelector(".comment__username");
    const createdAt = <HTMLParagraphElement>this.querySelector(".comment__created-at");
    const content = <HTMLParagraphElement>this.querySelector(".comment__content");
    avatar.setAttribute("src", comment.user.image.png);
    username.textContent = comment.user.username;
    createdAt.textContent = comment.createdAt;
    content.textContent = comment.content;
    if (comment.replyingTo) {
      const replyingTo = document.createElement("span");
      replyingTo.classList.add("comment__replying-to");
      replyingTo.textContent = `@${comment.replyingTo} `;
      content.prepend(replyingTo);
    }
    this.createScore(comment.score);
    const actions = <HTMLDivElement>this.querySelector(".comment__actions");
    if (user.username === comment.user.username) {
      const deleteButton = this.createActionButton("delete", "delete", true);
      const editButton = this.createActionButton("edit", "edit");
      actions.append(deleteButton, editButton);
    } else {
      const replyButton = this.createActionButton("reply", "reply");
      actions.appendChild(replyButton);
    }
  }

  createScore(score: number) {
    const commentScore = <HTMLDivElement>this.querySelector(".comment__score");
    const scoreElement = <AppScoreInterface>document.createElement("div", { is: "app-score" });
    commentScore.appendChild(scoreElement);
    scoreElement.loadScore(score);
  }

  createActionButton(label: string, shape: string, danger = false) {
    const buttonElement = <HTMLButtonElement>document.createElement("button");
    const iconElement = <HTMLElement>document.createElement("app-icon");
    const labelElement = <HTMLLabelElement>document.createElement("label");
    if (danger) {
      buttonElement.classList.add("action", "action--danger");
    } else {
      buttonElement.classList.add("action");
    }
    iconElement.classList.add("action__icon");
    labelElement.classList.add("action__label");
    iconElement.setAttribute("icon-height", "14px");
    iconElement.setAttribute("shape", shape);
    labelElement.textContent = label;
    buttonElement.append(iconElement, labelElement);
    return buttonElement;
  }
}

export default AppComment;