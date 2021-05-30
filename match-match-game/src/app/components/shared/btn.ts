export default class Button {
  public node: HTMLButtonElement | HTMLAnchorElement;

  constructor(
    type: 'button' | 'submit',
    className: string[],
    content: string,
    href: string | null = null,
  ) {
    let elem;
    if (href) {
      elem = document.createElement('a');
      elem.href = href;
    } else {
      elem = document.createElement('button');
      elem.setAttribute('type', type);
    }
    this.node = elem;
    this.node.classList.add('btn');
    this.node.classList.add(...className);
    this.node.textContent = content;

    if (type === 'submit' && this.node instanceof HTMLButtonElement) {
      this.node.disabled = true;
    }
  }

  addToPage(parent: HTMLElement): void {
    parent.append(this.node);
  }
}
