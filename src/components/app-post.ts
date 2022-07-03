import AppCommentInterface from "@interfaces/app-comment";
import Comment from "@interfaces/comment";
import User from "@interfaces/user";

class AppPost extends HTMLDivElement {
  _user?: User;
  _comment?: Comment;
  commentSectionElement: HTMLDivElement;

  constructor() {
    super();
    this.commentSectionElement = document.createElement("div");
  }

  get user() {
    if ("_user" in this && this._user !== undefined) {
      return this._user;
    } else {
      throw new Error("The user is not defined");
    }
  }

  get comment() {
    if ("_comment" in this && this._comment !== undefined) {
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
    this.commentSectionElement.classList.add("post__section", "post__section--comment");
    const commentElement = this.createComment(this.comment);
    this.commentSectionElement.append(commentElement);
    this.append(this.commentSectionElement);
    this.handleReplySection();
  }

  createComment(comment: Comment) {
    const commentElement = <AppCommentInterface>document.createElement("div", { is: "app-comment" });
    commentElement.user = this.user;
    commentElement.comment = comment;
    return commentElement;
  }

  createReplySection() {
    const replySectionElement = document.createElement("div");
    const timelineElement = document.createElement("div");
    const lineElement = document.createElement("div");
    const repliesElement = document.createElement("div");
    replySectionElement.classList.add("post__section", "post__section--reply");
    timelineElement.classList.add("post__timeline");
    lineElement.classList.add("post__line");
    repliesElement.classList.add("post__replies");
    timelineElement.appendChild(lineElement);
    replySectionElement.append(timelineElement, repliesElement);
    return { replySectionElement, repliesElement};
  }

  handleReplySection() {
    if (this.comment.replies && this.comment.replies.length > 0) {
      const { replySectionElement, repliesElement } = this.createReplySection();
      this.comment.replies.forEach((reply) => {
        const comment = this.createComment(reply);
        repliesElement.append(comment);
      });
      this.append(replySectionElement);
    }
  }
}

export default AppPost;