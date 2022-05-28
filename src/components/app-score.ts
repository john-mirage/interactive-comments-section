class AppScore extends HTMLDivElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const template = <HTMLTemplateElement>document.getElementById("template-score");
    const fragment = <DocumentFragment>template.content.cloneNode(true);
    this.classList.add("score");
    this.appendChild(fragment);
  }

  loadScore(score: number) {
    const countElement = <HTMLElement>this.querySelector(".score__count");
    countElement.textContent = String(score);
  }
}

export default AppScore;