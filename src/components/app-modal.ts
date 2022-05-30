class AppModal extends HTMLDivElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const dialog = document.createElement("div");
    this.classList.add("modal");
    dialog.classList.add("modal__dialog");
    this.append(dialog);
  }

  mount() {
    document.body.prepend(this);
  }

  unmount() {
    document.body.removeChild(this);
  }
}

export default AppModal;