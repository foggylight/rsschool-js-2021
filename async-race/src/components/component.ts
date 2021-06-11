export default class Component {
  public node: HTMLElement;

  constructor(
    parentNode: HTMLElement | null = null,
    tagName: keyof HTMLElementTagNameMap = 'div',
    classNames: string[] = [],
    content = '',
  ) {
    this.node = document.createElement(tagName);
    this.node.classList.add(...classNames);
    this.node.textContent = content;

    if (parentNode) {
      parentNode.append(this.node);
    }
  }

  clear(): void {
    this.node.innerHTML = '';
  }

  delete(): void {
    this.node.remove();
  }
}
