import BaseComponent from './shared/baseComponent';

import cardBackImg from '../../assets/card-back.jpg';

export default class Card extends BaseComponent<HTMLElement> {
  card: BaseComponent<HTMLElement>;

  image;

  constructor(parentNode: HTMLElement, readonly bgImageName: string) {
    super(parentNode, 'div', ['card-container']);

    this.image = bgImageName;

    this.card = new BaseComponent<HTMLElement>(this.node, 'div', ['card']);
    const cardFront = new BaseComponent<HTMLElement>(this.card.node, 'div', [
      'card__front',
    ]).node;
    const cardBack = new BaseComponent<HTMLElement>(this.card.node, 'div', [
      'card__back',
    ]).node;
    cardBack.style.backgroundImage = `url(${cardBackImg})`;
    cardFront.style.backgroundImage = `url('./images/${bgImageName}')`;
  }

  public flip(): Promise<void> {
    return new Promise(res => {
      this.card.node.classList.toggle('flipped');
      this.card.node.addEventListener('transitionend', () => res(), {
        once: true,
      });
    });
  }
}
