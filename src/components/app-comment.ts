import AppScoreInterface from "@interfaces/app-score";
import User from "@interfaces/user";
import Comment from "@interfaces/comment";
import AppButtonInterface from "@interfaces/app-button";
import AppModalInterface from "@interfaces/app-modal";
import AppFormInterface from "@interfaces/app-form";

class AppComment extends HTMLDivElement {
  _user: User | false;
  _comment: Comment | false;
  infoElement: HTMLDivElement;
  avatarElement: HTMLImageElement;
  usernameElement: HTMLParagraphElement;
  createdAtElement: HTMLParagraphElement;
  contentElement: HTMLParagraphElement;
  scoreElement: HTMLDivElement;
  scoreButtonElement: AppScoreInterface;
  actionsElement: HTMLDivElement;
  badgeElement?: HTMLParagraphElement;
  deleteButtonElement?: AppButtonInterface;
  editButtonElement?: AppButtonInterface;
  replyButtonElement?: AppButtonInterface;
  deleteModalElement?: AppModalInterface;
  editFormElement?: HTMLFormElement;
  replyFormElement?: AppFormInterface;

  constructor() {
    super();
    this._user = false;
    this._comment = false;
    this.infoElement = document.createElement("div");
    this.avatarElement = document.createElement("img");
    this.usernameElement = document.createElement("p");
    this.createdAtElement = document.createElement("p");
    this.contentElement = document.createElement("p");
    this.scoreElement = document.createElement("div");
    this.scoreButtonElement = <AppScoreInterface>document.createElement("div", { is: "app-score" });
    this.actionsElement = document.createElement("div");
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
    this.infoElement.classList.add("comment__info");
    this.avatarElement.classList.add("comment__avatar");
    this.usernameElement.classList.add("comment__username");
    this.createdAtElement.classList.add("comment__created-at");
    this.contentElement.classList.add("comment__content");
    this.scoreElement.classList.add("comment__score");
    this.actionsElement.classList.add("comment__actions");
    this.avatarElement.setAttribute("src", this.comment.user.image.png);
    this.avatarElement.setAttribute("alt", `Profile picture of ${this.comment.user.username}`);
    this.usernameElement.textContent = this.comment.user.username;
    this.createdAtElement.textContent = this.comment.createdAt;
    this.contentElement.textContent = this.comment.content;
    this.scoreButtonElement.count = this.comment.score;
    this.handleReplyingToText();
    this.handleActionButtons();
    this.infoElement.append(this.avatarElement, this.usernameElement, this.createdAtElement);
    this.scoreElement.append(this.scoreButtonElement);
    this.append(this.infoElement, this.contentElement, this.scoreElement, this.actionsElement);
  }

  disconnectedCallback() {
    this.deleteButtonElement?.removeEventListener("click", this.handleDeleteButton);
    this.editButtonElement?.removeEventListener("click", this.handleEditButton);
    this.replyButtonElement?.removeEventListener("click", this.handleReplyButton);
  }

  handleReplyingToText() {
    if (this.comment.replyingTo) {
      const replyingToText = this.createReplyingToText();
      this.contentElement.prepend(replyingToText);
    }
  }

  handleActionButtons() {
    if (this.user.username === this.comment.user.username) {
      this.badgeElement = this.createOwnerBadge();
      this.deleteButtonElement = this.createActionButton("delete");
      this.editButtonElement = this.createActionButton("edit");
      this.deleteButtonElement.addEventListener("click", this.handleDeleteButton);
      this.editButtonElement.addEventListener("click", this.handleEditButton);
      this.actionsElement.append(this.deleteButtonElement, this.editButtonElement);
    } else {
      this.replyButtonElement = this.createActionButton("reply");
      this.replyButtonElement.addEventListener("click", this.handleReplyButton);
      this.actionsElement.append(this.replyButtonElement);
    }
  }

  handleDeleteButton() {
    const modal = this.getDeleteModal();
    modal.mount();
  }

  handleEditButton() {
    this.editButtonElement?.disable();
    const editForm = this.getEditForm();
    this.contentElement?.replaceWith(editForm);
  }

  handleReplyButton() {
    const replyForm = this.getReplyForm();
    this.after(replyForm);
  }

  getDeleteModal() {
    if (!this.deleteModalElement) {
      this.deleteModalElement = <AppModalInterface>document.createElement("div", { is: "app-modal" });
      this.deleteModalElement.modal = {
        title: "Delete comment",
        description: "Are you sure you want to delete this comment? This will remove the comment and can’t be undone.",
        eventType: "delete-comment",
        eventDetail: this.comment,
        buttonLabel: "yes, delete"
      }
      return this.deleteModalElement;
    } else {
      return this.deleteModalElement;
    }
  }

  getEditForm() {
    if (!this.editFormElement) {
      this.editFormElement = document.createElement("form");
      const label = document.createElement("label");
      const input = document.createElement("textarea");
      const button = document.createElement("button");
      this.editFormElement.classList.add("form", "form--comment");
      label.classList.add("form__label");
      input.classList.add("form__input");
      button.classList.add("form__button");
      input.value = `@${this.comment.replyingTo} ${this.comment.content}`;
      button.textContent = "update";
      this.editFormElement.append(label, input, button);
      return this.editFormElement;
    } else {
      return this.editFormElement;
    }
  }

  getReplyForm() {
    if (!this.replyFormElement) {
      this.replyFormElement = <AppFormInterface>document.createElement("form", { is: "app-form" });
      this.replyFormElement.user = this.user;
      this.replyFormElement.buttonLabel = "reply";
      this.replyFormElement.inputId = `add-reply-form-${String(this.comment.id)}`;
      return this.replyFormElement;
    } else {
      return this.replyFormElement;
    }
  }

  createOwnerBadge() {
    const ownerBadgeElement = document.createElement("p");
    ownerBadgeElement.classList.add("comment__owned");
    ownerBadgeElement.textContent = "you";
    return ownerBadgeElement;
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
}

export default AppComment;