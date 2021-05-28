import BaseComponent from '../../components/baseComponent';
import Logo from '../../components/logo';
import Navigation from '../../components/navigation';
import UserBlock from '../../components/userBlock';

export default class Header extends BaseComponent {
  private nav: Navigation | null;

  private userBlock: UserBlock | null;

  private logo: Logo;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'header', ['page-header']);

    this.logo = new Logo(this.node);
    this.nav = new Navigation(this.node);
    this.userBlock = new UserBlock(this.node);
  }

  render(): void {
    this.nav?.render();
    this.userBlock?.render();
  }
}
