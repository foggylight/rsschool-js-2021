import BaseComponent from './baseComponent';

import state from '../state';

export default class Card extends BaseComponent {
  card: BaseComponent;

  image;

  constructor(parentNode: HTMLElement, readonly img: string) {
    super(parentNode, 'div', ['card-container']);

    this.image = img;

    this.card = new BaseComponent(this.node, 'div', ['card']);
    const cardFront = new BaseComponent(this.card.node, 'div', ['card__front'])
      .node;
    const cardBack = new BaseComponent(this.card.node, 'div', ['card__back'])
      .node;
    // cardFront.node.style.backgroundImage = `url(${imgSrc})`;
  }

  public flip(): void {
    this.card.node.classList.toggle('flipped');
  }

  addListener(): void {
    this.node.addEventListener('click', () => this.flip(), { once: true });
  }
}
