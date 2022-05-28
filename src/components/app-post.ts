import AppCommentInterface from "@interfaces/app-comment";
import Comment from "@interfaces/comment";
import Reply from "@interfaces/reply";
import User from "@interfaces/user";

class AppPost extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const template = <HTMLTemplateElement>document.getElementById("template-post");
    const fragment = <DocumentFragment>template.content.cloneNode(true);
    const element = <HTMLDivElement>fragment.querySelector(".post");
    this.appendChild(element);
  }

  loadComment(user: User, comment: Comment) {
    const postComment = <HTMLDivElement>this.querySelector(".post__comment");
    const appComment = <AppCommentInterface>document.createElement("app-comment");
    postComment.appendChild(appComment);
  }

  loadReplies(user: User, replies: Reply[]) {
    if (replies.length > 0) {
      const postReplies = <HTMLDivElement>this.querySelector(".post__replies");
      replies.forEach((reply) => {
        const appReply = <AppCommentInterface>document.createElement("app-comment");
        postReplies.appendChild(appReply);
      });
    } else {
      const postRow = <HTMLDivElement>this.querySelector(".post__row");
      postRow.remove();
    }
  }
}

export default AppPost;