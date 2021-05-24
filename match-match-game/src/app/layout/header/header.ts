import BaseComponent from '../../components/baseComponent';
import Logo from '../../components/logo';
import Navigation from '../../components/navigation';
import UserBlock from './userBlock';

export default class Header extends BaseComponent {
  private logo: Logo;

  private nav: Navigation;

  private userBlock: UserBlock;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'header', ['page-header']);

    this.logo = new Logo(this.node);
    this.nav = new Navigation(this.node);
    this.userBlock = new UserBlock(this.node);

    this.render();
  }

  render(): void {
    console.log('header', this.node);
  }
}
