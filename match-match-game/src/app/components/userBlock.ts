import state from '../state';

import BaseComponent from './baseComponent';
import RegisterButton from './registerBtn';
import Button from './shared/btn';
import Avatar from './shared/userAvatar';

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

    if (state.user.name) {
      this.btn = new Button(
        'button',
        ['user-block__btn-start-game'],
        'Start game',
        '#game',
      );
      this.userImg = new Avatar(state.user.imageSrc).node;
    } else {
      this.btn = new RegisterButton(this);
    }

    this.btn.addToPage(this.node);
    if (this.userImg) {
      this.node.append(this.userImg);
    }
  }
}
