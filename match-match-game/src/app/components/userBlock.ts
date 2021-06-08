import state from '../state';

import BaseComponent from './shared/baseComponent';
import RegisterButton from './registerBtn';
import Button from './shared/button';
import Avatar from './shared/avatar';
import { ButtonType } from '../app.models';

export default class UserBlock extends BaseComponent<HTMLElement> {
  private btn: Button | null;

  private userImg: HTMLElement | null;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', ['user-block']);

    this.btn = null;

    this.userImg = null;
  }

  public render(): void {
    this.node.innerHTML = '';

    if (state.user.name) {
      this.btn = new Button(
        ButtonType.button,
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
