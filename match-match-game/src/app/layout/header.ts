import BaseComponent from '../components/baseComponent';
import Navigation from '../components/navigation';
import UserBlock from '../components/userBlock';

export default class Header extends BaseComponent<HTMLElement> {
  private nav: Navigation;

  private userBlock: UserBlock;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'header', ['page-header']);

    const logo = new BaseComponent<HTMLAnchorElement>(this.node, 'a', ['logo'])
      .node;
    if (logo instanceof HTMLAnchorElement) logo.href = '/';
    logo.innerHTML = `
    <div class="logo__top-block">
      <span>match</span>
    </div>
    <div class="logo__bottom-block">
      <span>match</span>
    </div>
    `;

    this.nav = new Navigation(this.node);
    this.userBlock = new UserBlock(this.node);
  }

  public render(): void {
    this.nav?.render();
    this.userBlock?.render();
  }
}
