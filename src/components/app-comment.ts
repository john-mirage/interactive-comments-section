import Comment from "@interfaces/comment";
import User from "@interfaces/user";
import AppScoreButtonInterface from "@interfaces/app-score-button";

class AppComment extends HTMLElement {
  currentUser: User | false;
  comment: Comment | false;

  constructor() {
    super();
    this.currentUser = false;
    this.comment = false;
  }

  connectedCallback() {
    if (this.currentUser && this.comment) {
      const comment = this.createComment(this.comment);
      this.appendChild(comment);
      if (this.comment.replies.length > 0) {
        const repliesTemplate = <HTMLTemplateElement>document.getElementById("template-replies");
        const repliesFragment = <DocumentFragment>repliesTemplate.content.cloneNode(true);
        const repliesElement = <HTMLDivElement>repliesFragment.querySelector(".replies");
        const repliesListElement = <HTMLDivElement>repliesFragment.querySelector(".replies__list");
        this.appendChild(repliesElement);
        this.comment.replies.forEach((reply) => {
          const replyElement = this.createComment(reply);
          const cardElement = replyElement.querySelector(".post__card");
          repliesListElement.appendChild(cardElement);
        });
      }
    }
  }

  createComment(comment: Comment) {
    const template = <HTMLTemplateElement>document.getElementById("template-post");
    const fragment = <DocumentFragment>template.content.cloneNode(true);
    const postElement = <HTMLDivElement>fragment.querySelector(".post");
    const avatarElement = <HTMLImageElement>fragment.querySelector(".avatar");
    const postUserElement = <HTMLElement>fragment.querySelector(".post__username");
    const postCreatedAtElement = <HTMLElement>fragment.querySelector(".post__created-at");
    const postContentElement = <HTMLParagraphElement>fragment.querySelector(".post__content");
    const postScoreElement = <HTMLDivElement>fragment.querySelector(".post__score");
    const scoreButton = <AppScoreButtonInterface>document.createElement("app-score-button");
    scoreButton.score = comment.score;
    postScoreElement.appendChild(scoreButton);
    avatarElement.setAttribute("src", comment.user.image.png);
    postUserElement.textContent = comment.user.username;
    postCreatedAtElement.textContent = comment.createdAt;
    postContentElement.textContent = comment.content;
    const actions = <HTMLDivElement>fragment.querySelector(".post__actions");
    if (this.currentUser && this.currentUser.username === comment.user.username) {
      const deleteButton = this.createActionButton("delete", "delete", true);
      const editButton = this.createActionButton("edit", "edit");
      actions.append(deleteButton, editButton);
    } else {
      const replyButton = this.createActionButton("reply", "reply");
      actions.appendChild(replyButton);
    }
    return postElement;
  }

  createActionButton(label: string, shape: string, danger = false) {
    const buttonElement = <HTMLButtonElement>document.createElement("button");
    const iconElement = <HTMLElement>document.createElement("app-icon");
    const labelElement = <HTMLLabelElement>document.createElement("label");
    if (danger) {
      buttonElement.classList.add("button-action", "button-action--danger");
    } else {
      buttonElement.classList.add("button-action");
    }
    iconElement.classList.add("button-action__icon");
    labelElement.classList.add("button-action__label");
    iconElement.setAttribute("icon-height", "14px");
    iconElement.setAttribute("shape", shape);
    labelElement.textContent = label;
    buttonElement.append(iconElement, labelElement);
    return buttonElement;
  }
}

export default AppComment;