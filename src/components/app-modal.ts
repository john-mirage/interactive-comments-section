class AppModal extends HTMLDivElement {
  _title: string | false;
  _description: string | false;
  _action: string | false;

  constructor() {
    super();
    this._title = false;
    this._description = false;
    this._action = false
  }

  get title() {
    if (this._title) {
      return this._title;
    } else {
      throw new Error("The title is not defined");
    }
  }

  get description() {
    if (this._description) {
      return this._description;
    } else {
      throw new Error("The description is not defined");
    }
  }

  get action() {
    if (this._action) {
      return this._action;
    } else {
      throw new Error("The action is not defined");
    }
  }

  set title(title: string) {
    this._title = title;
  }

  set description(description: string) {
    this._description = description;
  }

  set action(action: string) {
    this._action = action;
  }

  connectedCallback() {
    const dialog = document.createElement("div");
    const title = document.createElement("h2");
    const description = document.createElement("p");
    const cancelButton = document.createElement("button");
    const confirmButton = document.createElement("button");
    this.classList.add("modal");
    dialog.classList.add("modal__dialog");
    title.classList.add("modal__title");
    description.classList.add("modal__description");
    cancelButton.classList.add("modal__button");
    confirmButton.classList.add("modal__button", "modal__button--red");
    title.textContent = this.title;
    description.textContent = this.description;
    cancelButton.textContent = "No, Cancel";
    confirmButton.textContent = this.action;
    dialog.append(title, description, cancelButton, confirmButton);
    this.append(dialog);
    cancelButton.addEventListener("click", () => {
      this.unmount();
    });
  }

  mount() {
    document.body.prepend(this);
  }

  unmount() {
    document.body.removeChild(this);
  }
}

export default AppModal;