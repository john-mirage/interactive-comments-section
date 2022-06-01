import User from "@interfaces/user";

class AppForm extends HTMLFormElement {
  _user: User | false;
  _buttonLabel: string | false;
  _inputId: string | false;
  initialCall: boolean;
  labelElement: HTMLLabelElement;
  inputElement: HTMLTextAreaElement;
  avatarElement: HTMLImageElement;
  sendButtonElement: HTMLButtonElement;

  constructor() {
    super();
    this._user = false;
    this._buttonLabel = false;
    this._inputId = false;
    this.initialCall = true;
    this.labelElement = document.createElement("label");
    this.inputElement = document.createElement("textarea");
    this.avatarElement = document.createElement("img");
    this.sendButtonElement = document.createElement("button");
  }

  get user() {
    if (this._user) {
      return this._user;
    } else {
      throw new Error("The user is not defined");
    }
  }

  get buttonLabel() {
    if (this._buttonLabel) {
      return this._buttonLabel;
    } else {
      throw new Error("The button label is not defined");
    }
  }

  get inputId() {
    if (this._inputId) {
      return this._inputId;
    } else {
      throw new Error("The input id is not defined");
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

  connectedCallback() {
    if (this.initialCall) {
      this.classList.add("form", "form--standalone");
      this.labelElement.classList.add("form__label");
      this.inputElement.classList.add("form__input");
      this.avatarElement.classList.add("form__avatar");
      this.sendButtonElement.classList.add("form__button");
      this.labelElement.setAttribute("for", this.inputId);
      this.inputElement.setAttribute("id", this.inputId);
      this.inputElement.setAttribute("placeholder", "Add a comment...");
      this.avatarElement.setAttribute("src", this.user.image.png);
      this.avatarElement.setAttribute("alt", `Profile picture of ${this.user.username}`);
      this.sendButtonElement.setAttribute("type", "button");
      this.sendButtonElement.textContent = this.buttonLabel;
      this.append(this.labelElement, this.inputElement, this.avatarElement, this.buttonElement);
      this.initialCall = false;
    }
    this.sendButtonElement.addEventListener("click", this.handleSendButton);
  }

  disconnectedCallback() {
    this.sendButtonElement.removeEventListener("click", this.handleSendButton);
  }

  handleSendButton() {
    const formData = new FormData(this);
    const customEvent = new CustomEvent("submit-form", { detail: { formData } });
    this.dispatchEvent(customEvent);
  }
}

export default AppForm;