import BasePage from './baseView';
import BaseComponent from '../../components/baseComponent';

import state from '../../state';
import Card from '../../components/card';

// const scoreCount = () => {
//   state.game;
// };

export default class Game extends BasePage {
  private counter: HTMLElement | null;

  private cards: Card[];

  private currentCard: Card | null;

  private timer: NodeJS.Timeout | null;

  constructor(parentNode: HTMLElement) {
    super(parentNode);
    this.path = '/game';

    this.counter = null;
    this.timer = null;
    this.cards = [];
    this.currentCard = null;
  }

  init(): void {
    this.clear();

    this.counter = new BaseComponent(this.node, 'div', ['game-counter']).node;
    this.counter.textContent = '00:00';

    if (!state.settings.difficulty) {
      state.settings.difficulty = '36';
    }
    const cardsField = new BaseComponent(this.node, 'div', ['cards-field']);
    cardsField.node.style.cssText = `grid-template-columns: repeat(${Math.sqrt(
      +state.settings.difficulty,
    )}, 1fr)`;

    const images: string[] = [];
    for (let i = 1; i <= +state.settings.difficulty / 2; i += 1) {
      images.push(`${i}.jpg`);
      images.push(`${i}.jpg`);
    }
    images.sort(() => Math.random() - 0.5);

    for (let i = 0; i < +state.settings.difficulty; i += 1) {
      if (!state.settings.cardsType) state.settings.cardsType = 'cats';
      const card = new Card(
        cardsField.node,
        `${state.settings.cardsType}/${images[i]}`,
      );
      this.cards.push(card);
    }

    this.startGame();
  }

  shuffleCards(): void {
    this.cards.sort(() => Math.random() - 0.5);
  }

  clear(): void {
    this.cards = [];
    if (this.timer) clearTimeout(this.timer);
    // if (this.counter) this.counter.textContent = '00:00';
    this.node.innerHTML = '';
  }

  initCounter(): NodeJS.Timeout {
    let value = 0;
    const timer = setInterval(() => {
      value += 1;
      if (!this.counter) return;
      const min = Math.floor(value / 60);
      const sec = value % 60;
      this.counter.textContent = `${min}:${sec}`;
    }, 1000);
    return timer;
  }

  startGame(): void {
    const showTime = 3;
    setTimeout(() => {
      this.cards.forEach(card => card.flip());
      this.cards.forEach(card =>
        card.node.addEventListener('click', () => this.cardsHandler(card), {
          once: true,
        }),
      );
      this.timer = this.initCounter();
    }, showTime * 1000);
  }

  match(card1: Card, card2: Card, isMatch: boolean): void {
    const front1 = card1.node.querySelector('.card__front');
    const front2 = card2.node.querySelector('.card__front');
    const highlightClass = isMatch ? 'match' : 'mistake';
    front1?.classList.add(highlightClass);
    front2?.classList.add(highlightClass);
    setTimeout(() => {
      front1?.classList.remove(highlightClass);
      front2?.classList.remove(highlightClass);
      if (!isMatch) {
        card1.flip();
        card2.flip();
      }
      card1.node.addEventListener('click', () => this.cardsHandler(card1), {
        once: true,
      });
      card2.node.addEventListener('click', () => this.cardsHandler(card2), {
        once: true,
      });
    }, 2000);
  }

  stopGame(): void {
    this.clear();
  }

  async cardsHandler(card: Card): Promise<void> {
    await card.flip();
    if (!this.currentCard) {
      this.currentCard = card;
    } else if (this.currentCard.image === card.image) {
      console.log('match');
      state.game.comparisons += 1;
      await this.match(this.currentCard, card, true);
      this.currentCard = null;
    } else {
      console.log('mistake!');
      state.game.comparisons += 1;
      state.game.mistakes += 1;
      console.log(state);
      this.match(this.currentCard, card, false);
      this.currentCard = null;
    }
  }
}
