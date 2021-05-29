import BaseComponent from '../baseComponent';

export default class ModalBox extends BaseComponent {
  private cover: HTMLElement;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', ['modal-box', 'hidden']);
    this.cover = new BaseComponent(parentNode, 'div', [
      'modal-box__cover',
      'hidden',
    ]).node;
    this.addListeners();
  }

  addContent(content: HTMLElement[]): void {
    this.node.append(...content);
  }

  public open(): void {
    this.node.classList.remove('hidden');
    this.cover.classList.remove('hidden');
  }

  public close(): void {
    this.node.classList.add('hidden');
    this.cover.classList.add('hidden');
  }

  addListeners(): void {
    this.cover.addEventListener('click', () => this.close());
  }
}
