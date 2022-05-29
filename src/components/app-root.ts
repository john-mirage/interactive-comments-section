import User from "@interfaces/user";
import Comment from "@interfaces/comment";
import AppPostInterface from "@interfaces/app-post";

class AppRoot extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const posts = <HTMLDivElement>document.createElement("div");
    posts.classList.add("app__posts");
    this.classList.add("app");
    this.appendChild(posts);
  }

  loadPosts(user: User, comments: Comment[]) {
    const appPosts = <HTMLDivElement>this.querySelector(".app__posts");
    comments.forEach((comment) => {
      const appPost = <AppPostInterface>document.createElement("div", { is: "app-post" });
      appPosts.appendChild(appPost);
      appPost.loadComment(user, comment);
      appPost.loadReplies(user, comment.replies);
    });
  }

  createForm(user: User) {
    const form = document.createElement("form", { is: "app-form" });
    form.classList.add("form");
    this.appendChild(form);
    form.loadForm(user.image.png, "send");
  }
}

export default AppRoot;