import Modal from "@interfaces/modal";

class AppModal extends HTMLDivElement {
  _modal: Modal | false;
  initialCall: boolean;
  dialogElement: HTMLDivElement;
  titleElement: HTMLHeadingElement;
  descriptionElement: HTMLParagraphElement;
  cancelButtonElement: HTMLButtonElement;
  confirmButtonElement: HTMLButtonElement;

  constructor() {
    super();
    this._modal = false;
    this.initialCall = true;
    this.dialogElement = document.createElement("div");
    this.titleElement = document.createElement("h2");
    this.descriptionElement = document.createElement("p");
    this.cancelButtonElement = document.createElement("button");
    this.confirmButtonElement = document.createElement("button");
    this.unmount = this.unmount.bind(this);
    this.handleConfirmButton = this.handleConfirmButton.bind(this);
  }

  get modal() {
    if (this._modal) {
      return this._modal;
    } else {
      throw new Error("The title is not defined");
    }
  }

  set modal(modal: Modal) {
    this._modal = modal;
  }

  connectedCallback() {
    if (this.initialCall) {
      this.classList.add("modal");
      this.dialogElement.classList.add("modal__dialog");
      this.titleElement.classList.add("modal__title");
      this.descriptionElement.classList.add("modal__description");
      this.cancelButtonElement.classList.add("modal__button");
      this.confirmButtonElement.classList.add("modal__button", "modal__button--red");
      this.titleElement.textContent = this.modal.title;
      this.descriptionElement.textContent = this.modal.description;
      this.cancelButtonElement.textContent = "No, Cancel";
      this.confirmButtonElement.textContent = this.modal.buttonLabel;
      this.dialogElement.append(this.titleElement, this.descriptionElement, this.cancelButtonElement, this.confirmButtonElement);
      this.append(this.dialogElement);
      this.initialCall = false;
    }
    this.cancelButtonElement.addEventListener("click", this.unmount);
    this.confirmButtonElement.addEventListener("click", this.handleConfirmButton);
  }

  disconnectedCallback() {
    this.cancelButtonElement.removeEventListener("click", this.unmount);
    this.confirmButtonElement.removeEventListener("click", this.handleConfirmButton);
  }

  unmount() {
    document.body.removeChild(this);
  }

  handleConfirmButton() {
    const customEvent = new CustomEvent("delete-comment", { detail: { data: this.modal.eventDetail } });
    this.dispatchEvent(customEvent);
    this.unmount();
  }
}

export default AppModal;