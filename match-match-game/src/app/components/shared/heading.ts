export default class Heading {
  node: HTMLHeadingElement;

  constructor(text: string) {
    this.node = document.createElement('h2');
    this.node.classList.add('heading');
    this.node.textContent = text;
  }
}
