import User from "@interfaces/user";

export default interface AppFormInterface extends HTMLFormElement {
  _user?: User;
  _buttonLabel?: string;
  _inputId?: string;
  _isReplyForm?: boolean;
  user: User;
  buttonLabel: string;
  inputId: string;
  isReplyForm: boolean;
}