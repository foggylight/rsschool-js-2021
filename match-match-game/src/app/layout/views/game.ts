import BasePage from './baseView';
import BaseComponent from '../../components/baseComponent';

import state from '../../state';

export default class Game extends BasePage {
  // private counter: HTMLElement;

  constructor(parentNode: HTMLElement) {
    super(parentNode);
    this.path = '/game';
    // this.counter = new BaseComponent(this.node, 'div', ['counter']).node;
  }

  init(): void {
    console.log('game', this.node);
    // this.counter.textContent = '00:00';
    // const cardsField = new BaseComponent(this.node, 'div', ['cards-field']);
  }

  // initCounter() {
  //   let value = 0;
  //   const timer = setInterval(() => {
  //     value += 1;
  //     this.counter.textContent = `${Math.floor(value / 60)}:${value % 60}`;
  //   }, 1000);
  //   return timer;
  // }

  // startGame() {
  //   this.init();
  //   this.initCounter();
  // }
}
