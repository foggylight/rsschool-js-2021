import BaseComponent from '../../components/baseComponent';
import Logo from '../../components/logo';
import Navigation from '../../components/navigation';
import UserBlock from './userBlock';

export default class Header extends BaseComponent {
  private nav: Navigation | null;

  private userBlock: UserBlock | null;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'header', ['page-header']);

    this.nav = null;
    this.userBlock = null;
  }

  init(): void {
    const logo = new Logo(this.node);
    logo.init();
    this.nav = new Navigation(this.node);
    this.userBlock = new UserBlock(this.node);
  }

  render(): void {
    this.init();
    this.nav?.render();
    this.userBlock?.render();
  }
}
