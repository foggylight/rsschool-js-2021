export default class Heading {
  node: HTMLHeadingElement;

  constructor(text: string) {
    const elem = document.createElement('h2');
    elem.classList.add('heading');
    elem.textContent = text;
    this.node = elem;
  }
}
