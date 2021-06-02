export default class BaseComponent<T> {
  public node: T | HTMLElement;

  constructor(
    private parentNode: HTMLElement,
    tagName = 'div',
    classNames: string[],
  ) {
    this.node = document.createElement(tagName);
    this.node.classList.add(...classNames);
    parentNode.append(this.node);
  }
}
