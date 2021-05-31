import BaseComponent from './baseComponent';
import cardBackImg from '../../assets/card-back.jpg';

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
    cardBack.style.backgroundImage = `url(${cardBackImg})`;
    cardFront.style.backgroundImage = `url('./images/${img}')`;
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
