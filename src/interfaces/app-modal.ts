import Modal from "@interfaces/modal";

export default interface AppModalInterface extends HTMLDivElement {
  _modal: Modal;
  modal: Modal;
  cancelButton?: HTMLButtonElement;
  mount: () => void;
  unmount: () => void;
}