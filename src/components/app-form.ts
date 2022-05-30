import User from "@interfaces/user";

class AppForm extends HTMLFormElement {
  _user: User | false;
  _buttonLabel: string | false;

  constructor() {
    super();
    this._user = false;
    this._buttonLabel = false;
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

  set user(user: User) {
    this._user = user;
  }

  set buttonLabel(label: string) {
    this._buttonLabel = label;
  }

  connectedCallback() {
    this.classList.add("form");
    const template = <HTMLTemplateElement>document.getElementById("template-form");
    const fragment = <DocumentFragment>template.content.cloneNode(true);
    const avatarElement = <HTMLImageElement>fragment.querySelector(".avatar");
    const submitButton = <HTMLButtonElement>fragment.querySelector(".form__button");
    avatarElement.setAttribute("src", this.user.image.png);
    submitButton.textContent = this.buttonLabel;
    this.appendChild(fragment);
  }
}

export default AppForm;