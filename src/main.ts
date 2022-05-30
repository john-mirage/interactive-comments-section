import "./main.css";
import data from "@data/data.json";
import AppRoot from "@components/app-root";
import AppPost from "@components/app-post";
import AppComment from "@components/app-comment";
import AppForm from "@components/app-form";
import AppScore from "@components/app-score";
import AppButton from "@components/app-button";
import AppRootInterface from "@interfaces/app-root";

/**
 * Define the web components used in the project.
 * The components do not have to be isolated as they are specific for the project.
 */
customElements.define("app-root", AppRoot, { extends: "main" });
customElements.define("app-post", AppPost, { extends: "div" });
customElements.define("app-comment", AppComment, { extends: "div" });
customElements.define("app-form", AppForm, { extends: "form" });
customElements.define("app-score", AppScore, { extends: "div" });
customElements.define("app-button", AppButton, { extends: "button" });

/**
 * Create the app.
 */
const appComment = document.createComment(" App ");
const appRoot = <AppRootInterface>document.createElement("main", { is: "app-root" });
appRoot.user = data.currentUser;
appRoot.comments = data.comments;
document.body.prepend(appComment, appRoot);