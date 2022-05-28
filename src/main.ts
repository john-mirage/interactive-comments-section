import "./main.css";
import data from "@data/data.json";
import AppRoot from "@components/app-root";
import AppComment from "@components/app-comment";
import AppForm from "@components/app-form";
import AppIcon from "@components/app-icon";
import AppScore from "@components/app-score";
import AppRootInterface from "@interfaces/app-root";

const appElement = <HTMLElement>document.getElementById("app");

customElements.define("app-section", AppRoot);
customElements.define("app-comment", AppComment);
customElements.define("app-form", AppForm);
customElements.define("app-icon", AppIcon);
customElements.define("app-score-button", AppScore);

const appSection = <AppRootInterface>document.createElement("app-section");
appSection.currentUser = data.currentUser;
appSection.comments = data.comments;

appElement.appendChild(appSection);