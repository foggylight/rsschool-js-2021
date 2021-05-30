import BasePage from './baseView';
import BaseComponent from '../../components/baseComponent';

import state from '../../state';
import Card from '../../components/card';

const match = (card1: Card, card2: Card, isMatch: boolean) => {
  const front1 = card1.node.querySelector('.card__front');
  const front2 = card2.node.querySelector('.card__front');
  const highlightClass = isMatch ? 'match' : 'mistake';
  front1?.classList.add(highlightClass);
  front2?.classList.add(highlightClass);
  setTimeout(() => {
    front1?.classList.remove(highlightClass);
    front2?.classList.remove(highlightClass);
  }, 2000);
};

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

    for (let i = 0; i < +state.settings.difficulty; i += 1) {
      const card = new Card(cardsField.node, '');
      this.cards.push(card);
    }

    this.startGame();
  }

  shuffleCards(): void {
    this.cards.sort(() => Math.random() - 0.5);
  }

  clear(): void {
    this.cards = [];
    this.counter = null;
    this.node.innerHTML = '';
  }

  initCounter(): NodeJS.Timeout {
    let value = 0;
    const timer = setInterval(() => {
      value += 1;
      if (!this.counter) return;
      this.counter.textContent = `${Math.floor(value / 60)}:${value % 60}`;
    }, 1000);
    return timer;
  }

  startGame(): void {
    const showTime = 3;
    setTimeout(() => {
      this.cards.forEach(card => card.flip());
      this.cards.forEach(card => card.addListener());
      this.cards.forEach(card =>
        card.node.addEventListener('click', () => this.cardsHandler(card)),
      );
      // this.addCardListener();
      console.log('game start');
      this.timer = this.initCounter();
    }, showTime * 1000);
  }

  stopGame(): void {
    this.clear();
  }

  cardsHandler(card: Card) {
    if (!this.currentCard) {
      this.currentCard = card;
    } else if (this.currentCard.image === card.image) {
      console.log('match');
      state.game.comparisons += 1;
      match(this.currentCard, card, true);
      this.currentCard = null;
    } else {
      state.game.comparisons += 1;
      state.game.mistakes += 1;
      match(this.currentCard, card, false);
      this.currentCard.flip();
      card.flip();
      this.currentCard = null;
    }
  }
}
