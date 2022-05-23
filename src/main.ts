import "./main.css";
import data from "@data/data.json";
import AppRoot from "@components/app-root";
import AppComment from "@components/app-comment";
import AppForm from "@components/app-form";
import User from "@interfaces/user";
import Comment from "@interfaces/comment";

interface AppRootProps {
  currentUser: User;
  comments: Comment[];
}

const app = document.getElementById("app");

customElements.define("app-root", AppRoot);
customElements.define("app-comment", AppComment);
customElements.define("app-form", AppForm);

const appRoot = document.createElement("app-root") as HTMLElement & AppRootProps;
appRoot.currentUser = data.currentUser;
appRoot.comments = data.comments;

app.appendChild(appRoot);