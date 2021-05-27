import BaseComponent from '../../components/baseComponent';
import Button from '../../components/btn';

export default class UserBlock extends BaseComponent {
  private btn: Button | null;

  private userImg: HTMLElement | null;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', ['user-block']);

    this.btn = null;

    this.userImg = null;
  }

  init(): void {
    this.btn = new Button(
      'button',
      ['user-block__btn-register'],
      'register new player',
    );
  }

  render(): void {
    this.init();
    this.btn?.addToPage(this.node);
    if (this.userImg) {
      this.node.append(this.userImg);
    }
  }
}
