import Header from './layout/header/header';
import PageContent from './layout/pageContent';

import state from './state';

export default class App {
  private header: Header;

  private content: PageContent;

  constructor(private readonly rootNode: HTMLElement) {
    state.router.currentRoute = `/${window.location.hash.slice(1)}`;
    this.enableRouteChange();

    this.header = new Header(this.rootNode);
    this.content = new PageContent(this.rootNode);
  }

  private enableRouteChange() {
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.slice(1);
      state.router.currentRoute = `/${hash}`;
      this.render();
    });
  }

  render(): void {
    this.header.render();
    this.content.render();
  }
}
