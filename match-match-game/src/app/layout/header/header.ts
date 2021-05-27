import BaseComponent from '../../components/baseComponent';
import Logo from '../../components/logo';
import Navigation from '../../components/navigation';
import UserBlock from './userBlock';

export default class Header extends BaseComponent {
  private logo: Logo | null;

  private nav: Navigation | null;

  private userBlock: UserBlock | null;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'header', ['page-header']);

    this.logo = null;
    this.nav = null;
    this.userBlock = null;

    this.render();
  }

  init(): void {
    this.logo = new Logo(this.node);
    this.nav = new Navigation(this.node);
    this.userBlock = new UserBlock(this.node);
  }

  render(): void {
    console.log('header', this.node);
  }
}
