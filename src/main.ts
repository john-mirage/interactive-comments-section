import "./main.css";
import data from "@data/data.json";
import AppSection from "@components/app-section";
import AppComment from "@components/app-comment";
import AppReply from "@components/app-reply";
import AppForm from "@components/app-form";
import AppIcon from "@components/app-icon";
import AppScoreButton from "@components/app-score-button";
import AppSectionInterface from "@interfaces/app-section";

const appElement = <HTMLElement>document.getElementById("app");

customElements.define("app-section", AppSection);
customElements.define("app-comment", AppComment);
customElements.define("app-reply", AppReply);
customElements.define("app-form", AppForm);
customElements.define("app-icon", AppIcon);
customElements.define("app-score-button", AppScoreButton);

const appSection = <AppSectionInterface>document.createElement("app-section");
appSection.currentUser = data.currentUser;
appSection.comments = data.comments;

appElement.appendChild(appSection);