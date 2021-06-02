import BasePage from './baseView';

import img1 from '../../../assets/about-1.jpg';
import img2 from '../../../assets/about-2.jpg';
import img3 from '../../../assets/about-3.jpg';

import { Page } from '../../app.api';

const template = `
    <h2 class="heading">How to play?</h2>
    <div class="about__step">
      <div class="about__text-block">
        <span class="about__number">1</span>
        <p class="about__text">Register new player in game</p>
      </div>
      <img width="302px" src="${img1}" alt="Registration form">
    </div>
    <div class="about__step">
      <div class="about__text-block">
        <span class="about__number">2</span>
        <p class="about__text">Configure your game settings</p>
      </div>
      <img width="116px" src="${img2}" alt="Settings button">
    </div>
    <div class="about__step">
      <div class="about__text-block">
        <span class="about__number">3</span>
        <p class="about__text">Start you new game! Remember card positions and match it before times up.</p>
      </div>
      <img src="${img3}" alt="Game field">
    </div>
  `;

export default class AboutPage extends BasePage {
  constructor(parentNode: Page) {
    super(parentNode);
    this.node.classList.add('content-scrollable');
  }

  public render(): void {
    this.node.innerHTML = template;
    this.parent.node.append(this.node);
  }
}
