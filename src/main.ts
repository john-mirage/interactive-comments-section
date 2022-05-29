import "./main.css";
import data from "@data/data.json";
import AppRoot from "@components/app-root";
import AppPost from "@components/app-post";
import AppComment from "@components/app-comment";
import AppForm from "@components/app-form";
import AppIcon from "@components/app-icon";
import AppScore from "@components/app-score";
import AppRootInterface from "@interfaces/app-root";

customElements.define("app-root", AppRoot, { extends: "main" });
customElements.define("app-post", AppPost, { extends: "div" });
customElements.define("app-comment", AppComment, { extends: "div" });
customElements.define("app-form", AppForm, { extends: "form" });
customElements.define("app-icon", AppIcon);
customElements.define("app-score", AppScore, { extends: "div" });

const appRoot = <AppRootInterface>document.createElement("main", { is: "app-root" });
const appComment = document.createComment(" App ");
document.body.prepend(appComment, appRoot);
appRoot.loadPosts(data.currentUser, data.comments);
appRoot.createForm(data.currentUser);