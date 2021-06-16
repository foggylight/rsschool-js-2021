export default class Button {
  public node: HTMLButtonElement;

  constructor(
    parentNode: HTMLElement | null = null,
    classNames: string[] = [],
    content = '',
    id: number | null = null,
  ) {
    this.node = document.createElement('button');
    this.node.type = 'button';
    this.node.classList.add('btn', ...classNames);
    this.node.textContent = content;

    if (id) {
      this.node.dataset.id = `${id}`;
    }
    if (parentNode) {
      parentNode.append(this.node);
    }
  }
}
