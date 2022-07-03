export default interface AppButtonInterface extends HTMLButtonElement {
  _icon?: string;
  _label?: string
  icon: string;
  label: string;
  enable: () => void;
  disable: () => void;
}