import Comment from "@interfaces/comment";
import User from "@interfaces/user";

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
      const template = <HTMLTemplateElement>document.getElementById("template-post");
      const fragment = <DocumentFragment>template.content.cloneNode(true);
      const postElement = <HTMLDivElement>fragment.querySelector(".post");
      const avatarElement = <HTMLImageElement>fragment.querySelector(".avatar");
      const postUserElement = <HTMLElement>fragment.querySelector(".post__username");
      const postCreatedAtElement = <HTMLElement>fragment.querySelector(".post__created-at");
      const postContentElement = <HTMLParagraphElement>fragment.querySelector(".post__content");
      avatarElement.setAttribute("src", this.comment.user.image.png);
      postUserElement.textContent = this.comment.user.username;
      postCreatedAtElement.textContent = this.comment.createdAt;
      postContentElement.textContent = this.comment.content;
      const actions = <HTMLDivElement>fragment.querySelector(".post__actions");
      if (this.currentUser.username === this.comment.user.username) {
        const deleteButton = this.createActionButton("delete", "delete", true);
        const editButton = this.createActionButton("edit", "edit");
        actions.append(deleteButton, editButton);
      } else {
        const replyButton = this.createActionButton("reply", "reply");
        actions.appendChild(replyButton);
      }
      this.appendChild(postElement);
      if (this.comment.replies.length > 0) {
        // Create replies
      }
    }
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