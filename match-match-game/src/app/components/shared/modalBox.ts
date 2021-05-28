import BaseComponent from '../baseComponent';

export default class ModalBox extends BaseComponent {
  constructor(parentNode: HTMLElement, childNode: HTMLElement[]) {
    super(parentNode, 'div', ['modal-box__cover', 'hidden']);
    this.node.append(...childNode);
  }

  open(): void {
    this.node.classList.remove('hidden');
  }

  close(): void {
    this.node.classList.add('hidden');
  }
}
