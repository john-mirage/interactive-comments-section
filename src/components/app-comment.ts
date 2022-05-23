import Comment from "@interfaces/comment";

class AppComment extends HTMLElement {
  comment: Comment | false;

  constructor() {
    super();
    this.comment = false;
  }

  connectedCallback() {
    if (this.comment) {
      const template = document.getElementById("template-comment") as HTMLTemplateElement;
      const fragment = template.content.cloneNode(true) as DocumentFragment;
      const commentElement = fragment.querySelector(".comment");
      this.appendChild(commentElement);
      if (this.comment.replies.length > 0) {
        const repliesElement = fragment.querySelector(".replies");
        this.appendChild(repliesElement);
      }
    }
  }
}

export default AppComment;