import User from "@interfaces/user";

class AppForm extends HTMLFormElement {
  _user?: User;
  _buttonLabel?: string;
  _inputId?: string;
  _isReplyForm?: boolean;
  initialCall: boolean;
  labelElement: HTMLLabelElement;
  inputElement: HTMLTextAreaElement;
  avatarElement: HTMLImageElement;
  buttonGroupElement: HTMLDivElement;
  sendButtonElement: HTMLButtonElement;
  cancelButtonElement?: HTMLButtonElement;

  constructor() {
    super();
    this.initialCall = true;
    this.labelElement = document.createElement("label");
    this.inputElement = document.createElement("textarea");
    this.avatarElement = document.createElement("img");
    this.buttonGroupElement = document.createElement("div");
    this.sendButtonElement = document.createElement("button");
    this.handleSendButton = this.handleSendButton.bind(this);
    this.handleCancelButton = this.handleCancelButton.bind(this);
  }

  get user() {
    if ("_user" in this && this._user !== undefined) {
      return this._user;
    } else {
      throw new Error("The user is not defined");
    }
  }

  get buttonLabel() {
    if ("_buttonLabel" in this && this._buttonLabel !== undefined) {
      return this._buttonLabel;
    } else {
      throw new Error("The button label is not defined");
    }
  }

  get inputId() {
    if ("_inputId" in this && this._inputId !== undefined) {
      return this._inputId;
    } else {
      throw new Error("The input id is not defined");
    }
  }

  get isReplyForm() {
    if ("_isReplyForm" in this && this._isReplyForm !== undefined) {
      return this._isReplyForm;
    } else {
      throw new Error("isReplyForm is not defined")
    }
  }

  set user(user: User) {
    this._user = user;
  }

  set buttonLabel(label: string) {
    this._buttonLabel = label;
  }

  set inputId(id: string) {
    this._inputId = id;
  }

  set isReplyForm(isReplyForm: boolean) {
    this._isReplyForm = isReplyForm;
  }

  connectedCallback() {
    if (this.initialCall) {
      this.classList.add("form", "form--standalone");
      this.labelElement.classList.add("form__label");
      this.inputElement.classList.add("form__input");
      this.avatarElement.classList.add("form__avatar");
      this.buttonGroupElement.classList.add("form__button-group");
      this.sendButtonElement.classList.add("form__button", "form__button--confirm");
      this.labelElement.setAttribute("for", this.inputId);
      this.inputElement.setAttribute("id", this.inputId);
      this.inputElement.setAttribute("placeholder", "Add a comment...");
      this.inputElement.setAttribute("name", "comment");
      this.avatarElement.setAttribute("src", this.user.image.png);
      this.avatarElement.setAttribute("alt", `Profile picture of ${this.user.username}`);
      this.sendButtonElement.setAttribute("type", "button");
      this.sendButtonElement.textContent = this.buttonLabel;
      if (this.isReplyForm) {
        this.cancelButtonElement = document.createElement("button");
        this.cancelButtonElement.classList.add("form__button", "form__button--cancel");
        this.cancelButtonElement.setAttribute("type", "button");
        this.cancelButtonElement.textContent = "cancel";
        this.buttonGroupElement.append(this.cancelButtonElement);
      }
      this.buttonGroupElement.append(this.sendButtonElement);
      this.append(this.labelElement, this.inputElement, this.avatarElement, this.buttonGroupElement);
      this.initialCall = false;
    }
    this.sendButtonElement.addEventListener("click", this.handleSendButton);
    if (this.isReplyForm) {
      this.cancelButtonElement?.addEventListener("click", this.handleCancelButton);
    }
  }

  disconnectedCallback() {
    this.sendButtonElement.removeEventListener("click", this.handleSendButton);
    if (this.isReplyForm) {
      this.cancelButtonElement?.removeEventListener("click", this.handleCancelButton);
    }
  }

  handleSendButton() {
    const formData = new FormData(this);
    const customEvent = new CustomEvent("submit-form", { detail: { formData }, bubbles: true });
    this.dispatchEvent(customEvent);
  }

  handleCancelButton() {
    this.remove();
  }
}

export default AppForm;