import AppCommentInterface from "@interfaces/app-comment";
import Comment from "@interfaces/comment";
import User from "@interfaces/user";
import Reply from "@interfaces/reply";

class AppPost extends HTMLDivElement {
  hasRow: boolean;

  constructor() {
    super();
    this.hasRow = false;
  }

  connectedCallback() {
    const postComment = <HTMLDivElement>document.createElement("div");
    postComment.classList.add("post__comment");
    this.classList.add("post");
    this.appendChild(postComment);
  }

  loadComment(user: User, comment: Comment) {
    const postComment = <HTMLDivElement>this.querySelector(".post__comment");
    const appComment = <AppCommentInterface>document.createElement("div", { is: "app-comment" });
    postComment.appendChild(appComment);
    appComment.loadComment(user, comment);
  }

  loadReplies(user: User, replies: Reply[]) {
    if (replies.length > 0) {
      const postRow = this.createPostRow();
      const postReplies = <HTMLDivElement>postRow.querySelector(".post__replies");
      replies.forEach((reply) => {
        const postReply = <HTMLDivElement>document.createElement("div");
        const replyElement = <AppCommentInterface>document.createElement("div", { is: "app-comment" });
        postReply.classList.add("post__reply");
        postReply.appendChild(replyElement);
        postReplies.appendChild(postReply);
        replyElement.loadComment(user, reply);
      });
    }
  }

  createPostRow() {
    const template = <HTMLTemplateElement>document.getElementById("template-post-row");
    const fragment = <DocumentFragment>template.content.cloneNode(true);
    const postRow = <HTMLDivElement>fragment.querySelector(".post__row");
    this.appendChild(postRow);
    this.hasRow = true;
    return postRow;
  }
}

export default AppPost;