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
      const actions = <HTMLDivElement>fragment.querySelector(".post__actions");
      if ("amyrobson" === this.comment.user.username) {
        const deleteButton = this.createActionButton("delete", "delete");
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

  createActionButton(label: string, shape: string) {
    const buttonElement = <HTMLButtonElement>document.createElement("button");
    const iconElement = <HTMLElement>document.createElement("app-icon");
    const labelElement = <HTMLLabelElement>document.createElement("label");
    buttonElement.classList.add("button-action");
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