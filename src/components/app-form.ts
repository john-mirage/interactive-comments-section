class AppForm extends HTMLFormElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const template = <HTMLTemplateElement>document.getElementById("template-form");
    const fragment = <DocumentFragment>template.content.cloneNode(true);
    this.appendChild(fragment);
  }

  loadForm(avatar: string, label: string) {
    const avatarElement = <HTMLImageElement>this.querySelector(".avatar");
    const submitButton = <HTMLButtonElement>this.querySelector(".form__button");
    avatarElement.setAttribute("src", avatar);
    submitButton.textContent = label;
  }
}

export default AppForm;