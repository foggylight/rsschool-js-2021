import { ButtonType } from '../../app.models';

export default class Button {
  public node: HTMLButtonElement | HTMLAnchorElement;

  constructor(
    type: ButtonType,
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
    this.node.classList.add('btn', ...className);
    this.node.textContent = content;

    if (this.node instanceof HTMLButtonElement && type === 'submit') {
      this.node.disabled = true;
    }
  }

  public addToPage(parent: HTMLElement): void {
    parent.append(this.node);
  }
}
