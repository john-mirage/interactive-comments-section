export default interface AppModalInterface extends HTMLDivElement {
  _title: string;
  _description: string;
  _action: string;
  title: string;
  description: string;
  action: string;
  mount: () => void;
  unmount: () => void;
}