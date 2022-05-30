import AppCommentInterface from "@interfaces/app-comment";
import Comment from "@interfaces/comment";
import User from "@interfaces/user";

class AppPost extends HTMLDivElement {
  _user: User | false;
  _comment: Comment | false;

  constructor() {
    super();
    this._user = false;
    this._comment = false;
  }

  get user() {
    if (this._user) {
      return this._user;
    } else {
      throw new Error("The user is not defined");
    }
  }

  get comment() {
    if (this._comment) {
      return this._comment;
    } else {
      throw new Error("The comment is not defined");
    }
  }

  set user(user: User) {
    this._user = user;
  }

  set comment(comment: Comment) {
    this._comment = comment;
  }

  connectedCallback() {
    this.classList.add("post");
    const postCommentSection = this.createPostCommentSection();
    const comment = this.createComment(this.comment);
    postCommentSection.appendChild(comment);
    this.append(postCommentSection);
    if (this.comment.replies && this.comment.replies.length > 0) {
      const postReplySection = this.createPostReplySection();
      const postReplies = <HTMLDivElement>postReplySection.querySelector(".post__replies");
      this.comment.replies.forEach((reply) => {
        const replyComment = this.createComment(reply);
        postReplies.append(replyComment);
      });
      this.append(postReplySection);
    }
  }

  createPostCommentSection() {
    const postCommentSection = document.createElement("div");
    postCommentSection.classList.add("post__section", "post__section--comment");
    return postCommentSection;
  }

  createPostReplySection() {
    const postReplySection = document.createElement("div");
    const postTimeline = document.createElement("div");
    const postLine = document.createElement("div");
    const postReplies = document.createElement("div");
    postReplySection.classList.add("post__section", "post__section--reply");
    postTimeline.classList.add("post__timeline");
    postLine.classList.add("post__line");
    postReplies.classList.add("post__replies");
    postTimeline.appendChild(postLine);
    postReplySection.append(postTimeline, postReplies);
    return postReplySection;
  }

  createComment(comment: Comment) {
    const commentElement = <AppCommentInterface>document.createElement("div", { is: "app-comment" });
    commentElement.user = this.user;
    commentElement.comment = comment;
    return commentElement;
  }
}

export default AppPost;