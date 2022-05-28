class AppForm extends HTMLFormElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const template = <HTMLTemplateElement>document.getElementById("template-form");
    const fragment = <DocumentFragment>template.content.cloneNode(true);
    this.appendChild(fragment);
  }
}

export default AppForm;