class AppForm extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const template = document.getElementById("template-form") as HTMLTemplateElement;
    const fragment = template.content.cloneNode(true) as DocumentFragment;
    const formElement = fragment.querySelector(".form");
    this.appendChild(formElement);
  }
}

export default AppForm;