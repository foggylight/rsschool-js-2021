import BasePage from './baseView';
import BaseComponent from '../../components/baseComponent';

import img1 from '../../../assets/about-1.jpg';
import img2 from '../../../assets/about-2.jpg';
import img3 from '../../../assets/about-3.jpg';

export default class AboutPage extends BasePage {
  constructor(parentNode: HTMLElement) {
    super(parentNode);

    this.render();
  }

  init(): void {
    const template = `
    <h2 class="heading">How to play?</h2>
    <div class="about__step">
      <div class="about__text-block">
        <span class="about__number">1</span>
        <p class="about__text">Register new player in game</p>
      </div>
      <img src="${img1}" alt="Registration form">
    </div>
    <div class="about__step">
      <div class="about__text-block">
        <span class="about__number">2</span>
        <p class="about__text">Configure your game settings</p>
      </div>
      <img src="${img2}" alt="Settings button">
    </div>
    <div class="about__step">
      <div class="about__text-block">
        <span class="about__number">3</span>
        <p class="about__text">Start you new game! Remember card positions and match it before times up.</p>
      </div>
      <img src="${img3}" alt="Game field">
    </div>
  `;

    this.node.innerHTML = template;

    this.parentNode.append(this.node);
  }

  render(): void {
    console.log('about', this.node);
  }
}
