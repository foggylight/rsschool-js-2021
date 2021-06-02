import BaseComponent from '../baseComponent';

import defaultImage from '../../../assets/user-image.png';

export default class ModalBox extends BaseComponent<HTMLElement> {
  private cover: HTMLElement;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', ['modal-box', 'hidden']);
    this.cover = new BaseComponent<HTMLElement>(parentNode, 'div', [
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

  clear(): void {
    this.node.querySelector('form')?.reset();
    this.node.querySelectorAll('.form__input-warning').forEach(warning => {
      warning.remove();
    });
    this.node.querySelectorAll('.form__input').forEach(input => {
      input.classList.remove('input_valid');
      input.classList.remove('input_invalid');
    });
    const imageContainer: HTMLElement | null = this.node.querySelector(
      '.form__uploaded-image',
    );
    if (imageContainer)
      imageContainer.style.backgroundImage = `url('${defaultImage}')`;
  }

  public close(): void {
    this.clear();
    this.node.classList.add('hidden');
    this.cover.classList.add('hidden');
  }

  addListeners(): void {
    this.cover.addEventListener('click', () => this.close());
  }
}
