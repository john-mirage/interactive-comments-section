import Icon from "@interfaces/icon";

const icon: Icon = {
  "plus": {
    viewBox: "0 0 11 11",
    path: `<path d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z"/>`
  },
  "minus": {
    viewBox: "0 0 11 3",
    path: `<path d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z"/>`
  }
};

class AppScore extends HTMLDivElement {
  _count?: number;

  constructor() {
    super();
  }

  get count() {
    if ("_count" in this && this._count !== undefined) {
      return this._count;
    } else {
      throw new Error("The score is not valid or not defined");
    }
  }

  set count(count: number) {
    this._count = count;
  }

  connectedCallback() {
    this.classList.add("score");
    const plusButton = this.createButton("plus");
    const count = this.createCount();
    const minusButton = this.createButton("minus");
    this.append(plusButton, count, minusButton);
  }

  createButton(name: string) {
    const button = document.createElement("button");
    const icon = this.createIcon(name);
    button.classList.add("score__button", `score__button--${name}`);
    button.append(icon);
    return button;
  }

  createIcon(shape: string) {
    const iconElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    iconElement.classList.add("score__icon");
    iconElement.setAttribute("viewBox", icon[shape].viewBox);
    iconElement.setAttribute("fill", "currentColor");
    iconElement.innerHTML = icon[shape].path;
    return iconElement;
  }

  createCount() {
    const count = document.createElement("p");
    count.classList.add("score__count");
    count.textContent = String(this.count);
    return count;
  }
}

export default AppScore;