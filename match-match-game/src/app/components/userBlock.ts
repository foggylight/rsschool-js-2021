import state from '../state';

import BaseComponent from './baseComponent';
import RegisterButton from './registerBtn';
import Button from './shared/btn';

export default class UserBlock extends BaseComponent {
  private btn: Button | null;

  private userImg: HTMLElement | null;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', ['user-block']);

    this.btn = null;

    this.userImg = null;

    this.init();
  }

  init(): void {
    if (state.user.name) {
      this.btn = new Button(
        'button',
        ['user-block__btn-start-game'],
        'Start game',
      );

      const image = new Image();
      image.src = state.user.imageSrc;
      image.alt = 'user avatar';
      this.userImg = image;
    } else {
      this.btn = new RegisterButton(this.node);
    }
  }

  render(): void {
    this.btn?.addToPage(this.node);
    if (this.userImg) {
      this.node.append(this.userImg);
    }
  }
}
