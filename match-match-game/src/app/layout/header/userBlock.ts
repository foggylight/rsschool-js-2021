import BaseComponent from '../../components/baseComponent';
import Button from '../../components/btn';

export default class UserBlock extends BaseComponent {
  private btn: Button;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', ['user-block']);

    this.btn = new Button(
      this.node,
      'button',
      'user-block__btn-register',
      'register new player',
    );
  }
}
