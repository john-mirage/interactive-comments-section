import User from "@interfaces/user";

class AppForm extends HTMLFormElement {
  _user: User | false;
  _buttonLabel: string | false;
  _inputId: string | false;

  constructor() {
    super();
    this._user = false;
    this._buttonLabel = false;
    this._inputId = false;
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
    const label = document.createElement("label");
    const input = document.createElement("textarea");
    const avatar = document.createElement("img");
    const button = document.createElement("button");
    this.classList.add("form", "form--standalone");
    label.classList.add("form__label");
    input.classList.add("form__input");
    avatar.classList.add("form__avatar");
    button.classList.add("form__button");
    label.setAttribute("for", this.inputId);
    input.setAttribute("id", this.inputId);
    input.setAttribute("placeholder", "Add a comment...");
    avatar.setAttribute("src", this.user.image.png);
    avatar.setAttribute("alt", `Profile picture of ${this.user.username}`);
    button.setAttribute("type", "button");
    button.textContent = this.buttonLabel;
    this.append(label, input, avatar, button);
  }
}

export default AppForm;