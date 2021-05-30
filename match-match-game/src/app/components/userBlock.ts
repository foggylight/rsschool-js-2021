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
  }

  render(): void {
    this.node.innerHTML = '';

    if (state.user.imageSrc) {
      this.btn = new Button(
        'button',
        ['user-block__btn-start-game'],
        'Start game',
        '#game',
      );

      const imageContainer = document.createElement('div');
      imageContainer.classList.add('avatar-container');
      const image = new Image();
      image.src = state.user.imageSrc;
      image.alt = 'user avatar';
      image.classList.add('user-block__avatar');
      imageContainer.append(image);
      this.userImg = imageContainer;
    } else {
      this.btn = new RegisterButton(this);
    }

    this.btn.addToPage(this.node);
    if (this.userImg) {
      this.node.append(this.userImg);
    }
  }
}
