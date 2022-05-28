class AppComment extends HTMLDivElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.classList.add("comment");
  }
}

export default AppComment;