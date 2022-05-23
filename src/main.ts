import "./main.css";

import AppRoot from "@components/app-root";
import AppComment from "@components/app-comment";
import AppForm from "@components/app-form";

customElements.define("app-root", AppRoot);
customElements.define("app-post", AppComment);
customElements.define("app-form", AppForm);