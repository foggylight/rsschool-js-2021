export default class Button {
  public node: HTMLButtonElement;

  constructor(type: 'button' | 'submit', className: string[], content: string) {
    const elem = document.createElement('button');
    elem.classList.add('btn');
    this.node = elem;
    this.node.setAttribute('type', type);
    this.node.classList.add(...className);
    this.node.textContent = content;

    if (type === 'submit') {
      this.node.disabled = true;
    }
  }

  addToPage(parent: HTMLElement): void {
    parent.append(this.node);
  }
}
