class AppScoreButton extends HTMLElement {
  score: number;

  constructor() {
    super();
    this.score = 0;
  }

  connectedCallback() {
    const template = <HTMLTemplateElement>document.getElementById("template-score-button");
    const fragment = <DocumentFragment>template.content.cloneNode(true);
    const element = <HTMLDivElement>fragment.querySelector(".button-counter");
    const countElement = <HTMLElement>fragment.querySelector(".button-counter__count");
    const plusButtonElement = <HTMLButtonElement>fragment.querySelector(".button-counter__button--plus");
    const minusButtonElement = <HTMLButtonElement>fragment.querySelector(".button-counter__button--minus");
    countElement.textContent = String(this.score);
    plusButtonElement.addEventListener("click", () => {
      this.score += 1;
      countElement.textContent = String(this.score);
    });
    minusButtonElement.addEventListener("click", () => {
      this.score -= 1;
      countElement.textContent = String(this.score);
    });
    this.appendChild(element);
  }
}

export default AppScoreButton;