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
    const user = document.createElement("div");
    const avatar = document.createElement("img");
    const action = document.createElement("div");
    const button = document.createElement("button");
    this.classList.add("form");
    label.classList.add("form__label");
    input.classList.add("form__input");
    user.classList.add("form__user");
    avatar.classList.add("avatar", "avatar--form");
    action.classList.add("form__action");
    button.classList.add("form__button");
    label.setAttribute("for", this.inputId);
    input.setAttribute("id", this.inputId);
    input.setAttribute("placeholder", "Add a comment...");
    avatar.setAttribute("src", this.user.image.png);
    avatar.setAttribute("alt", `Profile picture of ${this.user.username}`);
    button.setAttribute("type", "button");
    button.textContent = this.buttonLabel;
    user.append(avatar);
    action.append(button);
    this.append(label, input, user, action);
  }
}

export default AppForm;