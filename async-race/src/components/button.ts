export default class Button {
  public node: HTMLButtonElement;

  constructor(
    parentNode: HTMLElement | null = null,
    classNames: string[] = [],
    content = '',
    id: number | null = null,
  ) {
    this.node = document.createElement('button');
    this.node.classList.add(...classNames);
    this.node.textContent = content;

    if (id) {
      this.node.dataset.id = `${id}`;
    }
    if (parentNode) {
      parentNode.append(this.node);
    }
  }
}
