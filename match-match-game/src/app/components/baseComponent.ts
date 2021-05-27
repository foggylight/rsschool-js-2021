export default class BaseComponent {
  public node: HTMLElement;

  constructor(
    private readonly parentNode: HTMLElement,
    tagName = 'div',
    classNames: string[],
  ) {
    const elem = document.createElement(tagName);
    elem.classList.add(...classNames);
    this.node = elem;
    parentNode.append(this.node);
  }
}
