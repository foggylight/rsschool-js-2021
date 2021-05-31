import BasePage from './baseView';
import BaseComponent from '../../components/baseComponent';

import state from '../../state';
import Card from '../../components/card';
import ModalBox from '../../components/shared/modalBox';
import Button from '../../components/shared/btn';

const isOver = (): boolean => {
  if (!state.settings.difficulty) return false;
  console.log('matches', state.game.matches);
  console.log('all', +state.settings.difficulty / 2);
  return state.game.matches === +state.settings.difficulty / 2;
};

const scoreCount = (): number => {
  const { comparisons, mistakes, time } = state.game;
  const res = (comparisons - mistakes) * 100 - time * 10;
  return res > 0 ? res : 0;
};

export default class Game extends BasePage {
  private counter: HTMLElement | null;

  private cards: Card[];

  private currentCard: Card | null;

  private timer: NodeJS.Timeout | null;

  private counterValue: number;

  constructor(parentNode: HTMLElement) {
    super(parentNode);
    this.path = '/game';

    this.counter = null;
    this.counterValue = 0;
    this.timer = null;
    this.cards = [];
    this.currentCard = null;
  }

  init(): void {
    this.clear();

    this.counter = new BaseComponent(this.node, 'div', ['game-counter']).node;
    this.counter.textContent = '00:00';

    if (!state.settings.difficulty) {
      state.settings.difficulty = '16';
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

  clear(): void {
    this.cards = [];
    state.game.comparisons = 0;
    state.game.matches = 0;
    state.game.time = 0;
    state.game.mistakes = 0;
    state.game.score = 0;
    if (this.timer) clearTimeout(this.timer);
    this.node.innerHTML = '';
  }

  initCounter(): NodeJS.Timeout {
    this.counterValue = 0;
    const timer = setInterval(() => {
      this.counterValue += 1;
      if (!this.counter) return;
      const min = Math.floor(this.counterValue / 60);
      const sec = this.counterValue % 60;
      this.counter.textContent = `${min}:${sec}`;
    }, 1000);
    return timer;
  }

  startGame(): void {
    const showTime = 5;
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
        card1.node.addEventListener('click', () => this.cardsHandler(card1), {
          once: true,
        });
        card2.node.addEventListener('click', () => this.cardsHandler(card2), {
          once: true,
        });
      }
    }, 1500);
  }

  initEndGameModal(): void {
    const endGameModal = new ModalBox(this.node);
    endGameModal.node.classList.add('end-game-modal');
    const text = new BaseComponent(endGameModal.node, 'p', ['game-end-text']);
    text.node.textContent = `Congratulations! You successfully found all matches in ${Math.floor(
      this.counterValue / 60,
    )}:${this.counterValue % 60} minutes! Your score is ${state.game.score}.`;
    const closeBtn = new Button(
      'button',
      ['btn', 'btn_dark', 'btn_end-game'],
      'ok',
      '#score',
    );
    // closeBtn.node.addEventListener('click', () => endGameModal.close());
    endGameModal.node.append(closeBtn.node);
    endGameModal.open();
  }

  stopGame(): void {
    console.log('stop!', this.counterValue);
    if (this.timer) clearTimeout(this.timer);
    const { game, user } = state;
    state.game.time = this.counterValue;
    state.game.score = scoreCount();
    // add check (if user didn't register)
    if (!user.name || !user.email || !game.score) {
      this.initEndGameModal();
      return;
    }
    state.bestPlayers.push({
      name: user.name,
      email: user.email,
      score: game.score,
    });
    this.initEndGameModal();
    console.log(state);
  }

  async cardsHandler(card: Card): Promise<void> {
    await card.flip();
    if (!this.currentCard) {
      this.currentCard = card;
    } else if (this.currentCard.image === card.image) {
      state.game.comparisons += 1;
      state.game.matches += 1;
      if (isOver()) {
        this.stopGame();
      }
      this.match(this.currentCard, card, true);
      this.currentCard = null;
    } else {
      state.game.comparisons += 1;
      state.game.mistakes += 1;
      this.match(this.currentCard, card, false);
      this.currentCard = null;
    }
  }
}
